const { HasManyRelation } = require('objection')
const BaseModel = require('./BaseModel')
const Preference = require('./Preference')

class User extends BaseModel {
  static get tableName() {
    return 'users'
  }

  static get relationMappings() {
    return {
      preferences: {
        relation: HasManyRelation,
        modelClass: Preference,
        join: {
          from: 'users.id',
          to: 'preferences.userId',
        },
      },
    }
  }
}

module.exports = User
