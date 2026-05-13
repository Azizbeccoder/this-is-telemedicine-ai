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
        </main>
      </div>
    </div>
  );
}
