# Node Solutions Frontend (`node-frontend`)

Modern React single-page application for the **Node Solutions AI Request Triage Assistant**. Built with Vite, Plus Jakarta Sans & Outfit typography, custom micro-interactions, responsive views, and real-time backend synchronization.

---

## Features
- **Triage Console**: Ingest unstructured customer requests, select pre-calibrated test scenarios, view categorized results, and inspect directly editable drafted replies.
- **Department Routing Queues**: Visual workflow distribution board across Engineering, Sales, Finance, and Client Success with urgent ticket indicators.
- **Audit Records**: Searchable, filterable audit log with custom pagination, rows-per-page selector, and ticket detail modals.
- **Benchmark Suite**: One-click calibration suite testing all 6 technical challenge requests.

---

## Quick Start

### 1. Install Dependencies
```bash
npm install
```

### 2. Configure Environment (Optional for Local)
Copy the environment example:
```bash
cp .env.example .env
```
- For local development, leave `VITE_API_BASE_URL` empty (Vite automatically proxies `/api` requests to `http://localhost:3001`).
- For production/Vercel, set `VITE_API_BASE_URL` to your deployed backend URL.

### 3. Run Development Server
```bash
npm run dev
```
The application will be live at `http://localhost:3000`.

### 4. Build for Production
```bash
npm run build
```

---

## Deploying to Vercel

1. Push this repository to GitHub.
2. In [Vercel](https://vercel.com/new), import this repository.
3. Framework Preset: **Vite**.
4. Set Environment Variable:
   - `VITE_API_BASE_URL`: `https://<your-node-backend>.vercel.app`
5. Click **Deploy**. SPA route rewrites are pre-configured in [`vercel.json`](file:///e:/Node%20Solutions/node-frontend/vercel.json).
