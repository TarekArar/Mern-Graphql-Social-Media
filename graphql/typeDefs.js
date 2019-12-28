const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        getPosts : [Post!]!
    }
    type Mutation {
        registerUser ( username: String!, email: String!, password: String!, confirmPassword: String!) : User
    }
    type Post {
        id: ID!
        username: String! 
        body: String!
        createdAt: String!
    }

    type User {
        id: ID!
        username: String!
        email: String!
        token: String!
        createdAt: String!
    }

`

module.exports = typeDefs