<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## Cursor Cloud specific instructions

This is a static-export Next.js 16 portfolio site with no backend or external services. Standard commands live in `README.md` / `package.json` scripts (`dev`, `build`, `lint`, `test`).

- Dev server: `npm run dev` serves on `http://localhost:3000`. Run it in a background/tmux session.
- Tests: `npm test` (Jest). The Jest config is `jest.config.ts`, so Jest requires `ts-node` to parse it — `ts-node` is a declared devDependency, so a plain `npm install` covers it.
- Lint: `npm run lint` currently fails on **pre-existing** `react-hooks/set-state-in-effect` errors in `components/commands/easter-eggs.tsx` and `components/Terminal/`. These are not caused by env setup; don't assume your change broke lint if you see them.
