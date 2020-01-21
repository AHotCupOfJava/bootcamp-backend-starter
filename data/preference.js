const casual = require('casual')
const userData = require('./user')


casual.define('preference', ({ userId }) => ({
  userId,
  searchBar: casual.boolean,
  weatherCur: casual.boolean,
  greeting: casual.boolean,
}))


const preferenceData = []

for (let i = 0; i < 20; ++i) {
  const userId = casual.random_element(userData).id
  preferenceData.push(casual.preference({ userId }))
}

module.exports = preferenceData
