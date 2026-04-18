# Getting Started with PathIq

This guide walks you through running PathIq locally and understanding the core flows.

---

## 1. Prerequisites

- **Bun** ≥ 1.0 (or Node.js ≥ 20 with npm)
- A **Lovable Cloud** project (already provisioned — no Supabase account needed)

---

## 2. Install

```bash
bun install
```

---

## 3. Environment Variables

The `.env` file is auto-managed by Lovable Cloud and contains:

```
VITE_SUPABASE_URL=...
VITE_SUPABASE_PUBLISHABLE_KEY=...
VITE_SUPABASE_PROJECT_ID=...
```

> ⚠️ Do not edit `.env` manually — it regenerates on Cloud sync.

The AI Gateway key (`LOVABLE_API_KEY`) is injected automatically at runtime for server functions; no setup needed.

---

## 4. Run the Dev Server

```bash
bun run dev
```

Open <http://localhost:8080>.

---

## 5. Build for Production

```bash
bun run build
```

Outputs an edge-ready bundle for Cloudflare Workers.

---

## 6. How the App Flows

1. **Landing page (`/`)** — User fills in `career`, `skillLevel`, `hoursPerDay`.
2. **Server function** (`src/server/roadmap.functions.ts`) calls Gemini 2.5 Flash with the prompt from `promptBuilder.ts`.
3. The JSON response is parsed (`responseParser.ts`) and persisted to the `roadmaps` table.
4. User is redirected to `/roadmap/:id` where the React Flow canvas renders.
5. Clicking a node opens `NodeModal` with resources; toggling completion writes to `node_progress` keyed by `session_id`.

---

## 7. Database Schema

| Table | Purpose |
|-------|---------|
| `roadmaps` | Stores AI-generated roadmap JSON + input params |
| `node_progress` | Per-session phase completion state |

RLS is enabled with public-read/insert policies for the MVP (no auth).

---

## 8. Customizing

- **Design tokens** → `src/styles.css`
- **AI prompt** → `src/lib/ai/promptBuilder.ts`
- **Phase icons** → `src/lib/phaseIcons.ts`

---

## 9. Troubleshooting

- **Roadmap stuck generating?** Check the server function logs in Lovable Cloud → Functions.
- **Blank canvas?** Verify the roadmap row exists in the `roadmaps` table.
- **TypeScript errors?** Run `bunx tsc --noEmit`.

Happy building. ✨
