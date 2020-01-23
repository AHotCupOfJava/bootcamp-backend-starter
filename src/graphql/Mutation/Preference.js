const Preference = require('../../models/Preference')

const updatePreferences = async (obj, { input }, { user }) => {
  if (!user) {
    return 'Unauthorized'
  }

  const preference = await Preference.query().patch(input).where('userId', user.id).returning('*')
  return preference[0]
}

const resolver = {
  Mutation: {
    updatePreferences,
  },
}

module.exports = resolver
