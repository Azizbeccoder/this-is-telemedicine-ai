# VitaTwin AI - System Design Document

---

## 📋 TABLE OF CONTENTS

1. Simple Overview
2. Advanced Architecture
3. Component Details
4. Data Flow
5. Technology Stack
6. Deployment Architecture

---

# 🎯 SIMPLE OVERVIEW

## High-Level Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                     USER BROWSER (Frontend)                      │
│                                                                   │
│  ┌──────────────────────────────────────────────────────────┐   │
│  │              React 18 + Vite Application                 │   │
│  │                                                            │   │
│  │  [Landing] → [Login/Signup] → [User Profile]             │   │
│  │      ↓                             ↓                      │   │
│  │  [Dashboard] → [Vitals] → [Progress] → [Appointments]   │   │
│  │      ↓                                       ↓            │   │
│  │  [Treatment Sim] → [Symptom Tracker] → [AI Diagnosis]   │   │
│  │                                                            │   │
│  │  Features: Charts, Real-time Updates, localStorage         │   │
│  └──────────────────────────────────────────────────────────┘   │
└────────────────────┬──────────────────────────────────────────────┘
                     │
                     │ HTTP/REST API
                     ↓
┌─────────────────────────────────────────────────────────────────┐
│                  Express.js Server (Port 8787)                   │
│                                                                   │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │              API Endpoints                              │   │
│  │  • POST /api/anthropic - Chat with AI                  │   │
│  │  • POST /api/predict-treatment - Treatment prediction  │   │
│  │  • GET / - Serve frontend (dist/)                      │   │
│  └─────────────────────────────────────────────────────────┘   │
│                           ↓                                      │
│  ┌─────────────────────────────────────────────────────────┐   │
│  │         Ollama Local AI Integration (Port 11434)        │   │
│  │                                                          │   │
│  │  Models: Mistral, Phi3, Llama3:8b                       │   │
│  │  • Symptom Analysis                                     │   │
│  │  • Treatment Effectiveness Prediction                   │   │
│  │  • Side Effects Identification                          │   │
│  │  • Drug Interaction Assessment                          │   │
│  └─────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## What Each Part Does

**Frontend (React):**
- User interface for all health monitoring features
- Data stored locally (localStorage) for privacy
- Real-time charts and visualizations
- Responsive design (mobile, tablet, desktop)

**Backend (Express.js):**
- Proxy server between frontend and AI
- Handles API requests
- Manages Ollama connections
- Serves static frontend files

**AI Engine (Ollama):**
- Local AI models running privately
- No cloud dependency
- Processes health data locally
- Provides predictions and insights

---

# 🔧 ADVANCED ARCHITECTURE

## Detailed System Components

