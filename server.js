import express from "express";
import cors from "cors";
import path from "node:path";
import fs from "node:fs";
import { fileURLToPath } from "node:url";
import http from "node:http";
import "dotenv/config";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
app.use(cors());
app.use(express.json({ limit: "5mb" }));

const agent = new http.Agent({
  keepAlive: true,
  keepAliveMsecs: 30000,
  maxSockets: 5,
  maxFreeSockets: 2,
});

const MODEL_MAP = {
  triage: "mistral",
  empathic: "mistral",
  clinical: "llama3:8b",
};

// ✅ Helper: Check if Ollama is responding
async function isOllamaAvailable() {
  try {
    const res = await fetch("http://localhost:11434/api/tags", { signal: AbortSignal.timeout(2000) });
    return res.ok;
  } catch {
    return false;
  }
}

app.post("/api/anthropic", async (req, res) => {
  console.log("\n[REQUEST] Received message");
  const startTime = Date.now();

  try {
    const { system, messages = [], modeId } = req.body || {};

    const model = MODEL_MAP[modeId] || "mistral";
    console.log(`[OLLAMA] Using model: ${model}`);

    // Check if Ollama is available
    const ollamaAvailable = await isOllamaAvailable();

    if (!ollamaAvailable) {
      console.log("[OLLAMA] Not responding - using demo response");
      return res.json({
        type: "success",
        message: "🤖 Demo: I'm your AI health assistant. (Ollama not responding - using demo mode)",
      });
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10s timeout

    const r = await fetch("http://localhost:11434/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages,
        stream: false,
      }),
      agent,
      signal: controller.signal,
    });

    clearTimeout(timeoutId);

    if (!r.ok) {
      console.log("[OLLAMA ERROR] Response not OK");
      return res.json({
        type: "success",
        message: "Demo response (Ollama error)",
      });
    }

    const data = await r.json();

    res.json({
      type: "success",
      message: data.message?.content || "Demo response",
    });

  } catch (e) {
    console.log("[ERROR]:", e.message);
    res.json({
      type: "success",
      message: "🤖 Demo: Ollama is not responding. Please make sure Ollama is running with: ollama serve",
    });
  }
});

// ✅ Treatment Prediction Endpoint with Fallbacks
