# Jordan Yvonne

A portfolio website for Jordan Yvonne showcasing costuming, acting, and art projects. Built with React Router v7 (SSR), Vite, Tailwind CSS, and Sanity CMS.

## Tech Stack

- **Framework** — [React Router v7](https://reactrouter.com/) (Framework / SSR mode)
- **Build Tool** — [Vite](https://vite.dev/) (via rolldown-vite)
- **Styling** — [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations** — [Motion](https://motion.dev/)
- **CMS** — [Sanity](https://www.sanity.io/)
- **Hosting** — [Vercel](https://vercel.com/)
- **Language** — TypeScript

## Prerequisites

- [Node.js](https://nodejs.org/) v18+
- npm
- A [Sanity](https://www.sanity.io/) project with a configured dataset

## Getting Started

### 1. Clone the repository

```bash
git clone https://github.com/NoActionJaxn/jordan-yvonne-vercel.git
cd jordan-yvonne-vercel
```

### 2. Install dependencies

```bash
npm install
```

### 3. Set up environment variables

Create a `.env` file in the project root:

```env
VITE_PROJECT_ID=<your-sanity-project-id>
VITE_DATASET=<your-sanity-dataset>
VITE_API_VERSION=<sanity-api-version>
VITE_USE_CDN=true
```

> On Vercel, set these same variables **without the `VITE_` prefix** (e.g. `PROJECT_ID`, `DATASET`, etc.) so the server runtime can access them via `process.env`.

### 4. Start the dev server

```bash
npm run dev
```

The app will be available at `http://localhost:5173`.

## Scripts

| Command | Description |
| --- | --- |
| `npm run dev` | Start the development server |
| `npm run build` | Build for production |
| `npm start` | Serve the production build locally |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | Generate route types and type-check |

## Project Structure

```
├── app/                  # React Router app directory
│   ├── root.tsx          # Document shell (html, head, body)
│   ├── entry.client.tsx  # Client hydration entry
│   ├── entry.server.tsx  # Server rendering entry
│   ├── routes.ts         # Route definitions
│   ├── routes/           # Route modules (loaders + components)
│   └── lib/              # Shared helpers (SEO, etc.)
├── src/
│   ├── components/       # Reusable UI components
│   ├── hooks/            # Custom React hooks
│   ├── lib/              # Sanity client, queries, utilities
│   ├── styles/           # Global CSS (Tailwind)
│   └── types/            # TypeScript type definitions
├── public/               # Static assets (robots.txt, sitemap, etc.)
├── react-router.config.ts
├── vite.config.ts
└── vercel.json
```

## Deployment

The project is configured for **Vercel** with SSR via `@vercel/react-router`. Pushing to the main branch triggers an automatic deployment.

Make sure the environment variables (`PROJECT_ID`, `DATASET`, `API_VERSION`, `USE_CDN`) are set in your Vercel project settings.

## License

Private — all rights reserved.
