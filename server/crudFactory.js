// crudFactory.js — builds standard GET/GET:id/POST/PUT/DELETE handlers for a
// table, given its allowed columns. Keeps routes/*.js short and consistent.

const { Router } = require('express');
const db = require('./db');
const { requireAdmin } = require('./auth');

/**
 * @param {object} opts
 * @param {string} opts.table         table name
 * @param {string[]} opts.columns     writable columns (order-independent)
 * @param {string} [opts.orderBy]     default sort, e.g. 'sort_order ASC'
 * @param {(row:object)=>object} [opts.serialize]   transform a row before sending it out
 * @param {(body:object)=>object} [opts.deserialize] transform incoming body before writing
 */
function crudRouter({ table, columns, orderBy = 'sort_order ASC, id ASC', serialize = (r) => r, deserialize = (b) => b }) {
  const router = Router();

  router.get('/', (req, res) => {
    const rows = db.prepare(`SELECT * FROM ${table} ORDER BY ${orderBy}`).all();
    res.json(rows.map(serialize));
  });

  router.get('/:id', (req, res) => {
    const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
    if (!row) return res.status(404).json({ error: `${table} record not found` });
    res.json(serialize(row));
  });

  router.post('/', requireAdmin, (req, res) => {
    const data = deserialize(req.body || {});
    const cols = columns.filter((c) => data[c] !== undefined);
    if (cols.length === 0) return res.status(400).json({ error: 'No valid fields provided.' });
    const placeholders = cols.map((c) => `@${c}`).join(', ');
    const stmt = db.prepare(`INSERT INTO ${table} (${cols.join(', ')}) VALUES (${placeholders})`);
    try {
      const info = stmt.run(data);
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(info.lastInsertRowid);
      res.status(201).json(serialize(row));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.put('/:id', requireAdmin, (req, res) => {
    const existing = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
    if (!existing) return res.status(404).json({ error: `${table} record not found` });
    const data = deserialize(req.body || {});
    const cols = columns.filter((c) => data[c] !== undefined);
    if (cols.length === 0) return res.status(400).json({ error: 'No valid fields provided.' });
    const setClause = cols.map((c) => `${c} = @${c}`).join(', ');
    const stmt = db.prepare(`UPDATE ${table} SET ${setClause}, updated_at = datetime('now') WHERE id = @id`);
    try {
      stmt.run({ ...data, id: req.params.id });
      const row = db.prepare(`SELECT * FROM ${table} WHERE id = ?`).get(req.params.id);
      res.json(serialize(row));
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  });

  router.delete('/:id', requireAdmin, (req, res) => {
    const info = db.prepare(`DELETE FROM ${table} WHERE id = ?`).run(req.params.id);
    if (info.changes === 0) return res.status(404).json({ error: `${table} record not found` });
    res.status(204).end();
  });

  return router;
}

module.exports = crudRouter;
