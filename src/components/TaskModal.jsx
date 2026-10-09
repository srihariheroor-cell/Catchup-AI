import React, { useState } from "react";
import { PlusCircle, X } from "lucide-react";

export default function TaskModal({ isOpen, onClose, onAddTask }) {
  if (!isOpen) return null;

  const [taskText, setTaskText] = useState("");
  const [assignee, setAssignee] = useState("");
  const [deadline, setDeadline] = useState("");
  const [priority, setPriority] = useState("high");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!taskText.trim()) return;

    onAddTask({
      id: `task-manual-${Date.now()}`,
      task: taskText.trim(),
      assignee: assignee.trim() || "Unassigned",
      deadline: deadline.trim() || "Today",
      priority,
      completed: false
    });

    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-card" onClick={e => e.stopPropagation()} style={{ maxWidth: "480px" }}>
        <div className="modal-header">
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <PlusCircle size={20} className="text-emerald-400" />
            <h2 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#F8FAFC" }}>Add Action Item</h2>
          </div>
          <button
            onClick={onClose}
            style={{ background: "transparent", border: "none", color: "#94A3B8", cursor: "pointer" }}
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="modal-body" style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.4rem" }}>
                Task Description *
              </label>
              <input
                type="text"
                className="input-text"
                placeholder="e.g. Export final Figma slides for demo..."
                value={taskText}
                onChange={e => setTaskText(e.target.value)}
                autoFocus
                required
              />
            </div>

            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "0.75rem" }}>
              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.4rem" }}>
                  Assignee
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="e.g. Maya or Dev"
                  value={assignee}
                  onChange={e => setAssignee(e.target.value)}
                />
              </div>

              <div>
                <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.4rem" }}>
                  Deadline / Due
                </label>
                <input
                  type="text"
                  className="input-text"
                  placeholder="e.g. Today 4:00 PM"
                  value={deadline}
                  onChange={e => setDeadline(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, color: "#94A3B8", marginBottom: "0.4rem" }}>
                Priority Level
              </label>
              <select
                className="input-text"
                value={priority}
                onChange={e => setPriority(e.target.value)}
                style={{ cursor: "pointer" }}
              >
                <option value="critical">Critical (Showstopper)</option>
                <option value="high">High Priority</option>
                <option value="medium">Medium Priority</option>
                <option value="low">Low Priority</option>
              </select>
            </div>
          </div>

          <div className="modal-footer">
            <button type="button" onClick={onClose} className="btn btn-outline btn-sm">
              Cancel
            </button>
            <button type="submit" className="btn btn-primary btn-sm">
              Add Task
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
