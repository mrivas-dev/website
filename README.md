# Adaptive Terminal Portfolio

A personal portfolio website that masquerades as a native OS terminal. The interface automatically adapts its visual appearance and command vocabulary to the visitor's operating system (macOS, Linux, or Windows), creating the illusion that they opened a terminal on their own machine.

## Features

- **OS-adaptive UI** — Detects the visitor's OS and renders authentic terminal chrome, fonts, and prompts
- **Interactive commands** — Explore resume, projects, skills, experience, and contact info via keyboard
- **Virtual filesystem** — Navigate portfolio content with familiar commands like `ls`, `cd`, and `cat`
- **Bilingual support** — English and Spanish with automatic locale detection
- **Easter eggs** — Hidden commands for curious visitors (`sudo hire-me`, `coffee`, `hack`, and more)

## Tech Stack

- [Next.js](https://nextjs.org/) (App Router, static export)
- [TypeScript](https://www.typescriptlang.org/)
- [Tailwind CSS](https://tailwindcss.com/)
- Deployed on [Cloudflare Pages](https://pages.cloudflare.com/)

## Project Structure

```
├── app/                  # Next.js App Router
├── components/
│   ├── Terminal/         # Terminal UI components
│   ├── themes/           # OS-specific theme tokens
│   └── commands/         # Command implementations
├── lib/
│   ├── os-detect.ts      # OS detection
│   ├── command-registry.ts
│   ├── i18n/             # English & Spanish translations
│   └── content/          # Portfolio data
├── public/
│   └── resume.pdf
└── styles/
    └── globals.css
```

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build
```

Open [http://localhost:3000](http://localhost:3000) and type `help` to see available commands.

## Available Commands

| Command | Description |
|---|---|
| `help` | List all commands |
| `about` | Professional summary |
| `resume` | View and download résumé |
| `experience` | Career history |
| `skills` | Skills by category |
| `projects` | Project list |
| `project <name>` | Project details |
| `contact` | Contact information |
| `ls`, `cd`, `cat` | Virtual filesystem navigation |
| `lang en` / `lang es` | Switch language |

## Deployment

The site is configured for static export and deploys to Cloudflare Pages:

- **Build command:** `next build`
- **Output directory:** `out`
- **Node version:** 20

Production deployments trigger automatically on merge to `main`.

## License

Private — all rights reserved.