```
TIER 1: PRESENTATION LAYER (Frontend)
═════════════════════════════════════════════════════════════════

React Components Structure:
├── Landing Page
│   ├── Navigation Bar
│   ├── Hero Section
│   ├── Features Section
│   ├── Demo Section
│   └── Footer
│
├── Authentication
│   ├── LoginSignup Component
│   │   ├── Email Validation
│   │   ├── Password Requirements
│   │   └── Error Handling
│   └── User State Management
│
├── User Dashboard
│   ├── Profile Page
│   │   ├── User Info Display
│   │   ├── Health Stats (Health Score, Risk Level, Checkups)
│   │   ├── Health Information (Age, Height, Weight, Blood Type)
│   │   └── Quick Action Buttons
│   │
│   ├── Health Dashboard
│   │   ├── Key Metrics Display (4 cards)
│   │   ├── Digital Twin Visualization (SVG)
│   │   ├── Organ Status Indicators
│   │   ├── Today's Activity Section
│   │   └── Weekly Health Trend Chart (Recharts)
│   │
│   ├── Vitals Tracker
│   │   ├── Input Forms (Weight, BP, HR, Mood)
│   │   ├── Historical Data Display
│   │   ├── Trend Charts
│   │   └── Health Recommendations
│   │
│   ├── Progress Dashboard
│   │   ├── 7-Day Trend Analysis
│   │   ├── Weight Chart
│   │   ├── BP Trend Chart
│   │   ├── Heart Rate Graph
│   │   └── Mood Tracker
│   │
│   ├── Doctor Appointments
│   │   ├── Add Appointment Form
│   │   ├── Doctor Lookup
│   │   ├── Calendar View
│   │   └── Appointment List
│   │
│   ├── Treatment Simulator
│   │   ├── Drug Selection Dropdown
│   │   ├── User Profile Input
│   │   ├── Prediction Results
│   │   ├── Side Effects List
│   │   ├── Interaction Severity
│   │   ├── Cost Analysis
│   │   └── Dosage Calculator
│   │
│   ├── Symptom Tracker
│   │   ├── Symptom Input Form
│   │   ├── Severity Rating (1-10)
│   │   ├── Duration Tracking
│   │   ├── Symptom History
│   │   └── When to See Doctor Alert
│   │
│   ├── Drug Interaction Checker
│   │   ├── Multi-Drug Input
│   │   ├── Contraindication Check
│   │   ├── Allergy Detection
│   │   ├── Severity Assessment
│   │   └── Alternative Suggestions
│   │
│   ├── Digital Twin Simulator
│   │   ├── Scenario Selection (Weight Loss, Stress, Sleep, Medication)
│   │   ├── Run Simulation Button
│   │   └── Results Display (Energy, Immunity, Heart Health, Mental Clarity)
│   │
│   ├── AI Diagnosis
│   │   ├── Symptom Input
│   │   ├── Progress Tracker
│   │   ├── Analysis Results
│   │   ├── Top Findings (Conditions with %)
│   │   └── Recommendations
│   │
│   ├── Medication Reminders
│   │   ├── Add Reminder Form
│   │   ├── Medication List
│   │   ├── Time & Dosage Display
│   │   ├── Notification Alerts
│   │   ├── Voice Reminders (TTS)
│   │   └── Upcoming Reminders Grid
│   │
│   └── User Settings
│       ├── Notification Toggle
│       ├── Voice Reminder Toggle
│       ├── Privacy Settings
│       ├── Export Data (JSON)
│       ├── Statistics Display
│       ├── Clear Data Option
│       └── Test Voice Alert Button

Data Storage Layer (Browser):
├── localStorage
│   ├── User Profile Data
│   │   ├── name, email, createdAt
│   │   └── health: {age, height, weight, bloodType, conditions, medications}
│   │   └── stats: {healthScore, riskLevel, totalCheckups, lastCheckup}
│   │
│   ├── Vitals History
│   │   ├── Weight logs (date, value)
│   │   ├── BP logs (date, systolic, diastolic)
│   │   ├── Heart rate logs (date, value)
│   │   └── Mood logs (date, 1-10)
│   │
│   ├── Appointments
│   │   ├── doctor, specialty, date, time, location, notes
│   │   └── Timestamp for each appointment
│   │
│   ├── Medication Reminders
│   │   ├── pillName, time, dosage, frequency
│   │   ├── notificationsEnabled, voiceEnabled
│   │   └── Timestamp and ID
│   │
│   ├── Symptom Logs
│   │   ├── name, description, duration, severity
│   │   ├── conditions, timestamp
│   │   └── When to see doctor alert
│   │
│   └── Treatment History
│       ├── treatmentName, effectiveness, sideEffects
│       ├── interactionSeverity, cost, dosage
│       └── Timestamp


TIER 2: APPLICATION LAYER (API Server)
═════════════════════════════════════════════════════════════════

Express.js Application:

Server Configuration:
├── Port: 8787
├── CORS: Enabled
├── Body Parser: 5MB limit
├── Static Files: /dist directory
└── Middleware Stack

Request Processing Pipeline:
├── Request Received
│   ├── CORS Check
│   ├── Body Parsing (JSON)
│   └── Route Matching
│
├── Route Handlers
│   ├── POST /api/anthropic
│   │   ├── Extract {system, messages, modeId}
│   │   ├── Model Selection (MODEL_MAP[modeId])
│   │   ├── Ollama Availability Check
│   │   ├── Request to Ollama with 10s timeout
│   │   ├── Response Processing
│   │   ├── Fallback Demo Response (if Ollama unavailable)
│   │   └── Return JSON Response
│   │
│   ├── POST /api/predict-treatment
│   │   ├── Extract {treatmentName, userProfile}
│   │   ├── Ollama Availability Check
│   │   ├── Query 1: Effectiveness Prediction (0-100)
│   │   ├── Query 2: Side Effects List (3 items)
│   │   ├── Query 3: Interaction Severity (None/Mild/Moderate/Severe)
│   │   ├── Combine Results
│   │   ├── Return Predictions Object
│   │   └── Fallback to Mock Data (if Ollama unavailable)
│   │
│   └── GET * (Catch-all for SPA)
│       └── Serve index.html from /dist
│
└── Response Sent

Error Handling:
├── Timeout (10s for /api/anthropic, 5s per query for treatment)
├── Connection Errors
├── Invalid JSON
└── Fallback Responses


TIER 3: AI & DATA LAYER (Ollama)
═════════════════════════════════════════════════════════════════

Ollama Local AI Models:

Model Configuration:
├── Mistral (Model 1: Triage/Empathic)
│   ├── Fast inference
│   ├── Good for chat & symptom analysis
│   ├── Lightweight (7B parameters)
│   └── Temperature: 0.7
│
├── Phi3 (Model 2: Emergency)
│   ├── Efficient & accurate
│   ├── Good for quick analysis
│   └── Small footprint (3.8B)
│
└── Llama3:8b (Model 3: Clinical)
    ├── More powerful reasoning
    ├── Better for complex analysis
    ├── 8 billion parameters
    └── Best for treatment predictions

AI Processing Pipeline:

For Chat Requests:
├── Receive message from user
├── Format with system prompt
├── Send to Ollama (POST /api/chat)
├── Stream=false (get complete response)
├── Process response JSON
├── Extract message.content
└── Return to frontend

For Treatment Predictions:
├── Query 1: Effectiveness
│   ├── Prompt: "Rate effectiveness of [drug] for [condition]"
│   ├── Response: Number 0-100
│   └── Validation: Min 0, Max 100
│
├── Query 2: Side Effects
│   ├── Prompt: "Top 3 side effects of [drug]"
│   ├── Response: Comma-separated list
│   └── Parsing: Split and trim
│
└── Query 3: Interactions
    ├── Prompt: "Interaction severity with [medications]"
    ├── Response: Severity level
    └── Validation: None/Mild/Moderate/Severe

Treatment Database (In-Memory):
├── 25+ Medications with:
│   ├── Condition
│   ├── Category
│   ├── Contraindications (list)
│   ├── Allergies
│   ├── Interactions (with other drugs)
│   ├── Alternatives
│   ├── Generic/Brand Pricing
│   ├── Dosage Information
│   ├── Severity-based options
│   └── Success rates
│
├── Examples:
│   ├── Aspirin (Pain, Cardiovascular)
│   ├── Metformin (Diabetes)
│   ├── Lisinopril (Hypertension)
│   ├── Amoxicillin (Infection)
│   └── ... 20+ more
│
└── Used for:
    ├── Contraindication checking
    ├── Alternative suggestions
    ├── Cost analysis
    └── Dosage calculation


TIER 4: INTEGRATION & COMMUNICATION
═════════════════════════════════════════════════════════════════

Frontend to Backend (HTTP):

Request Types:
├── POST /api/anthropic
│   └── {system: string, messages: [], modeId: string}
│
├── POST /api/predict-treatment
│   └── {treatmentName: string, userProfile: {age, conditions, medications}}
│
└── GET / (static files)
    └── Serves index.html, bundle.js, styles.css

Response Format:
├── Success: {type: "success", message: string}
├── Treatment: {type: "success", treatment: string, predictions: {...}}
└── Error: {type: "error", error: {message: string}}

Backend to Ollama (HTTP):

Request:
└── POST http://localhost:11434/api/chat
    └── {
        model: "mistral" | "phi3" | "llama3:8b",
        messages: [{role: "user", content: string}],
        stream: false,
        options: {num_predict: 120, temperature: 0.7}
    }

Response:
└── {message: {content: "Response text"}, ...}

Connection Management:
├── HTTP Agent (Keep-Alive)
├── Connection Pooling
├── Timeout: 10 seconds (anthropic), 5 seconds (treatment queries)
├── Fallback: Demo responses when unavailable
└── Error Recovery


TIER 5: SECURITY & PRIVACY
═════════════════════════════════════════════════════════════════

Privacy-First Design:
├── All data stays on device
│   ├── localStorage (browser)
│   ├── No cloud storage
│   ├── No external API calls
│   └── User controls all data
│
├── Local AI Processing
│   ├── Ollama runs locally
│   ├── No data sent to cloud
│   ├── No third-party AI services
│   ├── User owns their data
│   └── HIPAA-compatible approach
│
└── Data Management
    ├── Export functionality (JSON download)
    ├── Delete option (clear all data)
    ├── No tracking
    └── No analytics

Authentication:
├── Client-side only (for demo)
│   ├── Email/Password stored in localStorage
│   ├── User ID (timestamp)
│   └── Session managed in browser
│
└── Production: Would need
    ├── JWT tokens
    ├── Secure password hashing
    ├── HTTPS only
    ├── Backend session management
    └── 2FA support


TIER 6: DEPLOYMENT ARCHITECTURE
═════════════════════════════════════════════════════════════════

Development Setup:
├── Frontend Development
│   ├── Vite Dev Server (Port 5173)
│   ├── Hot Module Reloading
│   ├── Source Maps
│   └── React DevTools
│
├── Backend Development
│   ├── Express Server (Port 8787)
│   ├── Node.js runtime
│   ├── nodemon (auto-restart)
│   └── CORS enabled (localhost)
│
└── AI Development
    ├── Ollama Service (Port 11434)
    ├── Model loaded in memory
    ├── GPU acceleration (if available)
    └── Models directory

Production Build:
├── Frontend Build Process
│   ├── npm run build
│   ├── Vite compilation
│   ├── Minification & tree-shaking
│   ├── Output: /dist directory
│   └── Static files ready
│
├── Backend Setup
│   ├── Express server runs
│   ├── Serves /dist files
│   ├── Port 8787 (configurable)
│   └── Environment variables loaded
│
└── Ollama Deployment
    ├── Service must be running
    ├── Port 11434 (configurable)
    ├── Models pre-loaded
    └── Memory requirements (8GB+ recommended)

Deployment Options:
├── Local Machine
│   ├── npm install
│   ├── npm run build
│   ├── npm run dev (or npm start)
│   ├── Open http://localhost:8787
│   └── Ollama must be running
│
├── Docker
│   ├── Dockerfile with Node.js
│   ├── Compose with Ollama service
│   ├── Volume mounts for models
│   └── Port mapping 8787:8787
│
├── Cloud Platforms
│   ├── Vercel (frontend only)
│   ├── Heroku (backend + Ollama)
│   ├── AWS EC2 (full stack)
│   ├── Google Cloud (full stack)
│   └── DigitalOcean (droplets)
│
└── Hybrid
    ├── Frontend on CDN (Vercel, Netlify)
    ├── Backend on cloud server
    ├── Ollama on local machine or separate GPU server
    └── Best of both worlds


TIER 7: DATA FLOW DIAGRAMS
═════════════════════════════════════════════════════════════════

User Login Flow:
┌──────────────────┐
│  User Navigates  │
│   to App         │
└────────┬─────────┘
         ↓
┌──────────────────────────────┐
│  Check localStorage for user  │
└────────┬─────────────────────┘
         ↓
     ┌───┴────┐
     │        │
  Found    Not Found
     │        │
     ↓        ↓
[Profile] [Login/Signup]
     │        │
     └───┬────┘
         ↓
  [User Authenticated]
     │
     └──→ [Access Dashboard]


Vitals Tracking Flow:
┌──────────────────┐
│  User Enters     │
│  Vitals Data     │
└────────┬─────────┘
         ↓
┌──────────────────────────────┐
│  Validate Input              │
│  (Weight, BP, HR, Mood)      │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Save to localStorage        │
│  (With timestamp)            │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Update Charts &             │
│  Progress Display            │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Show Health Insights        │
│  (Trends & Recommendations)  │
└──────────────────────────────┘


Treatment Prediction Flow:
┌──────────────────┐
│  User Selects    │
│  Drug & Profile  │
└────────┬─────────┘
         ↓
┌──────────────────────────────┐
│  Send POST to /api/          │
│  predict-treatment           │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Express Server Receives     │
│  Request                     │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Check Ollama Availability   │
└───┬────────────────────┬─────┘
    │                    │
Available           Unavailable
    │                    │
    ↓                    ↓
[Query Ollama]    [Return Mock Data]
    │                    │
    └────┬───────────────┘
         ↓
┌──────────────────────────────┐
│  Combine Results             │
│  • Effectiveness (0-100)     │
│  • Side Effects (list)       │
│  • Interactions (severity)   │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Return JSON Response        │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Frontend Displays Results   │
│  • Progress bar              │
│  • Effects list              │
│  • Severity badge            │
│  • Recommendations           │
└──────────────────────────────┘


AI Diagnosis Flow:
┌──────────────────┐
│  User Enters     │
│  Symptoms        │
└────────┬─────────┘
         ↓
┌──────────────────────────────┐
│  Step 1: Analyze Symptoms    │
│  (Ollama with Mistral)       │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Step 2: Deep Scan           │
│  (Ollama with Llama3)        │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Step 3: Cross-Check         │
│  (Verify findings)           │
└────────┬─────────────────────┘
         ↓
┌──────────────────────────────┐
│  Display Results             │
│  • Top conditions with %     │
│  • Progress tracker          │
│  • Recommendations           │
│  • View full report link     │
└──────────────────────────────┘


TIER 8: PERFORMANCE & OPTIMIZATION
═════════════════════════════════════════════════════════════════

Frontend Optimization:
├── Code Splitting
│   ├── Lazy loading of routes
│   ├── Dynamic imports for heavy components
│   └── Smaller initial bundle
│
├── Asset Optimization
│   ├── Minified CSS & JS
│   ├── Icon optimization (lucide-react)
│   ├── Chart library optimization (Recharts)
│   └── Image compression
│
├── Runtime Optimization
│   ├── Efficient React renders
│   ├── useCallback for handlers
│   ├── Memoization where needed
│   └── localStorage caching
│
└── Browser Optimization
    ├── Service Workers (future)
    ├── Offline support (future)
    ├── PWA capabilities (future)
    └── IndexedDB for large data (future)

Backend Optimization:
├── Request Handling
│   ├── Connection pooling
│   ├── Keep-alive connections
│   ├── Request queuing
│   └── Timeout management
│
├── AI Integration
│   ├── Parallel requests (Promise.all)
│   ├── Timeouts for slow requests
│   ├── Fallback responses
│   └── Caching (future)
│
└── Resource Management
    ├── Memory limits
    ├── Connection limits
    ├── File descriptor limits
    └── CPU throttling (future)

Database (localStorage) Optimization:
├── Data Structure
│   ├── Compact JSON format
│   ├── Efficient keys
│   ├── Minimal nesting
│   └── Timestamp indexing
│
├── Query Performance
│   ├── Direct key access (O(1))
│   ├── Filter in-memory (fast)
│   ├── Sort after retrieval
│   └── Pagination (future)
│
└── Storage Limits
    ├── 5-10MB typical usage
    ├── Compression (future)
    ├── Archiving old data (future)
    └── Cloud sync (future)


TIER 9: MONITORING & LOGGING
═════════════════════════════════════════════════════════════════

Frontend Logging:
├── Console Logs
│   ├── Component lifecycle
│   ├── Data updates
│   ├── Errors and warnings
│   └── Performance metrics
│
└── Error Tracking
    ├── Caught exceptions
    ├── API failures
    ├── Data validation errors
    └── Browser compatibility issues

Backend Logging:
├── Server Logs
│   ├── [REQUEST] markers
│   ├── [OLLAMA] status
│   ├── [TREATMENT] predictions
│   ├── [ERROR] details
│   └── Timestamp & response time
│
└── Monitored Metrics
    ├── Request/response times
    ├── Error rates
    ├── Ollama availability
    ├── Memory usage
    └── Connection pool status

AI Monitoring:
├── Ollama Status
│   ├── Availability checks
│   ├── Response times
│   ├── Error rates
│   ├── Model loading status
│   └── Memory usage
│
└── Prediction Quality
    ├── Effectiveness scores
    ├── Side effects accuracy
    ├── Interaction detection
    └── User feedback (future)

```

