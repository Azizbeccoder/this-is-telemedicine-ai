import React, { useState, useRef, useEffect } from "react";
import {
  Heart, Brain, Activity, Wind, Stethoscope, LayoutDashboard, LineChart as LineIcon,
  Boxes, Radio, MessageSquare, Settings, Bell, Search, Shield, Play, Sparkles, 
  TrendingUp, TrendingDown, ChevronRight, Send, Loader2, Droplet, Footprints, Flame, Moon, 
  Zap, User, CheckCircle2, AlertCircle, Smartphone
} from "lucide-react";
import {
  LineChart, Line, AreaChart, Area, ResponsiveContainer, XAxis, YAxis, Tooltip, Legend,
  PieChart, Pie, Cell, BarChart, Bar, RadialBarChart, RadialBar
} from "recharts";
import "./styles.css";

const C = {
  bg: "#080d18", panel: "#0d1424", panel2: "#111a30", line: "#1e2a45",
  ink: "#e8eefc", muted: "#7e8db5", teal: "#2ee6c8", purple: "#8b6cf0",
  pink: "#f25c9a", blue: "#4d8dff", green: "#3ddb8f", amber: "#f5b94a", red: "#ff5e6c",
};

const trend = (base, n, amp) => Array.from({ length: n }, (_, i) => ({
  x: i, v: Math.round(base + Math.sin(i / 1.7) * amp + (Math.random() - 0.5) * amp * 0.8),
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

const Spark = ({ data, color }) => (
  <ResponsiveContainer width="100%" height={34}>
    <LineChart data={data}><Line type="monotone" dataKey="v" stroke={color} strokeWidth={2} dot={false} /></LineChart>
  </ResponsiveContainer>
);

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

const NAV = [
  { id: "landing", label: "Landing", icon: Sparkles },
  { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
  { id: "progress", label: "Progress", icon: TrendingUp },
  { id: "vitals", label: "Vitals & Weight", icon: Activity },
  { id: "appointments", label: "Appointments", icon: Bell },
  { id: "treatment", label: "Treatment Simulator", icon: Zap },
  { id: "symptoms", label: "Symptoms", icon: Brain },
  { id: "sideeffects", label: "Side Effects", icon: AlertCircle },
  { id: "interactions", label: "Drug Checker", icon: Shield },
  { id: "meals", label: "Meals", icon: Droplet },
  { id: "reminders", label: "Reminders", icon: Bell },
  { id: "settings", label: "Settings", icon: Settings },
  { id: "twin", label: "Digital Twin", icon: Boxes },
  { id: "diagnosis", label: "AI Diagnosis", icon: Stethoscope },
];

function TopBar({ title, subtitle }) {
  return (
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
      <div>
        <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>{title}</h2>
        {subtitle && <p style={{ margin: "6px 0 0 0", fontSize: 13, color: C.muted }}>{subtitle}</p>}
      </div>
      <div style={{ display: "flex", gap: 10, alignItems: "center" }}>
        <div style={{ display: "flex", alignItems: "center", gap: 7, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 9, padding: "7px 11px" }}>
          <Search size={14} /><input placeholder="Search..." style={{ background: "none", border: "none", outline: "none", color: C.ink, fontFamily: "inherit", fontSize: 13, width: 150 }} />
        </div>
        <button style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.muted, width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", cursor: "pointer" }}><Bell size={16} /></button>
        <button style={{ background: C.panel, border: `1px solid ${C.line}`, color: C.muted, width: 34, height: 34, borderRadius: 9, display: "grid", placeItems: "center", cursor: "pointer" }}><Settings size={16} /></button>
      </div>
    </div>
  );
}

function Card({ title, children, style }) {
  return (
    <div style={{ background: `linear-gradient(180deg, ${C.panel2}, ${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 16, padding: 20, ...style }}>
      {title && <h3 style={{ margin: "0 0 16px 0", fontSize: 15, fontWeight: 600 }}>{title}</h3>}
      {children}
    </div>
  );
}

function Navigation({ go }) {
  return (
    <nav className="vt-navbar">
      <div className="vt-navbar-content">
        <button className="vt-logo-btn" onClick={() => go("landing")}>
          <Heart size={24} fill={C.pink} stroke={C.pink} />
          <span>Vita<b>Twin</b> AI</span>
        </button>
        <div className="vt-nav-menu">
          <button onClick={() => go("features")} className="vt-nav-link">Features</button>
          <button onClick={() => go("technology")} className="vt-nav-link">Technology</button>
          <button onClick={() => go("about")} className="vt-nav-link">About</button>
        </div>
        <button className="vt-nav-cta" onClick={() => go("dashboard")}>
          Launch <ChevronRight size={16} />
        </button>
      </div>
    </nav>
  );
}

function Dashboard() {
  const organs = [
    { i: Heart, n: "Heart", v: "98%", s: "Healthy", c: C.pink },
    { i: Brain, n: "Brain", v: "96%", s: "Healthy", c: C.purple },
    { i: Wind, n: "Lungs", v: "94%", s: "Healthy", c: C.teal },
    { i: Shield, n: "Immune", v: "90%", s: "Strong", c: C.green },
  ];

  const metrics = [
    { t: "Health Score", v: "87", s: "Excellent", c: C.teal },
    { t: "Age Estimate", v: "28", s: "Actual: 24", c: C.purple },
    { t: "Risk Level", v: "Low", s: "Keep going!", c: C.green },
    { t: "Conditions", v: "0", s: "None", c: C.blue },
  ];

  return (
    <>
      <TopBar title="Dashboard" subtitle="Your health at a glance" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {metrics.map((m) => (
          <Card key={m.t}>
            <small style={{ color: C.muted, fontSize: 11 }}>{m.t}</small>
            <b style={{ display: "block", fontSize: 26, margin: "6px 0 4px", color: m.c }}>{m.v}</b>
            <span style={{ fontSize: 12, color: C.muted }}>{m.s}</span>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 24 }}>
        <Card title="Digital Twin Status">
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <TwinFigure size={180} />
            <div style={{ flex: 1 }}>
              {organs.map((o) => (
                <div key={o.n} style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 10, padding: "10px", background: C.panel, borderRadius: 8 }}>
                  <o.i size={14} color={o.c} />
                  <div style={{ flex: 1 }}>
                    <b style={{ fontSize: 12, display: "block" }}>{o.n}</b>
                    <small style={{ color: C.muted, fontSize: 11 }}>{o.v} · {o.s}</small>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <Card title="Today's Activity">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontSize: 13 }}><Footprints size={14} style={{ marginRight: 8 }} />Steps</span>
              <b>8,432 <em style={{ color: C.muted, fontSize: 12 }}>/10,000</em></b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontSize: 13 }}><Flame size={14} style={{ marginRight: 8 }} />Calories</span>
              <b>1,234 <em style={{ color: C.muted, fontSize: 12 }}>/2,000</em></b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0", borderBottom: `1px solid ${C.line}` }}>
              <span style={{ fontSize: 13 }}><Moon size={14} style={{ marginRight: 8 }} />Sleep</span>
              <b>7h 45m</b>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "10px 0" }}>
              <span style={{ fontSize: 13 }}><Zap size={14} style={{ marginRight: 8 }} />Stress</span>
              <b style={{ color: C.green }}>Low</b>
            </div>
          </div>
        </Card>
      </div>

      <Card title="Weekly Health Trend">
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={healthTrend}>
            <XAxis dataKey="day" stroke={C.muted} fontSize={11} />
            <YAxis stroke={C.muted} fontSize={11} />
            <Tooltip contentStyle={{ background: C.panel2, border: `1px solid ${C.line}`, borderRadius: 8 }} />
            <Legend />
            <Line type="monotone" dataKey="heart" stroke={C.pink} strokeWidth={2} name="Heart Rate" />
            <Line type="monotone" dataKey="sleep" stroke={C.purple} strokeWidth={2} name="Sleep Quality" />
          </LineChart>
        </ResponsiveContainer>
      </Card>
    </>
  );
}

function Diagnosis() {
  const [tab, setTab] = useState("Analysis");
  const steps = [
    { s: "Symptom Analysis", st: "Completed" },
    { s: "AI Processing", st: "Completed" },
    { s: "Deep Scan", st: "In Progress" },
    { s: "Cross-Check", st: "Pending" },
  ];
  const findings = [
    { n: "Viral Pneumonia", p: 86, c: C.red },
    { n: "Bronchitis", p: 45, c: C.amber },
    { n: "Cold / Flu", p: 23, c: C.blue },
  ];

  return (
    <>
      <TopBar title="AI Diagnosis" subtitle="Symptom analysis & predictions" />
      <div style={{ display: "flex", gap: 6, marginBottom: 20 }}>
        {["Symptoms", "Analysis", "Results", "Recommendations"].map((t) => (
          <button key={t} onClick={() => setTab(t)} style={{ background: tab === t ? `linear-gradient(90deg,${C.purple},${C.teal})` : C.panel, color: tab === t ? "#fff" : C.muted, padding: "8px 16px", borderRadius: 8, border: `1px solid ${tab === t ? "transparent" : C.line}`, cursor: "pointer", fontFamily: "inherit", fontSize: 13, fontWeight: 600 }}>
            {t}
          </button>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Analysis Progress">
          {steps.map(({ s, st }) => (
            <div key={s} style={{ display: "flex", gap: 10, alignItems: "center", marginBottom: 14 }}>
              <div style={{ width: 24, height: 24, borderRadius: "50%", display: "grid", placeItems: "center", border: `1px solid ${st === "Completed" ? C.green : st === "In Progress" ? C.amber : C.line}`, background: st === "Completed" ? `${C.green}22` : st === "In Progress" ? `${C.amber}22` : "transparent", color: st === "Completed" ? C.green : st === "In Progress" ? C.amber : C.muted }}>
                {st === "Completed" ? <CheckCircle2 size={14} /> : st === "In Progress" ? <Loader2 size={14} className="spin" style={{ animation: "spin 1s linear infinite" }} /> : ""}
              </div>
              <div>
                <b style={{ fontSize: 13, display: "block" }}>{s}</b>
                <small style={{ color: C.muted, fontSize: 11 }}>{st}</small>
              </div>
            </div>
          ))}
        </Card>

        <Card title="Top Findings">
          {findings.map(({ n, p, c }) => (
            <div key={n} style={{ marginBottom: 14 }}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <b style={{ fontSize: 13 }}>{n}</b>
                <span style={{ color: c, fontWeight: 600 }}>{p}%</span>
              </div>
              <div style={{ height: 7, background: C.line, borderRadius: 6, overflow: "hidden" }}>
                <div style={{ width: `${p}%`, height: "100%", background: `linear-gradient(90deg,${c},${C.blue})`, borderRadius: 6 }} />
              </div>
            </div>
          ))}
          <button style={{ width: "100%", padding: "10px", marginTop: 16, background: `linear-gradient(135deg,${C.purple},${C.teal})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14 }}>
            View Full Report
          </button>
        </Card>
      </div>
    </>
  );
}

function Twin() {
  const [active, setActive] = useState(0);
  const [run, setRun] = useState(false);

  const scenarios = [
    { i: TrendingDown, t: "Weight Loss", s: "Fitness Plan" },
    { i: Zap, t: "High Stress", s: "Work Pressure" },
    { i: Moon, t: "Better Sleep", s: "8+ Hours" },
    { i: Droplet, t: "New Medication", s: "Treatment" },
  ];

  const results = [
    ["Energy", run ? "+25%" : "—"],
    ["Immunity", run ? "+18%" : "—"],
    ["Heart Health", run ? "+20%" : "—"],
    ["Mental Clarity", run ? "+30%" : "—"],
  ];

  return (
    <>
      <TopBar title="Digital Twin" subtitle="Simulate health scenarios" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1.2fr 1fr", gap: 16 }}>
        <Card title="Simulate Scenarios">
          {scenarios.map((s, i) => (
            <button key={s.t} onClick={() => { setActive(i); setRun(false); }} style={{ width: "100%", display: "flex", gap: 10, alignItems: "center", background: active === i ? `linear-gradient(90deg,${C.teal}22,transparent)` : C.panel, color: C.ink, border: `1px solid ${active === i ? C.teal : C.line}`, padding: 12, borderRadius: 10, cursor: "pointer", marginBottom: 10, fontFamily: "inherit", textAlign: "left", transition: ".2s" }}>
              <s.i size={18} />
              <div>
                <b style={{ fontSize: 13, display: "block" }}>{s.t}</b>
                <small style={{ color: C.muted, fontSize: 11 }}>{s.s}</small>
              </div>
            </button>
          ))}
        </Card>

        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center" }}>
          <TwinFigure size={260} />
          <button onClick={() => setRun(true)} style={{ marginTop: 16, padding: "12px 24px", background: `linear-gradient(135deg,${C.purple},${C.teal})`, color: "#fff", border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14, display: "flex", alignItems: "center", gap: 8 }}>
            <Play size={14} /> Run Simulation
          </button>
        </Card>

        <Card title="Results">
          {results.map(([t, v]) => (
            <div key={t} style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px", background: C.panel, borderRadius: 8, marginBottom: 10, fontSize: 13 }}>
              <span>{t}</span>
              <b style={{ color: run ? C.green : C.muted }}>{v}</b>
            </div>
          ))}
        </Card>
      </div>
    </>
  );
}

function Analytics() {
  const metrics = [
    { t: "Heart Rate", v: "72", u: "bpm", c: C.pink },
    { t: "Blood O₂", v: "98", u: "%", c: C.teal },
    { t: "Stress", v: "Low", u: "", c: C.amber },
    { t: "Sleep", v: "7.5h", u: "avg", c: C.purple },
  ];

  return (
    <>
      <TopBar title="Analytics" subtitle="Health insights & trends" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 24 }}>
        {metrics.map((m) => (
          <Card key={m.t}>
            <small style={{ color: C.muted, fontSize: 11 }}>{m.t}</small>
            <b style={{ display: "block", fontSize: 24, margin: "8px 0 6px" }}>{m.v}</b>
            {m.u && <em style={{ fontSize: 12, color: C.muted }}>{m.u}</em>}
            <div style={{ marginTop: 10 }}>
              <Spark data={Array.from({ length: 12 }, (_, i) => ({ v: Math.random() * 20 + 70 }))} color={m.c} />
            </div>
          </Card>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <Card title="Health Trend (7 days)">
          <ResponsiveContainer width="100%" height={260}>
            <LineChart data={healthTrend}>
              <XAxis dataKey="day" stroke={C.muted} fontSize={11} />
              <YAxis stroke={C.muted} fontSize={11} />
              <Tooltip contentStyle={{ background: C.panel2, border: `1px solid ${C.line}` }} />
              <Line type="monotone" dataKey="heart" stroke={C.pink} strokeWidth={2} dot={false} />
              <Line type="monotone" dataKey="stress" stroke={C.amber} strokeWidth={2} dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </Card>

        <Card title="Health Distribution">
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={distribution} dataKey="v" nameKey="name" innerRadius={50} outerRadius={90} paddingAngle={3}>
                {distribution.map((d) => <Cell key={d.name} fill={d.c} />)}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </Card>
      </div>
    </>
  );
}

function Monitoring() {
  const [vitals, setVitals] = useState({ hr: 72, o2: 98 });

  useEffect(() => {
    const t = setInterval(() => setVitals((v) => ({
      hr: 68 + Math.round(Math.random() * 10),
      o2: 97 + Math.round(Math.random() * 2),
    })), 2000);
    return () => clearInterval(t);
  }, []);

  return (
    <>
      <TopBar title="Real-Time Monitoring" subtitle={<span style={{ color: C.green }}>● LIVE</span>} />

      <div style={{ display: "grid", gridTemplateColumns: "300px 1fr", gap: 16 }}>
        <Card style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 12 }}>
          <Heart size={100} fill={C.red} stroke={C.red} />
          <b style={{ fontSize: 28 }}>{vitals.hr} bpm</b>
          <small style={{ color: C.muted }}>Heart Rate</small>
        </Card>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
          <Card title="Blood Oxygen">
            <b style={{ fontSize: 24, display: "block", marginBottom: 10 }}>{vitals.o2}%</b>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ v: vitals.o2 + Math.random() * 2 - 1 }))}>
                <Area type="monotone" dataKey="v" stroke={C.teal} fill={C.teal} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>

          <Card title="Temperature">
            <b style={{ fontSize: 24, display: "block", marginBottom: 10 }}>36.8°C</b>
            <ResponsiveContainer width="100%" height={80}>
              <AreaChart data={Array.from({ length: 20 }, (_, i) => ({ v: 36.5 + Math.random() * 0.6 }))}>
                <Area type="monotone" dataKey="v" stroke={C.amber} fill={C.amber} fillOpacity={0.2} />
              </AreaChart>
            </ResponsiveContainer>
          </Card>
        </div>
      </div>
    </>
  );
}

