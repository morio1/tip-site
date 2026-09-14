const crudRouter = require('../crudFactory');

module.exports = crudRouter({
  table: 'partners',
  columns: ['name', 'type', 'sort_order'],
  orderBy: 'sort_order ASC, id ASC',
});
