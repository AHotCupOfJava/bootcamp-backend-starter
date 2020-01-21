const casual = require('casual')
const userData = require ('./user')



casual.define('preference', ({ userId }) => ({
  id: casual.uuid,

  searchBar: casual.boolean,
  email: casual.email,
  weatherCur: casual.boolean,
  greeting: casual.boolean,
  created_at: casual.moment,
  updated_at: casual.moment,
  userId,
}))


const preferenceData = []

for (let i = 0; i < 20; ++i) {
    const userId = casual.random_element(userData).id
  preferenceData.push(casual.preference({ userId }))
}

module.exports = preferenceData