const ANTHROPIC_ENDPOINT = "/api/anthropic";
const SYS = "You are VitaTwin AI, a friendly health assistant. Give helpful wellness info in a warm tone. Demo assistant — not medical advice.";

function Assistant() {
  const [msgs, setMsgs] = useState([{ role: "assistant", content: "👋 Hi! I'm your VitaTwin AI assistant. Ask me anything about your health.\n\n*(Demo — not medical advice)*" }]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const endRef = useRef(null);

  useEffect(() => endRef.current?.scrollIntoView({ behavior: "smooth" }), [msgs, busy]);

  const send = async (text) => {
    const q = (text ?? input).trim();
    if (!q || busy) return;
    const next = [...msgs, { role: "user", content: q }];
    setMsgs(next);
    setInput("");
    setBusy(true);

    try {
      const res = await fetch(ANTHROPIC_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system: SYS,
          messages: next.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      if (!res.ok) throw new Error(`API ${res.status}`);
      const data = await res.json();
      setMsgs((p) => [...p, { role: "assistant", content: data.message || "No response" }]);
    } catch (e) {
      setMsgs((p) => [...p, { role: "assistant", content: `⚠️ Error: ${e.message}` }]);
    }
    setBusy(false);
  };

  return (
    <>
      <TopBar title="AI Health Assistant" subtitle="Ask anything about your wellness" />
      <Card style={{ display: "flex", flexDirection: "column", height: "calc(100vh - 220px)" }}>
        <div style={{ display: "flex", gap: 10, alignItems: "center", paddingBottom: 14, borderBottom: `1px solid ${C.line}` }}>
          <Brain size={18} color={C.teal} />
          <div>
            <b style={{ fontSize: 14 }}>VitaTwin Assistant</b>
            <small style={{ color: C.green, display: "block" }}>● Online</small>
          </div>
        </div>

        <div style={{ flex: 1, overflowY: "auto", padding: "16px 0", display: "flex", flexDirection: "column", gap: 12 }}>
          {msgs.map((m, i) => (
            <div key={i} style={{ display: "flex", gap: 8, maxWidth: "85%", ...(m.role === "user" && { marginLeft: "auto", flexDirection: "row-reverse" }) }}>
              {m.role === "assistant" && <Brain size={14} color={C.teal} style={{ flex: "none", marginTop: 4 }} />}
              <div style={{ background: m.role === "user" ? `linear-gradient(135deg,${C.purple},${C.blue})` : C.panel, color: m.role === "user" ? "#fff" : C.ink, padding: "10px 14px", borderRadius: 12, fontSize: 13, lineHeight: 1.5, wordBreak: "break-word", border: m.role === "user" ? "none" : `1px solid ${C.line}` }}>
                {m.content}
              </div>
            </div>
          ))}
          {busy && (
            <div style={{ display: "flex", gap: 8, maxWidth: "85%" }}>
              <Brain size={14} color={C.teal} style={{ flex: "none", marginTop: 4 }} />
              <div style={{ background: C.panel, color: C.muted, padding: "10px 14px", borderRadius: 12, display: "flex", alignItems: "center", gap: 8, border: `1px solid ${C.line}` }}>
                <Loader2 size={14} style={{ animation: "spin 1s linear infinite" }} /> thinking…
              </div>
            </div>
          )}
          <div ref={endRef} />
        </div>

        <div style={{ display: "flex", gap: 10, paddingTop: 14, borderTop: `1px solid ${C.line}` }}>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && send()}
            placeholder="Ask anything…"
            disabled={busy}
            style={{ flex: 1, background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, padding: "12px 14px", color: C.ink, fontFamily: "inherit", fontSize: 13, outline: "none" }}
          />
          <button
            onClick={() => send()}
            disabled={busy || !input.trim()}
            style={{ width: 46, height: 46, background: `linear-gradient(135deg,${C.teal},${C.blue})`, border: "none", borderRadius: 10, color: "#000", cursor: "pointer", display: "grid", placeItems: "center" }}
          >
            {busy ? <Loader2 size={16} style={{ animation: "spin 1s linear infinite" }} /> : <Send size={16} />}
          </button>
        </div>
      </Card>
    </>
  );
}

function Login({ go }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    localStorage.setItem("user", JSON.stringify({ email, name: email.split("@")[0] }));
    go("dashboard");
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg,${C.bg},${C.panel})` }}>
      <Card style={{ maxWidth: 400, width: "90%" }}>
        <h2 style={{ textAlign: "center", marginBottom: 24 }}>Login to VitaTwin AI</h2>
        <div style={{ marginBottom: 16 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 500 }}>Email</label>
          <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "10px 12px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", outline: "none" }} />
        </div>
        <div style={{ marginBottom: 20 }}>
          <label style={{ display: "block", marginBottom: 6, fontSize: 13, fontWeight: 500 }}>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "10px 12px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", outline: "none" }} />
        </div>
        <button onClick={handleLogin} style={{ width: "100%", padding: "12px", background: `linear-gradient(135deg,${C.purple},${C.teal})`, color: "#fff", border: "none", borderRadius: 8, fontWeight: 600, cursor: "pointer", fontFamily: "inherit" }}>
          Sign In
        </button>
        <p style={{ textAlign: "center", marginTop: 16, fontSize: 13, color: C.muted }}>
          Demo: Use any email • Try email@example.com
        </p>
      </Card>
    </div>
  );
}

export default function VitaTwinAI() {
  const [view, setView] = useState("dashboard");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser(userData);
    setView("profile");
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUser(null);
    setView("landing");
  };

  const handleGoToDashboard = () => {
    if (!user) {
      setView("login");
    } else {
      setView("dashboard");
    }
  };

  return (
    <div style={{ fontFamily: "'Outfit', sans-serif", background: C.bg, color: C.ink, minHeight: "100vh" }}>
      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
      <div style={{ display: "flex", minHeight: "100vh" }}>
        {view !== "landing" && view !== "login" && (
          <aside style={{ width: 212, flex: "none", background: C.panel, borderRight: `1px solid ${C.line}`, padding: "18px 12px", display: "flex", flexDirection: "column", gap: 6, position: "sticky", top: 0, height: "100vh", overflowY: "auto" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 16, fontWeight: 600, padding: "6px 8px 16px" }}>
              <Heart size={20} fill={C.pink} stroke={C.pink} /><span>Vita<b style={{ color: C.teal }}>Twin</b></span>
            </div>
            <nav style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <button onClick={() => setView("profile")} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: view === "profile" ? `linear-gradient(90deg,${C.purple}33,${C.teal}22)` : "none", color: view === "profile" ? C.ink : C.muted, padding: "10px 12px", borderRadius: 10, cursor: "pointer", fontSize: "13.5px", fontFamily: "inherit", border: "none", textAlign: "left", transition: ".15s", boxShadow: view === "profile" ? `inset 2px 0 0 ${C.teal}` : "none" }}>
                <User size={17} /> <span>My Profile</span>
              </button>
              {NAV.map((n) => (
                <button key={n.id} onClick={() => setView(n.id)} style={{ display: "flex", alignItems: "center", gap: 10, width: "100%", background: view === n.id ? `linear-gradient(90deg,${C.purple}33,${C.teal}22)` : "none", color: view === n.id ? C.ink : C.muted, padding: "10px 12px", borderRadius: 10, cursor: "pointer", fontSize: "13.5px", fontFamily: "inherit", border: "none", textAlign: "left", transition: ".15s", boxShadow: view === n.id ? `inset 2px 0 0 ${C.teal}` : "none" }}>
                  <n.icon size={17} /> <span>{n.label}</span>
                </button>
              ))}
            </nav>
          </aside>
        )}
        <main style={{ flex: 1, padding: view === "landing" || view === "login" ? 0 : "26px", overflowX: "hidden", overflowY: "auto" }}>
          {view === "dashboard" && <Dashboard />}
          {view === "twin" && <Twin />}
          {view === "diagnosis" && <Diagnosis />}
        </main>
      </div>
    </div>
  );
}
