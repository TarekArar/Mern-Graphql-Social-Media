// Dependencies
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
// MongoDb connection link
const { MongoLink } = require('./config')
// type Definition & resolvers
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs , 
    resolvers,
    context: ({req}) => ({req})
})

mongoose.connect(MongoLink, { 
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        return server.listen(5500)
        .then(
            res => console.log('Server running at '+ res.url)
            )
    })
    
    
