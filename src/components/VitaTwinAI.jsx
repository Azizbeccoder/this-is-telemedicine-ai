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

function Dashboard() {
  const organs = [
    { i: Heart, n: "Heart", v: "98%", s: "Healthy", c: C.pink },
    { i: Brain, n: "Brain", v: "96%", s: "Healthy", c: C.purple },
    { i: Wind, n: "Lungs", v: "94%", s: "Healthy", c: C.teal },
    { i: Shield, n: "Immune System", v: "90%", s: "Strong", c: C.green },
    { i: Activity, n: "Digestive", v: "92%", s: "Strong", c: C.blue },
    { i: Moon, n: "Sleep Quality", v: "85%", s: "Good", c: C.amber },
  ];
  const summary = [
    { i: Footprints, t: "Steps", v: "8,432", sub: "/10,000" },
    { i: Flame, t: "Calories", v: "1,234", sub: "/2,000" },
    { i: Moon, t: "Sleep", v: "7h 45m", sub: "" },
    { i: Heart, t: "Heart Rate", v: "72 bpm", sub: "" },
    { i: Zap, t: "Stress Level", v: "Low", sub: "" },
  ];
  return (
    <>
      <TopBar title="Dashboard" />
      <div className="vt-welcome">
        <div className="vt-avatar"><User size={22} /></div>
        <div><b>Welcome back, Alex!</b><small>Here's your health overview</small></div>
      </div>

      <div className="vt-stat-row">
        {[["Health Score", "87", "Excellent", C.teal], ["Biological Age", "28", "Actual Age: 24", C.purple], ["Risk Level", "Low", "Keep going!", C.green], ["Active Conditions", "0", "No conditions", C.blue]].map(([t, v, s, c]) => (
          <div className="vt-stat" key={t}><small>{t}</small><b style={{ color: c }}>{v}</b><span>{s}</span></div>
        ))}
      </div>

      <div className="vt-grid-2">
        <div className="vt-card">
          <h3>Digital Twin Overview</h3>
          <div className="vt-twin-overview">
            <TwinFigure size={210} />
            <div className="vt-organs">
              {organs.map((o) => (
                <div key={o.n} className="vt-organ"><span style={{ color: o.c }}><o.i size={16} /></span><div><b>{o.n}</b><small>{o.v} · {o.s}</small></div></div>
              ))}
            </div>
          </div>
        </div>

        <div className="vt-card">
          <h3>Today's Summary</h3>
          <div className="vt-summary">
            {summary.map((s) => (
              <div key={s.t} className="vt-sum-row"><span><s.i size={15} stroke={C.teal} /> {s.t}</span><b>{s.v} <em>{s.sub}</em></b></div>
            ))}
          </div>
          <div className="vt-appt">
            <small>Next Appointment</small>
            <div><div className="vt-avatar sm"><User size={16} /></div><div><b>Dr. Sarah Johnson</b><small>Cardiologist · May 24, 10:00 AM</small></div></div>
          </div>
        </div>
      </div>

      <div className="vt-grid-3">
        <div className="vt-card sm">
          <h4>Health Insights</h4>
          <p>Your stress level has <span style={{ color: C.green }}>decreased by 15%</span> compared to last week.</p>
        </div>
        <div className="vt-card sm">
          <h4>Risk Prediction</h4>
          <div className="vt-risk"><RadialGauge value={12} color={C.amber} /><div><b>Hypertension</b><small style={{ color: C.green }}>Risk is low</small></div></div>
        </div>
        <div className="vt-card sm">
          <h4>AI Confidence</h4>
          <Bar value={86} color={C.teal} /><small>86% diagnostic confidence</small>
        </div>
      </div>
    </>
  );
}

function RadialGauge({ value, color }) {
  return (
    <ResponsiveContainer width={70} height={70}>
      <RadialBarChart innerRadius="70%" outerRadius="100%" data={[{ v: value, fill: color }]} startAngle={90} endAngle={90 - (value / 100) * 360}>
        <RadialBar dataKey="v" cornerRadius={10} background={{ fill: C.line }} />
      </RadialBarChart>
    </ResponsiveContainer>
  );
}
const Bar = ({ value, color }) => (
  <div className="vt-bar"><div style={{ width: `${value}%`, background: `linear-gradient(90deg,${color},${C.blue})` }} /></div>
);

