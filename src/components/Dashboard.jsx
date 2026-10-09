import React, { useState } from "react";
import {
  Clock, ShieldAlert, CheckSquare, Calendar, Scale, MessageSquare,
  Download, Copy, Check, Plus, AlertTriangle, User, CalendarDays,
  Sparkles, Cpu, Flame, Volume2, VolumeX, Search, Share2, FileDown
} from "lucide-react";
import confetti from "canvas-confetti";
import {
  generateMarkdownReport,
  generatePlainTextReport,
  generateIcsCalendar,
  downloadFile
} from "../utils/exportUtils";

export default function Dashboard({
  analysis,
  rawText,
  onOpenTaskModal,
  onToggleTask,
  onShowToast
}) {
  const [activeTab, setActiveTab] = useState("overview"); // overview | urgent | tasks | deadlines | decisions | transcript
  const [taskFilter, setTaskFilter] = useState("all"); // all | pending | completed
  const [assigneeFilter, setAssigneeFilter] = useState("all");
  const [transcriptSearch, setTranscriptSearch] = useState("");
  const [copied, setCopied] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);

  if (!analysis) return null;

  // Task metrics
  const allTasks = analysis.tasks || [];
  const completedTasksCount = allTasks.filter(t => t.completed).length;
  const pendingTasksCount = allTasks.filter(t => !t.completed).length;
  const taskProgressPercent = allTasks.length > 0 ? Math.round((completedTasksCount / allTasks.length) * 100) : 0;

  // Unique assignees for filter
  const uniqueAssignees = Array.from(new Set(allTasks.map(t => t.assignee).filter(Boolean)));

  // Filtered tasks
  const filteredTasks = allTasks.filter(task => {
    if (taskFilter === "pending" && task.completed) return false;
    if (taskFilter === "completed" && !task.completed) return false;
    if (assigneeFilter !== "all" && task.assignee !== assigneeFilter) return false;
    return true;
  });

  // Handle task completion toggle with confetti check
  const handleTaskCheck = (taskId) => {
    onToggleTask(taskId);
    // If checking off the last pending task, trigger celebratory confetti!
    const task = allTasks.find(t => t.id === taskId);
    if (task && !task.completed && pendingTasksCount === 1) {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
      onShowToast({
        type: "success",
        message: "🎉 Incredible! All action items completed!"
      });
    }
  };

  // Copy report
  const handleCopy = () => {
    const md = generateMarkdownReport(analysis);
    navigator.clipboard.writeText(md).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      onShowToast({
        type: "success",
        message: "Full summary copied to clipboard!"
      });
    });
  };

  // Downloads
  const handleDownloadMd = () => {
    const md = generateMarkdownReport(analysis);
    downloadFile(md, "catchup-ai-summary.md", "text/markdown");
    onShowToast({ type: "success", message: "Downloaded Markdown summary" });
  };

  const handleDownloadTxt = () => {
    const txt = generatePlainTextReport(analysis);
    downloadFile(txt, "catchup-ai-summary.txt", "text/plain");
    onShowToast({ type: "success", message: "Downloaded Plain Text summary" });
  };

  const handleDownloadJson = () => {
    const jsonStr = JSON.stringify(analysis, null, 2);
    downloadFile(jsonStr, "catchup-ai-analysis.json", "application/json");
    onShowToast({ type: "success", message: "Downloaded JSON dataset" });
  };

  const handleDownloadCalendar = () => {
    if (!analysis.deadlines || analysis.deadlines.length === 0) {
      onShowToast({ type: "info", message: "No calendar deadlines detected to export." });
      return;
    }
    const icsData = generateIcsCalendar(analysis.deadlines);
    downloadFile(icsData, "catchup-deadlines.ics", "text/calendar");
    onShowToast({ type: "success", message: "Downloaded .ics calendar file for Google / Apple Calendar" });
  };

  // Text to speech audio summary read aloud
  const handleToggleSpeak = () => {
    if (!window.speechSynthesis) {
      onShowToast({ type: "error", message: "Speech synthesis not supported in this browser." });
      return;
    }

    if (isSpeaking) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
    } else {
      const textToRead = `${analysis.summary}. Key urgent point: ${analysis.urgentMessages?.[0]?.content || "No critical showstoppers."}`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    }
  };

  // Transcript lines
  const transcriptLines = (rawText || "").split("\n").filter(l => l.trim().length > 0);
  const filteredTranscript = transcriptLines.filter(line => {
    if (!transcriptSearch.trim()) return true;
    return line.toLowerCase().includes(transcriptSearch.toLowerCase());
  });

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.5rem", animation: "fadeIn 0.3s ease-in-out" }}>
      {/* Top Intelligence Banner */}
      <div className="glass-panel" style={{ padding: "1.25rem 1.5rem", position: "relative", overflow: "hidden" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
            <div style={{
              width: "44px",
              height: "44px",
              borderRadius: "12px",
              background: analysis.isDemoMode
                ? "linear-gradient(135deg, rgba(6, 182, 212, 0.2) 0%, rgba(8, 145, 178, 0.4) 100%)"
                : "linear-gradient(135deg, rgba(139, 92, 246, 0.2) 0%, rgba(109, 40, 217, 0.4) 100%)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: analysis.isDemoMode ? "#67E8F9" : "#C4B5FD",
              border: `1px solid ${analysis.isDemoMode ? "rgba(6, 182, 212, 0.3)" : "rgba(139, 92, 246, 0.3)"}`
            }}>
              {analysis.isDemoMode ? <Cpu size={22} /> : <Sparkles size={22} />}
            </div>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <h2 style={{ fontSize: "1.25rem", fontWeight: 800, color: "#FFFFFF" }}>
                  Executive Intelligence Dossier
                </h2>
                <span className={analysis.isDemoMode ? "badge badge-cyan" : "badge badge-purple"}>
                  {analysis.engineBadge}
                </span>
              </div>
              <p style={{ fontSize: "0.8rem", color: "#94A3B8" }}>
                {analysis.privacyGuarantee}
              </p>
            </div>
          </div>

          {/* Quick Actions */}
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <button
              onClick={handleToggleSpeak}
              className="btn btn-outline btn-sm"
              title={isSpeaking ? "Stop audio read aloud" : "Read summary aloud"}
            >
              {isSpeaking ? <VolumeX size={15} color="#F87171" /> : <Volume2 size={15} />}
              <span>{isSpeaking ? "Mute Voice" : "Listen (TTS)"}</span>
            </button>

            <button
              onClick={handleCopy}
              className="btn btn-secondary btn-sm"
              title="Copy markdown summary to clipboard"
            >
              {copied ? <Check size={15} color="#34D399" /> : <Copy size={15} />}
              <span>{copied ? "Copied!" : "Copy Summary"}</span>
            </button>
          </div>
        </div>
      </div>

      {/* KPI Stats Strip */}
      <div style={{
        display: "grid",
        gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
        gap: "1rem"
      }}>
        {/* Time Saved */}
        <div className="glass-panel" style={{ padding: "1.1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>Time Saved</span>
            <div style={{ color: "#34D399" }}><Clock size={18} /></div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FFFFFF" }}>
            ~{analysis.stats?.timeSavedMinutes || 15} <span style={{ fontSize: "0.9rem", color: "#94A3B8", fontWeight: 500 }}>mins</span>
          </div>
          <p style={{ fontSize: "0.75rem", color: "#6EE7B7", marginTop: "0.2rem" }}>
            Skipped manual scrolling
          </p>
        </div>

        {/* Noise Filtered */}
        <div className="glass-panel" style={{ padding: "1.1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>Noise Eliminated</span>
            <div style={{ color: "#67E8F9" }}><MessageSquare size={18} /></div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#67E8F9" }}>
            {analysis.stats?.noiseFilteredPercent || 75}%
          </div>
          <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.2rem" }}>
            {analysis.stats?.totalMessages || 0} messages parsed
          </p>
        </div>

        {/* Urgent Alerts */}
        <div className="glass-panel" style={{
          padding: "1.1rem",
          borderColor: (analysis.urgentMessages?.length || 0) > 0 ? "rgba(239, 68, 68, 0.3)" : "var(--border-subtle)"
        }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>Urgent Alerts</span>
            <div style={{ color: "#F87171" }}><ShieldAlert size={18} /></div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: (analysis.urgentMessages?.length || 0) > 0 ? "#F87171" : "#FFFFFF" }}>
            {analysis.urgentMessages?.length || 0}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#FCA5A5", marginTop: "0.2rem" }}>
            High-priority flags
          </p>
        </div>

        {/* Pending Tasks */}
        <div className="glass-panel" style={{ padding: "1.1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>Action Items</span>
            <div style={{ color: "#A78BFA" }}><CheckSquare size={18} /></div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#C4B5FD" }}>
            {pendingTasksCount} <span style={{ fontSize: "0.9rem", color: "#94A3B8", fontWeight: 500 }}>pending ({completedTasksCount} done)</span>
          </div>
          <div style={{
            height: "4px",
            background: "rgba(255, 255, 255, 0.1)",
            borderRadius: "2px",
            marginTop: "0.4rem",
            overflow: "hidden"
          }}>
            <div style={{ width: `${taskProgressPercent}%`, height: "100%", background: "#10B981", transition: "width 0.3s ease" }} />
          </div>
        </div>

        {/* Decisions */}
        <div className="glass-panel" style={{ padding: "1.1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
            <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontWeight: 600 }}>Decisions Reached</span>
            <div style={{ color: "#FBBF24" }}><Scale size={18} /></div>
          </div>
          <div style={{ fontSize: "1.75rem", fontWeight: 800, color: "#FCD34D" }}>
            {analysis.decisions?.length || 0}
          </div>
          <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.2rem" }}>
            Vibe: {analysis.stats?.sentiment || "Active"}
          </p>
        </div>
      </div>

      {/* Tabs Bar */}
      <div style={{
        display: "flex",
        alignItems: "center",
        gap: "0.5rem",
        borderBottom: "1px solid var(--border-subtle)",
        paddingBottom: "0.5rem",
        overflowX: "auto"
      }}>
        {[
          { id: "overview", label: "Executive Summary", icon: MessageSquare },
          { id: "urgent", label: `Urgent Alerts (${analysis.urgentMessages?.length || 0})`, icon: ShieldAlert, badgeColor: "rose" },
          { id: "tasks", label: `Tasks & Action Items (${pendingTasksCount})`, icon: CheckSquare },
          { id: "deadlines", label: `Deadlines (${analysis.deadlines?.length || 0})`, icon: Calendar },
          { id: "decisions", label: `Key Decisions (${analysis.decisions?.length || 0})`, icon: Scale },
          { id: "transcript", label: "Chat Explorer", icon: Search }
        ].map(tab => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "0.45rem",
                padding: "0.6rem 1rem",
                borderRadius: "8px",
                fontSize: "0.85rem",
                fontWeight: 600,
                border: "none",
                cursor: "pointer",
                whiteSpace: "nowrap",
                background: isActive ? "rgba(139, 92, 246, 0.18)" : "transparent",
                color: isActive ? "#FFFFFF" : "#94A3B8",
                borderBottom: isActive ? "2px solid var(--accent-purple)" : "2px solid transparent",
                transition: "all 0.2s ease"
              }}
            >
              <Icon size={16} />
              <span>{tab.label}</span>
            </button>
          );
        })}
      </div>

      {/* Tab 1: Executive Overview */}
      {activeTab === "overview" && (
        <div style={{ display: "grid", gridTemplateColumns: "1.7fr 1.1fr", gap: "1.25rem" }}>
          {/* Summary Column */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.1rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.75rem" }}>
                TL;DR Executive Summary
              </h3>
              <p style={{ fontSize: "0.95rem", lineHeight: 1.7, color: "#E2E8F0" }}>
                {analysis.summary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="glass-panel" style={{ padding: "1.5rem" }}>
              <h3 style={{ fontSize: "1.05rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.85rem" }}>
                🎯 Key Takeaways & Highlights
              </h3>
              <div style={{ display: "flex", flexDirection: "column", gap: "0.65rem" }}>
                {(analysis.keyTakeaways || []).map((point, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "0.6rem",
                    background: "rgba(15, 23, 42, 0.4)",
                    padding: "0.75rem 1rem",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.05)"
                  }}>
                    <span style={{ color: "#A78BFA", fontWeight: 700, fontSize: "0.9rem" }}>•</span>
                    <span style={{ fontSize: "0.875rem", color: "#CBD5E1", lineHeight: 1.5 }}>{point}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column: Participants & Top Urgent Sneak Peek */}
          <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
            {/* Urgent Sneak Peek */}
            {analysis.urgentMessages && analysis.urgentMessages.length > 0 && (
              <div className="glass-panel pulse-urgent" style={{
                padding: "1.25rem",
                background: "rgba(239, 68, 68, 0.08)",
                borderColor: "rgba(239, 68, 68, 0.3)"
              }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.6rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", color: "#F87171", fontWeight: 700, fontSize: "0.9rem" }}>
                    <AlertTriangle size={16} />
                    <span>Immediate Attention Required</span>
                  </div>
                  <button
                    onClick={() => setActiveTab("urgent")}
                    style={{ background: "transparent", border: "none", color: "#FCA5A5", fontSize: "0.75rem", cursor: "pointer", textDecoration: "underline" }}
                  >
                    View All ({analysis.urgentMessages.length})
                  </button>
                </div>
                <div style={{ fontSize: "0.85rem", color: "#FEE2E2", fontWeight: 600, marginBottom: "0.3rem" }}>
                  "{analysis.urgentMessages[0].content}"
                </div>
                <div style={{ fontSize: "0.75rem", color: "#FCA5A5" }}>
                  — {analysis.urgentMessages[0].sender} ({analysis.urgentMessages[0].time})
                </div>
              </div>
            )}

            {/* Active Members */}
            <div className="glass-panel" style={{ padding: "1.25rem" }}>
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.75rem" }}>
                <h3 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
                  Active Participants
                </h3>
                <span className="badge badge-purple" style={{ fontSize: "0.7rem" }}>
                  {analysis.participants?.length || 0} members
                </span>
              </div>

              <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
                {(analysis.participants || []).map((p, idx) => (
                  <div key={idx} style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "0.55rem 0.75rem",
                    background: "rgba(15, 23, 42, 0.5)",
                    borderRadius: "8px",
                    border: "1px solid rgba(255, 255, 255, 0.04)"
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                      <div style={{
                        width: "28px",
                        height: "28px",
                        borderRadius: "50%",
                        background: "rgba(139, 92, 246, 0.2)",
                        color: "#C4B5FD",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: "0.75rem",
                        fontWeight: 700
                      }}>
                        {p.name.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <div style={{ fontSize: "0.825rem", fontWeight: 600, color: "#F8FAFC" }}>{p.name}</div>
                        <div style={{ fontSize: "0.7rem", color: "#94A3B8" }}>{p.role}</div>
                      </div>
                    </div>
                    <span style={{ fontSize: "0.75rem", color: "#64748B", fontFamily: "var(--font-mono)" }}>
                      {p.messages} msgs
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Tab 2: Urgent Alerts */}
      {activeTab === "urgent" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {analysis.urgentMessages && analysis.urgentMessages.length > 0 ? (
            analysis.urgentMessages.map((alert, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: "1.25rem 1.5rem",
                  borderLeft: "4px solid #EF4444",
                  background: "rgba(239, 68, 68, 0.05)"
                }}
              >
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                  <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                    <span className="badge badge-rose">Urgent Alert</span>
                    <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#FFFFFF" }}>{alert.sender}</span>
                    <span style={{ fontSize: "0.75rem", color: "#94A3B8" }}>({alert.time})</span>
                  </div>
                </div>

                <blockquote style={{
                  fontSize: "0.95rem",
                  color: "#FEE2E2",
                  fontStyle: "italic",
                  marginBottom: "0.75rem",
                  paddingLeft: "0.75rem",
                  borderLeft: "2px solid rgba(239, 68, 68, 0.4)"
                }}>
                  "{alert.content}"
                </blockquote>

                <div style={{
                  fontSize: "0.825rem",
                  color: "#FCA5A5",
                  background: "rgba(239, 68, 68, 0.1)",
                  padding: "0.4rem 0.75rem",
                  borderRadius: "6px",
                  display: "inline-flex",
                  alignItems: "center",
                  gap: "0.4rem"
                }}>
                  <AlertTriangle size={14} />
                  <span><strong>Why it matters:</strong> {alert.reason}</span>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-panel" style={{ padding: "2.5rem", textAlign: "center", color: "#94A3B8" }}>
              <ShieldAlert size={36} style={{ margin: "0 auto 0.75rem auto", opacity: 0.5 }} />
              <p>No critical urgent alerts detected in this chat transcript.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 3: Action Items & Tasks */}
      {activeTab === "tasks" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          {/* Controls Bar: Filters & Add Task */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.75rem" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              {/* Status Filter */}
              <div style={{ display: "inline-flex", background: "var(--bg-input)", padding: "0.2rem", borderRadius: "8px", border: "1px solid var(--border-subtle)" }}>
                {["all", "pending", "completed"].map(f => (
                  <button
                    key={f}
                    onClick={() => setTaskFilter(f)}
                    style={{
                      padding: "0.35rem 0.75rem",
                      fontSize: "0.775rem",
                      fontWeight: 600,
                      borderRadius: "6px",
                      border: "none",
                      cursor: "pointer",
                      textTransform: "capitalize",
                      background: taskFilter === f ? "var(--accent-purple)" : "transparent",
                      color: taskFilter === f ? "#FFFFFF" : "#94A3B8"
                    }}
                  >
                    {f}
                  </button>
                ))}
              </div>

              {/* Assignee Filter */}
              {uniqueAssignees.length > 0 && (
                <select
                  value={assigneeFilter}
                  onChange={e => setAssigneeFilter(e.target.value)}
                  className="input-text"
                  style={{ width: "auto", padding: "0.35rem 0.75rem", fontSize: "0.8rem", height: "32px" }}
                >
                  <option value="all">All Assignees ({uniqueAssignees.length})</option>
                  {uniqueAssignees.map(a => (
                    <option key={a} value={a}>{a}</option>
                  ))}
                </select>
              )}
            </div>

            <button
              onClick={onOpenTaskModal}
              className="btn btn-primary btn-sm"
            >
              <Plus size={15} />
              <span>Add Custom Task</span>
            </button>
          </div>

          {/* Tasks List */}
          <div style={{ display: "flex", flexDirection: "column", gap: "0.6rem" }}>
            {filteredTasks.length > 0 ? (
              filteredTasks.map((task) => {
                const priorityColors = {
                  critical: "badge-rose",
                  high: "badge-amber",
                  medium: "badge-cyan",
                  low: "badge-purple"
                };

                return (
                  <div
                    key={task.id}
                    className="glass-panel"
                    onClick={() => handleTaskCheck(task.id)}
                    style={{
                      padding: "1rem 1.25rem",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      gap: "1rem",
                      cursor: "pointer",
                      transition: "all 0.2s ease",
                      background: task.completed ? "rgba(16, 185, 129, 0.05)" : "var(--bg-card)",
                      borderColor: task.completed ? "rgba(16, 185, 129, 0.2)" : "var(--border-subtle)"
                    }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: "0.85rem", flex: 1 }}>
                      {/* Checkbox */}
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => {}} // Handled by parent container click
                        style={{
                          width: "18px",
                          height: "18px",
                          cursor: "pointer",
                          accentColor: "#10B981"
                        }}
                      />

                      <div style={{ flex: 1 }}>
                        <div style={{
                          fontSize: "0.925rem",
                          fontWeight: 600,
                          color: task.completed ? "#94A3B8" : "#FFFFFF",
                          textDecoration: task.completed ? "line-through" : "none"
                        }}>
                          {task.task}
                        </div>
                        <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginTop: "0.25rem", fontSize: "0.75rem", color: "#94A3B8" }}>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <User size={13} />
                            <strong>{task.assignee}</strong>
                          </span>
                          <span>•</span>
                          <span style={{ display: "flex", alignItems: "center", gap: "0.3rem" }}>
                            <Calendar size={13} />
                            {task.deadline}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div>
                      <span className={`badge ${priorityColors[task.priority] || "badge-cyan"}`}>
                        {task.priority}
                      </span>
                    </div>
                  </div>
                );
              })
            ) : (
              <div className="glass-panel" style={{ padding: "2rem", textAlign: "center", color: "#94A3B8" }}>
                <p>No action items match the current filters.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 4: Deadlines & Calendar */}
      {activeTab === "deadlines" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "0.5rem" }}>
            <span style={{ fontSize: "0.85rem", color: "#94A3B8" }}>
              Extracted schedule milestones, demo slots & hard deadlines
            </span>
            <button
              onClick={handleDownloadCalendar}
              className="btn btn-primary btn-sm"
              title="Download iCalendar (.ics) to import into Google or Outlook Calendar"
            >
              <CalendarDays size={15} />
              <span>Export to Calendar (.ics)</span>
            </button>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: "0.85rem" }}>
            {analysis.deadlines && analysis.deadlines.length > 0 ? (
              analysis.deadlines.map((item, idx) => (
                <div
                  key={idx}
                  className="glass-panel"
                  style={{
                    padding: "1.25rem",
                    borderLeft: item.isUrgent ? "4px solid #EF4444" : "4px solid var(--accent-purple)",
                    background: item.isUrgent ? "rgba(239, 68, 68, 0.05)" : "var(--bg-card)"
                  }}
                >
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "0.5rem" }}>
                    <span className={item.isUrgent ? "badge badge-rose" : "badge badge-purple"}>
                      {item.isUrgent ? "Urgent Cutoff" : "Scheduled"}
                    </span>
                    <span style={{ fontSize: "0.8rem", color: "#94A3B8", fontFamily: "var(--font-mono)" }}>
                      {item.location}
                    </span>
                  </div>

                  <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF", marginBottom: "0.5rem" }}>
                    {item.event}
                  </h4>

                  <div style={{ display: "flex", alignItems: "center", gap: "0.4rem", fontSize: "0.85rem", color: "#67E8F9", fontWeight: 600 }}>
                    <Clock size={14} />
                    <span>{item.time}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="glass-panel" style={{ padding: "2rem", textAlign: "center", color: "#94A3B8" }}>
                <p>No explicit deadlines detected.</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 5: Key Decisions */}
      {activeTab === "decisions" && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.85rem" }}>
          {analysis.decisions && analysis.decisions.length > 0 ? (
            analysis.decisions.map((dec, idx) => (
              <div
                key={idx}
                className="glass-panel"
                style={{
                  padding: "1.25rem 1.5rem",
                  display: "flex",
                  alignItems: "flex-start",
                  gap: "0.85rem",
                  borderLeft: "4px solid #F59E0B"
                }}
              >
                <div style={{
                  width: "28px",
                  height: "28px",
                  borderRadius: "50%",
                  background: "rgba(245, 158, 11, 0.15)",
                  color: "#FCD34D",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontWeight: 700,
                  fontSize: "0.8rem",
                  flexShrink: 0
                }}>
                  {idx + 1}
                </div>
                <div>
                  <h4 style={{ fontSize: "0.95rem", fontWeight: 600, color: "#FFFFFF", lineHeight: 1.5 }}>
                    {dec}
                  </h4>
                  <p style={{ fontSize: "0.75rem", color: "#94A3B8", marginTop: "0.25rem" }}>
                    Consensus reached by group members
                  </p>
                </div>
              </div>
            ))
          ) : (
            <div className="glass-panel" style={{ padding: "2rem", textAlign: "center", color: "#94A3B8" }}>
              <p>No specific decisions identified.</p>
            </div>
          )}
        </div>
      )}

      {/* Tab 6: Transcript Explorer */}
      {activeTab === "transcript" && (
        <div className="glass-panel" style={{ padding: "1.25rem" }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem", flexWrap: "wrap", gap: "0.75rem" }}>
            <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "#E2E8F0" }}>
              Searchable Raw Transcript ({filteredTranscript.length} lines)
            </span>
            <div style={{ position: "relative", minWidth: "240px" }}>
              <Search size={14} style={{ position: "absolute", left: "0.75rem", top: "50%", transform: "translateY(-50%)", color: "#94A3B8" }} />
              <input
                type="text"
                placeholder="Filter lines or names..."
                value={transcriptSearch}
                onChange={e => setTranscriptSearch(e.target.value)}
                className="input-text"
                style={{ paddingLeft: "2.2rem", fontSize: "0.8rem", padding: "0.4rem 0.75rem 0.4rem 2.2rem" }}
              />
            </div>
          </div>

          <div style={{
            maxHeight: "450px",
            overflowY: "auto",
            background: "#080C14",
            padding: "1rem",
            borderRadius: "10px",
            fontFamily: "var(--font-mono)",
            fontSize: "0.8rem",
            display: "flex",
            flexDirection: "column",
            gap: "0.4rem"
          }}>
            {filteredTranscript.length > 0 ? (
              filteredTranscript.map((line, idx) => {
                const isUrgent = /urgent|deadline|due|today|locks|freeze/i.test(line);
                const isDecision = /decision|agreed/i.test(line);

                return (
                  <div
                    key={idx}
                    style={{
                      padding: "0.35rem 0.5rem",
                      borderRadius: "4px",
                      background: isUrgent
                        ? "rgba(239, 68, 68, 0.12)"
                        : isDecision
                        ? "rgba(245, 158, 11, 0.12)"
                        : "transparent",
                      color: isUrgent ? "#FCA5A5" : isDecision ? "#FDE68A" : "#94A3B8",
                      lineHeight: 1.5,
                      borderLeft: isUrgent ? "2px solid #EF4444" : isDecision ? "2px solid #F59E0B" : "none"
                    }}
                  >
                    {line}
                  </div>
                );
              })
            ) : (
              <div style={{ color: "#64748B", textAlign: "center", padding: "1rem" }}>
                No messages match query "{transcriptSearch}"
              </div>
            )}
          </div>
        </div>
      )}

      {/* Download & Export Action Strip */}
      <div className="glass-panel" style={{ padding: "1.25rem 1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem" }}>
          <div>
            <h4 style={{ fontSize: "0.95rem", fontWeight: 700, color: "#FFFFFF" }}>
              Export Intelligence Summary
            </h4>
            <p style={{ fontSize: "0.775rem", color: "#94A3B8" }}>
              Download or copy formatted summaries for your team, Notion, or presentations
            </p>
          </div>

          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", flexWrap: "wrap" }}>
            <button
              onClick={handleDownloadMd}
              className="btn btn-outline btn-sm"
              title="Download Markdown summary"
            >
              <FileDown size={14} />
              <span>Markdown (.md)</span>
            </button>

            <button
              onClick={handleDownloadTxt}
              className="btn btn-outline btn-sm"
              title="Download Plain Text summary"
            >
              <FileDown size={14} />
              <span>Plain Text (.txt)</span>
            </button>

            <button
              onClick={handleDownloadJson}
              className="btn btn-outline btn-sm"
              title="Download JSON structured schema"
            >
              <FileDown size={14} />
              <span>JSON (.json)</span>
            </button>

            <button
              onClick={handleDownloadCalendar}
              className="btn btn-outline btn-sm"
              title="Download iCalendar file"
            >
              <Calendar size={14} />
              <span>Calendar (.ics)</span>
            </button>

            <button
              onClick={handleCopy}
              className="btn btn-primary btn-sm"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              <span>{copied ? "Copied" : "Copy to Clipboard"}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
