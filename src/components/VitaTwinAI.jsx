import React, { useState, useRef, useEffect } from "react";
import {
  Heart, Brain, Activity, Wind, Stethoscope, LayoutDashboard, LineChart as LineIcon,
  Boxes, Radio, MessageSquare, Settings, Bell, Search, Shield, Lock, RefreshCw,
  Smartphone, Play, Sparkles, TrendingUp, TrendingDown, ChevronRight, Send, Loader2,
  Watch, Cpu, Target, ThumbsUp, Droplet, Footprints, Flame, Moon, Zap, User, CheckCircle2,
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip,
  PieChart, Pie, Cell, RadialBarChart, RadialBar,
} from "recharts";

// ════════════════════════════════════════════════════════════════════════════
//  VitaTwin AI — AI-powered Digital Twin Health Platform
//  Multi-view single-file app. Mock data for vitals/charts, real Claude API
//  for the AI Health Assistant. Demo / simulation only — not medical advice.
// ════════════════════════════════════════════════════════════════════════════

const C = {
  bg: "#080d18", panel: "#0d1424", panel2: "#111a30", line: "#1e2a45",
  ink: "#e8eefc", muted: "#7e8db5", teal: "#2ee6c8", purple: "#8b6cf0",
  pink: "#f25c9a", blue: "#4d8dff", green: "#3ddb8f", amber: "#f5b94a", red: "#ff5e6c",
};

const trend = (base, n, amp) =>
  Array.from({ length: n }, (_, i) => ({
    x: i,
    v: Math.round(base + Math.sin(i / 1.7) * amp + (Math.random() - 0.5) * amp * 0.8),
  }));

const WEEK = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const healthTrend = WEEK.map((d, i) => ({
  day: d, heart: 68 + Math.round(Math.sin(i) * 6), sleep: 70 + Math.round(Math.cos(i) * 12),
  stress: 30 + Math.round(Math.sin(i + 2) * 14), activity: 55 + Math.round(Math.cos(i + 1) * 20),
}));
const distribution = [
  { name: "Excellent", v: 60, c: C.teal }, { name: "Good", v: 30, c: C.blue },
  { name: "Average", v: 8, c: C.amber }, { name: "Poor", v: 2, c: C.red },
];

// ── Reusable bits ───────────────────────────────────────────────────────────
const Spark = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={34}>
    <LineChart data={data}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} /></LineChart>
  </ResponsiveContainer>
);

const Glow = ({ children, style }) => (
  <div style={{ position: "relative", ...style }}>{children}</div>
);

// Digital human / twin figure (pure SVG, glowing)
function TwinFigure({ size = 200, pulse = true }) {
  return (
    <svg viewBox="0 0 120 300" width={size * 0.42} height={size} style={{ filter: "drop-shadow(0 0 14px #2ee6c8aa)" }}>
      <defs>
        <linearGradient id="tw" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={C.teal} /><stop offset="100%" stopColor={C.blue} />
        </linearGradient>
        <radialGradient id="core" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#fff" /><stop offset="100%" stopColor={C.teal} />
        </radialGradient>
      </defs>
      <g fill="none" stroke="url(#tw)" strokeWidth="1.6" opacity="0.9">
        <circle cx="60" cy="26" r="15" />
        <path d="M60 41 L60 150 M60 60 L26 96 M60 60 L94 96 M60 150 L40 250 M60 150 L80 250" />
        <ellipse cx="60" cy="95" rx="30" ry="42" opacity="0.35" />
      </g>
      {[["60","70",C.pink],["48","92",C.purple],["72","92",C.blue],["60","120",C.teal],["44","250",C.amber],["76","250",C.amber]].map(([cx,cy,c],i)=>(
        <circle key={i} cx={cx} cy={cy} r="3.4" fill={c}>
          {pulse && <animate attributeName="opacity" values="1;0.3;1" dur={`${1.6+i*0.2}s`} repeatCount="indefinite" />}
        </circle>
      ))}
      <circle cx="60" cy="95" r="6" fill="url(#core)">
        {pulse && <animate attributeName="r" values="6;9;6" dur="2s" repeatCount="indefinite" />}
      </circle>
      <ellipse cx="60" cy="285" rx="46" ry="9" fill={C.teal} opacity="0.18" />
    </svg>
  );
}

