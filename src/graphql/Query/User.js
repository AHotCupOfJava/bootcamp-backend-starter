const User = require('../../models/User')
const Preference = require('../../models/Preference')

const getViewer = async (obj, args, { user }) => {
  if (!user) {
    return 'Unauthorized'
  }

  const thisUser = await User.query().select('username', 'firstName', 'lastName').findById(user.id)
  const prefs = await Preference.query().where('userId', user.id)

  const view = { ...thisUser, prefs }
  return view
}

const resolver = {
  Query: {
    getViewer,
  },
}

module.exports = resolver
