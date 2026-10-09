import React, { useState } from "react";
import { Settings, Sparkles, Cpu, Eye, EyeOff, Check, AlertCircle, X, ShieldAlert, Key } from "lucide-react";
import { validateGeminiApiKey } from "../utils/geminiApi";

export default function SettingsModal({
  isOpen,
  onClose,
  aiConfig,
  onSaveConfig,
  onShowToast
}) {
  if (!isOpen) return null;

  const [apiKey, setApiKey] = useState(aiConfig.apiKey || "");
  const [useRealAi, setUseRealAi] = useState(aiConfig.useRealAi || false);
  const [model, setModel] = useState(aiConfig.model || "gemini-2.0-flash");
  const [showKey, setShowKey] = useState(false);
  const [isTesting, setIsTesting] = useState(false);
  const [testStatus, setTestStatus] = useState(null); // { success: boolean, message: string }

  const handleTestKey = async () => {
    if (!apiKey.trim()) {
      setTestStatus({ success: false, message: "Please enter an API key first." });
      return;
    }

    setIsTesting(true);
    setTestStatus(null);
    try {
      await validateGeminiApiKey(apiKey.trim(), model);
      setTestStatus({ success: true, message: "API Key verified successfully! Connection established." });
    } catch (err) {
      setTestStatus({ success: false, message: err.message || "Failed to validate API key." });
    } finally {
      setIsTesting(false);
    }
  };

  const handleSave = () => {
    if (useRealAi && !apiKey.trim()) {
      setTestStatus({ success: false, message: "Cannot enable Real AI without an API key. Either paste a key or switch to Demo Mode." });
      return;
    }

    onSaveConfig({
      apiKey: apiKey.trim(),
      useRealAi,
      model
    });

    onShowToast({
      type: "success",
      message: useRealAi ? `Configured Live Gemini AI (${model})` : "Switched to Local Heuristic Demo Mode"
    });

    onClose();
  };

  const handleClearKey = () => {
    setApiKey("");
    setUseRealAi(false);
    setTestStatus(null);
    onSaveConfig({
      apiKey: "",
      useRealAi: false,
      model
    });
    onShowToast({
      type: "info",
      message: "API Key cleared. Now using Local Demo Mode."
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "rgba(139, 92, 246, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#C4B5FD"
            }}>
              <Settings size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F8FAFC" }}>AI & Engine Settings</h2>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Choose between Local Heuristic Demo Mode or Live Gemini AI</p>
            </div>
          </div>
          <button
            onClick={onClose}
            style={{
              background: "transparent",
              border: "none",
              color: "#94A3B8",
              cursor: "pointer",
              padding: "4px"
            }}
          >
            <X size={20} />
          </button>
        </div>

        <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          {/* Engine Selector Segmented Control */}
          <div>
            <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.5rem" }}>
              Analysis Engine Mode
            </label>
            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "0.5rem",
              background: "var(--bg-input)",
              padding: "0.25rem",
              borderRadius: "10px",
              border: "1px solid var(--border-medium)"
            }}>
              <button
                type="button"
                onClick={() => setUseRealAi(false)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: !useRealAi ? "linear-gradient(135deg, #06B6D4 0%, #0891B2 100%)" : "transparent",
                  color: !useRealAi ? "#FFFFFF" : "#94A3B8",
                  transition: "all 0.2s ease"
                }}
              >
                <Cpu size={16} />
                <span>Demo (Local Heuristic)</span>
              </button>

              <button
                type="button"
                onClick={() => setUseRealAi(true)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "0.5rem",
                  padding: "0.6rem",
                  borderRadius: "8px",
                  fontSize: "0.85rem",
                  fontWeight: 600,
                  border: "none",
                  cursor: "pointer",
                  background: useRealAi ? "linear-gradient(135deg, var(--accent-purple) 0%, #6D28D9 100%)" : "transparent",
                  color: useRealAi ? "#FFFFFF" : "#94A3B8",
                  transition: "all 0.2s ease"
                }}
              >
                <Sparkles size={16} />
                <span>Live Gemini AI</span>
              </button>
            </div>
          </div>

          {/* Real AI API Key Input */}
          {useRealAi ? (
            <div style={{
              background: "rgba(139, 92, 246, 0.05)",
              border: "1px solid rgba(139, 92, 246, 0.25)",
              borderRadius: "12px",
              padding: "1rem",
              display: "flex",
              flexDirection: "column",
              gap: "1rem"
            }}>
              <div>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "0.4rem" }}>
                  <label style={{ fontSize: "0.825rem", fontWeight: 600, color: "#C4B5FD", display: "flex", alignItems: "center", gap: "0.4rem" }}>
                    <Key size={14} />
                    <span>Google Gemini API Key</span>
                  </label>
                  <a
                    href="https://aistudio.google.com/app/apikey"
                    target="_blank"
                    rel="noreferrer"
                    style={{ fontSize: "0.75rem", color: "#67E8F9", textDecoration: "underline" }}
                  >
                    Get Free Key ↗
                  </a>
                </div>
                <div style={{ position: "relative" }}>
                  <input
                    type={showKey ? "text" : "password"}
                    className="input-text"
                    placeholder="AIzaSy..."
                    value={apiKey}
                    onChange={e => {
                      setApiKey(e.target.value);
                      setTestStatus(null);
                    }}
                    style={{ paddingRight: "2.5rem", fontFamily: "var(--font-mono)", fontSize: "0.85rem" }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowKey(!showKey)}
                    style={{
                      position: "absolute",
                      right: "0.75rem",
                      top: "50%",
                      transform: "translateY(-50%)",
                      background: "transparent",
                      border: "none",
                      color: "#94A3B8",
                      cursor: "pointer"
                    }}
                  >
                    {showKey ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
                <p style={{ fontSize: "0.725rem", color: "#94A3B8", marginTop: "0.35rem" }}>
                  Stored strictly in your browser's localStorage. Never sent to any third-party server.
                </p>
              </div>

              {/* Model selection */}
              <div>
                <label style={{ display: "block", fontSize: "0.825rem", fontWeight: 600, color: "#C4B5FD", marginBottom: "0.4rem" }}>
                  Gemini Model
                </label>
                <select
                  value={model}
                  onChange={e => setModel(e.target.value)}
                  className="input-text"
                  style={{ cursor: "pointer" }}
                >
                  <option value="gemini-2.0-flash">Gemini 2.0 Flash (Fastest & Best for Hackathon Demo)</option>
                  <option value="gemini-1.5-flash">Gemini 1.5 Flash (Standard General Purpose)</option>
                </select>
              </div>

              {/* Validation Status message */}
              {testStatus && (
                <div style={{
                  padding: "0.6rem 0.8rem",
                  borderRadius: "8px",
                  fontSize: "0.8rem",
                  display: "flex",
                  alignItems: "center",
                  gap: "0.5rem",
                  background: testStatus.success ? "rgba(16, 185, 129, 0.15)" : "rgba(239, 68, 68, 0.15)",
                  color: testStatus.success ? "#6EE7B7" : "#FCA5A5",
                  border: `1px solid ${testStatus.success ? "rgba(16, 185, 129, 0.3)" : "rgba(239, 68, 68, 0.3)"}`
                }}>
                  {testStatus.success ? <Check size={16} /> : <AlertCircle size={16} />}
                  <span>{testStatus.message}</span>
                </div>
              )}

              {/* Test Button & Clear Button */}
              <div style={{ display: "flex", gap: "0.5rem" }}>
                <button
                  type="button"
                  onClick={handleTestKey}
                  disabled={isTesting || !apiKey.trim()}
                  className="btn btn-secondary btn-sm"
                  style={{ flex: 1 }}
                >
                  {isTesting ? "Validating Connection..." : "Test Connection"}
                </button>
                {apiKey && (
                  <button
                    type="button"
                    onClick={handleClearKey}
                    className="btn btn-outline btn-sm"
                    style={{ color: "#F87171" }}
                  >
                    Clear Key
                  </button>
                )}
              </div>
            </div>
          ) : (
            <div style={{
              background: "rgba(6, 182, 212, 0.05)",
              border: "1px solid rgba(6, 182, 212, 0.2)",
              borderRadius: "12px",
              padding: "1rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#67E8F9", fontWeight: 700, fontSize: "0.9rem", marginBottom: "0.4rem" }}>
                <Cpu size={18} />
                <span>Zero-Config Demo Mode Active</span>
              </div>
              <p style={{ fontSize: "0.825rem", color: "#94A3B8", lineHeight: 1.5 }}>
                In Demo Mode, CatchUp AI uses its built-in rule-based NLP heuristic engine. You can paste any conversation or test pre-loaded college scenarios without providing an API key or incurring any API costs.
              </p>
            </div>
          )}
        </div>

        <div className="modal-footer">
          <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
            Cancel
          </button>
          <button type="button" onClick={handleSave} className="btn btn-primary btn-sm">
            Save Configuration
          </button>
        </div>
      </div>
    </div>
  );
}
