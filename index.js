// Dependencies
const { ApolloServer } = require('apollo-server')
const mongoose = require('mongoose')
// MongoDb connection link
const { MongoLink } = require('./config')
// Models import
const User = require('./models/User')
// type Definition & resolvers
const typeDefs = require('./graphql/typeDefs')
const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({
    typeDefs , 
    resolvers
})

mongoose.connect(MongoLink, { 
    useCreateIndex: true, 
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => {
        return server.listen(5000)
        .then(
            res => console.log('Server running at '+ res.url)
            )
    })
    
    
