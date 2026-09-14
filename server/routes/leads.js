const { Router } = require('express');
const db = require('../db');
const { requireAdmin } = require('../auth');

const router = Router();

const VALID_MODES = ['join', 'partner', 'sponsor', 'invite'];

// Public: anyone submitting the site's contact modal creates a lead.
router.post('/', (req, res) => {
  const { mode, full_name, email, organisation, message } = req.body || {};
  if (!VALID_MODES.includes(mode)) {
    return res.status(400).json({ error: `mode must be one of: ${VALID_MODES.join(', ')}` });
  }
  if (!full_name || !email) {
    return res.status(400).json({ error: 'full_name and email are required.' });
  }
  const info = db.prepare(`
    INSERT INTO leads (mode, full_name, email, organisation, message)
    VALUES (@mode, @full_name, @email, @organisation, @message)
  `).run({ mode, full_name, email, organisation: organisation || null, message: message || null });

  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(info.lastInsertRowid);
  res.status(201).json(row);
});

// Admin-only from here down — these are your incoming members/partners/sponsors/invites.
router.get('/', requireAdmin, (req, res) => {
  const { status, mode } = req.query;
  let sql = 'SELECT * FROM leads WHERE 1=1';
  const params = {};
  if (status) { sql += ' AND status = @status'; params.status = status; }
  if (mode) { sql += ' AND mode = @mode'; params.mode = mode; }
  sql += ' ORDER BY created_at DESC';
  res.json(db.prepare(sql).all(params));
});

router.get('/:id', requireAdmin, (req, res) => {
  const row = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!row) return res.status(404).json({ error: 'lead not found' });
  res.json(row);
});

router.put('/:id', requireAdmin, (req, res) => {
  const existing = db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id);
  if (!existing) return res.status(404).json({ error: 'lead not found' });
  const status = req.body?.status;
  if (!['new', 'contacted', 'closed'].includes(status)) {
    return res.status(400).json({ error: 'status must be one of: new, contacted, closed' });
  }
  db.prepare('UPDATE leads SET status = ? WHERE id = ?').run(status, req.params.id);
  res.json(db.prepare('SELECT * FROM leads WHERE id = ?').get(req.params.id));
});

router.delete('/:id', requireAdmin, (req, res) => {
  const info = db.prepare('DELETE FROM leads WHERE id = ?').run(req.params.id);
  if (info.changes === 0) return res.status(404).json({ error: 'lead not found' });
  res.status(204).end();
});

module.exports = router;
