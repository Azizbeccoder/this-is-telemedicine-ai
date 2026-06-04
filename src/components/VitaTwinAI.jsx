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

const SYS = "You are VitaTwin AI, a friendly, careful health-assistant chatbot inside a digital-twin health demo app. " +
  "Give helpful, general wellness information in a warm, concise tone. Use short paragraphs or brief bullet lists. " +
  "You must NOT diagnose, prescribe, or replace a clinician — for any concerning or urgent symptom, recommend seeing a professional. " +
  "Add a brief reminder that you are a demo assistant, not medical advice, when giving health guidance.";

function Assistant() {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "Hello Alex! 👋 I'm your VitaTwin AI assistant. Ask me anything about your health data, wellness habits, or how the digital twin works.\n\n*(Demo assistant — not medical advice.)*" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);
  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next); setInput(""); setBusy(true);
    try {
      const res = await fetch(ANTHROPIC_ENDPOINT, {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514", max_tokens: 1000, system: SYS,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      const out = data.content.filter((b) => b.type === "text").map((b) => b.text).join("\n").trim();
      setMsgs((p) => [...p, { role: "assistant", content: out }]);
    } catch (e) {
      setMsgs((p) => [...p, { role: "assistant", content: `⚠️ Couldn't reach the AI service (${e.message}).` }]);
    }
    setBusy(false);
  };

  const quick = ["Why have I felt tired lately?", "How can I lower my stress?", "Explain my digital twin", "Tips for better sleep"];
  return (
    <>
      <TopBar title="AI Health Assistant" />
      <div className="vt-chat-wrap">
        <div className="vt-chat-head"><div className="vt-avatar bot"><Brain size={18} /></div><div><b>VitaTwin Assistant</b><small style={{ color: C.green }}>● Online · powered by Claude</small></div></div>
        <div className="vt-chat-body">
          {msgs.map((m, i) => (
            <div key={i} className={"vt-msg " + m.role}>
              {m.role === "assistant" && <div className="vt-avatar bot sm"><Brain size={14} /></div>}
              <div className="vt-bubble">{m.content}</div>
            </div>
          ))}
          {busy && <div className="vt-msg assistant"><div className="vt-avatar bot sm"><Brain size={14} /></div><div className="vt-bubble typing"><Loader2 size={15} className="spin" /> thinking…</div></div>}
          <div ref={endRef} />
        </div>
        <div className="vt-quick">{quick.map((q) => <button key={q} onClick={() => send(q)} disabled={busy}>{q}</button>)}</div>
        <div className="vt-chat-input">
          <input value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === "Enter" && send()} placeholder="Type your message..." disabled={busy} />
          <button onClick={() => send()} disabled={busy || !input.trim()}>{busy ? <Loader2 size={16} className="spin" /> : <Send size={16} />}</button>
        </div>
      </div>
    </>
  );
}

