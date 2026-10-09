import React, { useState, useEffect } from "react";
import Header from "./components/Header";
import InputSection from "./components/InputSection";
import Dashboard from "./components/Dashboard";
import SettingsModal from "./components/SettingsModal";
import PrivacyModal from "./components/PrivacyModal";
import TaskModal from "./components/TaskModal";
import Toast from "./components/Toast";
import { analyzeConversationLocally } from "./utils/localParser";
import { analyzeWithGemini } from "./utils/geminiApi";
import { SAMPLE_CHATS } from "./data/sampleChats";

const STORAGE_KEY_AI_CONFIG = "catchup_ai_config_v1";

export default function App() {
  // AI Engine Configuration from localStorage
  const [aiConfig, setAiConfig] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY_AI_CONFIG);
      if (saved) return JSON.parse(saved);
    } catch (e) {
      console.error("Failed to load saved config", e);
    }
    return {
      apiKey: "",
      useRealAi: false,
      model: "gemini-2.0-flash"
    };
  });

  // Application State
  const [inputText, setInputText] = useState("");
  const [selectedSampleId, setSelectedSampleId] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysis, setAnalysis] = useState(null);

  // Modals & UI
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPrivacyOpen, setIsPrivacyOpen] = useState(false);
  const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
  const [toast, setToast] = useState(null);

  // Save config changes to localStorage
  const handleSaveConfig = (newConfig) => {
    setAiConfig(newConfig);
    try {
      localStorage.setItem(STORAGE_KEY_AI_CONFIG, JSON.stringify(newConfig));
    } catch (e) {
      console.error("Failed to save config to localStorage", e);
    }
  };

  // Toast feedback helper
  const showToast = (toastObj) => {
    setToast(toastObj);
    setTimeout(() => {
      setToast((prev) => (prev === toastObj ? null : prev));
    }, 4000);
  };

  // Perform Analysis
  const handleAnalyze = async () => {
    if (!inputText || !inputText.trim()) {
      showToast({ type: "error", message: "Please enter or paste a conversation first." });
      return;
    }

    setIsAnalyzing(true);
    try {
      if (aiConfig.useRealAi && aiConfig.apiKey?.trim()) {
        // Real Gemini AI Mode
        try {
          const result = await analyzeWithGemini(inputText, aiConfig.apiKey, aiConfig.model);
          setAnalysis(result);
          showToast({ type: "success", message: `Analysis complete via Gemini AI (${aiConfig.model})!` });
        } catch (apiErr) {
          console.warn("Gemini API call failed, offering local fallback", apiErr);
          showToast({
            type: "error",
            message: `Gemini API: ${apiErr.message}. Falling back to Local Heuristic Engine.`
          });
          // Graceful fallback to local heuristic engine
          const fallbackResult = analyzeConversationLocally(inputText);
          setAnalysis(fallbackResult);
        }
      } else {
        // Zero-Cloud Local Heuristic Engine (Demo Mode)
        // Add tiny artificial delay (400ms) for pleasant UI transition
        await new Promise(res => setTimeout(res, 400));
        const result = analyzeConversationLocally(inputText);
        setAnalysis(result);
        showToast({
          type: "success",
          message: "Conversation analyzed locally via Heuristic Engine (100% Private)!"
        });
      }
    } catch (err) {
      showToast({
        type: "error",
        message: err.message || "An unexpected error occurred during analysis."
      });
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Task Checkbox Toggle
  const handleToggleTask = (taskId) => {
    if (!analysis) return;
    setAnalysis(prev => {
      if (!prev) return prev;
      const updatedTasks = prev.tasks.map(t =>
        t.id === taskId ? { ...t, completed: !t.completed } : t
      );
      return { ...prev, tasks: updatedTasks };
    });
  };

  // Add Custom Task
  const handleAddTask = (newTask) => {
    if (!analysis) return;
    setAnalysis(prev => {
      if (!prev) return prev;
      return {
        ...prev,
        tasks: [newTask, ...(prev.tasks || [])]
      };
    });
    showToast({
      type: "success",
      message: `Added task: "${newTask.task}"`
    });
  };

  // Reset to start a new chat
  const handleReset = () => {
    setAnalysis(null);
    setInputText("");
    setSelectedSampleId(null);
    showToast({ type: "info", message: "Reset to new chat session." });
  };

  // Switch to demo mode from privacy modal
  const handleSwitchToDemo = () => {
    handleSaveConfig({ ...aiConfig, useRealAi: false });
    showToast({ type: "info", message: "Switched to 100% Private Local Demo Mode." });
  };

  // Default pre-fill with Capstone sample on initial mount for great first-time impression
  useEffect(() => {
    if (!inputText) {
      const defaultSample = SAMPLE_CHATS[0];
      setSelectedSampleId(defaultSample.id);
      setInputText(defaultSample.rawText);
    }
  }, []);

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      {/* App Header */}
      <Header
        aiConfig={aiConfig}
        onOpenSettings={() => setIsSettingsOpen(true)}
        onOpenPrivacy={() => setIsPrivacyOpen(true)}
        hasAnalysis={Boolean(analysis)}
        onReset={handleReset}
      />

      {/* Main Content Area */}
      <main className="container" style={{ flex: 1, padding: "2rem 1.5rem" }}>
        {/* Input Section (Always accessible, collapsed or full) */}
        <InputSection
          inputText={inputText}
          setInputText={setInputText}
          onAnalyze={handleAnalyze}
          isAnalyzing={isAnalyzing}
          selectedSampleId={selectedSampleId}
          setSelectedSampleId={setSelectedSampleId}
          isRealAiActive={aiConfig.useRealAi && Boolean(aiConfig.apiKey)}
          onShowToast={showToast}
        />

        {/* Intelligence Dashboard */}
        {analysis && (
          <Dashboard
            analysis={analysis}
            rawText={inputText}
            onOpenTaskModal={() => setIsTaskModalOpen(true)}
            onToggleTask={handleToggleTask}
            onShowToast={showToast}
          />
        )}
      </main>

      {/* Footer */}
      <footer style={{
        borderTop: "1px solid var(--border-subtle)",
        padding: "1.5rem 0",
        marginTop: "3rem",
        background: "rgba(7, 9, 14, 0.9)",
        fontSize: "0.8rem",
        color: "#64748B",
        textAlign: "center"
      }}>
        <div className="container" style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <strong>CatchUp AI</strong> — College Hackathon Edition 2026. Built with React & Vite.
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
            <button
              onClick={() => setIsPrivacyOpen(true)}
              style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "0.8rem" }}
            >
              Privacy & Local Processing Guarantee
            </button>
            <span>•</span>
            <button
              onClick={() => setIsSettingsOpen(true)}
              style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer", fontSize: "0.8rem" }}
            >
              Configure Gemini API
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        aiConfig={aiConfig}
        onSaveConfig={handleSaveConfig}
        onShowToast={showToast}
      />

      <PrivacyModal
        isOpen={isPrivacyOpen}
        onClose={() => setIsPrivacyOpen(false)}
        isRealAiActive={aiConfig.useRealAi && Boolean(aiConfig.apiKey)}
        onSwitchToDemo={handleSwitchToDemo}
      />

      <TaskModal
        isOpen={isTaskModalOpen}
        onClose={() => setIsTaskModalOpen(false)}
        onAddTask={handleAddTask}
      />

      {/* Toast Feedback */}
      <Toast toast={toast} onClose={() => setToast(null)} />
    </div>
  );
}