// ── App shell ─────────────────────────────────────────────────────────────--
const NAV = [
  { id: "landing", label: "Landing", icon: Sparkles },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "diagnosis", label: "AI Diagnosis", icon: Stethoscope },
  { id: "twin", label: "Digital Twin", icon: Boxes },
  { id: "analytics", label: "Analytics", icon: LineIcon },
  { id: "monitoring", label: "Monitoring", icon: Radio },
  { id: "assistant", label: "AI Assistant", icon: MessageSquare },
];

export default function VitaTwinAI() {
  const [view, setView] = useState("landing");
  return (
    <div className="vt">
      <style>{styles}</style>
      <div className="vt-shell">
        {view !== "landing" && (
          <aside className="vt-side">
            <div className="vt-logo"><Heart size={20} fill={C.pink} stroke={C.pink} /><span>Vita<b>Twin</b> AI</span></div>
            <nav>
              {NAV.map((n) => (
                <button key={n.id} className={"vt-nav" + (view === n.id ? " on" : "")} onClick={() => setView(n.id)}>
                  <n.icon size={17} /> <span>{n.label}</span>
                </button>
              ))}
            </nav>
            <div className="vt-side-foot">
              <button className="vt-nav" onClick={() => setView("landing")}><Settings size={17} /><span>Home</span></button>
            </div>
          </aside>
        )}
        <main className={"vt-main" + (view === "landing" ? " full" : "")}>
          {view === "landing" && <Landing go={setView} />}
          {view === "dashboard" && <Dashboard />}
          {view === "diagnosis" && <Diagnosis />}
          {view === "twin" && <Twin />}
          {view === "analytics" && <Analytics />}
          {view === "monitoring" && <Monitoring />}
          {view === "assistant" && <Assistant />}
        </main>
      </div>
    </div>
  );
}

