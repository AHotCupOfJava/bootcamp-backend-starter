const User = require('../../models/User')
const Preference = require('../../models/Preference')

const getViewer = async (obj, args, { user }) => {
  if (!user) {
    return 'Unauthorized'
  }

  const thisUser = await User.query().findById(user.id)
  const prefs = await Preference.query().findOne({ userId: user.id })

  const view = { ...thisUser, prefs }

  return view
}

const resolver = {
  Query: {
    getViewer,
  },
}

module.exports = resolver
