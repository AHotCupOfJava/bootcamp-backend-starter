const preferenceData = require('../../../data/preference')


exports.seed = knex => knex('preferences').del()
  .then(() => knex('preferences').insert(preferenceData))
