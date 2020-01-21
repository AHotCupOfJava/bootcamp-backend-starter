const { BelongsToOneRelation } = require('objection')
const BaseModel = require('./BaseModel')
const User = require('./User')

class Preference extends BaseModel {
  static get tableName() {
    return 'preferences'
  }

  static get relationMappings() {
    return {
      users: {
        relation: BelongsToOneRelation,
        modelClass: User,
        join: {
          from: 'preferences.userId',
          to: 'users.id',
        },
      },
    }
  }
}

module.exports = Preference
