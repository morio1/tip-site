const crudRouter = require('../crudFactory');

module.exports = crudRouter({
  table: 'membership_tiers',
  columns: ['tier', 'fee', 'period', 'perks', 'cta', 'modal_mode', 'highlight', 'sort_order'],
  orderBy: 'sort_order ASC, id ASC',
  serialize: (row) => ({
    ...row,
    highlight: !!row.highlight,
    perks: (() => { try { return JSON.parse(row.perks); } catch { return []; } })(),
  }),
  deserialize: (body) => ({
    ...body,
    highlight: body.highlight ? 1 : 0,
    perks: Array.isArray(body.perks) ? JSON.stringify(body.perks) : body.perks,
  }),
});
