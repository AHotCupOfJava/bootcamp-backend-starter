const casual = require('casual')

// 'password' hashed with bcrypt scheme
const pass = '$2a$10$rQEY9CNl4OC.UtiyRgKnZeW0KaWnEANMKAxfIpNDQCgiCybm3G1fy'

casual.define('user', () => ({
  id: casual.uuid,
  username: casual.username,
  email: casual.email,
  passwordHash: pass,
  firstName: casual.first_name,
  lastName: casual.last_name,
}))


const userData = []

for (let i = 0; i < 20; ++i) {
  userData.push(casual.user)
}

module.exports = userData
