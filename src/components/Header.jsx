import React from "react";
import { MessageSquareText, ShieldCheck, Cpu, Settings, Sparkles, RefreshCw } from "lucide-react";

export default function Header({
  aiConfig,
  onOpenSettings,
  onOpenPrivacy,
  hasAnalysis,
  onReset
}) {
  const isAiActive = aiConfig.useRealAi && aiConfig.apiKey;

  return (
    <header className="app-header">
      <div className="container header-content">
        {/* Brand */}
        <div className="logo-group" onClick={onReset} title="Click to restart / new conversation">
          <div className="logo-icon-wrapper">
            <MessageSquareText size={22} color="#FFFFFF" />
          </div>
          <div className="logo-text">
            <h1>
              CatchUp <span className="text-gradient-purple">AI</span>
              <span className="badge badge-purple" style={{ fontSize: "0.65rem", padding: "0.15rem 0.45rem" }}>
                Hackathon 2026
              </span>
            </h1>
            <p>What Did I Miss? — Instant Group Chat Intelligence</p>
          </div>
        </div>

        {/* Engine status & Quick controls */}
        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", flexWrap: "wrap" }}>
          {/* Privacy badge */}
          <button
            onClick={onOpenPrivacy}
            className="btn btn-outline btn-sm"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: "rgba(16, 185, 129, 0.08)",
              borderColor: "rgba(16, 185, 129, 0.25)",
              color: "#6EE7B7"
            }}
            title="Click to view full privacy and data flow disclosure"
          >
            <ShieldCheck size={14} />
            <span>Privacy Shield Active</span>
          </button>

          {/* Engine Mode Pill */}
          <button
            onClick={onOpenSettings}
            className="btn btn-outline btn-sm"
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.4rem",
              background: isAiActive ? "rgba(139, 92, 246, 0.12)" : "rgba(6, 182, 212, 0.12)",
              borderColor: isAiActive ? "rgba(139, 92, 246, 0.35)" : "rgba(6, 182, 212, 0.35)",
              color: isAiActive ? "#C4B5FD" : "#67E8F9"
            }}
            title="Configure AI API Key or switch between Demo & Live AI"
          >
            {isAiActive ? <Sparkles size={14} /> : <Cpu size={14} />}
            <span>
              {isAiActive ? `Live Gemini (${aiConfig.model.replace("gemini-", "")})` : "Local Heuristic Engine (Demo)"}
            </span>
          </button>

          {/* Settings button */}
          <button
            onClick={onOpenSettings}
            className="btn btn-secondary btn-sm"
            title="Settings & API Key"
          >
            <Settings size={15} />
            <span style={{ display: "none", "@media(min-width: 640px)": { display: "inline" } }}>
              Configure AI
            </span>
          </button>

          {/* Reset button if active */}
          {hasAnalysis && (
            <button
              onClick={onReset}
              className="btn btn-outline btn-sm"
              title="Start a new chat summary"
            >
              <RefreshCw size={14} />
              <span>New Chat</span>
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
