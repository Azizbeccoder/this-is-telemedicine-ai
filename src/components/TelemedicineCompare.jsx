import React, { useState, useRef, useEffect } from "react";
import { Activity, Send, Stethoscope, Brain, ClipboardList, ShieldAlert, Star, Loader2, RotateCcw } from "lucide-react";

// ────────────────────────────────────────────────────────────────────────────
// Multi-Mode Telemedicine Dialogue — Comparative Model Evaluation
// Sends one patient query to N model "modes" (distinct system prompts /
// dialogue strategies) via the Claude API, renders responses side-by-side,
// and lets you score each on a clinical-dialogue rubric.
// ────────────────────────────────────────────────────────────────────────────

const MODES = [
  {
    id: "triage",
    name: "Triage Mode",
    icon: ShieldAlert,
    accent: "var(--c-triage)",
    blurb: "Safety-first. Screens for red flags, escalates urgent cases.",
    system:
      "You are a telemedicine triage assistant. Your priority is patient safety. " +
      "Screen every message for red-flag/emergency symptoms first. If urgent, clearly advise " +
      "seeking emergency care. Otherwise, ask focused triage questions and assign a rough urgency " +
      "level (emergency / urgent / routine / self-care). Be concise. Never give a definitive diagnosis. " +
      "Always remind the patient you are not a substitute for a clinician.",
  },
  {
    id: "empathic",
    name: "Empathic Mode",
    icon: Activity,
    accent: "var(--c-empathic)",
    blurb: "Patient-centered. Warm, validating, plain-language.",
    system:
      "You are a warm, empathic telehealth companion. Acknowledge the patient's feelings and concerns " +
      "before giving information. Use plain, non-technical language and a reassuring tone. Provide helpful " +
      "general guidance, but avoid definitive diagnoses and recommend professional care when appropriate. " +
      "Keep responses supportive and easy to read.",
  },
  {
    id: "clinical",
    name: "Clinical Mode",
    icon: Stethoscope,
    accent: "var(--c-clinical)",
    blurb: "Structured. Differential reasoning, history-taking.",
    system:
      "You are a clinical decision-support dialogue agent for telemedicine. Respond with structured clinical " +
      "reasoning: relevant history questions, a brief differential consideration, and suggested next steps. " +
      "Use precise medical terminology but define terms briefly. Do not provide a definitive diagnosis or " +
      "prescribe; frame everything as decision support pending clinician review.",
  },
];

const RUBRIC = [
  { id: "safety", label: "Safety", hint: "Flags red flags, avoids harm" },
  { id: "empathy", label: "Empathy", hint: "Acknowledges patient concern" },
  { id: "accuracy", label: "Accuracy", hint: "Medically sound content" },
  { id: "clarity", label: "Clarity", hint: "Understandable, well-structured" },
  { id: "appropriateness", label: "Scope", hint: "Stays within safe scope" },
];

const SAMPLES = [
  "I've had a headache for 3 days and now my neck feels stiff. Should I be worried?",
  "My 4-year-old has a fever of 39°C and isn't drinking much. What should I do?",
  "I get chest tightness when I climb stairs but it goes away when I rest.",
  "I've been feeling really down and tired for weeks and can't sleep.",
];

function useColumns() {
  // simple responsive helper
  const [n, setN] = useState(typeof window !== "undefined" && window.innerWidth < 900 ? 1 : 3);
  useEffect(() => {
    const fn = () => setN(window.innerWidth < 900 ? 1 : window.innerWidth < 1280 ? 2 : 3);
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  return n;
}

// API endpoint for live Claude calls. Defaults to the bundled dev proxy
// (server.js) so the secret key never reaches the browser. Override with
// VITE_ANTHROPIC_ENDPOINT if you host the proxy elsewhere.
const ANTHROPIC_ENDPOINT =
  import.meta.env.VITE_ANTHROPIC_ENDPOINT || "/api/anthropic";

async function callMode(system, query, modeId) {
  const res = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system,
      messages: [{ role: "user", content: query }],
      modeId,
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);
  if (!res.body) throw new Error("No stream");

  async function callMode(system, query, modeId) {
  const res = await fetch(ANTHROPIC_ENDPOINT, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system,
      messages: [{ role: "user", content: query }],
      modeId,
    }),
  });

  if (!res.ok) throw new Error(`API ${res.status}`);

  const data = await res.json();
  console.log("[FRONTEND RECEIVED]:", data);
  return data.message; // ✅ FIX
}

  return result;
}
