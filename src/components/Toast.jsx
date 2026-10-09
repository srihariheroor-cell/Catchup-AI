import React from "react";
import { CheckCircle2, AlertCircle, Info, X } from "lucide-react";

export default function Toast({ toast, onClose }) {
  if (!toast) return null;

  const icons = {
    success: <CheckCircle2 size={18} className="text-emerald-400" />,
    error: <AlertCircle size={18} className="text-rose-400" />,
    info: <Info size={18} className="text-cyan-400" />
  };

  const bgStyles = {
    success: "rgba(16, 185, 129, 0.15)",
    error: "rgba(239, 68, 68, 0.15)",
    info: "rgba(6, 182, 212, 0.15)"
  };

  const borderStyles = {
    success: "rgba(16, 185, 129, 0.35)",
    error: "rgba(239, 68, 68, 0.35)",
    info: "rgba(6, 182, 212, 0.35)"
  };

  return (
    <div
      style={{
        position: "fixed",
        bottom: "1.5rem",
        right: "1.5rem",
        zIndex: 9999,
        background: "#0F172A",
        border: `1px solid ${borderStyles[toast.type] || borderStyles.info}`,
        boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.6), 0 0 15px rgba(139, 92, 246, 0.2)",
        borderRadius: "12px",
        padding: "0.85rem 1.25rem",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        minWidth: "280px",
        maxWidth: "420px",
        animation: "scaleUp 0.2s cubic-bezier(0.16, 1, 0.3, 1)"
      }}
    >
      <div style={{ flexShrink: 0 }}>
        {icons[toast.type] || icons.info}
      </div>
      <div style={{ flex: 1, fontSize: "0.875rem", color: "#F8FAFC", fontWeight: 500 }}>
        {toast.message}
      </div>
      <button
        onClick={onClose}
        style={{
          background: "transparent",
          border: "none",
          color: "#94A3B8",
          cursor: "pointer",
          padding: "2px",
          display: "flex",
          alignItems: "center"
        }}
        aria-label="Close notification"
      >
        <X size={16} />
      </button>
    </div>
  );
}
