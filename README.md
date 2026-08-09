# VitaTwin AI — Digital Twin Health Platform (v1.1.0)

Two React apps living in one repo:

- **VitaTwin AI Platform** — full multi-view health platform (landing, dashboard, AI diagnosis, digital twin simulation, analytics, real-time monitoring, AI assistant).
- **Telemedicine Model Compare** — sends one patient query to three model strategies side-by-side with a scoring rubric.

Use the toggle at the top of the page to switch between them.

> ⚠️ **Demo / simulation only.** All health data is fictional. This is **not** a medical device and not for clinical use.

## Contributing

This is a personal/demo project - issues and small PRs are welcome.

## Quick start

```bash
npm install
npm run dev
```

Then open http://localhost:5173

Regenerate the walkthrough slide deck any time with `python gen_pptx.py`.

## AI chat (powered by Ollama — runs locally, no API key)

The `AI Assistant` view and the Telemedicine comparison get real responses from a
**local** large language model via [Ollama](https://ollama.com). The bundled proxy
(`server.js`) talks to Ollama and reshapes its reply into the format the React
components already expect, so no front-end edits are needed.

### Setup

```bash
# 1. Install Ollama from https://ollama.com  (it then runs on :11434)
# 2. Pull a model
ollama pull llama3.2
# check installed models any time with: ollama list
# 3. Proxy deps
npm install express cors dotenv
```

Optional `.env` to change the model or host:

```bash
OLLAMA_MODEL=llama3.2
OLLAMA_URL=http://localhost:11434
```

### Run — development (app on 5173)

```bash
node server.js      # proxy on :8787, forwards to Ollama
npm run dev         # app on :5173
```

Open **http://localhost:5173**.

### Run — production (one port, 8787)

```bash
npm run build
node server.js
```

Open **http://localhost:8787**.

> **Can your users chat?** Ollama runs on the machine you start it on. On your laptop,
> only you can use it. To let other people chat, run Ollama (and this proxy) on a
> server they can reach, with enough RAM/GPU for the model — then point them at that
> server's URL. The model never leaves your hardware, so there's no API key to expose.

The charts, vitals, and all other UI use mock data and work with no setup at all - only the AI Assistant and model comparison need Ollama.

See `PROJECT_STATUS.md` for the full feature checklist.

## Project structure

```
vitatwin-ai/
├── index.html
├── package.json
├── vite.config.js
├── server.js                 # optional Anthropic API proxy
└── src/
    ├── main.jsx
    ├── treatmentDatabase.json # seed data for the treatment simulator
    ├── App.jsx               # switcher between the two apps
    └── components/
        ├── VitaTwinAI.jsx
        └── TelemedicineCompare.jsx
```

## Tech

React 18 · Vite · Recharts · lucide-react

## Build for production

```bash
npm run build      # outputs to dist/
npm run preview
```
