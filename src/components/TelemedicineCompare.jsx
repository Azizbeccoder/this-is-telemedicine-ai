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

export default function TelemedicineCompare() {
  const cols = useColumns();
  const [query, setQuery] = useState("");
  const [running, setRunning] = useState(false);
  const [results, setResults] = useState({}); // id -> {text, error, ms}
  const [scores, setScores] = useState({}); // id -> {rubricId: n}
  const [submitted, setSubmitted] = useState("");
  const taRef = useRef(null);

  const run = async (q) => {
    const text = (q ?? query).trim();
    if (!text || running) return;
    setSubmitted(text);
    setRunning(true);
    setResults(Object.fromEntries(MODES.map((m) => [m.id, { loading: true }])));
    setScores({});

    for (const m of MODES) {
  const t0 = performance.now();

  try {
    const out = await callMode(m.system, text, m.id); // 👈 add m.id

    setResults((p) => ({
      ...p,
      [m.id]: {
        text: out,
        ms: Math.round(performance.now() - t0),
      },
    }));

  } catch (e) {
    setResults((p) => ({
      ...p,
      [m.id]: {
        error: e.message,
        ms: Math.round(performance.now() - t0),
      },
    }));
  }
}
    setRunning(false);
  };

  const setScore = (modeId, rubricId, val) =>
    setScores((p) => ({ ...p, [modeId]: { ...(p[modeId] || {}), [rubricId]: val } }));

  const totalFor = (modeId) => {
    const s = scores[modeId] || {};
    const vals = RUBRIC.map((r) => s[r.id] || 0);
    return vals.reduce((a, b) => a + b, 0);
  };

  const leader = (() => {
    const scored = MODES.filter((m) => Object.keys(scores[m.id] || {}).length);
    if (!scored.length) return null;
    return scored.reduce((best, m) => (totalFor(m.id) > totalFor(best.id) ? m : best), scored[0]);
  })();

  return (
    <div className="tc-root">
      <style>{css}</style>

      <header className="tc-head">
        <div className="tc-head-mark">
          <Brain size={22} strokeWidth={2.2} />
        </div>
        <div>
          <h1>Multi-Mode Telemedicine Dialogue</h1>
          <p>Comparative &amp; critical evaluation of medical dialogue generation — one query, three model strategies, scored side-by-side.</p>
        </div>
      </header>

      <section className="tc-input-card">
        <label className="tc-label">Patient message</label>
        <textarea
          ref={taRef}
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && (e.metaKey || e.ctrlKey)) run();
          }}
          placeholder="Describe a symptom or concern as a patient would…"
          rows={3}
        />
        <div className="tc-input-row">
          <div className="tc-samples">
            {SAMPLES.map((s, i) => (
              <button key={i} className="tc-chip" onClick={() => { setQuery(s); run(s); }} disabled={running}>
                {s.length > 42 ? s.slice(0, 42) + "…" : s}
              </button>
            ))}
          </div>
          <button className="tc-send" onClick={() => run()} disabled={running || !query.trim()}>
            {running ? <Loader2 size={16} className="tc-spin" /> : <Send size={16} />}
            {running ? "Generating…" : "Compare"}
            <kbd>⌘↵</kbd>
          </button>
        </div>
      </section>

      {submitted && (
        <div className="tc-prompt-echo">
          <ClipboardList size={14} />
          <span>{submitted}</span>
          <button className="tc-reset" onClick={() => { setResults({}); setSubmitted(""); setScores({}); setQuery(""); }}>
            <RotateCcw size={13} /> reset
          </button>
        </div>
      )}

      <section className="tc-grid" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {MODES.map((m) => {
          const r = results[m.id];
          const Icon = m.icon;
          const isLeader = leader && leader.id === m.id;
          return (
            <article key={m.id} className={"tc-col" + (isLeader ? " tc-leader" : "")} style={{ "--accent": m.accent }}>
              <div className="tc-col-head">
                <span className="tc-col-icon"><Icon size={16} strokeWidth={2.3} /></span>
                <div className="tc-col-title">
                  <h3>{m.name}{isLeader && <span className="tc-crown">top score</span>}</h3>
                  <p>{m.blurb}</p>
                </div>
              </div>

              <div className="tc-col-body">
                {!r && <div className="tc-empty">Awaiting a patient message…</div>}
                {r?.loading && (
                  <div className="tc-loading">
                    <Loader2 size={18} className="tc-spin" />
                    <span>Generating response…</span>
                  </div>
                )}
                {r?.error && <div className="tc-error">Request failed: {r.error}</div>}
                {r?.text && <div className="tc-response">{r.text}</div>}
              </div>

              {r?.text && (
                <div className="tc-eval">
                  <div className="tc-eval-meta">
                    <span>{r.ms} ms</span>
                    <span className="tc-total">{totalFor(m.id)}/{RUBRIC.length * 5}</span>
                  </div>
                  {RUBRIC.map((rub) => (
                    <div key={rub.id} className="tc-rubric">
                      <div className="tc-rubric-label" title={rub.hint}>{rub.label}</div>
                      <div className="tc-stars">
                        {[1, 2, 3, 4, 5].map((v) => (
                          <button
                            key={v}
                            className={"tc-star" + ((scores[m.id]?.[rub.id] || 0) >= v ? " on" : "")}
                            onClick={() => setScore(m.id, rub.id, v)}
                            aria-label={`${rub.label} ${v}`}
                          >
                            <Star size={14} fill={(scores[m.id]?.[rub.id] || 0) >= v ? "currentColor" : "none"} />
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </article>
          );
        })}
      </section>

      <footer className="tc-foot">
        <p>
          <ShieldAlert size={13} /> Research &amp; evaluation tool only. Not for real clinical use. Each mode shares the same model
          but a different dialogue strategy (system prompt), isolating the effect of prompting on medical dialogue quality.
        </p>
      </footer>
    </div>
  );
}

const css = `
:root{
  --bg:#0d1b1e; --panel:#0f2429; --panel-2:#102e34; --ink:#e8f4f2; --muted:#8fb3ad;
  --line:#1d3d43; --c-triage:#ff6b5e; --c-empathic:#5ad1c0; --c-clinical:#9db4ff;
  --gold:#f4c45a;
}
*{box-sizing:border-box}
.tc-root{
  font-family:"Spectral","Iowan Old Style",Georgia,serif; color:var(--ink);
  background:
    radial-gradient(1200px 600px at 80% -10%, #14393f 0%, transparent 60%),
    radial-gradient(900px 500px at -10% 110%, #122b30 0%, transparent 55%),
    var(--bg);
  min-height:100%; padding:28px clamp(16px,4vw,48px) 48px; line-height:1.55;
}
.tc-head{display:flex; gap:16px; align-items:flex-start; margin-bottom:26px}
.tc-head-mark{
  width:44px;height:44px;border-radius:13px;flex:none;display:grid;place-items:center;
  background:linear-gradient(140deg,var(--c-empathic),var(--c-clinical));
  color:#06181c;box-shadow:0 8px 24px -8px var(--c-empathic);
}
.tc-head h1{font-size:clamp(1.5rem,3.2vw,2.1rem);margin:0 0 4px;letter-spacing:-.02em;font-weight:700}
.tc-head p{margin:0;color:var(--muted);font-size:.95rem;max-width:62ch}

.tc-input-card{
  background:linear-gradient(180deg,var(--panel-2),var(--panel));
  border:1px solid var(--line);border-radius:18px;padding:18px;margin-bottom:16px;
  box-shadow:0 20px 50px -30px #000;
}
.tc-label{font-family:ui-sans-serif,system-ui;font-size:.7rem;text-transform:uppercase;letter-spacing:.14em;color:var(--muted)}
.tc-input-card textarea{
  width:100%;margin-top:8px;background:#0a1c20;border:1px solid var(--line);border-radius:12px;
  color:var(--ink);padding:13px 14px;font-family:inherit;font-size:1.02rem;resize:vertical;outline:none;
}
.tc-input-card textarea:focus{border-color:var(--c-empathic);box-shadow:0 0 0 3px #5ad1c022}
.tc-input-row{display:flex;gap:12px;justify-content:space-between;align-items:flex-end;margin-top:12px;flex-wrap:wrap}
.tc-samples{display:flex;gap:7px;flex-wrap:wrap;flex:1;min-width:200px}
.tc-chip{
  font-family:ui-sans-serif,system-ui;font-size:.74rem;color:var(--muted);cursor:pointer;
  background:#0a1c20;border:1px solid var(--line);padding:6px 10px;border-radius:20px;transition:.15s;
}
.tc-chip:hover:not(:disabled){color:var(--ink);border-color:var(--c-empathic);transform:translateY(-1px)}
.tc-chip:disabled{opacity:.4;cursor:default}
.tc-send{
  font-family:ui-sans-serif,system-ui;font-weight:600;font-size:.9rem;display:flex;align-items:center;gap:8px;
  background:linear-gradient(135deg,var(--c-empathic),#3fb6a6);color:#06181c;border:none;
  padding:11px 18px;border-radius:11px;cursor:pointer;transition:.15s;white-space:nowrap;
}
.tc-send:hover:not(:disabled){transform:translateY(-1px);box-shadow:0 10px 24px -10px var(--c-empathic)}
.tc-send:disabled{opacity:.5;cursor:default}
.tc-send kbd{font-family:ui-monospace,monospace;font-size:.66rem;background:#06181c33;padding:2px 5px;border-radius:5px}

.tc-prompt-echo{
  display:flex;align-items:center;gap:9px;font-size:.9rem;color:var(--muted);
  background:#0a1c20;border:1px dashed var(--line);border-radius:10px;padding:9px 13px;margin-bottom:18px;
}
.tc-prompt-echo span{flex:1;color:var(--ink)}
.tc-reset{font-family:ui-sans-serif,system-ui;display:flex;align-items:center;gap:4px;font-size:.74rem;color:var(--muted);background:none;border:none;cursor:pointer}
.tc-reset:hover{color:var(--c-triage)}

.tc-grid{display:grid;gap:16px;margin-bottom:24px}
.tc-col{
  background:linear-gradient(180deg,var(--panel-2),var(--panel));
  border:1px solid var(--line);border-top:3px solid var(--accent);
  border-radius:16px;padding:16px;display:flex;flex-direction:column;transition:.2s;
}
.tc-leader{box-shadow:0 0 0 1px var(--gold),0 18px 40px -24px var(--gold)}
.tc-col-head{display:flex;gap:11px;align-items:flex-start;padding-bottom:13px;border-bottom:1px solid var(--line)}
.tc-col-icon{width:30px;height:30px;flex:none;border-radius:9px;display:grid;place-items:center;background:color-mix(in srgb,var(--accent) 18%,transparent);color:var(--accent)}
.tc-col-title h3{margin:0;font-size:1.05rem;font-weight:700;display:flex;align-items:center;gap:8px;flex-wrap:wrap}
.tc-col-title p{margin:2px 0 0;font-size:.78rem;color:var(--muted);font-family:ui-sans-serif,system-ui}
.tc-crown{font-family:ui-sans-serif,system-ui;font-size:.6rem;text-transform:uppercase;letter-spacing:.1em;background:var(--gold);color:#2a1c00;padding:2px 7px;border-radius:20px;font-weight:700}

.tc-col-body{flex:1;padding:14px 0;min-height:120px}
.tc-empty{color:var(--muted);font-style:italic;font-size:.9rem;display:grid;place-items:center;height:100%;text-align:center}
.tc-loading{display:flex;align-items:center;gap:9px;color:var(--muted);font-family:ui-sans-serif,system-ui;font-size:.86rem}
.tc-error{color:var(--c-triage);font-family:ui-sans-serif,system-ui;font-size:.85rem;background:#ff6b5e14;padding:10px;border-radius:9px}
.tc-response{white-space:pre-wrap;font-size:.95rem}

.tc-eval{border-top:1px solid var(--line);padding-top:12px}
.tc-eval-meta{display:flex;justify-content:space-between;font-family:ui-monospace,monospace;font-size:.72rem;color:var(--muted);margin-bottom:8px}
.tc-total{color:var(--accent);font-weight:700}
.tc-rubric{display:flex;align-items:center;justify-content:space-between;gap:8px;padding:3px 0}
.tc-rubric-label{font-family:ui-sans-serif,system-ui;font-size:.8rem;color:var(--muted);cursor:help}
.tc-stars{display:flex;gap:1px}
.tc-star{background:none;border:none;cursor:pointer;color:#3a5a5f;padding:2px;transition:.12s;display:grid;place-items:center}
.tc-star.on{color:var(--gold)}
.tc-star:hover{transform:scale(1.2)}

.tc-foot{border-top:1px solid var(--line);padding-top:14px}
.tc-foot p{display:flex;align-items:flex-start;gap:7px;color:var(--muted);font-family:ui-sans-serif,system-ui;font-size:.78rem;margin:0;max-width:80ch}

.tc-spin{animation:tcspin 1s linear infinite}
@keyframes tcspin{to{transform:rotate(360deg)}}
`;
