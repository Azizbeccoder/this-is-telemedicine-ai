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