---

# 📊 DATA MODELS

## User Profile
```javascript
{
  id: timestamp,                    // Unique identifier
  name: string,                     // User's name
  email: string,                    // Email address
  createdAt: ISO8601,              // Account creation date
  health: {
    age: number,
    height: string,
    weight: number,
    bloodType: string,
    conditions: string[],
    medications: string[]
  },
  stats: {
    healthScore: number,            // 0-100
    riskLevel: string,             // Low, Medium, High
    totalCheckups: number,
    lastCheckup: ISO8601
  }
}
```

## Vitals Log Entry
```javascript
{
  id: timestamp,
  date: ISO8601,
  weight: number,                   // kg
  bloodPressure: {
    systolic: number,
    diastolic: number
  },
  heartRate: number,               // bpm
  mood: number,                    // 1-10 scale
}
```

## Appointment
```javascript
{
  id: timestamp,
  doctor: string,
  specialty: string,
  date: ISO8601,
  time: string,                    // HH:mm format
  location: string,
  notes: string
}
```

## Medication Reminder
```javascript
{
  id: timestamp,
  pillName: string,
  time: string,                    // HH:mm format
  dosage: string,
  frequency: string,               // Daily, Twice daily, etc.
  notificationsEnabled: boolean,
  voiceEnabled: boolean,
  reminderSchedule: []             // Future reminders
}
```

