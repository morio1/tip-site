# The Incubator Platform (TIP)

**[Open the live website](https://morio1.github.io/tip-site/)**

A community website for youth-led climate action, green enterprise, and opportunity in Langata, Nairobi.

This repository includes two website implementations:

| Location | What it contains |
| --- | --- |
| `public/` and `server/` | The existing website, Express API, SQLite database, and admin dashboard |
| `frontend/` | The React website exported from Figma, including the homepage and interactive constitution |

The React export is included as a separate application. It is not yet connected to the Express API, and starting the backend still serves the existing `public/` website.

## Run the existing website and backend

Install Node.js 22, open the repository folder in VS Code, and run:

```sh
npm install
```

Copy `.env.example` to `.env` and replace `ADMIN_TOKEN` with a long random value. In PowerShell:

```powershell
Copy-Item .env.example .env
```

Then run:

```sh
npm run seed
npm start
```

Open **http://localhost:3000** for the website or **http://localhost:3000/admin.html** for the admin dashboard. The dashboard uses the token configured in `.env`.

SQLite stores data in `data/tip.db` by default. Keep that file on persistent storage when hosting the backend. Do not commit `.env` or database files.

## Run the Figma React website

Use Node.js 22.12 or newer, then open a second terminal:

```sh
cd frontend
npm install
npm run dev
```

Open the local address printed by Vite (port 8443 by default).

To build and preview this version:

```sh
npm run build
npm run preview
```

The output is `frontend/dist/`. See [the frontend README](frontend/README.md) for its features, editing guide, and limitations.

The React contact dialogs currently do not send or save enquiries. Project content, statistics, partners, and fees are defined in the source and should be reviewed before publishing.

## Repository guide

| Location | Purpose |
| --- | --- |
| `public/` | Existing website and admin dashboard |
| `server/server.js` | Express application |
| `server/routes/` | Content and enquiry API routes |
| `server/db.js` | SQLite schema and connection |
| `server/seed.js` | Starter content |
| `frontend/src/App.tsx` | New Figma homepage and dialogs |
| `frontend/src/ConstitutionPage.tsx` | New constitution page |
| `frontend/docs/previews/` | Website preview images |
| `api-tests.http` | Example API requests |
| `Dockerfile` and `docker-compose.yml` | Existing backend container setup |

## Publishing

The backend requires a Node.js host with persistent storage for SQLite. GitHub Pages can host the React build only; it cannot run this Express server or SQLite database.

The GitHub Pages workflow publishes the React website automatically when changes are pushed to `main`. The Express backend is preserved but is not hosted by GitHub Pages. The React contact dialogs are not connected to it.
