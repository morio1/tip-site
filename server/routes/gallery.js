const crudRouter = require('../crudFactory');

module.exports = crudRouter({
  table: 'gallery',
  columns: ['image_url', 'image_alt', 'is_tall', 'sort_order'],
  orderBy: 'sort_order ASC, id ASC',
  serialize: (row) => ({ ...row, is_tall: !!row.is_tall }),
  deserialize: (body) => ({ ...body, is_tall: body.is_tall ? 1 : 0 }),
});