## Treatment Prediction Result
```javascript
{
  treatmentName: string,
  effectiveness: number,           // 0-100%
  sideEffects: string[],          // Top 3 effects
  interactionSeverity: string,    // None/Mild/Moderate/Severe
  estimatedOnset: string,         // e.g., "1-4 weeks"
  cost: {
    generic: number,
    brand: number
  },
  dosage: string,
  recommendation: string,          // Personalized advice
  timestamp: ISO8601
}
```

---

# 🔐 SECURITY MATRIX

| Layer | Threat | Mitigation |
|-------|--------|-----------|
| Frontend | XSS | Input validation, React escaping |
| Frontend | localStorage access | Local only, HTTPS required |
| Frontend | CSRF | No backend auth yet (demo) |
| Backend | SQL Injection | No database (localStorage) |
| Backend | API abuse | Timeout limits, rate limiting (future) |
| Backend | Man-in-the-middle | HTTPS required (production) |
| AI | Prompt injection | Input validation, model limitations |
| AI | Data exposure | All local, no external calls |
| Data | Unauthorized access | Browser sandbox, local storage |
| Data | Data loss | Export functionality, backup (future) |

---

# 📈 SCALABILITY ROADMAP

## Phase 1: Current (Single User, Local)
- localStorage limit: ~5-10MB
- Single Ollama instance
- Real-time responsiveness
- No database needed

## Phase 2: Multi-User (Cloud Backend)
- PostgreSQL database
- User authentication (JWT)
- Cloud server hosting
- Load balancing

## Phase 3: Enterprise (Scaled Production)
- Microservices architecture
- Kubernetes orchestration
- Redis caching
- CDN for assets
- Multiple AI instances

## Phase 4: Advanced (Medical Grade)
- HIPAA compliance
- Audit logging
- Data encryption
- Regulatory compliance
- Multi-factor authentication

---

# 🎯 SUMMARY

**VitaTwin AI** is a privacy-first health platform that:

1. **Runs Locally** - All data stays on user's device
2. **Uses AI Intelligently** - Ollama provides local, private AI processing
3. **Scales Efficiently** - Designed for expansion from single user to enterprise
4. **Maintains Privacy** - No cloud storage, no tracking, no external APIs
5. **Provides Value** - Complete health monitoring with treatment predictions

The architecture separates concerns clearly:
- **Frontend**: User experience and local data
- **Backend**: API & Ollama orchestration
- **AI**: Local intelligence without privacy compromise
- **Storage**: Client-side only for now, database-ready for future

This design allows rapid development in early stages while enabling seamless migration to production-grade infrastructure when needed.

