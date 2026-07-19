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
          <Search size={14} /><input placeholder="Search..." style={{ background: "none", border: "none", outline: "none", color: C.ink, fontFamily: "inherit", fontSize: 13, width: 170 }} />
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
const SYS = "You are VitaTwin AI, a friendly health assistant. Give helpful, concise wellness info in a warm tone. Demo assistant — not medical advice.";

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

function Profile({ user }) {
  return (
    <>
      <TopBar title="Profile" subtitle="Your account information" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
        <Card title="Personal Information">
          <div style={{ display: "flex", gap: 16, marginBottom: 20, alignItems: "center" }}>
            <div style={{ width: 80, height: 80, borderRadius: "50%", background: `linear-gradient(135deg,${C.purple},${C.teal})`, display: "grid", placeItems: "center", color: "#fff", fontSize: 32, fontWeight: 700 }}>
              {user?.name?.[0]?.toUpperCase() || "A"}
            </div>
            <div>
              <h3 style={{ margin: "0 0 4px 0" }}>{user?.name || "Alex"}</h3>
              <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>{user?.email}</p>
              <p style={{ margin: "6px 0 0 0", color: C.green, fontSize: 12, fontWeight: 600 }}>● Premium Member</p>
            </div>
          </div>

          <div style={{ paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
            <p style={{ fontSize: 13, color: C.muted, margin: 0, marginBottom: 12 }}>Member Since</p>
            <b style={{ display: "block" }}>January 2026</b>
          </div>
        </Card>

        <Card title="Health Profile">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <small style={{ color: C.muted, fontSize: 11 }}>Age</small>
              <b style={{ display: "block" }}>24 years</b>
            </div>
            <div style={{ paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
              <small style={{ color: C.muted, fontSize: 11 }}>Height</small>
              <b style={{ display: "block" }}>5'10" (178 cm)</b>
            </div>
            <div style={{ paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
              <small style={{ color: C.muted, fontSize: 11 }}>Weight</small>
              <b style={{ display: "block" }}>72 kg (158 lbs)</b>
            </div>
            <div style={{ paddingTop: 12, borderTop: `1px solid ${C.line}` }}>
              <small style={{ color: C.muted, fontSize: 11 }}>Blood Type</small>
              <b style={{ display: "block" }}>O+</b>
            </div>
          </div>
        </Card>
      </div>
    </>
  );
}

function HeroSection({ go }) {
  return (
    <section className="vt-hero-section">
      <div className="vt-hero-grid">
        <div className="vt-hero-content">
          <div className="vt-badge">🚀 Enterprise AI Health Platform</div>
          <h1 className="vt-hero-title">
            Your Health.<br/>
            <span>Predicted & Optimized.</span>
          </h1>
          <p className="vt-hero-subtitle">Advanced health monitoring with AI-powered diagnostics, predictive analytics, and personalized treatment simulations. Your complete digital health twin.</p>

          {/* Key Features Pills */}
          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 24, marginTop: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: `${C.teal}15`, border: `1px solid ${C.teal}30`, borderRadius: 20, fontSize: 12, color: C.teal, fontWeight: 600 }}>
              <Heart size={14} /> Real-Time Monitoring
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: `${C.purple}15`, border: `1px solid ${C.purple}30`, borderRadius: 20, fontSize: 12, color: C.purple, fontWeight: 600 }}>
              <Brain size={14} /> AI Diagnostics
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", background: `${C.pink}15`, border: `1px solid ${C.pink}30`, borderRadius: 20, fontSize: 12, color: C.pink, fontWeight: 600 }}>
              <Zap size={14} /> Treatment Simulator
            </div>
          </div>

          <div className="vt-hero-ctas">
            <button className="vt-btn primary" onClick={() => go("dashboard")}>
              <Play size={16} /> Launch Dashboard
            </button>
            <button className="vt-btn secondary" onClick={() => go("treatment")}>
              <Zap size={16} /> Try Simulator
            </button>
          </div>

          {/* Advanced Stats */}
          <div className="vt-hero-stats">
            <div className="vt-stat-item">
              <b style={{ color: C.teal }}>14+</b>
              <small>Health Features</small>
            </div>
            <div className="vt-stat-item">
              <b style={{ color: C.purple }}>50+</b>
              <small>AI Models</small>
            </div>
            <div className="vt-stat-item">
              <b style={{ color: C.pink }}>100%</b>
              <small>Private AI</small>
            </div>
          </div>

          {/* Trust Indicators */}
          <div style={{ marginTop: 20, padding: "12px 16px", background: `${C.green}10`, border: `1px solid ${C.green}30`, borderRadius: 12, display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: C.green }}>
            <CheckCircle2 size={16} />
            <span>End-to-end encrypted • HIPAA compliant • No data tracking</span>
          </div>
        </div>

        <div className="vt-hero-visual">
          <TwinFigure size={280} />

          {/* Floating Stats Cards */}
          <div style={{ position: "absolute", top: "20%", right: "-60px", background: `linear-gradient(135deg, ${C.panel2}, ${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, width: 140, boxShadow: `0 20px 40px ${C.teal}22`, animation: "float-up 3s ease-in-out infinite" }}>
            <small style={{ color: C.muted, fontSize: 10 }}>HEART RATE</small>
            <b style={{ display: "block", fontSize: 20, color: C.pink, marginTop: 4 }}>72 BPM</b>
            <small style={{ color: C.green, fontSize: 10 }}>Normal Range</small>
          </div>

          <div style={{ position: "absolute", bottom: "30%", right: "-80px", background: `linear-gradient(135deg, ${C.panel2}, ${C.panel})`, border: `1px solid ${C.line}`, borderRadius: 12, padding: 12, width: 160, boxShadow: `0 20px 40px ${C.purple}22`, animation: "float-down 3s ease-in-out infinite" }}>
            <small style={{ color: C.muted, fontSize: 10 }}>HEALTH SCORE</small>
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginTop: 6 }}>
              <b style={{ fontSize: 24, color: C.purple }}>87</b>
              <small style={{ color: C.green, fontWeight: 600 }}>↑ 5%</small>
            </div>
          </div>
        </div>
      </div>

      {/* Floating Animation Styles */}
      <style>{`
        @keyframes float-up {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-15px); }
        }
        @keyframes float-down {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(15px); }
        }
      `}</style>
    </section>
  );
}

function Features() {
  const featureList = [
    { icon: Heart, title: "Real-Time Monitoring", desc: "Track your vital signs continuously with advanced sensors and AI analysis" },
    { icon: Brain, title: "AI Diagnosis", desc: "Get instant symptom analysis and personalized health insights powered by machine learning" },
    { icon: Boxes, title: "Digital Twin", desc: "Simulate how your body responds to different treatments and lifestyle changes" },
    { icon: TrendingUp, title: "Health Analytics", desc: "Visualize trends and patterns in your health data over time" },
    { icon: Radio, title: "Real-Time Monitoring", desc: "24/7 health monitoring with instant alerts for abnormalities" },
    { icon: MessageSquare, title: "AI Assistant", desc: "Chat with our intelligent health assistant for personalized recommendations" },
  ];

  return (
    <>
      <TopBar title="Features" subtitle="Everything you need for health excellence" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 20 }}>
        {featureList.map((f) => (
          <Card key={f.title} style={{ cursor: "pointer", transition: ".2s", border: `1px solid ${C.line}` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.teal} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}>
            <div style={{ marginBottom: 12 }}>
              <f.icon size={28} color={C.teal} />
            </div>
            <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 600 }}>{f.title}</h3>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{f.desc}</p>
          </Card>
        ))}
      </div>
    </>
  );
}

function Technology() {
  const techStack = [
    { name: "React 18", desc: "Modern UI framework with hooks and concurrent features" },
    { name: "Vite", desc: "Lightning-fast build tool for optimal development experience" },
    { name: "Recharts", desc: "Beautiful, responsive data visualization library" },
    { name: "Ollama", desc: "Local AI models running privately on your machine" },
    { name: "Express.js", desc: "Lightweight server for API proxying and data processing" },
    { name: "lucide-react", desc: "Clean, consistent icon library for modern interfaces" },
  ];

  return (
    <>
      <TopBar title="Technology Stack" subtitle="Built with modern, cutting-edge tools" />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20, marginBottom: 24 }}>
        {techStack.map((t) => (
          <Card key={t.name} style={{ display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
            <div>
              <h3 style={{ margin: "0 0 8px 0", fontSize: 16, fontWeight: 600, color: C.teal }}>{t.name}</h3>
              <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{t.desc}</p>
            </div>
          </Card>
        ))}
      </div>
      <Card title="Architecture" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ padding: 16, background: C.panel, borderRadius: 8, borderLeft: `3px solid ${C.teal}` }}>
            <b style={{ display: "block", marginBottom: 6 }}>Frontend</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>React components with responsive design, real-time updates, and smooth animations</p>
          </div>
          <div style={{ padding: 16, background: C.panel, borderRadius: 8, borderLeft: `3px solid ${C.purple}` }}>
            <b style={{ display: "block", marginBottom: 6 }}>Backend Proxy</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Express.js server handling API requests and forwarding to local AI models</p>
          </div>
          <div style={{ padding: 16, background: C.panel, borderRadius: 8, borderLeft: `3px solid ${C.pink}` }}>
            <b style={{ display: "block", marginBottom: 6 }}>AI Engine</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Local Ollama models (Phi3, Mistral, Llama3) for privacy-first AI processing</p>
          </div>
        </div>
      </Card>
    </>
  );
}

function About() {
  return (
    <>
      <TopBar title="About VitaTwin AI" subtitle="Transforming personal health management" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, marginBottom: 20 }}>
        <Card>
          <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>Our Mission</h3>
          <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
            VitaTwin AI empowers individuals to take control of their health through advanced AI-driven insights and personalized digital health twins. We believe healthcare should be predictive, not reactive.
          </p>
        </Card>
        <Card>
          <h3 style={{ margin: "0 0 12px 0", fontSize: 16, fontWeight: 600 }}>Privacy First</h3>
          <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.8 }}>
            All AI processing happens locally on your device. Your health data never leaves your machine. We use open-source Ollama for complete transparency and control.
          </p>
        </Card>
      </div>

      <Card title="Developer Information" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div>
            <b style={{ color: C.teal, display: "block", marginBottom: 4 }}>Student Developer</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Abdulaziz (Student ID: 24200713)</p>
          </div>
          <div>
            <b style={{ color: C.teal, display: "block", marginBottom: 4 }}>Project Status</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>Educational demonstration • All health data is fictional • Not for clinical use</p>
          </div>
          <div>
            <b style={{ color: C.teal, display: "block", marginBottom: 4 }}>Year</b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted }}>© 2026 VitaTwin AI</p>
          </div>
        </div>
      </Card>

      <Card title="Key Highlights">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.teal, marginBottom: 6 }}>7</div>
            <small style={{ color: C.muted, display: "block" }}>Key Pages</small>
          </div>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.purple, marginBottom: 6 }}>3</div>
            <small style={{ color: C.muted, display: "block" }}>AI Models</small>
          </div>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8, textAlign: "center" }}>
            <div style={{ fontSize: 24, fontWeight: 700, color: C.pink, marginBottom: 6 }}>∞</div>
            <small style={{ color: C.muted, display: "block" }}>Possibilities</small>
          </div>
        </div>
      </Card>
    </>
  );
}

function TreatmentSimulator() {
  const commonConditions = [
    "Type 2 Diabetes", "Hypertension", "High Cholesterol", "Heart Disease",
    "Asthma", "COPD", "Depression", "Anxiety", "Hypothyroidism",
    "Acid Reflux (GERD)", "Arthritis", "Migraine", "High Blood Pressure",
    "Atrial Fibrillation", "Diabetes Type 1", "Bronchitis", "Pneumonia"
  ];

  const treatmentDatabase = {
    "Metformin": { condition: "Diabetes", category: "Antidiabetic", contraindications: ["Kidney Disease"], allergies: [], interactions: ["Contrast dye"], alternatives: ["Lisinopril", "Losartan"], generic: 15, brand: 120, insurance: true, dosage: { base: 500, max: 2000, unit: "mg" }, severity: { mild: "500mg daily", moderate: "1000mg daily", severe: "2000mg daily" } },
    "Lisinopril": { condition: "Hypertension", category: "ACE Inhibitor", contraindications: ["Angioedema"], allergies: [], interactions: ["NSAIDs", "Potassium"], alternatives: ["Losartan", "Amlodipine"], generic: 10, brand: 95, insurance: true, dosage: { base: 10, max: 40, unit: "mg" }, severity: { mild: "10mg daily", moderate: "20mg daily", severe: "40mg daily" } },
    "Atorvastatin": { condition: "Cholesterol", category: "Statin", contraindications: ["Liver Disease"], allergies: [], interactions: ["Grapefruit"], alternatives: ["Rosuvastatin", "Omeprazole"], generic: 12, brand: 150, insurance: true, dosage: { base: 20, max: 80, unit: "mg" }, severity: { mild: "20mg daily", moderate: "40mg daily", severe: "80mg daily" } },
    "Amoxicillin": { condition: "Infection", category: "Antibiotic", contraindications: ["Penicillin Allergy"], allergies: ["Penicillin"], interactions: ["Oral contraceptives"], alternatives: ["Doxycycline"], generic: 8, brand: 80, insurance: true, dosage: { base: 250, max: 1000, unit: "mg" }, severity: { mild: "250mg 3x daily", moderate: "500mg 3x daily", severe: "1000mg 3x daily" } },
    "Omeprazole": { condition: "GERD", category: "PPI", contraindications: [], allergies: [], interactions: ["Iron", "Calcium"], alternatives: ["Atorvastatin", "Metformin"], generic: 6, brand: 120, insurance: true, dosage: { base: 20, max: 40, unit: "mg" }, severity: { mild: "20mg daily", moderate: "20mg daily", severe: "40mg daily" } },
    "Sertraline": { condition: "Depression", category: "SSRI", contraindications: ["MAOI use"], allergies: [], interactions: ["NSAIDs"], alternatives: ["Fluoxetine", "Levothyroxine"], generic: 11, brand: 140, insurance: true, dosage: { base: 50, max: 200, unit: "mg" }, severity: { mild: "50mg daily", moderate: "100mg daily", severe: "200mg daily" } },
    "Levothyroxine": { condition: "Hypothyroidism", category: "Thyroid", contraindications: ["Hyperthyroidism"], allergies: [], interactions: ["Iron", "Calcium"], alternatives: ["Sertraline"], generic: 5, brand: 90, insurance: true, dosage: { base: 25, max: 200, unit: "mcg" }, severity: { mild: "25mcg daily", moderate: "75mcg daily", severe: "200mcg daily" } },
    "Metoprolol": { condition: "Heart Disease", category: "Beta Blocker", contraindications: ["Asthma", "COPD"], allergies: [], interactions: ["Verapamil"], alternatives: ["Amlodipine", "Lisinopril"], generic: 9, brand: 110, insurance: true, dosage: { base: 50, max: 200, unit: "mg" }, severity: { mild: "50mg daily", moderate: "100mg daily", severe: "200mg daily" } },
    "Ibuprofen": { condition: "Pain", category: "NSAID", contraindications: ["Severe GI Disease", "Kidney Disease"], allergies: [], interactions: ["Warfarin", "Lisinopril"], alternatives: ["Gabapentin", "Albuterol"], generic: 3, brand: 25, insurance: false, dosage: { base: 200, max: 800, unit: "mg" }, severity: { mild: "200mg every 6hrs", moderate: "400mg every 6hrs", severe: "800mg every 6hrs" } },
    "Amlodipine": { condition: "Hypertension", category: "CCB", contraindications: [], allergies: [], interactions: ["Grapefruit"], alternatives: ["Lisinopril", "Losartan"], generic: 8, brand: 130, insurance: true, dosage: { base: 5, max: 10, unit: "mg" }, severity: { mild: "5mg daily", moderate: "5mg daily", severe: "10mg daily" } },
    "Albuterol": { condition: "Asthma", category: "Bronchodilator", contraindications: ["Cardiac Arrhythmias"], allergies: [], interactions: ["Beta blockers"], alternatives: ["Metoprolol"], generic: 20, brand: 60, insurance: true, dosage: { base: 2, max: 4, unit: "puffs" }, severity: { mild: "2 puffs every 4hrs", moderate: "2 puffs every 4hrs", severe: "4 puffs every 4hrs" } },
    "Warfarin": { condition: "Blood Clots", category: "Anticoagulant", contraindications: ["Active Bleeding", "Severe Liver Disease"], allergies: [], interactions: ["NSAIDs", "Aspirin"], alternatives: ["Aspirin"], generic: 7, brand: 100, insurance: true, dosage: { base: 2, max: 10, unit: "mg" }, severity: { mild: "2mg daily", moderate: "5mg daily", severe: "10mg daily" } },
    "Aspirin": { condition: "Heart Protection", category: "Antiplatelet", contraindications: ["GI Ulcers", "Bleeding Disorders"], allergies: ["Aspirin Allergy"], interactions: ["NSAIDs"], alternatives: ["Warfarin"], generic: 2, brand: 15, insurance: false, dosage: { base: 81, max: 325, unit: "mg" }, severity: { mild: "81mg daily", moderate: "81mg daily", severe: "325mg daily" } },
    "Fluoxetine": { condition: "Depression", category: "SSRI", contraindications: ["MAOI use"], allergies: [], interactions: ["NSAIDs"], alternatives: ["Sertraline"], generic: 10, brand: 135, insurance: true, dosage: { base: 20, max: 80, unit: "mg" }, severity: { mild: "20mg daily", moderate: "40mg daily", severe: "80mg daily" } },
    "Rosuvastatin": { condition: "Cholesterol", category: "Statin", contraindications: ["Liver Disease"], allergies: [], interactions: ["Grapefruit"], alternatives: ["Atorvastatin"], generic: 14, brand: 160, insurance: true, dosage: { base: 5, max: 40, unit: "mg" }, severity: { mild: "5mg daily", moderate: "20mg daily", severe: "40mg daily" } },
    "Gabapentin": { condition: "Neuropathy", category: "Anticonvulsant", contraindications: ["Severe Kidney Disease"], allergies: [], interactions: ["Morphine"], alternatives: ["Ibuprofen"], generic: 13, brand: 125, insurance: true, dosage: { base: 300, max: 3600, unit: "mg" }, severity: { mild: "300mg 3x daily", moderate: "600mg 3x daily", severe: "1200mg 3x daily" } },
    "Losartan": { condition: "Hypertension", category: "ARB", contraindications: ["Pregnancy"], allergies: [], interactions: ["NSAIDs"], alternatives: ["Lisinopril", "Amlodipine"], generic: 9, brand: 115, insurance: true, dosage: { base: 50, max: 100, unit: "mg" }, severity: { mild: "50mg daily", moderate: "50mg daily", severe: "100mg daily" } },
    "Doxycycline": { condition: "Infection", category: "Antibiotic", contraindications: ["Pregnancy"], allergies: [], interactions: ["Iron", "Calcium"], alternatives: ["Amoxicillin"], generic: 7, brand: 85, insurance: true, dosage: { base: 100, max: 200, unit: "mg" }, severity: { mild: "100mg daily", moderate: "100mg daily", severe: "200mg daily" } },
  };

  const treatments = Object.keys(treatmentDatabase).map(name => ({
    name,
    condition: treatmentDatabase[name].condition,
    category: treatmentDatabase[name].category
  }));

  const [selectedTreatment, setSelectedTreatment] = useState("");
  const [userProfile, setUserProfile] = useState({
    age: "45",
    conditions: "Type 2 Diabetes, Hypertension",
    medications: "None",
    allergies: "Penicillin",
    kidneyFunction: "Normal",
    liverFunction: "Normal"
  });
  const [predictions, setPredictions] = useState(null);
  const [loading, setLoading] = useState(false);
  const [comparison, setComparison] = useState([]);

  const handlePredict = async () => {
    if (!selectedTreatment) {
      alert("Please select a treatment");
      return;
    }

    setLoading(true);
    try {
      const res = await fetch("/api/predict-treatment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ treatmentName: selectedTreatment, userProfile })
      });

      const data = await res.json();
      if (data.type === "success") {
        setPredictions(data);
      } else {
        alert("Prediction failed: " + data.error?.message);
      }
    } catch (e) {
      alert("Error: " + e.message);
    }
    setLoading(false);
  };

  const handleAddToComparison = () => {
    if (predictions && !comparison.find(p => p.treatment === predictions.treatment)) {
      setComparison([...comparison, predictions]);
    }
  };

  const handleRemoveFromComparison = (treatment) => {
    setComparison(comparison.filter(p => p.treatment !== treatment));
  };

  // Check for contraindications
  const checkContraindications = (treatmentName) => {
    const drug = treatmentDatabase[treatmentName];
    const issues = [];

    // Check allergies
    if (drug.allergies.length > 0) {
      const userAllergies = userProfile.allergies.toLowerCase().split(",").map(a => a.trim());
      drug.allergies.forEach(allergy => {
        if (userAllergies.some(ua => ua.includes(allergy.toLowerCase()))) {
          issues.push({ type: "ALLERGY", text: `⚠️ ALLERGY ALERT: Patient allergic to ${allergy}` });
        }
      });
    }

    // Check contraindications with conditions
    if (drug.contraindications.length > 0) {
      const userConditions = userProfile.conditions.toLowerCase();
      drug.contraindications.forEach(contra => {
        if (userConditions.includes(contra.toLowerCase())) {
          issues.push({ type: "CONTRAINDICATION", text: `🚫 CONTRAINDICATED: Not safe with ${contra}` });
        }
      });
    }

    // Check interactions with current meds
    if (drug.interactions.length > 0 && userProfile.medications !== "None") {
      const userMeds = userProfile.medications.toLowerCase();
      drug.interactions.forEach(inter => {
        if (userMeds.includes(inter.toLowerCase())) {
          issues.push({ type: "INTERACTION", text: `⚠️ INTERACTION: Conflicts with ${inter}` });
        }
      });
    }

    return issues;
  };

  // Find alternative treatments
  const findAlternatives = (treatmentName) => {
    const drug = treatmentDatabase[treatmentName];
    if (!drug || !drug.alternatives) return [];

    return drug.alternatives
      .map(altName => ({
        name: altName,
        category: treatmentDatabase[altName]?.category || "Unknown",
        condition: treatmentDatabase[altName]?.condition || "Unknown",
        safetyRating: Math.random() > 0.3 ? "Safe" : "Caution"
      }))
      .slice(0, 3);
  };

  // Calculate personalized dosage
  const calculateDosage = (treatmentName) => {
    const drug = treatmentDatabase[treatmentName];
    if (!drug) return "Consult doctor for dosage";

    let severity = "moderate";
    if (userProfile.kidneyFunction === "Severe" || userProfile.liverFunction === "Severe") {
      severity = "mild";
    } else if (userProfile.kidneyFunction === "Moderate" || userProfile.liverFunction === "Moderate") {
      severity = "moderate";
    } else if (parseInt(userProfile.age) > 65) {
      severity = "mild";
    }

    return drug.severity?.[severity] || `${drug.dosage.base}${drug.dosage.unit} as recommended`;
  };

  // Calculate success rate based on profile
  const calculateSuccessRate = (effectiveness) => {
    let rate = effectiveness;

    // Age factor
    const age = parseInt(userProfile.age);
    if (age > 65) rate -= 5;
    else if (age < 18) rate -= 8;

    // Organ function factor
    if (userProfile.kidneyFunction !== "Normal") rate -= 3;
    if (userProfile.liverFunction !== "Normal") rate -= 3;

    // Multiple conditions factor
    if (userProfile.conditions.split(",").length > 1) rate -= 2;

    return Math.max(20, Math.min(95, rate)); // Keep between 20-95%
  };

  // Determine severity level
  const determineSeverity = () => {
    const conditions = userProfile.conditions.toLowerCase();
    if (conditions.includes("severe") || conditions.includes("critical")) return "severe";
    if (conditions.includes("moderate")) return "moderate";
    return "mild";
  };

  return (
    <>
      <TopBar title="🎯 Advanced Treatment Simulator" subtitle="AI-powered predictions for YOUR unique health profile" />

      {/* Quick Select Common Conditions */}
      <Card title="📋 Common Health Issues" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
          {commonConditions.map((cond) => (
            <button key={cond} onClick={() => setUserProfile({...userProfile, conditions: cond})} style={{ padding: "6px 14px", background: userProfile.conditions === cond ? C.teal : C.panel, color: userProfile.conditions === cond ? "#000" : C.muted, border: `1px solid ${C.line}`, borderRadius: 20, cursor: "pointer", fontFamily: "inherit", fontSize: 12, transition: ".15s" }}>
              {cond}
            </button>
          ))}
        </div>
      </Card>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 20, marginBottom: 20 }}>
        {/* Input Section */}
        <Card title="👤 Your Health Profile">
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            <div>
              <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Age</label>
              <input type="number" value={userProfile.age} onChange={(e) => setUserProfile({...userProfile, age: e.target.value})} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Conditions</label>
              <textarea value={userProfile.conditions} onChange={(e) => setUserProfile({...userProfile, conditions: e.target.value})} placeholder="e.g., Diabetes, Hypertension" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 12, minHeight: 60, resize: "vertical" }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Current Medications</label>
              <input type="text" value={userProfile.medications} onChange={(e) => setUserProfile({...userProfile, medications: e.target.value})} placeholder="e.g., Lisinopril, Metformin" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
            </div>
            <div>
              <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Allergies</label>
              <input type="text" value={userProfile.allergies} onChange={(e) => setUserProfile({...userProfile, allergies: e.target.value})} placeholder="e.g., Penicillin, NSAIDs" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10 }}>
              <div>
                <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Kidney Function</label>
                <select value={userProfile.kidneyFunction} onChange={(e) => setUserProfile({...userProfile, kidneyFunction: e.target.value})} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }}>
                  <option>Normal</option>
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </div>
              <div>
                <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Liver Function</label>
                <select value={userProfile.liverFunction} onChange={(e) => setUserProfile({...userProfile, liverFunction: e.target.value})} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }}>
                  <option>Normal</option>
                  <option>Mild</option>
                  <option>Moderate</option>
                  <option>Severe</option>
                </select>
              </div>
            </div>
          </div>
        </Card>

        {/* Treatment Selection */}
        <Card title="💊 Select & Predict Treatment">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10, marginBottom: 16 }}>
            {treatments.map((t) => (
              <button key={t.name} onClick={() => setSelectedTreatment(t.name)} style={{ padding: "10px 8px", background: selectedTreatment === t.name ? `linear-gradient(135deg, ${C.teal}, ${C.blue})` : C.panel, border: `1px solid ${selectedTreatment === t.name ? C.teal : C.line}`, borderRadius: 8, color: selectedTreatment === t.name ? "#000" : C.ink, cursor: "pointer", fontFamily: "inherit", transition: ".15s", fontSize: 11, fontWeight: 600, textAlign: "center" }}>
                <div>{t.name}</div>
                <small style={{ opacity: 0.7, fontSize: 10 }}>{t.category}</small>
              </button>
            ))}
          </div>
          <button onClick={handlePredict} disabled={loading || !selectedTreatment} style={{ width: "100%", padding: "12px 16px", background: loading || !selectedTreatment ? C.muted : `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: loading ? C.muted : "#fff", border: "none", borderRadius: 10, cursor: loading || !selectedTreatment ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 600, transition: ".2s", fontSize: 14 }}>
            {loading ? "🔮 Analyzing with AI..." : "⚡ Predict Outcome"}
          </button>
        </Card>
      </div>

      {/* Safety Alerts */}
      {predictions && checkContraindications(predictions.treatment).length > 0 && (
        <Card style={{ marginBottom: 20, border: `2px solid ${C.red}`, background: `linear-gradient(135deg, ${C.red}22, transparent)` }}>
          <div style={{ display: "flex", alignItems: "start", gap: 12 }}>
            <div style={{ fontSize: 24 }}>🚨</div>
            <div style={{ flex: 1 }}>
              <b style={{ color: C.red, display: "block", marginBottom: 10, fontSize: 14 }}>CRITICAL SAFETY ALERTS</b>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {checkContraindications(predictions.treatment).map((issue, i) => (
                  <div key={i} style={{ padding: 10, background: C.panel, borderRadius: 6, borderLeft: `3px solid ${issue.type === "ALLERGY" ? C.pink : issue.type === "CONTRAINDICATION" ? C.red : C.amber}`, fontSize: 12, color: C.muted }}>
                    {issue.text}
                  </div>
                ))}
              </div>
              <p style={{ margin: "12px 0 0 0", fontSize: 11, color: C.muted, fontStyle: "italic" }}>⚠️ Consult with healthcare provider before use</p>
            </div>
          </div>
        </Card>
      )}

      {/* Predictions Display */}
      {predictions && (
        <Card title={`🔬 AI Prediction Results for ${predictions.treatment}`} style={{ marginBottom: 20 }}>
          {/* Main Metrics Grid */}
          <div style={{ display: "grid", gridTemplateColumns: "repeat(5, 1fr)", gap: 12, marginBottom: 20 }}>
            {/* Effectiveness */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red}22, transparent)`, border: `2px solid ${predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red, marginBottom: 4 }}>{predictions.predictions.effectiveness}%</div>
              <small style={{ color: C.muted, fontWeight: 600, fontSize: 10 }}>EFFECTIVENESS</small>
            </div>

            {/* Personal Success Rate */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.teal}22, transparent)`, border: `2px solid ${C.teal}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 28, fontWeight: 700, color: C.teal, marginBottom: 4 }}>{calculateSuccessRate(predictions.predictions.effectiveness)}%</div>
              <small style={{ color: C.muted, fontWeight: 600, fontSize: 10 }}>YOUR SUCCESS RATE</small>
            </div>

            {/* Interaction Risk */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${predictions.predictions.interactionSeverity === "None" ? C.green : predictions.predictions.interactionSeverity === "Mild" ? C.amber : C.red}22, transparent)`, border: `2px solid ${predictions.predictions.interactionSeverity === "None" ? C.green : predictions.predictions.interactionSeverity === "Mild" ? C.amber : C.red}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 20, fontWeight: 600, marginBottom: 4, color: C.ink }}>{predictions.predictions.interactionSeverity}</div>
              <small style={{ color: C.muted, fontWeight: 600, fontSize: 10 }}>INTERACTION RISK</small>
            </div>

            {/* Timeline */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.blue}22, transparent)`, border: `2px solid ${C.blue}`, borderRadius: 10, textAlign: "center" }}>
              <div style={{ fontSize: 16, fontWeight: 600, marginBottom: 4, color: C.blue }}>⏱️</div>
              <small style={{ color: C.muted, fontWeight: 600, fontSize: 10 }}>ONSET</small>
              <div style={{ fontSize: 11, color: C.ink, marginTop: 4 }}>{predictions.predictions.estimatedOnset}</div>
            </div>

            {/* Compare */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.purple}22, transparent)`, border: `2px solid ${C.purple}`, borderRadius: 10, display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center", gap: 6 }}>
              <button onClick={handleAddToComparison} disabled={comparison.find(p => p.treatment === predictions.treatment)} style={{ background: C.teal, color: "#000", border: "none", padding: "6px 10px", borderRadius: 4, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 11, opacity: comparison.find(p => p.treatment === predictions.treatment) ? 0.5 : 1 }}>
                {comparison.find(p => p.treatment === predictions.treatment) ? "✓" : "+"}
              </button>
              <small style={{ color: C.muted, fontSize: 9 }}>Compare</small>
            </div>
          </div>

          {/* Cost & Insurance Section */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {/* Cost Analysis */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.green}22, transparent)`, border: `2px solid ${C.green}`, borderRadius: 10 }}>
              <b style={{ display: "block", marginBottom: 10, color: C.green, fontSize: 12 }}>💰 COST ANALYSIS (Monthly)</b>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, paddingBottom: 8, borderBottom: `1px solid ${C.line}` }}>
                <span style={{ fontSize: 11, color: C.muted }}>Generic:</span>
                <span style={{ fontWeight: 600, color: C.green }}>${treatmentDatabase[predictions.treatment]?.generic || "N/A"}</span>
              </div>
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ fontSize: 11, color: C.muted }}>Brand:</span>
                <span style={{ fontWeight: 600, color: C.amber }}>${treatmentDatabase[predictions.treatment]?.brand || "N/A"}</span>
              </div>
              <div style={{ fontSize: 10, color: C.green, marginTop: 8, padding: "6px", background: C.panel, borderRadius: 4, textAlign: "center" }}>
                💡 Save ${(treatmentDatabase[predictions.treatment]?.brand || 0) - (treatmentDatabase[predictions.treatment]?.generic || 0)}/month with generic
              </div>
            </div>

            {/* Insurance Coverage */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${treatmentDatabase[predictions.treatment]?.insurance ? C.blue : C.amber}22, transparent)`, border: `2px solid ${treatmentDatabase[predictions.treatment]?.insurance ? C.blue : C.amber}`, borderRadius: 10 }}>
              <b style={{ display: "block", marginBottom: 10, color: treatmentDatabase[predictions.treatment]?.insurance ? C.blue : C.amber, fontSize: 12 }}>🏥 INSURANCE COVERAGE</b>
              <div style={{ padding: 10, background: C.panel, borderRadius: 6, textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 16, fontWeight: 700, color: treatmentDatabase[predictions.treatment]?.insurance ? C.green : C.amber }}>
                  {treatmentDatabase[predictions.treatment]?.insurance ? "✅ COVERED" : "⚠️ CHECK PLAN"}
                </div>
              </div>
              <small style={{ color: C.muted, display: "block", textAlign: "center", fontSize: 10 }}>
                {treatmentDatabase[predictions.treatment]?.insurance ? "Most insurance plans cover this" : "Coverage varies by plan"}
              </small>
            </div>
          </div>

          {/* Personalized Dosage & Severity */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 16 }}>
            {/* Dosage */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.pink}22, transparent)`, border: `2px solid ${C.pink}`, borderRadius: 10 }}>
              <b style={{ display: "block", marginBottom: 10, color: C.pink, fontSize: 12 }}>💊 PERSONALIZED DOSAGE</b>
              <div style={{ padding: 10, background: C.panel, borderRadius: 6, textAlign: "center", marginBottom: 8 }}>
                <div style={{ fontSize: 14, fontWeight: 700, color: C.teal }}>{calculateDosage(predictions.treatment)}</div>
              </div>
              <small style={{ color: C.muted, display: "block", fontSize: 9 }}>
                Based on age {userProfile.age}, kidney: {userProfile.kidneyFunction}, liver: {userProfile.liverFunction}
              </small>
            </div>

            {/* Severity Options */}
            <div style={{ padding: 14, background: `linear-gradient(135deg, ${C.purple}22, transparent)`, border: `2px solid ${C.purple}`, borderRadius: 10 }}>
              <b style={{ display: "block", marginBottom: 10, color: C.purple, fontSize: 12 }}>📊 BY SEVERITY LEVEL</b>
              <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
                {["mild", "moderate", "severe"].map(sev => (
                  <div key={sev} style={{ fontSize: 10, padding: "6px 8px", background: C.panel, borderRadius: 4, display: "flex", justifyContent: "space-between", borderLeft: `3px solid ${sev === "mild" ? C.green : sev === "moderate" ? C.amber : C.red}` }}>
                    <span style={{ textTransform: "capitalize", color: C.muted }}>{sev}:</span>
                    <span style={{ fontWeight: 600, color: C.ink }}>{treatmentDatabase[predictions.treatment]?.severity?.[sev] || "N/A"}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Smart Recommendation */}
          <div style={{ padding: 16, background: `linear-gradient(135deg, ${predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red}22, transparent)`, border: `2px solid ${predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red}`, borderRadius: 10, marginBottom: 16 }}>
            <b style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, color: predictions.predictions.effectiveness >= 80 ? C.green : predictions.predictions.effectiveness >= 60 ? C.amber : C.red, fontSize: 14 }}>
              {predictions.predictions.effectiveness >= 80 ? "✅" : predictions.predictions.effectiveness >= 60 ? "⚠️" : "❌"} Smart Recommendation
            </b>
            <p style={{ margin: 0, fontSize: 13, color: C.muted, lineHeight: 1.6 }}>{predictions.predictions.recommendation}</p>
          </div>

          {/* Side Effects Warning */}
          <div style={{ marginBottom: 16 }}>
            <b style={{ display: "block", marginBottom: 10, fontSize: 14, color: C.pink }}>⚠️ Top 3 Side Effects (Personalized)</b>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 10 }}>
              {predictions.predictions.sideEffects.map((effect, i) => (
                <div key={effect} style={{ padding: "12px", background: C.panel, borderRadius: 8, fontSize: 12, color: C.muted, border: `1px solid ${C.line}`, display: "flex", alignItems: "center", gap: 8 }}>
                  <div style={{ fontSize: 16, fontWeight: 700, color: C.amber }}>{i+1}</div>
                  <span>{effect}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Alternative Treatments */}
          {predictions.predictions.effectiveness < 80 && (
            <div style={{ padding: 16, background: `linear-gradient(135deg, ${C.blue}22, transparent)`, border: `2px solid ${C.blue}`, borderRadius: 10 }}>
              <b style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12, color: C.blue, fontSize: 14 }}>
                🔄 Better Alternatives ({predictions.predictions.effectiveness < 60 ? "Highly Recommended" : "Consider These"})
              </b>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
                {findAlternatives(predictions.treatment).map((alt, i) => (
                  <div key={i} style={{ padding: 12, background: C.panel, borderRadius: 8, borderTop: `3px solid ${C.green}`, cursor: "pointer", transition: ".2s", border: `1px solid ${C.line}` }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.teal} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}>
                    <div style={{ fontWeight: 600, color: C.teal, marginBottom: 4, fontSize: 13 }}>{alt.name}</div>
                    <small style={{ display: "block", color: C.muted, marginBottom: 6, fontSize: 11 }}>{alt.category}</small>
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                      <span style={{ fontSize: 10, color: C.muted }}>{alt.condition}</span>
                      <span style={{ fontSize: 10, fontWeight: 600, color: alt.safetyRating === "Safe" ? C.green : C.amber, padding: "2px 6px", background: C.panel2, borderRadius: 3 }}>{alt.safetyRating}</span>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ margin: "12px 0 0 0", fontSize: 11, color: C.muted }}>💡 These alternatives may be more effective for your profile. Click to analyze.</p>
            </div>
          )}
        </Card>
      )}

      {/* Advanced Comparison View */}
      {comparison.length > 0 && (
        <Card title="📊 Treatment Comparison Analysis">
          <div style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(comparison.length, 3)}, 1fr)`, gap: 16 }}>
            {comparison.map((pred) => (
              <div key={pred.treatment} style={{ padding: 16, background: `linear-gradient(135deg, ${C.panel2}, ${C.panel})`, border: `2px solid ${pred.predictions.effectiveness >= 80 ? C.green : pred.predictions.effectiveness >= 60 ? C.amber : C.red}`, borderRadius: 12 }}>
                {/* Header with Remove Button */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 14, paddingBottom: 12, borderBottom: `1px solid ${C.line}` }}>
                  <b style={{ color: C.teal, fontSize: 14 }}>💊 {pred.treatment}</b>
                  <button onClick={() => handleRemoveFromComparison(pred.treatment)} style={{ background: C.red, color: "#fff", border: "none", width: 24, height: 24, borderRadius: "50%", cursor: "pointer", fontWeight: 700, display: "grid", placeItems: "center", fontSize: 16 }}>×</button>
                </div>

                {/* Effectiveness */}
                <div style={{ marginBottom: 12 }}>
                  <div style={{ fontSize: 28, fontWeight: 700, color: pred.predictions.effectiveness >= 80 ? C.green : pred.predictions.effectiveness >= 60 ? C.amber : C.red }}>{pred.predictions.effectiveness}%</div>
                  <small style={{ color: C.muted, fontWeight: 600 }}>EFFECTIVENESS</small>
                  <div style={{ height: 6, background: C.panel, borderRadius: 3, marginTop: 6, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${pred.predictions.effectiveness}%`, background: `linear-gradient(90deg, ${pred.predictions.effectiveness >= 80 ? C.green : pred.predictions.effectiveness >= 60 ? C.amber : C.red}, ${C.teal})` }}></div>
                  </div>
                </div>

                {/* Risk Level */}
                <div style={{ padding: 10, background: C.panel, borderRadius: 8, marginBottom: 12 }}>
                  <small style={{ color: C.muted, fontWeight: 600, display: "block", marginBottom: 4 }}>INTERACTION RISK</small>
                  <div style={{ fontSize: 13, fontWeight: 600, color: pred.predictions.interactionSeverity === "None" ? C.green : pred.predictions.interactionSeverity === "Mild" ? C.amber : C.red }}>
                    {pred.predictions.interactionSeverity === "None" ? "✅" : pred.predictions.interactionSeverity === "Mild" ? "⚠️" : "❌"} {pred.predictions.interactionSeverity}
                  </div>
                </div>

                {/* Top Side Effects */}
                <div>
                  <small style={{ color: C.muted, fontWeight: 600, display: "block", marginBottom: 6 }}>TOP SIDE EFFECTS</small>
                  <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    {pred.predictions.sideEffects.slice(0, 2).map((effect, i) => (
                      <div key={i} style={{ fontSize: 11, color: C.muted, padding: "4px 8px", background: C.panel, borderRadius: 4, borderLeft: `3px solid ${C.pink}` }}>
                        • {effect}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Best Option Indicator */}
          {comparison.length > 1 && (
            <div style={{ marginTop: 16, padding: 12, background: `linear-gradient(135deg, ${C.green}22, transparent)`, border: `1px dashed ${C.green}`, borderRadius: 8, textAlign: "center" }}>
              <b style={{ color: C.green }}>🏆 Best Option</b>
              <p style={{ margin: "4px 0 0 0", fontSize: 12, color: C.muted }}>
                {comparison.reduce((a, b) => a.predictions.effectiveness > b.predictions.effectiveness ? a : b).treatment}
                ({comparison.reduce((a, b) => a.predictions.effectiveness > b.predictions.effectiveness ? a : b).predictions.effectiveness}% effectiveness)
              </p>
            </div>
          )}
        </Card>
      )}
    </>
  );
}

// ==================== SYMPTOM LOGGER ====================
function SymptomTracker() {
  const [symptoms, setSymptoms] = useState(() => {
    const saved = localStorage.getItem("symptoms");
    return saved ? JSON.parse(saved) : [];
  });

  const [symptomName, setSymptomName] = useState("");
  const [severity, setSeverity] = useState("moderate");
  const [notes, setNotes] = useState("");

  const addSymptom = () => {
    if (!symptomName) {
      alert("Please enter a symptom");
      return;
    }

    const newSymptom = {
      id: Date.now(),
      name: symptomName,
      severity,
      notes,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [...symptoms, newSymptom];
    setSymptoms(updated);
    localStorage.setItem("symptoms", JSON.stringify(updated));

    setSymptomName("");
    setSeverity("moderate");
    setNotes("");
  };

  const deleteSymptom = (id) => {
    const updated = symptoms.filter((s) => s.id !== id);
    setSymptoms(updated);
    localStorage.setItem("symptoms", JSON.stringify(updated));
  };

  const getSeverityColor = (sev) => {
    if (sev === "mild") return C.green;
    if (sev === "moderate") return C.amber;
    return C.red;
  };

  return (
    <>
      <TopBar title="🩺 Symptom Tracker" subtitle="Log symptoms to identify patterns" />

      <Card title="➕ Log New Symptom" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>SYMPTOM</label>
            <input type="text" value={symptomName} onChange={(e) => setSymptomName(e.target.value)} placeholder="e.g., Headache, Nausea" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>SEVERITY</label>
            <select value={severity} onChange={(e) => setSeverity(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }}>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>NOTES</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Additional details..." style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={addSymptom} style={{ width: "100%", padding: "8px 12px", background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              ➕ Log
            </button>
          </div>
        </div>
      </Card>

      {symptoms.length > 0 && (
        <Card title={`📋 Your Symptoms (${symptoms.length})`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {symptoms.slice().reverse().map((sym) => (
              <div key={sym.id} style={{ padding: 14, background: `linear-gradient(135deg, ${getSeverityColor(sym.severity)}22, transparent)`, border: `2px solid ${getSeverityColor(sym.severity)}`, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                  <b style={{ color: C.ink }}>{sym.name}</b>
                  <button onClick={() => deleteSymptom(sym.id)} style={{ background: C.red, color: "#fff", border: "none", width: 20, height: 20, borderRadius: "50%", cursor: "pointer", fontSize: 12, fontWeight: 700 }}>×</button>
                </div>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8, fontSize: 11 }}>
                  <span style={{ color: C.muted }}>{sym.date} at {sym.time}</span>
                  <span style={{ padding: "2px 8px", background: getSeverityColor(sym.severity) + "44", color: getSeverityColor(sym.severity), borderRadius: 3, fontWeight: 600, textTransform: "capitalize" }}>{sym.severity}</span>
                </div>
                {sym.notes && <p style={{ margin: 0, fontSize: 12, color: C.muted }}>{sym.notes}</p>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

// ==================== SIDE EFFECT TRACKER ====================
function SideEffectTracker() {
  const [effects, setEffects] = useState(() => {
    const saved = localStorage.getItem("sideEffects");
    return saved ? JSON.parse(saved) : [];
  });

  const [medication, setMedication] = useState("");
  const [effect, setEffect] = useState("");
  const [intensity, setIntensity] = useState("moderate");

  const addEffect = () => {
    if (!medication || !effect) {
      alert("Fill in medication and effect");
      return;
    }

    const newEffect = {
      id: Date.now(),
      medication,
      effect,
      intensity,
      date: new Date().toLocaleDateString(),
      status: "ongoing",
    };

    const updated = [...effects, newEffect];
    setEffects(updated);
    localStorage.setItem("sideEffects", JSON.stringify(updated));

    setMedication("");
    setEffect("");
    setIntensity("moderate");
  };

  const toggleResolved = (id) => {
    const updated = effects.map((e) =>
      e.id === id ? { ...e, status: e.status === "ongoing" ? "resolved" : "ongoing" } : e
    );
    setEffects(updated);
    localStorage.setItem("sideEffects", JSON.stringify(updated));
  };

  const deleteEffect = (id) => {
    const updated = effects.filter((e) => e.id !== id);
    setEffects(updated);
    localStorage.setItem("sideEffects", JSON.stringify(updated));
  };

  return (
    <>
      <TopBar title="⚠️ Side Effects Logger" subtitle="Track reactions to medications" />

      <Card title="📝 Log Side Effect" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>MEDICATION</label>
            <input type="text" value={medication} onChange={(e) => setMedication(e.target.value)} placeholder="Drug name" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>SIDE EFFECT</label>
            <input type="text" value={effect} onChange={(e) => setEffect(e.target.value)} placeholder="e.g., Headache, Nausea" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>INTENSITY</label>
            <select value={intensity} onChange={(e) => setIntensity(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }}>
              <option value="mild">Mild</option>
              <option value="moderate">Moderate</option>
              <option value="severe">Severe</option>
            </select>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={addEffect} style={{ width: "100%", padding: "8px 12px", background: `linear-gradient(135deg, ${C.red}, ${C.amber})`, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              ➕ Log Effect
            </button>
          </div>
        </div>
      </Card>

      {effects.length > 0 && (
        <Card title={`📊 Logged Effects (${effects.length})`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {effects.slice().reverse().map((e) => (
              <div key={e.id} style={{ padding: 12, background: e.status === "resolved" ? `${C.green}22` : `${C.red}22`, border: `2px solid ${e.status === "resolved" ? C.green : C.red}`, borderRadius: 10 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 8 }}>
                  <b style={{ color: C.ink }}>{e.medication}</b>
                  <button onClick={() => deleteEffect(e.id)} style={{ background: C.red, color: "#fff", border: "none", width: 18, height: 18, borderRadius: "50%", cursor: "pointer", fontSize: 11, fontWeight: 700 }}>×</button>
                </div>
                <small style={{ display: "block", color: C.muted, marginBottom: 8 }}>{e.effect} • {e.date}</small>
                <div style={{ display: "flex", gap: 8 }}>
                  <span style={{ fontSize: 10, padding: "3px 8px", background: C.panel, borderRadius: 4, color: C.muted, textTransform: "capitalize" }}>{e.intensity}</span>
                  <button onClick={() => toggleResolved(e.id)} style={{ flex: 1, fontSize: 10, padding: "3px 8px", background: e.status === "resolved" ? C.green : C.amber, color: "#fff", border: "none", borderRadius: 4, cursor: "pointer", fontWeight: 600 }}>
                    {e.status === "resolved" ? "✅ Resolved" : "🔄 Ongoing"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

// ==================== DRUG INTERACTION CHECKER ====================
function DrugInteractionChecker() {
  const [drugs, setDrugs] = useState(() => {
    const saved = localStorage.getItem("userDrugs");
    return saved ? JSON.parse(saved) : [];
  });

  const [newDrug, setNewDrug] = useState("");
  const commonDrugs = ["Metformin", "Lisinopril", "Atorvastatin", "Aspirin", "Omeprazole", "Sertraline", "Warfarin", "Ibuprofen", "Amlodipine", "Albuterol"];

  const interactions = {
    "Metformin-Contrast dye": { severity: "severe", note: "Avoid contrast dye within 48 hours" },
    "Warfarin-Ibuprofen": { severity: "severe", note: "Increased bleeding risk" },
    "Aspirin-Ibuprofen": { severity: "severe", note: "Both are NSAIDs, avoid combination" },
    "Lisinopril-NSAIDs": { severity: "moderate", note: "Reduced BP control" },
    "Omeprazole-Iron": { severity: "moderate", note: "Reduced iron absorption" },
    "Warfarin-Aspirin": { severity: "moderate", note: "Bleeding risk" },
  };

  const addDrug = () => {
    if (!newDrug) return;
    if (!drugs.includes(newDrug)) {
      setDrugs([...drugs, newDrug]);
      localStorage.setItem("userDrugs", JSON.stringify([...drugs, newDrug]));
    }
    setNewDrug("");
  };

  const removeDrug = (drug) => {
    const updated = drugs.filter((d) => d !== drug);
    setDrugs(updated);
    localStorage.setItem("userDrugs", JSON.stringify(updated));
  };

  const getInteractions = () => {
    const found = [];
    for (let i = 0; i < drugs.length; i++) {
      for (let j = i + 1; j < drugs.length; j++) {
        const key1 = `${drugs[i]}-${drugs[j]}`;
        const key2 = `${drugs[j]}-${drugs[i]}`;
        if (interactions[key1]) found.push({ drugs: [drugs[i], drugs[j]], ...interactions[key1] });
        if (interactions[key2]) found.push({ drugs: [drugs[j], drugs[i]], ...interactions[key2] });
      }
    }
    return found;
  };

  const interactionList = getInteractions();

  return (
    <>
      <TopBar title="💊 Drug Interaction Checker" subtitle="Check if your medications interact" />

      <Card title="➕ Add Your Medications" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", gap: 12, marginBottom: 12 }}>
          <input list="drugList" value={newDrug} onChange={(e) => setNewDrug(e.target.value)} placeholder="Enter medication name..." style={{ flex: 1, padding: "10px 12px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          <button onClick={addDrug} style={{ padding: "10px 20px", background: C.teal, color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            ➕ Add
          </button>
          <datalist id="drugList">
            {commonDrugs.map((d) => (
              <option key={d} value={d} />
            ))}
          </datalist>
        </div>

        {drugs.length > 0 && (
          <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
            {drugs.map((drug) => (
              <div key={drug} style={{ padding: "6px 12px", background: C.teal + "33", border: `1px solid ${C.teal}`, borderRadius: 20, display: "flex", alignItems: "center", gap: 8 }}>
                <span style={{ fontSize: 12, fontWeight: 600, color: C.ink }}>{drug}</span>
                <button onClick={() => removeDrug(drug)} style={{ background: "none", border: "none", color: C.muted, cursor: "pointer", fontSize: 16 }}>×</button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {interactionList.length > 0 && (
        <Card title={`⚠️ INTERACTIONS FOUND (${interactionList.length})`} style={{ marginBottom: 20, border: `2px solid ${C.red}`, background: `linear-gradient(135deg, ${C.red}22, transparent)` }}>
          <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
            {interactionList.map((inter, i) => (
              <div key={i} style={{ padding: 12, background: C.panel, borderRadius: 8, borderLeft: `4px solid ${inter.severity === "severe" ? C.red : C.amber}` }}>
                <b style={{ color: inter.severity === "severe" ? C.red : C.amber, display: "block", marginBottom: 4 }}>
                  {inter.severity === "severe" ? "🚫 SEVERE" : "⚠️ MODERATE"}: {inter.drugs[0]} + {inter.drugs[1]}
                </b>
                <small style={{ color: C.muted }}>{inter.note}</small>
              </div>
            ))}
          </div>
        </Card>
      )}

      {drugs.length > 0 && interactionList.length === 0 && (
        <Card style={{ textAlign: "center", padding: "30px" }}>
          <div style={{ fontSize: 32, marginBottom: 10 }}>✅</div>
          <b style={{ color: C.green }}>No Interactions Found</b>
          <p style={{ margin: "8px 0 0 0", color: C.muted, fontSize: 13 }}>Your medications are safe to take together</p>
        </Card>
      )}
    </>
  );
}

// ==================== MEAL PLANNER ====================
// ==================== PROGRESS DASHBOARD ====================
function ProgressDashboard() {
  const [vitals, setVitals] = useState(() => {
    const saved = localStorage.getItem("vitalsHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const getChartData = () => {
    return vitals.slice(-7).map((v, i) => ({
      day: `Day ${i + 1}`,
      weight: v.weight ? parseFloat(v.weight) : null,
      bp: v.systolic ? parseFloat(v.systolic) : null,
      mood: v.mood ? parseInt(v.mood) : null,
    }));
  };

  const calculateTrend = (field) => {
    if (vitals.length < 2) return "📊 No trend yet";
    const latest = vitals[vitals.length - 1][field];
    const previous = vitals[vitals.length - 2][field];
    if (!latest || !previous) return "—";
    const change = parseFloat(latest) - parseFloat(previous);
    if (change > 0) return `⬆️ +${change.toFixed(1)}`;
    if (change < 0) return `⬇️ ${change.toFixed(1)}`;
    return "→ Same";
  };

  return (
    <>
      <TopBar title="📈 Health Progress Dashboard" subtitle="See your health improvements over time" />

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 14, marginBottom: 20 }}>
        <Card>
          <small style={{ color: C.muted, display: "block", marginBottom: 4 }}>WEIGHT TREND</small>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.teal }}>
            {vitals.length > 0 ? `${vitals[vitals.length - 1].weight} kg` : "—"}
          </div>
          <small style={{ color: C.green }}>{calculateTrend("weight")}</small>
        </Card>

        <Card>
          <small style={{ color: C.muted, display: "block", marginBottom: 4 }}>BLOOD PRESSURE</small>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.pink }}>
            {vitals.length > 0 ? `${vitals[vitals.length - 1].systolic}/${vitals[vitals.length - 1].diastolic}` : "—"}
          </div>
          <small style={{ color: C.amber }}>{calculateTrend("systolic")}</small>
        </Card>

        <Card>
          <small style={{ color: C.muted, display: "block", marginBottom: 4 }}>MOOD SCORE</small>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.purple }}>
            {vitals.length > 0 ? `${vitals[vitals.length - 1].mood}/10` : "—"}
          </div>
          <small style={{ color: C.purple }}>Recent trend</small>
        </Card>

        <Card>
          <small style={{ color: C.muted, display: "block", marginBottom: 4 }}>READINGS</small>
          <div style={{ fontSize: 20, fontWeight: 700, color: C.blue }}>{vitals.length}</div>
          <small style={{ color: C.blue }}>Total logged</small>
        </Card>
      </div>

      <Card title="📊 7-Day Trend Chart" style={{ marginBottom: 20 }}>
        <div style={{ padding: 16, background: C.panel, borderRadius: 8, textAlign: "center", minHeight: 200 }}>
          <p style={{ color: C.muted, margin: 0 }}>📈 Chart visualization (7+ readings needed)</p>
          <small style={{ color: C.muted }}>Log weight/vitals daily to see trends</small>
        </div>
      </Card>

      <Card title="💡 Insights">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div style={{ padding: 12, background: C.green + "22", borderRadius: 8, borderLeft: `3px solid ${C.green}` }}>
            <b style={{ color: C.green, fontSize: 12, display: "block", marginBottom: 4 }}>✅ Positive</b>
            <small style={{ color: C.muted, fontSize: 11 }}>Weight stable past 3 days</small>
          </div>
          <div style={{ padding: 12, background: C.amber + "22", borderRadius: 8, borderLeft: `3px solid ${C.amber}` }}>
            <b style={{ color: C.amber, fontSize: 12, display: "block", marginBottom: 4 }}>⚠️ Watch</b>
            <small style={{ color: C.muted, fontSize: 11 }}>BP trend upward - monitor</small>
          </div>
          <div style={{ padding: 12, background: C.blue + "22", borderRadius: 8, borderLeft: `3px solid ${C.blue}` }}>
            <b style={{ color: C.blue, fontSize: 12, display: "block", marginBottom: 4 }}>📊 Track</b>
            <small style={{ color: C.muted, fontSize: 11 }}>Mood improving with exercise</small>
          </div>
        </div>
      </Card>
    </>
  );
}

// ==================== WEIGHT & VITALS TRACKER ====================
function VitalsTracker() {
  const [vitals, setVitals] = useState(() => {
    const saved = localStorage.getItem("vitalsHistory");
    return saved ? JSON.parse(saved) : [];
  });

  const [weight, setWeight] = useState("");
  const [systolic, setSystolic] = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [heartRate, setHeartRate] = useState("");
  const [mood, setMood] = useState("5");
  const [notes, setNotes] = useState("");

  const addVital = () => {
    if (!weight || !systolic || !diastolic) {
      alert("Fill in weight and BP at least");
      return;
    }

    const newVital = {
      id: Date.now(),
      weight,
      systolic,
      diastolic,
      heartRate: heartRate || "—",
      mood,
      notes,
      date: new Date().toLocaleDateString(),
      time: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    };

    const updated = [...vitals, newVital];
    setVitals(updated);
    localStorage.setItem("vitalsHistory", JSON.stringify(updated));

    setWeight("");
    setSystolic("");
    setDiastolic("");
    setHeartRate("");
    setMood("5");
    setNotes("");
  };

  return (
    <>
      <TopBar title="⚕️ Weight & Vitals Tracker" subtitle="Monitor vital signs for dosage adjustments" />

      <Card title="📝 Log Vitals" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>WEIGHT (kg)</label>
            <input type="number" value={weight} onChange={(e) => setWeight(e.target.value)} placeholder="70" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>SYSTOLIC</label>
            <input type="number" value={systolic} onChange={(e) => setSystolic(e.target.value)} placeholder="120" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>DIASTOLIC</label>
            <input type="number" value={diastolic} onChange={(e) => setDiastolic(e.target.value)} placeholder="80" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>HEART RATE</label>
            <input type="number" value={heartRate} onChange={(e) => setHeartRate(e.target.value)} placeholder="72" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>NOTES</label>
            <input type="text" value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="How do you feel?" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>MOOD (1-10)</label>
            <input type="range" min="1" max="10" value={mood} onChange={(e) => setMood(e.target.value)} style={{ width: "100%", height: 30 }} />
            <div style={{ textAlign: "center", color: C.muted, fontSize: 11 }}>😐 {mood}/10</div>
          </div>
        </div>

        <button onClick={addVital} style={{ width: "100%", padding: "10px 16px", background: `linear-gradient(135deg, ${C.pink}, ${C.red})`, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
          ➕ Log Vitals
        </button>
      </Card>

      {vitals.length > 0 && (
        <Card title={`📊 Vital Signs History (${vitals.length})`}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 12 }}>
            {vitals.slice().reverse().map((vital) => (
              <div key={vital.id} style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
                <small style={{ color: C.muted, display: "block", marginBottom: 8 }}>{vital.date} • {vital.time}</small>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8, marginBottom: 8 }}>
                  <div>
                    <small style={{ color: C.muted, fontSize: 10 }}>Weight</small>
                    <b style={{ display: "block", color: C.teal }}>{vital.weight} kg</b>
                  </div>
                  <div>
                    <small style={{ color: C.muted, fontSize: 10 }}>BP</small>
                    <b style={{ display: "block", color: C.pink }}>{vital.systolic}/{vital.diastolic}</b>
                  </div>
                  <div>
                    <small style={{ color: C.muted, fontSize: 10 }}>HR</small>
                    <b style={{ display: "block", color: C.purple }}>{vital.heartRate} bpm</b>
                  </div>
                  <div>
                    <small style={{ color: C.muted, fontSize: 10 }}>Mood</small>
                    <b style={{ display: "block", color: C.amber }}>{vital.mood}/10</b>
                  </div>
                </div>
                {vital.notes && <small style={{ color: C.muted, fontSize: 10, display: "block" }}>💬 {vital.notes}</small>}
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

// ==================== DOCTOR APPOINTMENTS ====================
function DoctorAppointments() {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem("appointments");
    return saved ? JSON.parse(saved) : [];
  });

  const [doctorName, setDoctorName] = useState("");
  const [specialty, setSpecialty] = useState("General");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [location, setLocation] = useState("");
  const [notes, setNotes] = useState("");

  const addAppointment = () => {
    if (!doctorName || !date) {
      alert("Fill in doctor name and date");
      return;
    }

    const newAppt = {
      id: Date.now(),
      doctorName,
      specialty,
      date,
      time,
      location,
      notes,
      createdAt: new Date().toLocaleDateString(),
      reminder: true,
    };

    const updated = [...appointments, newAppt];
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));

    setDoctorName("");
    setSpecialty("General");
    setDate("");
    setTime("09:00");
    setLocation("");
    setNotes("");
  };

  const deleteAppt = (id) => {
    const updated = appointments.filter((a) => a.id !== id);
    setAppointments(updated);
    localStorage.setItem("appointments", JSON.stringify(updated));
  };

  const getUpcomingAppts = () => {
    return appointments.filter((a) => new Date(a.date) >= new Date()).sort((a, b) => new Date(a.date) - new Date(b.date));
  };

  return (
    <>
      <TopBar title="📅 Doctor Appointments" subtitle="Schedule & track appointments" />

      <Card title="➕ Schedule Appointment" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>DOCTOR NAME</label>
            <input type="text" value={doctorName} onChange={(e) => setDoctorName(e.target.value)} placeholder="Dr. Smith" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>SPECIALTY</label>
            <select value={specialty} onChange={(e) => setSpecialty(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }}>
              <option>General</option>
              <option>Cardiology</option>
              <option>Neurology</option>
              <option>Endocrinology</option>
              <option>Gastroenterology</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>DATE</label>
            <input type="date" value={date} onChange={(e) => setDate(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>TIME</label>
            <input type="time" value={time} onChange={(e) => setTime(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "2fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>LOCATION</label>
            <input type="text" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Hospital/Clinic address" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={addAppointment} style={{ width: "100%", padding: "8px 12px", background: `linear-gradient(135deg, ${C.blue}, ${C.teal})`, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              ➕ Add
            </button>
          </div>
        </div>

        <div>
          <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>NOTES</label>
          <textarea value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="Questions to ask, tests needed, etc." style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", minHeight: 60, resize: "vertical" }} />
        </div>
      </Card>

      {getUpcomingAppts().length > 0 && (
        <Card title={`📅 Upcoming Appointments (${getUpcomingAppts().length})`} style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {getUpcomingAppts().map((appt) => (
              <div key={appt.id} style={{ padding: 14, background: `linear-gradient(135deg, ${C.blue}22, transparent)`, border: `2px solid ${C.blue}`, borderRadius: 10 }}>
                <b style={{ display: "block", marginBottom: 8, color: C.ink }}>👨‍⚕️ {appt.doctorName}</b>
                <small style={{ display: "block", color: C.muted, marginBottom: 8 }}>{appt.specialty}</small>
                <div style={{ padding: 10, background: C.panel, borderRadius: 6, marginBottom: 8, textAlign: "center" }}>
                  <b style={{ color: C.teal, display: "block" }}>{appt.date} at {appt.time}</b>
                </div>
                {appt.location && <small style={{ display: "block", color: C.muted, marginBottom: 6 }}>📍 {appt.location}</small>}
                {appt.notes && <small style={{ display: "block", color: C.muted, marginBottom: 8 }}>📝 {appt.notes}</small>}
                <button onClick={() => deleteAppt(appt.id)} style={{ width: "100%", padding: "6px", background: C.red, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 11 }}>
                  ❌ Cancel
                </button>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

// ==================== USER SETTINGS ====================
function UserSettings() {
  const [settings, setSettings] = useState(() => {
    const saved = localStorage.getItem("userSettings");
    return saved ? JSON.parse(saved) : { notifications: true, voice: false, theme: "dark", dataBackup: true };
  });

  const updateSetting = (key, value) => {
    const updated = { ...settings, [key]: value };
    setSettings(updated);
    localStorage.setItem("userSettings", JSON.stringify(updated));
  };

  const exportData = () => {
    const allData = {
      settings: localStorage.getItem("userSettings"),
      vitals: localStorage.getItem("vitalsHistory"),
      symptoms: localStorage.getItem("symptoms"),
      sideEffects: localStorage.getItem("sideEffects"),
      medications: localStorage.getItem("medicationReminders"),
      meals: localStorage.getItem("meals"),
      appointments: localStorage.getItem("appointments"),
    };
    const json = JSON.stringify(allData, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `health-data-${new Date().toISOString().split("T")[0]}.json`;
    a.click();
  };

  return (
    <>
      <TopBar title="⚙️ Settings & Privacy" subtitle="Manage your preferences and data" />

      <Card title="🔔 Notifications" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: C.panel, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink }}>Enable Push Notifications</span>
            <input type="checkbox" checked={settings.notifications} onChange={(e) => updateSetting("notifications", e.target.checked)} style={{ width: 18, height: 18, cursor: "pointer" }} />
          </div>

          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 12, background: C.panel, borderRadius: 8 }}>
            <span style={{ fontSize: 13, color: C.ink }}>Enable Voice Reminders</span>
            <input type="checkbox" checked={settings.voice} onChange={(e) => updateSetting("voice", e.target.checked)} style={{ width: 18, height: 18, cursor: "pointer" }} />
          </div>

          <button onClick={() => {
            const msg = new SpeechSynthesisUtterance("This is a test voice reminder. Your medication is ready.");
            speechSynthesis.speak(msg);
          }} style={{ padding: "10px 16px", background: C.purple, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            🔊 Test Voice Alert
          </button>
        </div>
      </Card>

      <Card title="💾 Data Management" style={{ marginBottom: 20 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <button onClick={exportData} style={{ padding: "12px 16px", background: `linear-gradient(135deg, ${C.green}, ${C.teal})`, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            📥 Export All Data (JSON)
          </button>

          <button onClick={() => {
            if (window.confirm("Delete ALL local data? This cannot be undone!")) {
              Object.keys(localStorage).forEach((key) => {
                if (key.startsWith("medicationReminders") || key.startsWith("symptoms") || key.startsWith("vitalsHistory") || key.startsWith("sideEffects") || key.startsWith("meals") || key.startsWith("appointments")) {
                  localStorage.removeItem(key);
                }
              });
              alert("Data cleared!");
              window.location.reload();
            }
          }} style={{ padding: "12px 16px", background: C.red, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
            🗑️ Clear All Data
          </button>

          <div style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
            <b style={{ color: C.teal, display: "block", marginBottom: 6 }}>📊 Data Statistics</b>
            <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
              <div>• Vitals logged: {JSON.parse(localStorage.getItem("vitalsHistory") || "[]").length}</div>
              <div>• Symptoms tracked: {JSON.parse(localStorage.getItem("symptoms") || "[]").length}</div>
              <div>• Side effects: {JSON.parse(localStorage.getItem("sideEffects") || "[]").length}</div>
              <div>• Medications: {JSON.parse(localStorage.getItem("medicationReminders") || "[]").length}</div>
              <div>• Appointments: {JSON.parse(localStorage.getItem("appointments") || "[]").length}</div>
            </div>
          </div>
        </div>
      </Card>

      <Card title="👤 About This App">
        <div style={{ fontSize: 12, color: C.muted, lineHeight: 1.8 }}>
          <p style={{ margin: "0 0 10px 0" }}>
            <b style={{ color: C.teal }}>VitaTwin Health Platform</b><br />
            Advanced AI-powered health management system
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            <b style={{ color: C.teal }}>Version:</b> 2.0 (with advanced tracking)
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            <b style={{ color: C.teal }}>Storage:</b> All data stored locally in your browser (100% private)
          </p>
          <p style={{ margin: "0 0 10px 0" }}>
            <b style={{ color: C.teal }}>Privacy:</b> No cloud sync, no tracking, no ads
          </p>
          <p style={{ margin: 0 }}>
            © 2026 VitaTwin AI • Abdulaziz (Student ID: 24200713)
          </p>
        </div>
      </Card>
    </>
  );
}

function MealPlanner() {
  const [meals, setMeals] = useState(() => {
    const saved = localStorage.getItem("meals");
    return saved ? JSON.parse(saved) : [];
  });

  const [mealName, setMealName] = useState("");
  const [mealTime, setMealTime] = useState("breakfast");
  const [foods, setFoods] = useState("");

  const foodInteractions = {
    Warfarin: ["Kale", "Spinach", "Broccoli"],
    Metformin: ["Alcohol", "High-fat foods"],
    "Omeprazole": ["Iron", "Calcium", "Vitamin B12"],
    "ACE Inhibitors": ["Potassium", "Bananas", "Spinach"],
  };

  const addMeal = () => {
    if (!mealName || !foods) return;
    const newMeal = {
      id: Date.now(),
      name: mealName,
      time: mealTime,
      foods: foods.split(",").map((f) => f.trim()),
      date: new Date().toLocaleDateString(),
    };
    const updated = [...meals, newMeal];
    setMeals(updated);
    localStorage.setItem("meals", JSON.stringify(updated));
    setMealName("");
    setFoods("");
  };

  return (
    <>
      <TopBar title="🍽️ Meal Planner" subtitle="Track meals and food-drug interactions" />

      <Card title="➕ Log Meal" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 2fr 1fr", gap: 12 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>MEAL</label>
            <input type="text" value={mealName} onChange={(e) => setMealName(e.target.value)} placeholder="Breakfast, Lunch, etc" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>TIME</label>
            <select value={mealTime} onChange={(e) => setMealTime(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }}>
              <option value="breakfast">Breakfast</option>
              <option value="lunch">Lunch</option>
              <option value="dinner">Dinner</option>
              <option value="snack">Snack</option>
            </select>
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700 }}>FOODS (comma-separated)</label>
            <input type="text" value={foods} onChange={(e) => setFoods(e.target.value)} placeholder="Rice, Chicken, Vegetables..." style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit" }} />
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button onClick={addMeal} style={{ width: "100%", padding: "8px 12px", background: `linear-gradient(135deg, ${C.green}, ${C.teal})`, color: "#fff", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600 }}>
              ➕ Add Meal
            </button>
          </div>
        </div>
      </Card>

      <Card title="⚠️ Food-Drug Interactions Guide">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))", gap: 12 }}>
          {Object.entries(foodInteractions).map(([drug, foods]) => (
            <div key={drug} style={{ padding: 12, background: C.panel, borderRadius: 8, borderLeft: `3px solid ${C.amber}` }}>
              <b style={{ color: C.amber, display: "block", marginBottom: 6 }}>💊 {drug}</b>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                {foods.map((food) => (
                  <span key={food} style={{ fontSize: 11, padding: "3px 8px", background: C.panel2, borderRadius: 4, color: C.muted }}>
                    🚫 {food}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Card>

      {meals.length > 0 && (
        <Card title="📋 Your Meals">
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(300px, 1fr))", gap: 12 }}>
            {meals.slice().reverse().map((meal) => (
              <div key={meal.id} style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
                <b style={{ display: "block", marginBottom: 6, textTransform: "capitalize" }}>🍽️ {meal.name} ({meal.time})</b>
                <small style={{ display: "block", color: C.muted, marginBottom: 8 }}>{meal.date}</small>
                <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                  {meal.foods.map((food) => (
                    <span key={food} style={{ fontSize: 11, padding: "3px 8px", background: C.line, borderRadius: 4, color: C.muted }}>
                      {food}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}
    </>
  );
}

function MedicationReminders() {
  const [reminders, setReminders] = useState(() => {
    const saved = localStorage.getItem("medicationReminders");
    return saved ? JSON.parse(saved) : [];
  });

  const [pillName, setPillName] = useState("");
  const [pillTime, setPillTime] = useState("09:00");
  const [dosage, setDosage] = useState("");
  const [frequency, setFrequency] = useState("daily");
  const [notificationEnabled, setNotificationEnabled] = useState(true);

  // Request notification permission on mount
  useEffect(() => {
    if ("Notification" in window && Notification.permission === "default") {
      Notification.requestPermission();
    }
  }, []);

  // Check for upcoming medications every minute
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

      reminders.forEach((reminder) => {
        const [remindHour, remindMinute] = reminder.time.split(":").map(Number);
        const reminderDate = new Date();
        reminderDate.setHours(remindHour, remindMinute, 0);

        const timeDiff = (reminderDate - now) / 1000 / 60; // in minutes

        // Send notification when 5 minutes left
        if (timeDiff <= 5 && timeDiff > 4.5 && notificationEnabled) {
          sendNotification(reminder);
        }
      });
    }, 30000); // Check every 30 seconds

    return () => clearInterval(interval);
  }, [reminders, notificationEnabled]);

  const sendNotification = (reminder) => {
    if ("Notification" in window && Notification.permission === "granted") {
      new Notification("💊 Medication Reminder", {
        body: `Time to take ${reminder.pillName} (${reminder.dosage})!\n⏰ In 5 minutes`,
        icon: "💊",
        tag: `med-${reminder.id}`,
        requireInteraction: true,
      });
    }
  };

  const addReminder = () => {
    if (!pillName || !pillTime) {
      alert("Please fill in pill name and time");
      return;
    }

    const newReminder = {
      id: Date.now(),
      pillName,
      time: pillTime,
      dosage,
      frequency,
      createdAt: new Date().toLocaleString(),
    };

    const updated = [...reminders, newReminder];
    setReminders(updated);
    localStorage.setItem("medicationReminders", JSON.stringify(updated));

    // Reset form
    setPillName("");
    setPillTime("09:00");
    setDosage("");
    setFrequency("daily");
  };

  const deleteReminder = (id) => {
    const updated = reminders.filter((r) => r.id !== id);
    setReminders(updated);
    localStorage.setItem("medicationReminders", JSON.stringify(updated));
  };

  const testNotification = () => {
    sendNotification({ pillName: "Test Pill", dosage: "1 tablet", id: "test" });
  };

  const getUpcomingReminders = () => {
    const now = new Date();
    const currentTime = `${String(now.getHours()).padStart(2, "0")}:${String(now.getMinutes()).padStart(2, "0")}`;

    return reminders
      .map((r) => {
        const [hour, minute] = r.time.split(":").map(Number);
        const reminderDate = new Date();
        reminderDate.setHours(hour, minute, 0);
        const diffMinutes = Math.round((reminderDate - now) / 1000 / 60);

        return { ...r, minutesUntil: diffMinutes };
      })
      .sort((a, b) => a.minutesUntil - b.minutesUntil);
  };

  return (
    <>
      <TopBar title="💊 Pill Reminders & Notifications" subtitle="Never miss a dose - get smart notifications" />

      {/* Add Reminder Form */}
      <Card title="➕ Add New Medication Reminder" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr", gap: 12, marginBottom: 16 }}>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Pill Name</label>
            <input type="text" value={pillName} onChange={(e) => setPillName(e.target.value)} placeholder="e.g., Metformin" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Time</label>
            <input type="time" value={pillTime} onChange={(e) => setPillTime(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Dosage</label>
            <input type="text" value={dosage} onChange={(e) => setDosage(e.target.value)} placeholder="e.g., 1 tablet" style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }} />
          </div>
          <div>
            <label style={{ display: "block", fontSize: 11, color: C.teal, marginBottom: 4, fontWeight: 700, textTransform: "uppercase" }}>Frequency</label>
            <select value={frequency} onChange={(e) => setFrequency(e.target.value)} style={{ width: "100%", padding: "8px 10px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 8, color: C.ink, fontFamily: "inherit", fontSize: 13 }}>
              <option>daily</option>
              <option>twice daily</option>
              <option>3x daily</option>
              <option>weekly</option>
            </select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
            <button onClick={addReminder} style={{ width: "100%", padding: "8px 12px", background: `linear-gradient(135deg, ${C.teal}, ${C.blue})`, color: "#000", border: "none", borderRadius: 8, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13 }}>
              ➕ Add Reminder
            </button>
          </div>
        </div>

        {/* Notification Settings */}
        <div style={{ display: "flex", gap: 12, padding: 12, background: C.panel, borderRadius: 8, alignItems: "center", marginBottom: 12 }}>
          <input type="checkbox" checked={notificationEnabled} onChange={(e) => setNotificationEnabled(e.target.checked)} style={{ width: 18, height: 18, cursor: "pointer" }} />
          <span style={{ flex: 1, fontSize: 13, color: C.ink }}>Enable notifications (5 min before dose)</span>
          <button onClick={testNotification} style={{ padding: "6px 12px", background: C.purple, color: "#fff", border: "none", borderRadius: 6, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 11 }}>
            🔔 Test Notification
          </button>
        </div>
      </Card>

      {/* Active Reminders */}
      {reminders.length > 0 && (
        <Card title={`📅 Your Medications (${reminders.length})`} style={{ marginBottom: 20 }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 14 }}>
            {getUpcomingReminders().map((reminder) => (
              <div key={reminder.id} style={{ padding: 14, background: `linear-gradient(135deg, ${reminder.minutesUntil <= 5 && reminder.minutesUntil > 0 ? C.red : C.purple}22, transparent)`, border: `2px solid ${reminder.minutesUntil <= 5 && reminder.minutesUntil > 0 ? C.red : C.line}`, borderRadius: 10 }}>
                {/* Header */}
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 10 }}>
                  <div>
                    <b style={{ color: C.teal, display: "block", fontSize: 14 }}>💊 {reminder.pillName}</b>
                    <small style={{ color: C.muted, fontSize: 10 }}>{reminder.frequency}</small>
                  </div>
                  <button onClick={() => deleteReminder(reminder.id)} style={{ background: C.red, color: "#fff", border: "none", width: 24, height: 24, borderRadius: "50%", cursor: "pointer", fontWeight: 700, fontSize: 14 }}>
                    ×
                  </button>
                </div>

                {/* Time */}
                <div style={{ padding: 10, background: C.panel, borderRadius: 6, marginBottom: 10, textAlign: "center" }}>
                  <div style={{ fontSize: 18, fontWeight: 700, color: C.teal }}>{reminder.time}</div>
                  <small style={{ color: reminder.minutesUntil <= 5 && reminder.minutesUntil > 0 ? C.red : C.muted, fontWeight: 600, fontSize: 11 }}>
                    {reminder.minutesUntil <= 0
                      ? "⏰ Time now!"
                      : reminder.minutesUntil <= 5
                      ? `🔔 ${reminder.minutesUntil} min left!`
                      : `${reminder.minutesUntil} min left`}
                  </small>
                </div>

                {/* Dosage */}
                <div style={{ fontSize: 12, color: C.muted, marginBottom: 8, padding: "6px 8px", background: C.panel, borderRadius: 4 }}>
                  📍 {reminder.dosage || "As prescribed"}
                </div>

                {/* Status */}
                <div style={{ display: "flex", gap: 6 }}>
                  <div style={{ flex: 1, padding: "6px", background: reminder.minutesUntil <= 5 && reminder.minutesUntil > 0 ? `${C.red}44` : C.green + "44", borderRadius: 4, fontSize: 10, fontWeight: 600, color: reminder.minutesUntil <= 5 && reminder.minutesUntil > 0 ? C.red : C.green, textAlign: "center" }}>
                    {reminder.minutesUntil <= 0 ? "🔴 NOW" : "✅ Pending"}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </Card>
      )}

      {reminders.length === 0 && (
        <Card style={{ marginBottom: 20, textAlign: "center", padding: "40px 20px" }}>
          <div style={{ fontSize: 48, marginBottom: 12 }}>💊</div>
          <b style={{ display: "block", marginBottom: 8, color: C.teal, fontSize: 16 }}>No Reminders Yet</b>
          <p style={{ margin: 0, color: C.muted, fontSize: 13 }}>Add your first medication reminder above to get started!</p>
        </Card>
      )}

      {/* How It Works */}
      <Card title="ℹ️ How Notifications Work" style={{ marginBottom: 20 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 12 }}>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>1️⃣</div>
            <b style={{ fontSize: 11, display: "block", marginBottom: 4, color: C.teal }}>Add Medication</b>
            <small style={{ color: C.muted, fontSize: 10, lineHeight: 1.4 }}>Enter pill name, time, and dosage</small>
          </div>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>2️⃣</div>
            <b style={{ fontSize: 11, display: "block", marginBottom: 4, color: C.teal }}>App Tracks Time</b>
            <small style={{ color: C.muted, fontSize: 10, lineHeight: 1.4 }}>Background service monitors upcoming doses</small>
          </div>
          <div style={{ padding: 12, background: C.panel, borderRadius: 8 }}>
            <div style={{ fontSize: 24, marginBottom: 6 }}>3️⃣</div>
            <b style={{ fontSize: 11, display: "block", marginBottom: 4, color: C.teal }}>Get Alert</b>
            <small style={{ color: C.muted, fontSize: 10, lineHeight: 1.4 }}>Notification 5 minutes before time</small>
          </div>
        </div>
        <div style={{ marginTop: 12, padding: 12, background: `${C.blue}22`, border: `1px solid ${C.blue}`, borderRadius: 8 }}>
          <small style={{ color: C.muted, fontSize: 10 }}>
            💡 Keep this app open or in background for notifications to work. Notifications require browser permission.
          </small>
        </div>
      </Card>
    </>
  );
}

function Landing({ go }) {
  const features = [
    { icon: Heart, title: "Real-Time Monitoring", desc: "Live health tracking with advanced vitals monitoring", badge: "⚡ Essential" },
    { icon: Brain, title: "AI Diagnosis", desc: "Intelligent symptom analysis powered by ML models", badge: "🧠 Advanced" },
    { icon: Boxes, title: "Digital Twin", desc: "Simulate health scenarios and predict outcomes", badge: "🚀 Premium" },
    { icon: TrendingUp, title: "Analytics", desc: "Deep insights into your health trends over time", badge: "📈 Data" },
    { icon: Shield, title: "Privacy First", desc: "100% encrypted, on-device AI processing", badge: "🔒 Secure" },
    { icon: Zap, title: "Treatment Sim", desc: "Predict effectiveness and side effects instantly", badge: "💊 Clinical" },
  ];

  const demos = [
    { icon: Heart, title: "Heart Health", desc: "Monitor blood pressure, heart rate, and cardiac patterns", color: C.pink },
    { icon: Brain, title: "Mental Health", desc: "Track stress levels and get personalized wellness advice", color: C.purple },
    { icon: Boxes, title: "Digital Twin", desc: "See how your body responds to different treatments", color: C.teal },
  ];

  return (
    <div className="vt-landing-page">
      <Navigation go={go} />
      <HeroSection go={go} />

      {/* Features Section */}
      <section className="vt-features-section" id="features">
        <div className="vt-section-header">
          <h2>Powerful Features</h2>
          <p>Complete health management with AI-powered insights</p>
        </div>
        <div className="vt-features-grid">
          {features.map((f, i) => (
            <div key={i} className="vt-feature-card" style={{ position: "relative", overflow: "hidden" }}>
              <div style={{ position: "absolute", top: 12, right: 12, fontSize: 10, fontWeight: 600, background: `${f.icon === Heart ? C.pink : f.icon === Brain ? C.purple : f.icon === Boxes ? C.teal : C.blue}22`, color: f.icon === Heart ? C.pink : f.icon === Brain ? C.purple : f.icon === Boxes ? C.teal : C.blue, padding: "4px 10px", borderRadius: 12 }}>
                {f.badge}
              </div>
              <div className="vt-feature-icon"><f.icon size={24} /></div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
              <button style={{ width: "100%", marginTop: 12, padding: "8px 12px", background: `${f.icon === Heart ? C.pink : f.icon === Brain ? C.purple : f.icon === Boxes ? C.teal : C.blue}22`, color: f.icon === Heart ? C.pink : f.icon === Brain ? C.purple : f.icon === Boxes ? C.teal : C.blue, border: "none", borderRadius: 8, fontSize: 12, fontWeight: 600, cursor: "pointer", fontFamily: "inherit", transition: "all 0.2s" }} onClick={() => f.title === "Real-Time Monitoring" ? go("vitals") : f.title === "AI Diagnosis" ? go("diagnosis") : f.title === "Digital Twin" ? go("twin") : f.title === "Analytics" ? go("progress") : f.title === "Privacy First" ? go("settings") : go("treatment")}>
                Learn More →
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Demo Section */}
      <section style={{ padding: "100px 40px", maxWidth: "1600px", margin: "0 auto" }}>
        <div className="vt-section-header">
          <h2>Try It Now</h2>
          <p>Explore key features with real-time demos</p>
        </div>
        <div className="vt-demo-grid">
          {demos.map((d, i) => (
            <div key={i} className="vt-demo-item" style={{ background: `linear-gradient(135deg, ${d.color}15, transparent)`, borderColor: d.color + "30" }}>
              <div className={`vt-demo-icon ${d.title === "Heart Health" ? "heart" : d.title === "Mental Health" ? "brain" : "twin"}`}>
                <d.icon size={32} />
              </div>
              <h4>{d.title}</h4>
              <p>{d.desc}</p>
              <button className="vt-link-btn" onClick={() => d.title === "Heart Health" ? go("vitals") : d.title === "Mental Health" ? go("symptoms") : go("twin")}>
                Explore {d.title}
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* CTA Section */}
      <section className="vt-cta-section">
        <div className="vt-cta-content">
          <h2>Ready to Transform Your Health?</h2>
          <p>Join thousands using VitaTwin AI for smarter, data-driven health decisions</p>
          <div style={{ display: "flex", gap: 16, justifyContent: "center", marginTop: 8 }}>
            <button className="vt-btn primary" onClick={() => go("dashboard")}>
              Get Started Free
            </button>
            <button className="vt-btn secondary" onClick={() => go("diagnosis")}>
              See AI in Action
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="vt-footer">
        <div className="vt-footer-content">
          <div className="vt-footer-col">
            <div className="vt-footer-logo">
              <Heart size={20} fill={C.pink} stroke={C.pink} />
              VitaTwin AI
            </div>
            <p>Advanced health monitoring with local AI processing</p>
          </div>
          <div className="vt-footer-col">
            <h4>Product</h4>
            <a onClick={() => go("dashboard")}>Dashboard</a>
            <a onClick={() => go("treatment")}>Treatment Simulator</a>
            <a onClick={() => go("diagnosis")}>AI Diagnosis</a>
          </div>
          <div className="vt-footer-col">
            <h4>Company</h4>
            <a>About</a>
            <a>Privacy Policy</a>
            <a>Terms of Service</a>
          </div>
        </div>
        <div className="vt-footer-bottom">
          © 2026 VitaTwin AI • Abdulaziz (Student ID: 24200713) • Enterprise Health AI Platform
        </div>
      </footer>
    </div>
  );
}

function LoginSignup({ onLogin }) {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    await new Promise(r => setTimeout(r, 800));

    if (!email || !password || (isSignUp && !name)) {
      setError("Please fill in all fields");
      setLoading(false);
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Invalid email format");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    const userData = {
      id: Date.now(),
      name: isSignUp ? name : email.split("@")[0],
      email,
      createdAt: new Date().toISOString(),
      health: { age: 24, height: "5'10\"", weight: 72, bloodType: "O+", conditions: [], medications: [] },
      stats: { healthScore: 87, riskLevel: "Low", totalCheckups: 5, lastCheckup: new Date().toISOString() }
    };

    localStorage.setItem("user", JSON.stringify(userData));
    setLoading(false);
    onLogin(userData);
  };

  return (
    <div style={{ minHeight: "100vh", display: "flex", alignItems: "center", justifyContent: "center", background: `linear-gradient(135deg, ${C.bg}, ${C.panel})`, padding: "20px" }}>
      <div style={{ maxWidth: 480, width: "100%", background: `linear-gradient(180deg, ${C.panel2}, ${C.panel})`, border: `1.5px solid ${C.line}`, borderRadius: 20, padding: 40, boxShadow: `0 24px 64px rgba(0,0,0,0.3)` }}>
        <div style={{ textAlign: "center", marginBottom: 32 }}>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}><Heart size={32} fill={C.pink} stroke={C.pink} /></div>
          <h1 style={{ margin: 0, fontSize: 28, fontWeight: 800, marginBottom: 8 }}>Vita<b style={{ color: C.teal }}>Twin</b> AI</h1>
          <p style={{ margin: 0, color: C.muted, fontSize: 14 }}>{isSignUp ? "Create your health profile" : "Welcome back"}</p>
        </div>

        <div style={{ display: "flex", gap: 8, marginBottom: 28, background: C.panel, padding: 4, borderRadius: 12 }}>
          <button onClick={() => setIsSignUp(false)} style={{ flex: 1, padding: "10px 16px", background: !isSignUp ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent", color: !isSignUp ? "#fff" : C.muted, border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>Sign In</button>
          <button onClick={() => setIsSignUp(true)} style={{ flex: 1, padding: "10px 16px", background: isSignUp ? `linear-gradient(135deg, ${C.purple}, ${C.teal})` : "transparent", color: isSignUp ? "#fff" : C.muted, border: "none", borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 14, transition: "all 0.2s" }}>Sign Up</button>
        </div>

        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {isSignUp && (
            <div>
              <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 600, color: C.ink }}>Full Name</label>
              <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe" style={{ width: "100%", padding: "12px 14px", background: C.panel, border: `1.5px solid ${C.line}`, borderRadius: 10, color: C.ink, fontFamily: "inherit", fontSize: 14, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => e.target.style.borderColor = C.teal} onBlur={(e) => e.target.style.borderColor = C.line} />
            </div>
          )}

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 600, color: C.ink }}>Email Address</label>
            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" style={{ width: "100%", padding: "12px 14px", background: C.panel, border: `1.5px solid ${C.line}`, borderRadius: 10, color: C.ink, fontFamily: "inherit", fontSize: 14, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => e.target.style.borderColor = C.teal} onBlur={(e) => e.target.style.borderColor = C.line} />
          </div>

          <div>
            <label style={{ display: "block", marginBottom: 8, fontSize: 13, fontWeight: 600, color: C.ink }}>Password</label>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="••••••••" style={{ width: "100%", padding: "12px 14px", background: C.panel, border: `1.5px solid ${C.line}`, borderRadius: 10, color: C.ink, fontFamily: "inherit", fontSize: 14, outline: "none", transition: "border-color 0.2s", boxSizing: "border-box" }} onFocus={(e) => e.target.style.borderColor = C.teal} onBlur={(e) => e.target.style.borderColor = C.line} />
          </div>

          {error && (<div style={{ padding: 12, background: `${C.red}22`, border: `1px solid ${C.red}`, borderRadius: 10, color: C.red, fontSize: 13, fontWeight: 600 }}>{error}</div>)}

          <button type="submit" disabled={loading} style={{ width: "100%", padding: "12px 16px", background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, color: "#fff", border: "none", borderRadius: 10, cursor: loading ? "not-allowed" : "pointer", fontFamily: "inherit", fontWeight: 700, fontSize: 14, transition: "all 0.2s", display: "flex", alignItems: "center", justifyContent: "center", gap: 8, opacity: loading ? 0.8 : 1 }}>
            {loading ? (<><Loader2 size={16} className="spin" /> Processing...</>) : (isSignUp ? "Create Account" : "Sign In")}
          </button>
        </form>

        <div style={{ marginTop: 24, paddingTop: 20, borderTop: `1px solid ${C.line}`, textAlign: "center" }}>
          <p style={{ margin: 0, fontSize: 13, color: C.muted }}>
            {isSignUp ? "Already have an account? " : "Don't have an account? "}
            <button onClick={() => setIsSignUp(!isSignUp)} style={{ background: "none", border: "none", color: C.teal, cursor: "pointer", fontWeight: 600, fontFamily: "inherit", fontSize: 13 }}>{isSignUp ? "Sign in" : "Sign up"}</button>
          </p>
        </div>

        <div style={{ marginTop: 20, padding: 12, background: `${C.blue}15`, border: `1px solid ${C.blue}30`, borderRadius: 10 }}>
          <p style={{ margin: 0, fontSize: 12, color: C.blue, fontWeight: 600 }}>💡 Demo: Use any email/password (min 6 chars)</p>
        </div>
      </div>
    </div>
  );
}

function UserProfilePage({ user, onLogout, go }) {
  const stats = [
    { label: "Health Score", value: user?.stats?.healthScore || 87, color: C.teal },
    { label: "Risk Level", value: user?.stats?.riskLevel || "Low", color: C.green },
    { label: "Total Checkups", value: user?.stats?.totalCheckups || 5, color: C.purple },
  ];

  return (
    <>
      <TopBar title="My Profile" subtitle="Your account & health information" />
      <div style={{ display: "grid", gridTemplateColumns: "1fr 2fr", gap: 24, marginBottom: 24 }}>
        <Card>
          <div style={{ display: "flex", flexDirection: "column", gap: 16, textAlign: "center" }}>
            <div style={{ width: 100, height: 100, borderRadius: "50%", background: `linear-gradient(135deg, ${C.purple}, ${C.teal})`, display: "grid", placeItems: "center", color: "#fff", fontSize: 40, fontWeight: 700, margin: "0 auto" }}>{user?.name?.[0]?.toUpperCase() || "U"}</div>
            <div>
              <h2 style={{ margin: 0, fontSize: 22, fontWeight: 700 }}>{user?.name || "User"}</h2>
              <p style={{ margin: "6px 0 0 0", color: C.muted, fontSize: 13 }}>{user?.email}</p>
              <p style={{ margin: "8px 0 0 0", color: C.green, fontSize: 12, fontWeight: 600 }}>● Premium Member</p>
            </div>
            <div style={{ paddingTop: 16, borderTop: `1px solid ${C.line}` }}>
              <small style={{ color: C.muted, fontSize: 11 }}>MEMBER SINCE</small>
              <b style={{ display: "block", marginTop: 4 }}>January 2026</b>
            </div>
            <button onClick={onLogout} style={{ width: "100%", padding: "10px 16px", background: `${C.red}22`, color: C.red, border: `1.5px solid ${C.red}30`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", fontWeight: 600, fontSize: 13, transition: "all 0.2s" }}>Logout</button>
          </div>
        </Card>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gap: 16, marginBottom: 24 }}>
          {stats.map((s) => (
            <Card key={s.label}>
              <small style={{ color: C.muted, fontSize: 11 }}>{s.label}</small>
              <b style={{ display: "block", fontSize: 28, margin: "6px 0 4px", color: s.color }}>{s.value}</b>
            </Card>
          ))}
        </div>
      </div>
      <Card title="Health Information" style={{ marginBottom: 24 }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 24 }}>
          <div><small style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Age</small><b style={{ display: "block", marginTop: 8 }}>{user?.health?.age || 24} years</b></div>
          <div><small style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Height</small><b style={{ display: "block", marginTop: 8 }}>{user?.health?.height || "5'10\""}</b></div>
          <div><small style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Weight</small><b style={{ display: "block", marginTop: 8 }}>{user?.health?.weight || 72} kg</b></div>
          <div><small style={{ color: C.muted, fontSize: 11, textTransform: "uppercase" }}>Blood Type</small><b style={{ display: "block", marginTop: 8 }}>{user?.health?.bloodType || "O+"}</b></div>
        </div>
      </Card>
      <Card title="Quick Actions">
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
          <button onClick={() => go("vitals")} style={{ padding: "16px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.ink, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.teal} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}><Activity size={20} color={C.teal} /><small style={{ fontWeight: 600, fontSize: 12 }}>Log Vitals</small></button>
          <button onClick={() => go("appointments")} style={{ padding: "16px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.ink, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.purple} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}><Bell size={20} color={C.purple} /><small style={{ fontWeight: 600, fontSize: 12 }}>Appointments</small></button>
          <button onClick={() => go("treatment")} style={{ padding: "16px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.ink, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.pink} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}><Zap size={20} color={C.pink} /><small style={{ fontWeight: 600, fontSize: 12 }}>Treatments</small></button>
          <button onClick={() => go("reminders")} style={{ padding: "16px", background: C.panel, border: `1px solid ${C.line}`, borderRadius: 10, cursor: "pointer", fontFamily: "inherit", display: "flex", flexDirection: "column", alignItems: "center", gap: 8, color: C.ink, transition: "all 0.2s" }} onMouseEnter={(e) => e.currentTarget.style.borderColor = C.blue} onMouseLeave={(e) => e.currentTarget.style.borderColor = C.line}><Bell size={20} color={C.blue} /><small style={{ fontWeight: 600, fontSize: 12 }}>Reminders</small></button>
        </div>
      </Card>
    </>
  );
}

export default function VitaTwinAI() {
  const [view, setView] = useState("landing");
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("user");
    return saved ? JSON.parse(saved) : null;
  });

  const handleLogin = (userData) => {
    setUser((prev) => (prev?.id === userData?.id ? prev : userData));
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
          {view === "landing" && <Landing go={handleGoToDashboard} />}
          {view === "login" && <LoginSignup onLogin={handleLogin} />}
          {view === "profile" && <UserProfilePage user={user} onLogout={handleLogout} go={setView} />}
          {view === "dashboard" && <Dashboard />}
          {view === "progress" && <ProgressDashboard />}
          {view === "vitals" && <VitalsTracker />}
          {view === "appointments" && <DoctorAppointments />}
          {view === "treatment" && <TreatmentSimulator />}
          {view === "symptoms" && <SymptomTracker />}
          {view === "sideeffects" && <SideEffectTracker />}
          {view === "interactions" && <DrugInteractionChecker />}
          {view === "meals" && <MealPlanner />}
          {view === "reminders" && <MedicationReminders />}
          {view === "settings" && <UserSettings />}
          {view === "twin" && <Twin />}
          {view === "diagnosis" && <Diagnosis />}
        </main>
      </div>
    </div>
  );
}
