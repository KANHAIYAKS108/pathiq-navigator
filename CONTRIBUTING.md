# Contributing to PathIq

Thanks for your interest in improving PathIq!

## Workflow

1. Fork the repo and create a feature branch: `git checkout -b feat/my-feature`
2. Run `bun install` and `bun run dev`
3. Make your changes — keep components small and use semantic design tokens from `src/styles.css`
4. Verify the build: `bunx tsc --noEmit && bun run build`
5. Open a pull request describing the change and the user-facing impact

## Code Style

- TypeScript strict mode — no `any`
- Tailwind utility classes only via design tokens (no raw `text-white`, `bg-black`)
- Prefer `framer-motion` for animations
- Keep server functions pure and Worker-compatible (no Node-only deps)

## Commit Messages

Follow [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` new feature
- `fix:` bug fix
- `docs:` documentation only
- `refactor:` code change without behavior change
- `style:` formatting
- `chore:` tooling

## Reporting Issues

Include: reproduction steps, expected vs actual behavior, browser/OS, and screenshots if UI-related.
