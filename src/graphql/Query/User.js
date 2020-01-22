const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const Preference = require('../../models/Preference')

const getViewer = async (obj, args, { user }) => {
  if (!user) {
    throw new UserInputError('User does not exist')
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
