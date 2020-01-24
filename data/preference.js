const casual = require('casual')
const userData = require('./user')


casual.define('preference', ({ userId }) => ({
  userId,
  searchBar: casual.boolean,
  weatherCur: casual.boolean,
  greeting: casual.boolean,
  orientation: casual.random_element(['CENTER', 'FLEX_START', 'FLEX_END']),
}))


const preferenceData = []
const used = []

for (let i = 0; i < 20; ++i) {
  let userId = casual.random_element(userData).id
  do {
    userId = casual.random_element(userData).id
  } while (used.includes(userId))
  used.push(userId)

  preferenceData.push(casual.preference({ userId }))
}

module.exports = preferenceData