// ── AI DIAGNOSIS ─────────────────────────────────────────────────────────---
function Diagnosis() {
  const [tab, setTab] = useState("Analysis");
  const steps = [["Symptom Analysis", "Completed"], ["AI Processing", "Completed"], ["Deep Scan", "In Progress"], ["Cross-Check", "Pending"], ["Report Generation", "Pending"]];
  const findings = [["Viral Pneumonia", 86, C.red], ["Bronchitis", 45, C.amber], ["Cold / Flu", 23, C.blue]];
  return (
    <>
      <TopBar title="AI Diagnosis" />
      <div className="vt-tabs">{["Symptoms", "Analysis", "Results", "Recommendations"].map((t) => <button key={t} className={tab === t ? "on" : ""} onClick={() => setTab(t)}>{t}</button>)}</div>
      <div className="vt-grid-2">
        <div className="vt-card">
          <h3>Analysis Progress</h3>
          <div className="vt-steps-v">
            {steps.map(([s, st]) => (
              <div key={s} className="vt-step-v">
                <span className={"vt-dot " + st.replace(/\s/g, "").toLowerCase()}>{st === "Completed" ? <CheckCircle2 size={14} /> : st === "In Progress" ? <Loader2 size={14} className="spin" /> : ""}</span>
                <div><b>{s}</b><small>{st}</small></div>
              </div>
            ))}
          </div>
          <div className="vt-lungs"><Wind size={120} stroke={C.teal} strokeWidth={0.8} style={{ filter: `drop-shadow(0 0 20px ${C.teal})`, opacity: 0.8 }} /></div>
        </div>
        <div className="vt-card">
          <h3>AI Findings <small className="vt-sub">Top Possibilities</small></h3>
          {findings.map(([n, p, c]) => (
            <div key={n} className="vt-finding"><div className="vt-finding-h"><b>{n}</b><span style={{ color: c }}>{p}%</span></div><Bar value={p} color={c} /></div>
          ))}
          <h4 style={{ marginTop: 18 }}>Evidence</h4>
          <ul className="vt-evidence">
            {["Mild fever detected", "Cough pattern matched", "Oxygen saturation normal", "Lung inflammation mild"].map((e) => <li key={e}><CheckCircle2 size={13} stroke={C.teal} /> {e}</li>)}
          </ul>
          <div className="vt-conf"><span>Confidence Score</span><Bar value={86} color={C.teal} /><b>86%</b></div>
          <button className="vt-cta full">View Full Report</button>
        </div>
      </div>
      <div className="vt-note"><Shield size={13} /> Illustrative AI output on fictional data — not a real diagnosis. Always consult a licensed clinician.</div>
    </>
  );
}

