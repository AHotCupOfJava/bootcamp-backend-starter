const preferenceData = require('../../../data/prefernce')


exports.seed = knex => knex('preferences').del()
  .then(() => knex('preferences').insert(preferenceData))
