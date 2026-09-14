// server.js — one process that serves the static site AND the CRUD API.
// This is what makes hosting simple: a single Node process, a single SQLite
// file, no separate frontend/backend deploy. Works the same on a public
// PaaS (Render, Railway, Fly.io) or a private machine on a LAN / behind a VPN.

require('dotenv').config();
const path = require('path');
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const rateLimit = require('express-rate-limit');

const db = require('./db'); // ensures schema exists before routes attach

const app = express();
const PORT = process.env.PORT || 3000;
const PUBLIC_DIR = path.join(__dirname, '..', 'public');

// Trust proxy when hosted behind a reverse proxy / load balancer (Render, Nginx, etc.)
app.set('trust proxy', 1);

app.use(helmet({
  contentSecurityPolicy: false, // the site loads Google Fonts + Unsplash images from public HTML
}));
app.use(cors({ origin: process.env.CORS_ORIGIN || true }));
app.use(express.json({ limit: '200kb' }));

// Basic abuse protection on the API, generous limit on public GETs.
app.use('/api', rateLimit({ windowMs: 15 * 60 * 1000, max: 300 }));
// Tighter limit specifically on lead submission to prevent spam floods.
app.use('/api/leads', rateLimit({ windowMs: 15 * 60 * 1000, max: 20 }));

// ---- API routes ----------------------------------------------------------
app.use('/api/projects', require('./routes/projects'));
app.use('/api/partners', require('./routes/partners'));
app.use('/api/gallery', require('./routes/gallery'));
app.use('/api/membership-tiers', require('./routes/membershipTiers'));
app.use('/api/stats', require('./routes/stats'));
app.use('/api/leads', require('./routes/leads'));

app.get('/api/health', (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

// ---- Static site -----------------------------------------------------
app.use(express.static(PUBLIC_DIR, { extensions: ['html'] }));

app.get('/constitution', (req, res) => {
  res.sendFile(path.join(PUBLIC_DIR, 'constitution.html'));
});

// 404 fallback for unknown API routes
app.use('/api', (req, res) => res.status(404).json({ error: 'Not found' }));

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: 'Internal server error' });
});

app.listen(PORT, () => {
  console.log(`TIP server running → http://localhost:${PORT}`);
  console.log(`API base           → http://localhost:${PORT}/api`);
});
