const { Router } = require('express');
const db = require('../db');
const { requireAdmin } = require('../auth');

const router = Router();

router.get('/', (req, res) => {
  const rows = db.prepare('SELECT * FROM site_stats ORDER BY scope, rowid').all();
  res.json(rows);
});

// Upsert by key — e.g. PUT /api/stats/youth_reached { label, value, scope }
router.put('/:key', requireAdmin, (req, res) => {
  const { label, value, scope } = req.body || {};
  if (!label || !value || !scope) {
    return res.status(400).json({ error: 'label, value, and scope are required.' });
  }
  db.prepare(`
    INSERT INTO site_stats (key, label, value, scope) VALUES (@key, @label, @value, @scope)
    ON CONFLICT(key) DO UPDATE SET label = @label, value = @value, scope = @scope
  `).run({ key: req.params.key, label, value, scope });
  res.json(db.prepare('SELECT * FROM site_stats WHERE key = ?').get(req.params.key));
});

router.delete('/:key', requireAdmin, (req, res) => {
  const info = db.prepare('DELETE FROM site_stats WHERE key = ?').run(req.params.key);
  if (info.changes === 0) return res.status(404).json({ error: 'stat not found' });
  res.status(204).end();
});

module.exports = router;
