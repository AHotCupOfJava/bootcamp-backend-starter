const merge = require('lodash.merge')
const Auth = require('./Auth')
const Preference = require('./Preference')

const resolvers = [Auth, Preference]

module.exports = merge(...resolvers)
