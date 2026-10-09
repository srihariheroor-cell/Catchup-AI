// Gemini API Integration for CatchUp AI
// Directly calls Google's Generative Language API from the browser with the user's provided API key.
// Keys are never sent to any intermediary server; they are stored exclusively in the browser's localStorage.

const GEMINI_SYSTEM_PROMPT = `
You are "CatchUp AI", an elite intelligence assistant built for college students overwhelmed by high-volume group chats (WhatsApp, Slack, Discord).
Analyze the provided group chat transcript and output ONLY valid, parseable JSON conforming strictly to the requested schema.

Extract:
1. "summary": A concise executive summary paragraph explaining what happened, the main conflict or goal, and the status.
2. "keyTakeaways": Array of 3-5 high-impact bullet points.
3. "urgencyLevel": "critical" | "high" | "normal".
4. "urgentMessages": Array of objects:
   - "sender": string
   - "time": string
   - "content": string (the exact message snippet)
   - "reason": string (why this is urgent, e.g. "Hard submission deadline", "Budget cost overrun")
5. "tasks": Array of objects:
   - "id": string (e.g. "task-1")
   - "task": string (actionable title)
   - "assignee": string (name of person responsible, or "Unassigned")
   - "deadline": string (e.g. "Today at 3:00 PM" or "Pending")
   - "priority": "critical" | "high" | "medium" | "low"
   - "completed": boolean (always false initially)
6. "deadlines": Array of objects:
   - "event": string
   - "time": string
   - "location": string
   - "isUrgent": boolean
7. "decisions": Array of strings (concrete agreements, consensus reached).
8. "participants": Array of objects:
   - "name": string
   - "messages": number (approx message count)
   - "role": string (e.g. "Team Lead", "Frontend Dev", "Event Organizer")
9. "stats": Object:
   - "totalMessages": number
   - "noiseFilteredPercent": number (estimated percentage of noise eliminated, 40-90)
   - "timeSavedMinutes": number (estimated reading time saved, e.g. 10-25)
   - "sentiment": string (vibe description, e.g. "Focused Sprint Tension", "Productive Calm")

Respond strictly with valid JSON. No conversational preamble, no markdown formatting outside of standard JSON, no trailing commas.
`;

/**
 * Validates a Gemini API Key with a lightweight ping
 */
export async function validateGeminiApiKey(apiKey, model = "gemini-2.0-flash") {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("API key is empty.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [{ parts: [{ text: "Respond with single word: OK" }] }],
      generationConfig: { maxOutputTokens: 5, temperature: 0.1 }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `HTTP ${response.status} ${response.statusText}`;
    throw new Error(`Gemini API Error: ${message}`);
  }

  return true;
}

/**
 * Analyzes conversation text using Google Gemini
 */
export async function analyzeWithGemini(rawText, apiKey, model = "gemini-2.0-flash") {
  if (!apiKey || !apiKey.trim()) {
    throw new Error("Missing Gemini API Key. Please configure your key in Settings.");
  }

  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${encodeURIComponent(apiKey.trim())}`;

  const userPrompt = `
Analyze this college group conversation transcript:

--- CHAT START ---
${rawText}
--- CHAT END ---

Return the comprehensive intelligence report strictly in JSON format as specified.
`;

  const response = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      contents: [
        {
          role: "user",
          parts: [{ text: `${GEMINI_SYSTEM_PROMPT}\n\n${userPrompt}` }]
        }
      ],
      generationConfig: {
        responseMimeType: "application/json",
        temperature: 0.2,
        maxOutputTokens: 2500
      }
    })
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    const message = errorData?.error?.message || `HTTP ${response.status}: ${response.statusText}`;
    throw new Error(`Gemini API Error: ${message}`);
  }

  const data = await response.json();
  const rawResponseText = data?.candidates?.[0]?.content?.parts?.[0]?.text;

  if (!rawResponseText) {
    throw new Error("Gemini returned an empty response. Please verify the prompt and model.");
  }

  // Parse JSON, cleaning code blocks if model included them
  let cleanedJson = rawResponseText.trim();
  if (cleanedJson.startsWith("```json")) {
    cleanedJson = cleanedJson.replace(/^```json\s*/, "").replace(/```$/, "").trim();
  } else if (cleanedJson.startsWith("```")) {
    cleanedJson = cleanedJson.replace(/^```\s*/, "").replace(/```$/, "").trim();
  }

  try {
    const parsedData = JSON.parse(cleanedJson);

    // Ensure all mandatory fields exist
    return {
      summary: parsedData.summary || "Summary generation completed.",
      keyTakeaways: Array.isArray(parsedData.keyTakeaways) ? parsedData.keyTakeaways : [],
      urgencyLevel: parsedData.urgencyLevel || "normal",
      urgentMessages: Array.isArray(parsedData.urgentMessages) ? parsedData.urgentMessages : [],
      tasks: (Array.isArray(parsedData.tasks) ? parsedData.tasks : []).map((t, idx) => ({
        ...t,
        id: t.id || `gemini-task-${idx}`,
        completed: Boolean(t.completed)
      })),
      deadlines: Array.isArray(parsedData.deadlines) ? parsedData.deadlines : [],
      decisions: Array.isArray(parsedData.decisions) ? parsedData.decisions : [],
      participants: Array.isArray(parsedData.participants) ? parsedData.participants : [],
      stats: {
        totalMessages: parsedData.stats?.totalMessages || rawText.split("\n").filter(Boolean).length,
        noiseFilteredPercent: parsedData.stats?.noiseFilteredPercent || 75,
        timeSavedMinutes: parsedData.stats?.timeSavedMinutes || 15,
        sentiment: parsedData.stats?.sentiment || "Active Collaboration"
      },
      isDemoMode: false,
      engine: "gemini-api",
      engineName: `Google Gemini AI (${model})`,
      engineBadge: `🤖 Live Gemini AI (${model})`,
      privacyGuarantee: "Processed via Google Gemini Generative Language API directly from your browser.",
      timestamp: new Date().toLocaleTimeString()
    };
  } catch (err) {
    console.error("JSON parse error from Gemini output:", cleanedJson);
    throw new Error(`Failed to parse AI response as JSON: ${err.message}. Raw output snippet: ${cleanedJson.substring(0, 100)}...`);
  }
}
