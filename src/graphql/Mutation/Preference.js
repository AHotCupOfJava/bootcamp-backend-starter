const Preference = require('../../models/Preference')

const updatePreferences = async (obj, { input }) => {
    const preference = await Preference.query().patch(input).where('userId', userId).returning('*')
    return preference
  }
  
  const resolver = {
    Mutation: {
        updatePreferences,
    },
  }
  
  module.exports = resolver