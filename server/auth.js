// auth.js — minimal auth for write endpoints.
// Public site visitors only ever GET data or POST a lead (contact form).
// Creating/editing/deleting projects, partners, gallery items, or tiers
// requires the admin token, sent as header: x-admin-token: <ADMIN_TOKEN>

const ADMIN_TOKEN = process.env.ADMIN_TOKEN || 'change-me';

function requireAdmin(req, res, next) {
  const token = req.get('x-admin-token');
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(401).json({ error: 'Unauthorized. Provide a valid x-admin-token header.' });
  }
  next();
}

module.exports = { requireAdmin, ADMIN_TOKEN };