// ── LANDING ───────────────────────────────────────────────────────────────--
function Landing({ go }) {
  const features = [
    { icon: Stethoscope, t: "AI Diagnosis", s: "Advanced AI models", v: "diagnosis" },
    { icon: Boxes, t: "Digital Twin", s: "Simulate your health", v: "twin" },
    { icon: Shield, t: "Predict & Prevent", s: "Stop issues early", v: "analytics" },
    { icon: Radio, t: "Real-time Monitoring", s: "Live health tracking", v: "monitoring" },
    { icon: Sparkles, t: "Personalized Care", s: "Just for you", v: "assistant" },
  ];
  return (
    <div className="vt-landing">
      <header className="vt-topbar">
        <div className="vt-logo"><Heart size={20} fill={C.pink} stroke={C.pink} /><span>Vita<b>Twin</b> AI</span></div>
        <div className="vt-topnav">
          {["Home", "Features", "How It Works", "Pricing", "Resources"].map((x) => <a key={x}>{x}</a>)}
          <a>Sign In</a>
          <button className="vt-cta sm" onClick={() => go("dashboard")}>Get Started</button>
        </div>
      </header>

      <section className="vt-hero">
        <div className="vt-hero-l">
          <h1>Your Health.<br />Simulated. <span className="grad">Predicted.</span><br /><span className="grad2">Personalized.</span></h1>
          <p>The world's first AI-powered digital twin health platform that predicts, prevents, and personalizes your healthcare.</p>
          <div className="vt-hero-btns">
            <button className="vt-cta" onClick={() => go("dashboard")}><Play size={15} /> Start Your Health Journey</button>
            <button className="vt-cta ghost"><Play size={15} /> Watch Demo</button>
          </div>
          <div className="vt-trust">
            <span>Trusted by Innovators</span>
            <div>{["MAYO", "Google Cloud", "NVIDIA", "AWS", "Microsoft"].map((x) => <em key={x}>{x}</em>)}</div>
          </div>
        </div>
        <div className="vt-hero-r">
          <div className="vt-twin-stage">
            <TwinFigure size={300} />
            <div className="vt-float vt-float-1"><b>87</b><span>Health Score</span></div>
            <div className="vt-float vt-float-2"><Heart size={13} fill={C.pink} stroke={C.pink} /> 72 bpm</div>
            <div className="vt-float vt-float-3"><Activity size={13} stroke={C.teal} /> 98% O₂</div>
          </div>
        </div>
      </section>

      <section className="vt-feat-row">
        {features.map((f) => (
          <button key={f.t} className="vt-feat" onClick={() => go(f.v)}>
            <span className="vt-feat-ic"><f.icon size={20} /></span>
            <b>{f.t}</b><small>{f.s}</small>
          </button>
        ))}
      </section>

      <section className="vt-how">
        <h2>How It Works</h2>
        <div className="vt-how-row">
          {[
            { i: Watch, t: "Connect", s: "Wearables & health data" },
            { i: Brain, t: "Analyze", s: "AI analyzes your health" },
            { i: Boxes, t: "Simulate", s: "Digital twin simulation" },
            { i: TrendingUp, t: "Predict", s: "Predict future risks" },
            { i: Target, t: "Recommend", s: "Personalized recs" },
            { i: Zap, t: "Improve", s: "Track & improve" },
          ].map((s, i) => (
            <React.Fragment key={s.t}>
              <div className="vt-step"><span className="vt-step-ic"><s.i size={20} /></span><b>{i + 1}. {s.t}</b><small>{s.s}</small></div>
              {i < 5 && <ChevronRight className="vt-step-arrow" size={18} />}
            </React.Fragment>
          ))}
        </div>
      </section>

      <section className="vt-tech">
        <div className="vt-tech-block">
          <h3>Tech Stack</h3>
          <div className="vt-tech-grid">
            {[
              ["Frontend", ["Next.js", "TypeScript", "Tailwind", "Framer Motion"]],
              ["Backend", ["Node.js", "FastAPI", "GraphQL", "Socket.io"]],
              ["Database", ["MongoDB", "PostgreSQL", "Redis", "TimescaleDB"]],
              ["AI / ML", ["PyTorch", "TensorFlow", "Scikit-learn", "Claude API"]],
              ["Cloud", ["AWS", "Docker", "Kubernetes", "Cloudflare"]],
            ].map(([h, items]) => (
              <div key={h}><b>{h}</b>{items.map((x) => <span key={x}>{x}</span>)}</div>
            ))}
          </div>
        </div>
        <div className="vt-vision">
          <h3>Our Vision</h3>
          <p>To create a world where AI empowers every individual to take control of their health through prediction, prevention, and personalized care.</p>
          <div className="vt-mono">
            <b>Monetization</b>
            {[["Premium Subscriptions", "Advanced AI features"], ["Doctor Marketplace", "Consultation & booking"], ["Health Insights API", "For enterprises"], ["Pharma Partnerships", "Research & insights"]].map(([t, s]) => (
              <div key={t}><span>{t}</span><small>{s}</small></div>
            ))}
          </div>
        </div>
      </section>

      <section className="vt-trustbar">
        {[[Lock, "End-to-End Encryption", "Your data is 100% secure"], [Shield, "HIPAA Compliant", "We follow global standards"], [Brain, "AI Explainability", "Transparent AI decisions"], [RefreshCw, "Real-time Sync", "Instant data updates"], [Smartphone, "Multi-Device", "Web, iOS & Android"]].map(([I, t, s]) => (
          <div key={t}><I size={18} stroke={C.teal} /><div><b>{t}</b><small>{s}</small></div></div>
        ))}
      </section>

      <footer className="vt-disc"><Shield size={12} /> Demo & simulation only. All health data shown is fictional. Not a medical device and not for clinical use.</footer>
    </div>
  );
}

// ── DASHBOARD ─────────────────────────────────────────────────────────────--
function TopBar({ title }) {
  return (
    <div className="vt-head">
      <h2>{title}</h2>
      <div className="vt-head-r">
        <div className="vt-search"><Search size={14} /><input placeholder="Search anything..." /></div>
        <button className="vt-icobtn"><Bell size={16} /></button>
        <button className="vt-icobtn"><Settings size={16} /></button>
      </div>
    </div>
  );
}
