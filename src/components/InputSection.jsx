import React, { useState, useRef } from "react";
import { Upload, FileText, Zap, Sparkles, Trash2, ArrowRight, CornerDownLeft, Info, HelpCircle } from "lucide-react";
import { SAMPLE_CHATS } from "../data/sampleChats";

export default function InputSection({
  inputText,
  setInputText,
  onAnalyze,
  isAnalyzing,
  selectedSampleId,
  setSelectedSampleId,
  isRealAiActive,
  onShowToast
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploadedFileName, setUploadedFileName] = useState(null);
  const fileInputRef = useRef(null);

  // File Upload Handlers
  const handleFileUpload = (file) => {
    if (!file) return;

    if (!file.name.endsWith(".txt") && file.type !== "text/plain") {
      onShowToast({
        type: "error",
        message: "Please upload a plain text (.txt) chat export file."
      });
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const content = e.target.result;
      setInputText(content);
      setUploadedFileName(file.name);
      setSelectedSampleId(null);
      onShowToast({
        type: "success",
        message: `Loaded "${file.name}" (${(content.length / 1024).toFixed(1)} KB)`
      });
    };
    reader.onerror = () => {
      onShowToast({
        type: "error",
        message: "Failed to read the uploaded file."
      });
    };
    reader.readAsText(file);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFileUpload(e.dataTransfer.files[0]);
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  // Load a preset sample
  const handleSelectSample = (sample) => {
    setSelectedSampleId(sample.id);
    setInputText(sample.rawText);
    setUploadedFileName(null);
    onShowToast({
      type: "info",
      message: `Loaded sample: "${sample.title}"`
    });
  };

  // Clear text
  const handleClear = () => {
    setInputText("");
    setSelectedSampleId(null);
    setUploadedFileName(null);
  };

  // Calculate metrics
  const linesCount = inputText ? inputText.split("\n").filter(l => l.trim().length > 0).length : 0;
  const charCount = inputText ? inputText.length : 0;
  const wordCount = inputText ? inputText.trim().split(/\s+/).length : 0;

  return (
    <section style={{ marginBottom: "2.5rem" }}>
      {/* Hero Headline */}
      <div style={{ textAlign: "center", maxWidth: "780px", margin: "0 auto 2rem auto" }}>
        <div style={{
          display: "inline-flex",
          alignItems: "center",
          gap: "0.5rem",
          background: "rgba(139, 92, 246, 0.12)",
          border: "1px solid rgba(139, 92, 246, 0.3)",
          padding: "0.35rem 0.9rem",
          borderRadius: "9999px",
          fontSize: "0.8rem",
          fontWeight: 600,
          color: "#C4B5FD",
          marginBottom: "1rem"
        }}>
          <Zap size={14} className="text-amber-400" />
          <span>Stop drowning in 200+ unread college group chats</span>
        </div>

        <h1 style={{
          fontSize: "2.5rem",
          fontWeight: 800,
          letterSpacing: "-0.03em",
          lineHeight: 1.2,
          marginBottom: "0.85rem"
        }}>
          Paste Chat. Click Catch Me Up.{" "}
          <span className="text-gradient-purple">Know Everything.</span>
        </h1>

        <p style={{ fontSize: "1.05rem", color: "#94A3B8", lineHeight: 1.6 }}>
          CatchUp AI isolates urgent announcements, pending action items with assigned owners, deadlines, and decisions from raw WhatsApp, Slack, and Discord chaos.
        </p>
      </div>

      {/* Realistic College Samples Bar */}
      <div style={{ marginBottom: "1.25rem" }}>
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.6rem",
          flexWrap: "wrap",
          gap: "0.5rem"
        }}>
          <span style={{ fontSize: "0.825rem", fontWeight: 700, color: "#94A3B8", textTransform: "uppercase", letterSpacing: "0.05em" }}>
            💡 Realistic College Scenarios (1-Click Demo)
          </span>
          <span style={{ fontSize: "0.75rem", color: "#64748B" }}>
            Click any scenario to load sample group chat
          </span>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
          gap: "0.75rem"
        }}>
          {SAMPLE_CHATS.map((sample) => {
            const isSelected = selectedSampleId === sample.id;
            return (
              <button
                key={sample.id}
                type="button"
                onClick={() => handleSelectSample(sample)}
                style={{
                  background: isSelected ? "rgba(139, 92, 246, 0.2)" : "var(--bg-surface-glass)",
                  border: isSelected ? "1px solid var(--accent-purple)" : "1px solid var(--border-subtle)",
                  borderRadius: "12px",
                  padding: "0.85rem 1rem",
                  textAlign: "left",
                  cursor: "pointer",
                  transition: "all 0.2s ease",
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.3rem",
                  boxShadow: isSelected ? "0 0 15px rgba(139, 92, 246, 0.3)" : "none"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                  <span style={{ fontSize: "0.875rem", fontWeight: 700, color: isSelected ? "#FFFFFF" : "#E2E8F0" }}>
                    {sample.title}
                  </span>
                  <span className="badge badge-purple" style={{ fontSize: "0.65rem" }}>
                    {sample.category}
                  </span>
                </div>
                <p style={{ fontSize: "0.75rem", color: "#94A3B8", lineHeight: 1.4 }}>
                  {sample.tagline}
                </p>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Input Panel */}
      <div className="glass-panel" style={{ padding: "1.5rem", borderRadius: "16px" }}>
        {/* Drop zone / File upload toolbar */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginBottom: "0.85rem",
          flexWrap: "wrap",
          gap: "0.75rem"
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.9rem", fontWeight: 700, color: "#F8FAFC" }}>
              Conversation Log Transcript
            </span>
            {uploadedFileName && (
              <span className="badge badge-cyan" style={{ fontSize: "0.75rem" }}>
                <FileText size={12} />
                {uploadedFileName}
              </span>
            )}
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <input
              type="file"
              ref={fileInputRef}
              accept=".txt,text/plain"
              style={{ display: "none" }}
              onChange={e => e.target.files && handleFileUpload(e.target.files[0])}
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="btn btn-outline btn-sm"
              title="Upload WhatsApp or Discord export .txt file"
            >
              <Upload size={14} />
              <span>Upload .txt File</span>
            </button>

            {inputText && (
              <button
                type="button"
                onClick={handleClear}
                className="btn btn-outline btn-sm"
                title="Clear input text"
                style={{ color: "#F87171" }}
              >
                <Trash2 size={14} />
                <span>Clear</span>
              </button>
            )}
          </div>
        </div>

        {/* Textarea with Drag and Drop Support */}
        <div
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          style={{
            position: "relative",
            border: isDragging ? "2px dashed var(--accent-purple)" : "none",
            borderRadius: "10px",
            transition: "all 0.2s ease"
          }}
        >
          <textarea
            className="input-textarea"
            rows={10}
            placeholder={`Paste conversation messages here... (WhatsApp export format, Discord, Slack, or plain "Person: message")

Example format:
[10:14 AM, 10/09/2026] Alex: Submission portal closes at 11:59 PM tonight!
[10:15 AM, 10/09/2026] Maya: Dev, please fix the backend bug before 3 PM.
[10:16 AM, 10/09/2026] Dev: Will do, on it now.`}
            value={inputText}
            onChange={e => {
              setInputText(e.target.value);
              setSelectedSampleId(null);
            }}
            style={{ width: "100%", minHeight: "220px", display: "block" }}
          />

          {isDragging && (
            <div style={{
              position: "absolute",
              inset: 0,
              background: "rgba(139, 92, 246, 0.2)",
              backdropFilter: "blur(4px)",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "0.5rem",
              fontSize: "1.1rem",
              fontWeight: 700,
              color: "#FFFFFF",
              pointerEvents: "none"
            }}>
              <Upload size={24} />
              Drop .txt file to load transcript
            </div>
          )}
        </div>

        {/* Bottom Bar: Stats + Primary Action */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          marginTop: "1rem",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          {/* Metadata counters */}
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", fontSize: "0.8rem", color: "#94A3B8" }}>
            <span>
              <strong style={{ color: "#E2E8F0" }}>{linesCount}</strong> lines
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: "#E2E8F0" }}>{wordCount}</strong> words
            </span>
            <span>•</span>
            <span>
              <strong style={{ color: "#E2E8F0" }}>{charCount.toLocaleString()}</strong> chars
            </span>
          </div>

          {/* Big Action CTA */}
          <button
            type="button"
            onClick={onAnalyze}
            disabled={isAnalyzing || !inputText.trim()}
            className="btn btn-primary btn-lg"
            style={{
              padding: "0.85rem 2rem",
              fontSize: "1.05rem",
              fontWeight: 700,
              letterSpacing: "-0.01em"
            }}
          >
            {isAnalyzing ? (
              <>
                <div className="spinner" style={{ width: "18px", height: "18px", border: "2px solid rgba(255,255,255,0.3)", borderTopColor: "#fff", borderRadius: "50%" }} />
                <span>Analyzing Conversation...</span>
              </>
            ) : (
              <>
                {isRealAiActive ? <Sparkles size={18} /> : <Zap size={18} />}
                <span>Catch Me Up</span>
                <ArrowRight size={18} />
              </>
            )}
          </button>
        </div>
      </div>
    </section>
  );
}
