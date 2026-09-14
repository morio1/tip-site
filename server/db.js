// db.js — SQLite connection + schema.
// Uses better-sqlite3: zero external server, single file on disk (data/tip.db).
// That makes this trivially easy to host anywhere — a VPS, a Raspberry Pi on a
// LAN, Render/Railway/Fly.io, or just `node server/server.js` on a laptop.

const path = require('path');
const fs = require('fs');
const Database = require('better-sqlite3');

const DATA_DIR = path.join(__dirname, '..', 'data');
if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true });

const DB_PATH = process.env.DB_PATH || path.join(DATA_DIR, 'tip.db');
const db = new Database(DB_PATH);
db.pragma('journal_mode = WAL');
db.pragma('foreign_keys = ON');

db.exec(`
CREATE TABLE IF NOT EXISTS projects (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tag TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('Active','Fundraising','Seeking Partners')),
  goal_kes INTEGER NOT NULL,
  raised_pct INTEGER NOT NULL DEFAULT 0 CHECK (raised_pct BETWEEN 0 AND 100),
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS partners (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS gallery (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  image_url TEXT NOT NULL,
  image_alt TEXT NOT NULL,
  is_tall INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS membership_tiers (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  tier TEXT NOT NULL,
  fee TEXT NOT NULL,
  period TEXT NOT NULL,
  perks TEXT NOT NULL,           -- JSON array, stored as text
  cta TEXT NOT NULL,
  modal_mode TEXT NOT NULL CHECK (modal_mode IN ('join','partner','sponsor','invite')),
  highlight INTEGER NOT NULL DEFAULT 0,
  sort_order INTEGER NOT NULL DEFAULT 0,
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  updated_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS site_stats (
  key TEXT PRIMARY KEY,          -- e.g. 'youth_reached', 'active_projects'
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  scope TEXT NOT NULL DEFAULT 'hero'  -- 'hero' or 'impact'
);

-- Leads: every ContactModal submission (join / partner / sponsor / invite)
CREATE TABLE IF NOT EXISTS leads (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  mode TEXT NOT NULL CHECK (mode IN ('join','partner','sponsor','invite')),
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  organisation TEXT,
  message TEXT,
  status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new','contacted','closed')),
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE INDEX IF NOT EXISTS idx_projects_sort ON projects(sort_order);
CREATE INDEX IF NOT EXISTS idx_partners_sort ON partners(sort_order);
CREATE INDEX IF NOT EXISTS idx_gallery_sort ON gallery(sort_order);
CREATE INDEX IF NOT EXISTS idx_tiers_sort ON membership_tiers(sort_order);
CREATE INDEX IF NOT EXISTS idx_leads_created ON leads(created_at);
`);

module.exports = db;
