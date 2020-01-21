const { gql } = require('apollo-server-express')

module.exports = gql`
  type Mutation {
    login(email: String!, password: String!): AuthReturn!
    register(input: RegisterInput!): AuthReturn!
    updatePreferences(input: NewPrefsInput!): Preferences!
  }

  type Query {
    welcome: String!
    getViewer: UserInfo!

  }

  type User {
    id: ID!
    email: String!
    createdAt: String!
    updatedAt: String!
  }

  type Preferences {
    searchBar: Boolean!
    weatherCur: Boolean!
    greeting: Boolean!
  }

  type UserInfo {
    username: String!
    firstName: String
    lastName: String
    prefs: Preferences!
  }

  type AuthReturn {
    token: String!
    user: User!
  }

  input RegisterInput {
    email: String!
    password: String!
  }
  input NewPrefsInput{
    searchBar: Boolean
    weatherCur: Boolean
    greeting: Boolean
  }
`
