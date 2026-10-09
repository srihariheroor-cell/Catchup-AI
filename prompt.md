# CatchUp AI — Hackathon Development & AI Prompt Log

## 1. Project Overview
- **Name:** CatchUp AI
- **Tagline:** Intelligent Personal Relationship & Social Catch-Up Companion
- **Problem Statement:** In modern busy lives, people routinely lose touch with friends, mentors, colleagues, and family. Relationship decay happens not out of neglect, but cognitive overload: forgetting past conversations, missing optimal check-in moments, and encountering friction when drafting thoughtful reconnect messages.
- **Target Audience:** Busy professionals, remote workers, students, founders, and anyone who wants to nurture high-value personal and professional bonds.
- **Solution:** A proactive, AI-powered personal relationship companion. CatchUp AI tracks relationship health ("warmth decay meter"), remembers key life events and details via quick conversational notes, suggests optimal reconnect times, and drafts hyper-personalized, context-rich icebreaker messages.
- **Key Features (MVP Scope):**
  1. **Relationship Intelligence & Warmth Radar:** Visual warmth decay meter (*Fresh*, *Cooling*, *Overdue*, *Dormant*) based on custom cadences (weekly, monthly, quarterly).
  2. **Context & Memory Vault:** Quick note drop (text/speech) with automated AI entity & life-milestone extraction.
  3. **Smart Catch-Up Engine & Message Drafter:** One-click AI icebreaker drafts in multiple tones (*Casual & Warm*, *Professional & Genuine*, *Short & Punchy*, *Thoughtful*).
  4. **Interactive AI Social Copilot:** Natural language Q&A across contacts ("Who haven't I spoken to in a month?", "What was David's new job title?").
  5. **Contact Management & Pre-loaded Demo Data:** Rich initial profiles to allow immediate, high-impact demonstration during hackathon pitching.

---

## 2. Tech Stack & Architecture
- **Framework:** Next.js (App Router), React, TypeScript
- **Styling:** Modern Vanilla CSS with CSS custom properties (Tokens for Dark Glassmorphism, Neon/Warmth Accents, Responsive Flexbox/Grid, Micro-animations)
- **API Layer:** Next.js Server-Side API Routes (`/api/draft-message`, `/api/extract-memory`, `/api/copilot`)
- **AI Engine:** Google Gemini AI with resilient structured prompt templates and fallback mock engine for flawless offline demo capability.
- **Data Persistence:** LocalStorage state synchronization with seed demo data and full CRUD support.

### System Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                       CatchUp AI UI                         │
│  ┌─────────────────┬────────────────────┬────────────────┐  │
│  │ Relationship    │ Context & Memory   │ Smart Catch-Up │  │
│  │ Radar & Health  │ Vault (Notes)      │ AI Drafter     │  │
│  └─────────────────┴────────────────────┴────────────────┘  │
│  ┌───────────────────────────────────────────────────────┐  │
│  │              Interactive AI Social Copilot            │  │
│  └───────────────────────────────────────────────────────┘  │
└──────────────────────────────┬──────────────────────────────┘
                               │
                Next.js App Router API Routes
        ┌──────────────────────┼──────────────────────┐
        ▼                      ▼                      ▼
  /api/draft-message   /api/extract-memory       /api/copilot
        │                      │                      │
        └──────────────────────┼──────────────────────┘
                               ▼
                   Google Gemini Engine /
               Structured Fallback Engine
```

---

## 3. AI Code Generation Log

| Interaction # | Purpose | Tool / Model | Actual Prompt / Instruction | Files Affected | Outcome & Verification |
|---|---|---|---|---|---|
| #1 | Master Hackathon Setup & Scaffolding | Antigravity AI (Gemini 3.8 Flash High) | Master Prompt — Vibe Coding Hackathon: Understand & Plan, generate `prompt.md`, prepare development plan | `prompt.md`, `.git` | Initial git repository initialized; base `prompt.md` established. |
| #2 | Requirements Clarification & Architecture Definition | Antigravity AI (Gemini 3.8 Flash High) | User selection: Concept = Personal Relationship CRM / Social Catch-Up; Stack = Next.js (App Router) + React | `prompt.md` | Defined full MVP specification, system architecture, and 8-phase development roadmap. Awaiting user confirmation to begin Phase 3. |

---

## 4. Debugging & Issue Resolution Log

| Bug / Issue # | Description | AI Prompt / Solution Applied | Affected Components | Verification Status |
|---|---|---|---|---|
| DBG-01 | PowerShell script execution policy disabled for `npm.ps1` (`PSSecurityException`) | Switched to using `npm.cmd` and `npx.cmd` directly in CLI invocations | PowerShell terminal environment | Verified: `npm.cmd -v` and `npx.cmd -v` executed cleanly with exit code 0 |

---

## 5. AI Features & Design Log

| Feature / Decision | Description & Design Choice | AI Prompt / Instruction | Outcome |
|---|---|---|---|
| Core Theme & Aesthetics | Dark glassmorphism with vivid status indicators (Emerald for Fresh, Amber for Cooling, Rose for Overdue, Slate for Dormant) | System UI/UX guidelines: Rich aesthetics, modern typography, glassmorphism, micro-animations | Established design token requirements for Next.js app |
| Resilience Pattern | Dual-mode AI execution (Gemini API with intelligent fallback mode) | Architectural design for zero-latency, fail-safe demo presentation | Ensured app functions reliably regardless of API key limits or connectivity during hackathon presentation |

---

## 6. Testing & Improvements Log

| Test / Task | Description | Tool / Approach | Result |
|---|---|---|---|
| Environment Sanity Check | Verified Node.js v24.21.0 and npm v11.19.0 compatibility | `run_command` (`node -v; npm.cmd -v`) | Confirmed working runtime environment |
| Git Repo State | Verified clean git status after initialization | `git status` | Clean working tree ready for milestone commits |

---

## 7. Final Summary
*(To be continuously updated throughout the hackathon)*
- **AI Tools Used:** Antigravity AI, Gemini Flash High
- **Major Contributions:** Requirements synthesis, domain modeling, technical architecture, tracking documentation setup.
- **Completed Features:** Phase 1 (Understand & Plan) & Phase 2 (Generate `prompt.md`) complete. Awaiting user greenlight to start vibe coding.
