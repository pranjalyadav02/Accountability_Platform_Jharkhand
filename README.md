# Platform Administration & AI Governance Center — Jharkhand

Administrative, security, and AI governance control layer for the entire Jharkhand Societal Innovation Platform ecosystem. Normal citizens and public users never access Platform 6 — it is reserved for Platform Super Administrators, State Innovation Cell coordinators, Security Officers, and AI Governance engineers.

---

## Features
- **Platform Health & Operations**: Real-time service uptime, latency monitors across Frontend, API, Database, and AI Engine.
- **AI Model Governance**: Oversight of production AI models (Problem Classifier, Deduplication Engine, SLA Priority Predictor, University Matcher). Monitor accuracy, precision, and human override rates.
- **Human Override Controls**: Log, audit, and approve manual overrides when officers reclassify AI recommendations.
- **User & Organization Administration**: Comprehensive role-based access control (Super Admin, State Admin, District Officer, University Coordinator, Industry Partner).
- **Cross-Platform System Audit Trail**: Immutable log recording user actions, IP addresses, target resources, and outcome statuses.
- **Data Governance & Demo Seeding**: 1-click restore utility to reset and seed standardized baseline datasets for testing and demonstrations.

---

## Tech Stack
- **Frontend**: React 19, TypeScript, Vite, Tailwind CSS v4, Lucide React, Recharts
- **Backend**: Node.js, Express, tsx
- **Persistence**: File-backed JSON store with transactional safety (`src/db/storage.ts`) with Drizzle ORM and PostgreSQL support when configured

---

## Default Port
Runs by default on **Port 3006**.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment
Create a `.env` file based on `.env.example`:
```env
PORT=3006
NODE_ENV=development
```

### 3. Start Development Server
```bash
npm run dev
```
Open your browser to: [http://localhost:3006](http://localhost:3006)

### 4. Build for Production
```bash
npm run build
npm start
```

---

## API Endpoints Reference

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Service health status |
| `GET` | `/api/v1/admin/dashboard` | Ecosystem KPI stats, pipeline funnel, and request volume |
| `GET` | `/api/v1/admin/system/health` | Live health checks across all platform microservices |
| `GET` | `/api/v1/admin/ai/models` | AI model inventory, accuracy metrics, and override rates |
| `PATCH` | `/api/v1/admin/ai/models/:id` | Update model production status or confidence threshold |
| `GET` | `/api/v1/admin/ai/overrides` | List of manual human overrides of AI decisions |
| `POST` | `/api/v1/admin/ai/overrides` | Record a new human override with reason |
| `GET` | `/api/v1/admin/audit` | Filterable cross-platform system audit trail |
| `GET` | `/api/v1/admin/users` | Directory of authorized administrative users |
| `POST` | `/api/v1/admin/users` | Create a new user with assigned role and jurisdiction |
| `PATCH` | `/api/v1/admin/users/:id/status` | Toggle user active/suspended status |
| `POST` | `/api/v1/admin/demo/seed` | Reset and re-seed the platform demonstration dataset |