// ── DIGITAL TWIN SIM ─────────────────────────────────────────────────────---
function Twin() {
  const scenarios = [
    { i: TrendingDown, t: "Weight Loss", s: "Fitness Plan" },
    { i: Zap, t: "High Stress", s: "Work Pressure" },
    { i: Moon, t: "Better Sleep", s: "8+ Hours" },
    { i: Droplet, t: "New Medication", s: "Treatment Impact" },
  ];
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(false);
  const results = [["Energy", "+25%"], ["Immunity", "+18%"], ["Heart Health", "+20%"], ["Mental Clarity", "+30%"]];
  return (
    <>
      <TopBar title="Digital Twin Simulation" />
      <div className="vt-grid-twin">
        <div className="vt-card">
          <h3>Simulate Scenarios</h3>
          <small className="vt-sub">See how your body reacts to different scenarios</small>
          <div className="vt-scenarios">
            {scenarios.map((s, i) => (
              <button key={s.t} className={"vt-scenario" + (active === i ? " on" : "")} onClick={() => { setActive(i); setRun(false); }}>
                <s.i size={18} /><div><b>{s.t}</b><small>{s.s}</small></div>
              </button>
            ))}
          </div>
        </div>
        <div className="vt-card center">
          <TwinFigure size={280} />
          <button className="vt-cta" onClick={() => setRun(true)} style={{ marginTop: 14 }}><Play size={14} /> Run New Simulation</button>
        </div>
        <div className="vt-card">
          <h3>Simulation Result</h3>
          <p className="vt-sub">{run ? "Your body will improve significantly in 30 days" : "Run a simulation to see projected results"}</p>
          <div className="vt-sim-results">
            {results.map(([t, v]) => (
              <div key={t} className="vt-sim-row"><span>{t}</span><b style={{ color: run ? C.green : C.muted, opacity: run ? 1 : 0.4 }}>{run ? v : "—"}</b></div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

// ── ANALYTICS ───────────────────────────────────────────────────────────---
function Analytics() {
  const [range, setRange] = useState("7 Days");
  const metrics = [["Heart Rate", "72", "bpm", C.pink, trend(72, 12, 8)], ["Blood Oxygen", "98", "%", C.teal, trend(98, 12, 2)], ["Stress Level", "24", "Low", C.amber, trend(24, 12, 10)], ["Sleep Quality", "85", "Good", C.purple, trend(85, 12, 9)]];
  return (
    <>
      <TopBar title="Health Analytics" />
      <div className="vt-tabs between">
        <div>{["Overview", "Trends", "Compare", "Insights"].map((t, i) => <button key={t} className={i === 0 ? "on" : ""}>{t}</button>)}</div>
        <div className="vt-range">{["7 Days", "30 Days", "90 Days", "1 Year"].map((r) => <button key={r} className={range === r ? "on" : ""} onClick={() => setRange(r)}>{r}</button>)}</div>
      </div>
      <div className="vt-metric-row">
        {metrics.map(([t, v, u, c, d]) => (
          <div key={t} className="vt-card metric"><small>{t}</small><b>{v} <em>{u}</em></b><Spark data={d} color={c} /></div>
        ))}
      </div>
      <div className="vt-grid-2">
        <div className="vt-card">
          <h3>Health Trend Overview</h3>
          <ResponsiveContainer width="100%" height={240}>
            <LineChart data={healthTrend}>
              <XAxis dataKey="day" stroke={C.muted} fontSize={11} /><YAxis stroke={C.muted} fontSize={11} />
              <Tooltip contentStyle={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink }} />
              <Line type="monotone" dataKey="heart" stroke={C.pink} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="sleep" stroke={C.purple} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="stress" stroke={C.amber} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="activity" stroke={C.teal} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
          <div className="vt-legend">{[["Heart Rate", C.pink], ["Sleep", C.purple], ["Stress", C.amber], ["Activity", C.teal]].map(([l, c]) => <span key={l}><i style={{ background: c }} />{l}</span>)}</div>
        </div>
        <div className="vt-card">
          <h3>Health Distribution</h3>
          <ResponsiveContainer width="100%" height={240}>
            <PieChart>
              <Pie data={distribution} dataKey="v" nameKey="name" innerRadius={58} outerRadius={92} paddingAngle={3}>
                {distribution.map((d) => <Cell key={d.name} fill={d.c} />)}
              </Pie>
              <Tooltip contentStyle={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink }} />
            </PieChart>
          </ResponsiveContainer>
          <div className="vt-legend">{distribution.map((d) => <span key={d.name}><i style={{ background: d.c }} />{d.name} {d.v}%</span>)}</div>
        </div>
      </div>
    </>
  );
}

// ── MONITORING ──────────────────────────────────────────────────────────---
function Monitoring() {
  const [vitals, setVitals] = useState({ hr: 72, bp: "120/80", o2: 98, temp: 36.6 });
  useEffect(() => {
    const t = setInterval(() => setVitals((v) => ({
      hr: 68 + Math.round(Math.random() * 10), bp: v.bp, o2: 97 + Math.round(Math.random() * 2), temp: (36.4 + Math.random() * 0.5).toFixed(1),
    })), 1800);
    return () => clearInterval(t);
  }, []);
  const rows = [
    { i: Heart, n: "Heart Rate", v: `${vitals.hr} bpm`, c: C.pink, d: trend(72, 20, 8) },
    { i: Activity, n: "Blood Pressure", v: `${vitals.bp} mmHg`, c: C.blue, d: trend(80, 20, 5) },
    { i: Wind, n: "Blood Oxygen", v: `${vitals.o2}%`, c: C.teal, d: trend(98, 20, 2) },
    { i: Zap, n: "ECG", v: "Normal", c: C.green, d: trend(50, 20, 30) },
    { i: Flame, n: "Body Temp", v: `${vitals.temp} °C`, c: C.amber, d: trend(36, 20, 1) },
  ];
  return (
    <>
      <TopBar title="Real-time Monitoring" />
      <div className="vt-live"><span className="vt-livedot" /> LIVE · streaming from connected devices</div>
      <div className="vt-monitor-grid">
        <div className="vt-card center heart-card">
          <div className="vt-heartbeat"><Heart size={130} fill={C.red} stroke={C.red} style={{ filter: `drop-shadow(0 0 24px ${C.red})` }} /></div>
          <b>{vitals.hr} bpm</b><small>Cardiac rhythm nominal</small>
        </div>
        <div className="vt-vitals">
          {rows.map((r) => (
            <div key={r.n} className="vt-card vital">
              <div className="vt-vital-h"><span style={{ color: r.c }}><r.i size={16} /></span><b>{r.n}</b><em style={{ color: r.c }}>{r.v}</em></div>
              <ResponsiveContainer width="100%" height={40}><AreaChart data={r.d}><Area type="monotone" dataKey="v" stroke={r.c} fill={r.c} fillOpacity={0.15} strokeWidth={1.8} /></AreaChart></ResponsiveContainer>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

// ── AI ASSISTANT (real Claude API) ──────────────────────────────────────---
// API endpoint for live Claude calls. Defaults to the bundled dev proxy
// (server.js, http://localhost:8787) so the secret key stays server-side.
// Override at build/run time with VITE_ANTHROPIC_ENDPOINT if needed.
const ANTHROPIC_ENDPOINT =
  import.meta.env.VITE_ANTHROPIC_ENDPOINT || "/api/anthropic";
