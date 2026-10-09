// Automated test script for CatchUp AI local parser and export utilities
import { analyzeConversationLocally, parseRawChatLines } from "./src/utils/localParser.js";
import { SAMPLE_CHATS } from "./src/data/sampleChats.js";
import { generateMarkdownReport, generatePlainTextReport, generateIcsCalendar } from "./src/utils/exportUtils.js";

console.log("=== Testing CatchUp AI Engine ===");

// 1. Test parsing of all 4 sample chats
SAMPLE_CHATS.forEach(sample => {
  console.log(`\nTesting Sample: "${sample.title}" (${sample.category})`);
  const analysis = analyzeConversationLocally(sample.rawText);
  console.log(`- Summary: ${analysis.summary.substring(0, 80)}...`);
  console.log(`- Urgent alerts detected: ${analysis.urgentMessages?.length || 0}`);
  console.log(`- Action items extracted: ${analysis.tasks?.length || 0}`);
  console.log(`- Deadlines detected: ${analysis.deadlines?.length || 0}`);
  console.log(`- Key decisions: ${analysis.decisions?.length || 0}`);
  console.log(`- Engine: ${analysis.engineBadge}`);
  if (!analysis.summary || !analysis.tasks || analysis.tasks.length === 0) {
    throw new Error(`Failed to extract tasks for sample ${sample.title}`);
  }
});

// 2. Test an arbitrary custom conversation that is NOT one of the samples
console.log("\nTesting Arbitrary Custom Conversation Parsing...");
const customChat = `
[03:00 PM, 10/12/2026] Ankit: Guys urgent, Prof. David moved our lab exam to tomorrow 9:00 AM in Hall 4!
[03:02 PM, 10/12/2026] Riya: Wait what? That is crazy!
[03:03 PM, 10/12/2026] Kunal: Need to prepare the cheat sheet and review chapter 4.
[03:05 PM, 10/12/2026] Ankit: Kunal: Please print 5 copies of the formula sheet before 8 PM tonight.
[03:06 PM, 10/12/2026] Riya: DECISION: We meet at the central library at 7:00 PM for group study.
[03:07 PM, 10/12/2026] Kunal: Agreed, see you guys there.
`;

const customAnalysis = analyzeConversationLocally(customChat);
console.log(`- Custom Summary: ${customAnalysis.summary.substring(0, 80)}...`);
console.log(`- Urgent Count: ${customAnalysis.urgentMessages.length}`);
console.log(`- Tasks Count: ${customAnalysis.tasks.length}`);
console.log(`- Deadlines: ${customAnalysis.deadlines.length}`);
console.log(`- Decisions: ${customAnalysis.decisions.length}`);

// 3. Test export generation
console.log("\nTesting Export Report Generators...");
const md = generateMarkdownReport(customAnalysis, "Custom Chat Test");
const txt = generatePlainTextReport(customAnalysis, "Custom Chat Test");
const ics = generateIcsCalendar(customAnalysis.deadlines, "Exam Deadlines");

console.log(`- Markdown length: ${md.length} chars`);
console.log(`- Plain text length: ${txt.length} chars`);
console.log(`- ICS calendar length: ${ics.length} chars`);

if (!md.includes("Quick Overview") || !ics.includes("BEGIN:VCALENDAR")) {
  throw new Error("Export formatting test failed!");
}

console.log("\n✅ ALL ENGINE TESTS PASSED SUCCESSFULLY!");
