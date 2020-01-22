const { UserInputError } = require('apollo-server-express')
const User = require('../../models/User')
const {
  hashPassword, comparePassword, createToken,
} = require('../../lib/auth')


const login = async (obj, { email, password }) => {
  const user = await User.query().findOne({
    email,
  })
  if (!user) {
    throw new UserInputError('Invalid email')
  }

  const validPassword = await comparePassword(password, user.passwordHash)
  if (!validPassword) {
    throw new UserInputError('Invalid password')
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
