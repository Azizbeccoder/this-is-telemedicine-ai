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

const C = {
  bg: "#080d18", panel: "#0d1424", panel2: "#111a30", line: "#1e2a45",
  ink: "#e8eefc", muted: "#7e8db5", teal: "#2ee6c8", purple: "#8b6cf0",
  pink: "#f25c9a", blue: "#4d8dff", green: "#3ddb8f", amber: "#f5b94a", red: "#ff5e6c",
};

const trend = (base, n, amp) => Array.from({ length: n }, (_, i) => ({
  x: i, v: Math.round(base + Math.sin(i / 1.7) * amp + (Math.random() - 0.5) * amp * 0.8),
}));

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
        </main>
      </div>
    </div>
  );
}