// ── STYLES ──────────────────────────────────────────────────────────────---
const styles = `
.vt *{box-sizing:border-box}
.vt{font-family:'Outfit',ui-sans-serif,system-ui,sans-serif;color:${C.ink};background:${C.bg};min-height:100%;font-size:14px}
.vt h1,.vt h2,.vt h3,.vt h4{margin:0;font-weight:600;letter-spacing:-.01em}
.vt .spin{animation:vtspin 1s linear infinite}@keyframes vtspin{to{transform:rotate(360deg)}}
.vt-shell{display:flex;min-height:100vh;background:radial-gradient(900px 500px at 90% -5%, #14233f55 0,transparent 60%),radial-gradient(700px 500px at -5% 105%, #2a1a4f44 0,transparent 55%),${C.bg}}

/* sidebar */
.vt-side{width:212px;flex:none;background:${C.panel};border-right:1px solid ${C.line};padding:18px 12px;display:flex;flex-direction:column;gap:6px;position:sticky;top:0;height:100vh}
.vt-logo{display:flex;align-items:center;gap:8px;font-size:16px;font-weight:600;padding:6px 8px 16px}
.vt-logo b{color:${C.teal};font-weight:700}.vt-logo span b{color:${C.purple}}
.vt-nav{display:flex;align-items:center;gap:10px;width:100%;background:none;border:none;color:${C.muted};padding:10px 12px;border-radius:10px;cursor:pointer;font-size:13.5px;font-family:inherit;transition:.15s;text-align:left}
.vt-nav:hover{background:${C.panel2};color:${C.ink}}
.vt-nav.on{background:linear-gradient(90deg,${C.purple}33,${C.teal}22);color:${C.ink};box-shadow:inset 2px 0 0 ${C.teal}}
.vt-side-foot{margin-top:auto}

.vt-main{flex:1;padding:22px 26px;overflow-x:hidden}
.vt-main.full{padding:0}

/* topbar */
.vt-head{display:flex;justify-content:space-between;align-items:center;margin-bottom:18px}
.vt-head h2{font-size:20px}
.vt-head-r{display:flex;gap:10px;align-items:center}
.vt-search{display:flex;align-items:center;gap:7px;background:${C.panel};border:1px solid ${C.line};border-radius:9px;padding:7px 11px;color:${C.muted}}
.vt-search input{background:none;border:none;outline:none;color:${C.ink};font-family:inherit;font-size:13px;width:150px}
.vt-icobtn{background:${C.panel};border:1px solid ${C.line};color:${C.muted};width:34px;height:34px;border-radius:9px;display:grid;place-items:center;cursor:pointer}
.vt-icobtn:hover{color:${C.teal};border-color:${C.teal}}

/* cards */
.vt-card{background:linear-gradient(180deg,${C.panel2},${C.panel});border:1px solid ${C.line};border-radius:16px;padding:18px}
.vt-card h3{font-size:15px;margin-bottom:14px}.vt-card h4{font-size:13px;color:${C.muted};margin-bottom:10px;font-weight:500}
.vt-card.sm{padding:16px}.vt-card.center{display:flex;flex-direction:column;align-items:center;justify-content:center}
.vt-sub{color:${C.muted};font-size:11px;font-weight:400}
.vt-grid-2{display:grid;grid-template-columns:1fr 1fr;gap:16px;margin-bottom:16px}
.vt-grid-3{display:grid;grid-template-columns:repeat(3,1fr);gap:16px}
@media(max-width:1000px){.vt-grid-2,.vt-grid-3{grid-template-columns:1fr}}

/* welcome + stats */
.vt-welcome{display:flex;align-items:center;gap:12px;background:linear-gradient(90deg,${C.purple}22,transparent);border:1px solid ${C.line};border-radius:14px;padding:14px 16px;margin-bottom:16px}
.vt-avatar{width:42px;height:42px;border-radius:50%;background:linear-gradient(135deg,${C.purple},${C.teal});display:grid;place-items:center;color:#fff;flex:none}
.vt-avatar.sm{width:34px;height:34px}.vt-avatar.bot{background:linear-gradient(135deg,${C.teal},${C.blue})}
.vt-welcome b{font-size:16px;display:block}.vt-welcome small{color:${C.muted}}
.vt-stat-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px}
@media(max-width:760px){.vt-stat-row{grid-template-columns:1fr 1fr}}
.vt-stat{background:linear-gradient(180deg,${C.panel2},${C.panel});border:1px solid ${C.line};border-radius:14px;padding:15px}
.vt-stat small{color:${C.muted};font-size:11.5px}.vt-stat b{display:block;font-size:26px;margin:4px 0 2px}.vt-stat span{font-size:11.5px;color:${C.muted}}

/* digital twin overview */
.vt-twin-overview{display:flex;gap:14px;align-items:center}
.vt-organs{display:grid;grid-template-columns:1fr 1fr;gap:9px;flex:1}
.vt-organ{display:flex;gap:8px;align-items:center;background:${C.panel};border:1px solid ${C.line};border-radius:10px;padding:8px 10px}
.vt-organ b{font-size:12.5px;display:block}.vt-organ small{font-size:10.5px;color:${C.muted}}

/* summary */
.vt-summary{display:flex;flex-direction:column;gap:9px}
.vt-sum-row{display:flex;justify-content:space-between;align-items:center;font-size:13px;padding:7px 0;border-bottom:1px solid ${C.line}}
.vt-sum-row span{display:flex;align-items:center;gap:8px;color:${C.muted}}
.vt-sum-row em{color:${C.muted};font-style:normal;font-size:11px}
.vt-appt{margin-top:14px;background:${C.panel};border:1px solid ${C.line};border-radius:12px;padding:12px}
.vt-appt>small{color:${C.muted};font-size:11px}
.vt-appt>div{display:flex;gap:10px;align-items:center;margin-top:8px}
.vt-appt b{font-size:13px;display:block}.vt-appt small{font-size:11px;color:${C.muted}}

.vt-risk{display:flex;align-items:center;gap:12px}
.vt-bar{height:7px;background:${C.line};border-radius:6px;overflow:hidden;margin:6px 0}
.vt-bar>div{height:100%;border-radius:6px}

/* tabs */
.vt-tabs{display:flex;gap:6px;margin-bottom:16px}
.vt-tabs.between{justify-content:space-between}
.vt-tabs button,.vt-range button{background:${C.panel};border:1px solid ${C.line};color:${C.muted};padding:7px 14px;border-radius:8px;cursor:pointer;font-family:inherit;font-size:12.5px}
.vt-tabs button.on,.vt-range button.on{background:linear-gradient(90deg,${C.purple},${C.teal});color:#fff;border-color:transparent}
.vt-range{display:flex;gap:6px}

/* diagnosis */
.vt-steps-v{display:flex;flex-direction:column;gap:12px}
.vt-step-v{display:flex;gap:10px;align-items:center}
.vt-dot{width:24px;height:24px;border-radius:50%;display:grid;place-items:center;flex:none;border:1px solid ${C.line};color:${C.muted}}
.vt-dot.completed{background:${C.green}22;color:${C.green};border-color:${C.green}}
.vt-dot.inprogress{background:${C.amber}22;color:${C.amber};border-color:${C.amber}}
.vt-step-v b{font-size:13px;display:block}.vt-step-v small{font-size:11px;color:${C.muted}}
.vt-lungs{display:grid;place-items:center;margin-top:18px}
.vt-finding{margin-bottom:12px}
.vt-finding-h{display:flex;justify-content:space-between;font-size:13px;font-weight:500}
.vt-evidence{list-style:none;padding:0;margin:0;display:flex;flex-direction:column;gap:7px}
.vt-evidence li{display:flex;gap:8px;align-items:center;font-size:12.5px;color:${C.muted}}
.vt-conf{display:flex;align-items:center;gap:10px;margin:16px 0;font-size:12px;color:${C.muted}}
.vt-conf .vt-bar{flex:1}
.vt-note,.vt-disc{display:flex;align-items:center;gap:8px;color:${C.muted};font-size:11.5px;margin-top:14px;padding:10px 14px;background:${C.panel};border:1px solid ${C.line};border-radius:10px}

/* twin sim */
.vt-grid-twin{display:grid;grid-template-columns:1fr 1.1fr 1fr;gap:16px}
@media(max-width:1000px){.vt-grid-twin{grid-template-columns:1fr}}
.vt-scenarios{display:flex;flex-direction:column;gap:9px;margin-top:12px}
.vt-scenario{display:flex;gap:11px;align-items:center;background:${C.panel};border:1px solid ${C.line};border-radius:11px;padding:11px;cursor:pointer;color:${C.ink};font-family:inherit;text-align:left;transition:.15s}
.vt-scenario:hover{border-color:${C.teal}}
.vt-scenario.on{background:linear-gradient(90deg,${C.teal}22,transparent);border-color:${C.teal}}
.vt-scenario b{font-size:13px;display:block}.vt-scenario small{font-size:11px;color:${C.muted}}
.vt-sim-results{display:flex;flex-direction:column;gap:8px;margin-top:10px}
.vt-sim-row{display:flex;justify-content:space-between;align-items:center;background:${C.panel};border:1px solid ${C.line};border-radius:10px;padding:11px 13px;font-size:13px}

/* analytics */
.vt-metric-row{display:grid;grid-template-columns:repeat(4,1fr);gap:14px;margin-bottom:16px}
@media(max-width:760px){.vt-metric-row{grid-template-columns:1fr 1fr}}
.vt-card.metric small{color:${C.muted};font-size:11.5px}.vt-card.metric b{display:block;font-size:22px;margin:3px 0 6px}.vt-card.metric em{font-size:12px;color:${C.muted};font-style:normal}
.vt-legend{display:flex;gap:14px;flex-wrap:wrap;margin-top:10px;font-size:11.5px;color:${C.muted}}
.vt-legend span{display:flex;align-items:center;gap:6px}.vt-legend i{width:9px;height:9px;border-radius:3px}

/* monitoring */
.vt-live{display:flex;align-items:center;gap:8px;color:${C.green};font-size:12px;margin-bottom:14px;font-weight:500}
.vt-livedot{width:9px;height:9px;border-radius:50%;background:${C.green};box-shadow:0 0 0 0 ${C.green};animation:vtping 1.5s infinite}
@keyframes vtping{0%{box-shadow:0 0 0 0 ${C.green}99}70%{box-shadow:0 0 0 8px transparent}100%{box-shadow:0 0 0 0 transparent}}
.vt-monitor-grid{display:grid;grid-template-columns:300px 1fr;gap:16px}
@media(max-width:900px){.vt-monitor-grid{grid-template-columns:1fr}}
.heart-card b{font-size:26px;margin-top:10px}.heart-card small{color:${C.muted}}
.vt-heartbeat{animation:vtbeat 1.1s ease-in-out infinite}
@keyframes vtbeat{0%,100%{transform:scale(1)}15%{transform:scale(1.12)}30%{transform:scale(1)}45%{transform:scale(1.08)}}
.vt-vitals{display:grid;grid-template-columns:1fr 1fr;gap:14px}
@media(max-width:600px){.vt-vitals{grid-template-columns:1fr}}
.vt-vital-h{display:flex;align-items:center;gap:8px;font-size:12.5px;margin-bottom:4px}
.vt-vital-h b{flex:1}.vt-vital-h em{font-style:normal;font-weight:600}

/* assistant */
.vt-chat-wrap{display:flex;flex-direction:column;height:calc(100vh - 110px);background:linear-gradient(180deg,${C.panel2},${C.panel});border:1px solid ${C.line};border-radius:16px;overflow:hidden}
.vt-chat-head{display:flex;gap:11px;align-items:center;padding:14px 18px;border-bottom:1px solid ${C.line}}
.vt-chat-head b{font-size:14px;display:block}.vt-chat-head small{font-size:11px}
.vt-chat-body{flex:1;overflow-y:auto;padding:18px;display:flex;flex-direction:column;gap:14px}
.vt-msg{display:flex;gap:9px;max-width:80%}
.vt-msg.user{margin-left:auto;flex-direction:row-reverse}
.vt-bubble{background:${C.panel};border:1px solid ${C.line};padding:11px 14px;border-radius:14px;font-size:13.5px;line-height:1.55;white-space:pre-wrap}
.vt-msg.user .vt-bubble{background:linear-gradient(135deg,${C.purple},${C.blue});border-color:transparent;color:#fff}
.vt-bubble.typing{display:flex;align-items:center;gap:8px;color:${C.muted}}
.vt-quick{display:flex;gap:8px;flex-wrap:wrap;padding:10px 18px;border-top:1px solid ${C.line}}
.vt-quick button{background:${C.panel};border:1px solid ${C.line};color:${C.muted};padding:7px 12px;border-radius:20px;cursor:pointer;font-family:inherit;font-size:12px}
.vt-quick button:hover:not(:disabled){color:${C.teal};border-color:${C.teal}}
.vt-quick button:disabled{opacity:.4}
.vt-chat-input{display:flex;gap:10px;padding:14px 18px;border-top:1px solid ${C.line}}
.vt-chat-input input{flex:1;background:${C.panel};border:1px solid ${C.line};border-radius:11px;padding:12px 14px;color:${C.ink};font-family:inherit;font-size:13.5px;outline:none}
.vt-chat-input input:focus{border-color:${C.teal}}
.vt-chat-input button{background:linear-gradient(135deg,${C.teal},${C.blue});border:none;width:46px;border-radius:11px;color:#06181c;cursor:pointer;display:grid;place-items:center}
.vt-chat-input button:disabled{opacity:.5}

/* ── LANDING ── */
.vt-landing{background:radial-gradient(1000px 600px at 80% -10%, #1a2d52 0,transparent 55%),radial-gradient(800px 500px at 10% 110%, #2e1a55 0,transparent 50%),${C.bg};min-height:100vh;padding:0}
.vt-topbar{display:flex;justify-content:space-between;align-items:center;padding:18px 36px;border-bottom:1px solid ${C.line}}
.vt-topnav{display:flex;align-items:center;gap:22px;font-size:13.5px;color:${C.muted}}
.vt-topnav a{cursor:pointer}.vt-topnav a:hover{color:${C.ink}}
.vt-cta{display:inline-flex;align-items:center;gap:8px;background:linear-gradient(135deg,${C.purple},${C.teal});color:#fff;border:none;padding:12px 20px;border-radius:11px;font-family:inherit;font-weight:600;font-size:14px;cursor:pointer;transition:.18s}
.vt-cta:hover{transform:translateY(-2px);box-shadow:0 12px 28px -10px ${C.purple}}
.vt-cta.sm{padding:9px 16px;font-size:13px}
.vt-cta.ghost{background:${C.panel};border:1px solid ${C.line};color:${C.ink}}
.vt-cta.full{width:100%;justify-content:center;margin-top:8px}
.vt-hero{display:grid;grid-template-columns:1fr 1fr;gap:30px;align-items:center;padding:50px 36px 30px;max-width:1280px;margin:0 auto}
@media(max-width:900px){.vt-hero{grid-template-columns:1fr;text-align:center}}
.vt-hero h1{font-size:clamp(34px,5vw,52px);line-height:1.05;font-weight:700;letter-spacing:-.02em}
.grad{background:linear-gradient(90deg,${C.teal},${C.blue});-webkit-background-clip:text;background-clip:text;color:transparent}
.grad2{background:linear-gradient(90deg,${C.purple},${C.pink});-webkit-background-clip:text;background-clip:text;color:transparent}
.vt-hero p{color:${C.muted};font-size:16px;line-height:1.6;margin:20px 0;max-width:46ch}
.vt-hero-btns{display:flex;gap:12px;flex-wrap:wrap}
@media(max-width:900px){.vt-hero-btns{justify-content:center}}
.vt-trust{margin-top:30px}.vt-trust span{font-size:11px;text-transform:uppercase;letter-spacing:.14em;color:${C.muted}}
.vt-trust div{display:flex;gap:18px;flex-wrap:wrap;margin-top:10px}
.vt-trust em{font-style:normal;color:${C.muted};font-weight:600;font-size:13px;opacity:.7}
.vt-hero-r{display:grid;place-items:center}
.vt-twin-stage{position:relative;padding:20px}
.vt-float{position:absolute;background:${C.panel2}dd;border:1px solid ${C.line};border-radius:12px;padding:10px 13px;font-size:12px;backdrop-filter:blur(8px);display:flex;align-items:center;gap:7px;box-shadow:0 8px 24px -10px #000}
.vt-float b{font-size:22px;color:${C.teal}}.vt-float span{display:block;font-size:10px;color:${C.muted}}
.vt-float-1{top:20px;right:-10px;flex-direction:column;align-items:flex-start}
.vt-float-2{top:46%;left:-20px}.vt-float-3{bottom:40px;right:0}

.vt-feat-row{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;padding:20px 36px;max-width:1280px;margin:0 auto}
@media(max-width:900px){.vt-feat-row{grid-template-columns:1fr 1fr}}
.vt-feat{background:linear-gradient(180deg,${C.panel2},${C.panel});border:1px solid ${C.line};border-radius:14px;padding:18px;cursor:pointer;color:${C.ink};font-family:inherit;text-align:left;transition:.18s}
.vt-feat:hover{transform:translateY(-3px);border-color:${C.teal}}
.vt-feat-ic{width:42px;height:42px;border-radius:11px;background:linear-gradient(135deg,${C.purple}33,${C.teal}33);display:grid;place-items:center;color:${C.teal};margin-bottom:12px}
.vt-feat b{display:block;font-size:14px}.vt-feat small{color:${C.muted};font-size:11.5px}

.vt-how{padding:40px 36px;max-width:1280px;margin:0 auto}
.vt-how h2{font-size:24px;margin-bottom:24px}
.vt-how-row{display:flex;align-items:center;gap:6px;flex-wrap:wrap;justify-content:space-between}
.vt-step{text-align:center;flex:1;min-width:120px}
.vt-step-ic{width:54px;height:54px;border-radius:50%;background:linear-gradient(135deg,${C.purple}33,${C.teal}33);border:1px solid ${C.line};display:grid;place-items:center;color:${C.teal};margin:0 auto 10px}
.vt-step b{display:block;font-size:13px}.vt-step small{color:${C.muted};font-size:11px}
.vt-step-arrow{color:${C.muted};flex:none}

.vt-tech{display:grid;grid-template-columns:1.4fr 1fr;gap:20px;padding:20px 36px 40px;max-width:1280px;margin:0 auto}
@media(max-width:900px){.vt-tech{grid-template-columns:1fr}}
.vt-tech-block,.vt-vision{background:linear-gradient(180deg,${C.panel2},${C.panel});border:1px solid ${C.line};border-radius:16px;padding:22px}
.vt-tech h3,.vt-vision h3{font-size:17px;margin-bottom:16px}
.vt-tech-grid{display:grid;grid-template-columns:repeat(5,1fr);gap:14px}
@media(max-width:700px){.vt-tech-grid{grid-template-columns:1fr 1fr}}
.vt-tech-grid>div{display:flex;flex-direction:column;gap:7px}
.vt-tech-grid b{font-size:12.5px;color:${C.teal};margin-bottom:3px}
.vt-tech-grid span{font-size:12px;color:${C.muted}}
.vt-vision p{color:${C.muted};line-height:1.6;font-size:13.5px}
.vt-mono{margin-top:18px}.vt-mono>b{font-size:13px;display:block;margin-bottom:10px}
.vt-mono>div{display:flex;justify-content:space-between;padding:8px 0;border-bottom:1px solid ${C.line};font-size:12.5px}
.vt-mono small{color:${C.muted}}

.vt-trustbar{display:grid;grid-template-columns:repeat(5,1fr);gap:16px;padding:24px 36px;border-top:1px solid ${C.line};max-width:1280px;margin:0 auto}
@media(max-width:900px){.vt-trustbar{grid-template-columns:1fr 1fr}}
.vt-trustbar>div{display:flex;gap:10px;align-items:center}
.vt-trustbar b{font-size:12.5px;display:block}.vt-trustbar small{font-size:11px;color:${C.muted}}
.vt-disc{justify-content:center;margin:0 36px 30px;border-radius:0}
`;
