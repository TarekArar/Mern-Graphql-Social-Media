const {gql} = require('apollo-server')

const typeDefs = gql`
    type Query {
        getPosts : [Post!]!
        getPost(postId: ID!): Post!
    }
    type Mutation {
        register ( username: String!, email: String!, password: String!, confirmPassword: String!) : User!
        login(username: String!, password:String!): User!
        createPost(body: String!): Post!
        deletePost(postId: ID!): String!
        createComment(postId: ID!, body: String!): Post!
        deleteComment(commentId: ID!, postId: ID!): Post!
        toggleLike(postId: ID!): Post!
    }
    type Post {
        id: ID!
        username: String! 
        body: String!
        createdAt: String!
        comments: [Comment]!
        likes: [Like]!
    }

    type Comment {
        id: ID!
        username: String!
        body: String!
        createdAt: String!
    }

    type Like {
        id: ID!
        username: String!
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