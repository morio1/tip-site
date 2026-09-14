# The Incubator Platform (TIP) — site + CRUD backend

A single Node/Express server that serves the static site (`/public`) and a
JSON CRUD API backed by SQLite (`/data/tip.db`). One process, one file
database — deploy it anywhere without provisioning a separate database
server.

```
tip-site/
├── public/              ← the site (served as-is, no build step)
│   ├── index.html
│   ├── constitution.html
│   ├── admin.html        ← content & leads dashboard (needs admin token)
│   ├── styles.css
│   └── app.js             ← fetches live data from /api, falls back to
│                             the static HTML already in the page if the
│                             API is unreachable
├── server/
│   ├── server.js          ← Express app entrypoint
│   ├── db.js              ← SQLite connection + schema (auto-creates tables)
│   ├── seed.js             ← loads starter content (run once)
│   ├── auth.js              ← admin-token middleware
│   ├── crudFactory.js        ← generic GET/POST/PUT/DELETE builder
│   └── routes/
│       ├── projects.js
│       ├── partners.js
│       ├── gallery.js
│       ├── membershipTiers.js
│       ├── stats.js
│       └── leads.js          ← contact-form submissions (join/partner/sponsor/invite)
├── .vscode/                ← launch config, settings, recommended extensions
├── api-tests.http            ← click-to-run API requests (REST Client extension)
├── package.json
├── .env.example
├── Dockerfile
└── docker-compose.yml
```

## 1. Open in VS Code

```bash
code tip-site        # or: File → Open Folder… → tip-site
```

Install the recommended extensions when VS Code prompts you (or open the
Extensions panel and accept — they're listed in `.vscode/extensions.json`):
ESLint, Prettier, Live Server, REST Client, SQLite Viewer.

## 2. Local setup

```bash
npm install
cp .env.example .env        # then edit ADMIN_TOKEN to something random
npm run seed                # loads the starter projects/partners/gallery/tiers
npm start                   # http://localhost:3000
```

Open `http://localhost:3000` for the site, and `http://localhost:3000/admin.html`
for the CRUD dashboard — paste the same `ADMIN_TOKEN` from your `.env` into
the token field at the top of that page.

For live-reload during development: `npm run dev` (uses nodemon), or press
**F5** in VS Code (uses `.vscode/launch.json` → "Run TIP server") to run it
under the debugger with breakpoints.

Use `api-tests.http` to poke the API directly from the editor: install the
**REST Client** extension, open the file, and click "Send Request" above any
block — no curl or Postman needed.

## 3. The data model

| Table               | Purpose                                             |
|---------------------|------------------------------------------------------|
| `projects`           | The 4 project cards + funding progress               |
| `partners`           | The partner-org tiles                                |
| `gallery`            | Gallery grid images                                   |
| `membership_tiers`   | The 3 pricing/membership cards                        |
| `site_stats`         | Hero stats + impact-bar stats (key/value pairs)       |
| `leads`              | Every submission from the "Join / Partner / Sponsor / Invite" modal |

## 4. API reference

Base URL: `/api`. All list/detail `GET` endpoints are public. Every
`POST` / `PUT` / `DELETE` (except creating a lead) requires the header:

```
x-admin-token: <your ADMIN_TOKEN>
```

| Resource                 | Endpoints |
|---------------------------|-----------|
| Projects                  | `GET /projects`, `GET /projects/:id`, `POST /projects`, `PUT /projects/:id`, `DELETE /projects/:id` |
| Partners                  | same shape at `/partners` |
| Gallery                   | same shape at `/gallery` |
| Membership tiers          | same shape at `/membership-tiers` (`perks` is a JSON array) |
| Site stats                | `GET /stats`, `PUT /stats/:key` (upsert), `DELETE /stats/:key` |
| Leads                     | `POST /leads` (public, from the contact modal), `GET /leads` (admin), `GET /leads/:id` (admin), `PUT /leads/:id` (admin, update `status`), `DELETE /leads/:id` (admin) |
| Health check               | `GET /health` |

The homepage (`app.js`) re-fetches `/api/projects`, `/api/partners`,
`/api/gallery`, `/api/membership-tiers`, and `/api/stats` on every load and
re-renders those sections — so editing content through the API (or through
`admin.html`) updates the live site immediately, no redeploy needed.

## 5. Hosting

Because everything is one Node process + one SQLite file, you have two
straightforward paths:

### A. Public hosting (Render, Railway, Fly.io, a VPS, etc.)

1. Push this folder to a Git repo.
2. On the platform, set the **build command** to `npm install` and the
   **start command** to `npm start` (or use the included `Dockerfile` —
   most platforms auto-detect it).
3. Set environment variables: `ADMIN_TOKEN` (required), `PORT` (usually
   set for you automatically), optionally `CORS_ORIGIN` if the API will be
   called from a different domain than the site itself.
4. **Attach a persistent disk/volume** mounted so `DB_PATH` (default
   `./data/tip.db`) survives redeploys — e.g. Render Disks, Railway
   Volumes, or a Fly.io volume. Without this, every redeploy resets the
   database to empty (SQLite is just a file).
5. First deploy: SSH in (or use the platform's one-off job feature) and run
   `npm run seed` once to load starter content.

### B. Private / internal hosting (office LAN, VPN, home server)

Docker Compose is the simplest path and keeps data in a named volume:

```bash
cp .env.example .env        # set ADMIN_TOKEN
docker compose up -d --build
docker compose exec tip node server/seed.js   # first run only
```

The site is now reachable at `http://<machine-ip>:3000` to anyone on the
same network/VPN — nothing is exposed publicly unless you choose to port-forward
or put a reverse proxy (Nginx, Caddy, Tailscale Funnel, Cloudflare Tunnel) in
front of it.

To restrict access further, put the whole app behind your VPN/firewall and
skip exposing port 3000 externally at all — the container only needs to be
reachable by people already inside your private network.

### Either way: custom domain

Point your domain's DNS (A/CNAME record) at the host, then put a reverse
proxy or your PaaS's built-in TLS termination in front of port 3000 —
Render/Railway/Fly.io handle this automatically when you add a custom
domain in their dashboard; for a self-hosted box, Caddy is the easiest
(`your-domain.org { reverse_proxy localhost:3000 }` and it auto-issues
HTTPS certs).

## 6. Security notes

- Change `ADMIN_TOKEN` from the default before deploying anywhere reachable
  by others — it's the only thing gating writes and lead access.
- `admin.html` stores the token in the browser's `localStorage` for
  convenience; don't use it on a shared/public computer.
- Rate limiting is already on (`express-rate-limit`): 300 req/15 min on
  `/api`, 20 req/15 min specifically on lead submissions to blunt spam.
- The API and site share one origin by default, so CORS is permissive
  unless you set `CORS_ORIGIN`. Lock it down if you ever split the
  frontend onto a different domain.
