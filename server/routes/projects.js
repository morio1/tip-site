const crudRouter = require('../crudFactory');

module.exports = crudRouter({
  table: 'projects',
  columns: ['tag', 'title', 'description', 'status', 'goal_kes', 'raised_pct', 'image_url', 'image_alt', 'sort_order'],
  orderBy: 'sort_order ASC, id ASC',
});
