# PathIq 🚀

> AI-powered Career GPS that transforms professional goals into interactive, step-by-step learning roadmaps.

PathIq leverages **Gemini 2.5 Flash** via the Lovable AI Gateway to generate personalized learning paths, rendered on an interactive **React Flow** canvas with per-node progress tracking.

---

## ✨ Features

- 🧠 **AI Roadmap Generation** — Enter your career goal, skill level, and daily hours; get a tailored 6–9 phase roadmap.
- 🗺️ **Interactive Canvas** — Pan, zoom, and click nodes powered by Xyflow (React Flow).
- ✅ **Progress Tracking** — Mark phases complete; progress syncs to the cloud per session.
- 📚 **Curated Resources** — Each phase includes 2–4 hand-picked courses, books, and projects.
- 🎨 **Premium Editorial Design** — Serif typography (Playfair Display + Cormorant Garamond), dark aurora aesthetic, ambient video backgrounds.

---

## 🏗️ Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | TanStack Start v1 (React 19 + Vite 7) |
| Styling | Tailwind CSS v4 + custom `oklch` design tokens |
| Canvas | @xyflow/react |
| State | Zustand |
| Animation | Framer Motion |
| Backend | Lovable Cloud (Supabase: Postgres + Edge Functions) |
| AI | Lovable AI Gateway → `google/gemini-2.5-flash` |
| Deploy | Cloudflare Workers (edge runtime) |

---

## 📂 Project Structure

```
src/
├── routes/                    # File-based routing
│   ├── __root.tsx             # Shell + fonts
│   ├── index.tsx              # Landing page
│   └── roadmap.$id.tsx        # Roadmap canvas view
├── components/
│   ├── RoadmapGenerator.tsx   # Hero form
│   ├── HowItWorks.tsx         # Editorial 4-step section
│   ├── HowToUse.tsx           # Sticky video guide
│   ├── VisualDemo.tsx         # Animated SVG preview
│   └── roadmap/
│       ├── RoadmapFlow.tsx    # React Flow canvas
│       ├── CustomNode.tsx     # Phase node
│       └── NodeModal.tsx      # Resource side-panel
├── lib/ai/
│   ├── promptBuilder.ts       # Gemini prompt
│   ├── responseParser.ts      # JSON sanitizer
│   └── types.ts               # Roadmap schema
├── server/
│   └── roadmap.functions.ts   # AI generation server fn
├── store/
│   └── useRoadmapStore.ts     # Progress state
└── styles.css                 # Design tokens
```

---

## 🚀 Getting Started

See [START.md](./START.md) for full setup and run instructions.

```bash
bun install
bun run dev
```

---

## 📜 License

MIT — built with [Lovable](https://lovable.dev).
