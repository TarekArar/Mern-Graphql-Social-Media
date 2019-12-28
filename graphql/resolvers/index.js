const postsresolvers = require('./Post')
const usersresolvers = require('./User')

module.exports = {
    Query : {
        ...postsresolvers.Query
    },
    Mutation: {
        ...usersresolvers.Mutation
    }
}