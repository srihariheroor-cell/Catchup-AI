import React from "react";
import { ShieldCheck, Lock, EyeOff, ServerOff, Cpu, Sparkles, X, Check } from "lucide-react";

export default function PrivacyModal({ isOpen, onClose, isRealAiActive, onSwitchToDemo }) {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "640px" }}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{
              width: "34px",
              height: "34px",
              borderRadius: "8px",
              background: "rgba(16, 185, 129, 0.15)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#34D399"
            }}>
              <ShieldCheck size={20} />
            </div>
            <div>
              <h2 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#F8FAFC" }}>Privacy & Data Security Policy</h2>
              <p style={{ fontSize: "0.75rem", color: "#94A3B8" }}>Transparent explanation of where your messages are processed</p>
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
          {/* Active Mode Notice Banner */}
          <div style={{
            background: isRealAiActive ? "rgba(139, 92, 246, 0.1)" : "rgba(16, 185, 129, 0.1)",
            border: `1px solid ${isRealAiActive ? "rgba(139, 92, 246, 0.3)" : "rgba(16, 185, 129, 0.3)"}`,
            borderRadius: "10px",
            padding: "1rem",
            display: "flex",
            alignItems: "flex-start",
            gap: "0.75rem"
          }}>
            {isRealAiActive ? <Sparkles size={20} color="#C4B5FD" /> : <Lock size={20} color="#34D399" />}
            <div>
              <div style={{ fontSize: "0.9rem", fontWeight: 700, color: isRealAiActive ? "#C4B5FD" : "#6EE7B7", marginBottom: "0.25rem" }}>
                Current Engine: {isRealAiActive ? "External AI Mode (Google Gemini)" : "Local Heuristic Engine (100% Private Demo Mode)"}
              </div>
              <p style={{ fontSize: "0.825rem", color: "#CBD5E1", lineHeight: 1.5 }}>
                {isRealAiActive
                  ? "You have configured a Gemini API key. Your conversation is sent directly from your browser to Google's Generative Language API over encrypted HTTPS. No third-party proxy is involved."
                  : "All chat parsing, noise filtering, and task extraction runs 100% locally inside your browser's JavaScript runtime. Absolutely ZERO bytes of your conversation leave this machine."}
              </p>
            </div>
          </div>

          {/* Privacy Guarantees */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.85rem" }}>
            <div style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              padding: "0.85rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#67E8F9", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.85rem" }}>
                <ServerOff size={16} />
                <span>Zero Backend Storage</span>
              </div>
              <p style={{ fontSize: "0.775rem", color: "#94A3B8" }}>
                CatchUp AI has no backend server or database. Conversations exist only in memory during your active browser tab session.
              </p>
            </div>

            <div style={{
              background: "rgba(15, 23, 42, 0.6)",
              border: "1px solid rgba(255, 255, 255, 0.06)",
              borderRadius: "10px",
              padding: "0.85rem"
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", color: "#A78BFA", marginBottom: "0.4rem", fontWeight: 600, fontSize: "0.85rem" }}>
                <EyeOff size={16} />
                <span>Keys in LocalStorage</span>
              </div>
              <p style={{ fontSize: "0.775rem", color: "#94A3B8" }}>
                If you provide an API key, it is saved exclusively in your browser's private localStorage and never transmitted to our repo or developers.
              </p>
            </div>
          </div>

          {/* Mode Comparison Table */}
          <div>
            <h3 style={{ fontSize: "0.85rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em", marginBottom: "0.5rem" }}>
              Engine Comparison Matrix
            </h3>
            <div style={{
              border: "1px solid rgba(255, 255, 255, 0.08)",
              borderRadius: "10px",
              overflow: "hidden",
              fontSize: "0.8rem"
            }}>
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.4fr", background: "rgba(255, 255, 255, 0.03)", padding: "0.6rem 0.8rem", fontWeight: 700, borderBottom: "1px solid rgba(255, 255, 255, 0.08)" }}>
                <div>Feature</div>
                <div>Local Heuristic</div>
                <div>Gemini AI</div>
              </div>
              
              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.4fr", padding: "0.6rem 0.8rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", color: "#CBD5E1" }}>
                <div>Data Transmission</div>
                <div style={{ color: "#34D399" }}>0% (stays on device)</div>
                <div style={{ color: "#FBBF24" }}>Sent to Google API</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.4fr", padding: "0.6rem 0.8rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", color: "#CBD5E1" }}>
                <div>API Key Required</div>
                <div style={{ color: "#34D399" }}>No (Free forever)</div>
                <div style={{ color: "#FBBF24" }}>Yes (User key)</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.4fr", padding: "0.6rem 0.8rem", borderBottom: "1px solid rgba(255, 255, 255, 0.05)", color: "#CBD5E1" }}>
                <div>Processing Speed</div>
                <div style={{ color: "#34D399" }}>Instant (~50ms)</div>
                <div style={{ color: "#CBD5E1" }}>~1-3 seconds</div>
              </div>

              <div style={{ display: "grid", gridTemplateColumns: "1.4fr 1.2fr 1.4fr", padding: "0.6rem 0.8rem", color: "#CBD5E1" }}>
                <div>Reasoning Depth</div>
                <div>Rule & Regex NLP</div>
                <div style={{ color: "#C4B5FD" }}>LLM Multi-turn reasoning</div>
              </div>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          {isRealAiActive && (
            <button
              onClick={() => {
                onSwitchToDemo();
                onClose();
              }}
              className="btn btn-outline btn-sm"
              style={{ color: "#FCA5A5", borderColor: "rgba(239, 68, 68, 0.3)" }}
            >
              Force Local Private Mode
            </button>
          )}
          <button onClick={onClose} className="btn btn-primary btn-sm">
            I Understand
          </button>
        </div>
      </div>
    </div>
  );
}
