const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const Preference = require('../../models/Preference')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')


const login = async (obj, { email, password }) => {
  if (!email || !password) {
    throw new UserInputError('Must provide email and password')
  }

  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new UserInputError('Invalid email or password')
  }

  const validPassword = await comparePassword(password, user.passwordHash)
  if (!validPassword) {
    throw new UserInputError('Invalid email or password')
  }


  // If successful login, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)

  return { user, token }
}

const register = async (obj, {
  input: {
    email, username, firstName, lastName, password,
  },
}) => {
  if (!email || !username || !password) {
    throw new UserInputError('Must provide email, username, and password')
  }

  const emailExists = await User.query().findOne({ email })
  if (emailExists) {
    throw new UserInputError('Email is already in use')
  }

  const usernameExists = await User.query().findOne({ username })
  if (usernameExists) {
    throw new UserInputError('Username is already in use')
  }

  const passHash = await hashPassword(password)
  const user = await User.query().insertAndFetch({
    email,
    username,
    firstName,
    lastName,
    passwordHash: passHash,
  })

  await Preference.query().insert({
    userId: user.id,
    searchBar: true,
    weatherCur: true,
    greeting: true,
    orientation: 'CENTER',
  }).returning('*')

  // If successful registration, set authentication information
  const payload = {
    id: user.id,
  }
  const token = createToken(payload)

  return { user, token }
}

const resolver = {
  Mutation: { login, register },
}

module.exports = resolver
