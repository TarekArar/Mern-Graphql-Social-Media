const brcypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const {SECRET_KEY} = require('../../config')
const User = require('../../models/User')

module.exports = {
    Mutation: {
        async registerUser(_, { username, email, password, confirmPassword }, context, info ) {
            // TODO: validate user infromation
            if (username.length < 5 || password.length < 6) throw new Error("username must at least have 5 digits")
            if (email.indexOf('@') == -1 ) throw new Error("Invalid email")
            if (password != confirmPassword) throw new Error("password doesn't match")

            // check the username & email doesn't already exist
            if( await User.findOne({username}) ||  await User.findOne({email})) 
            {
                throw new Error("User already exist", {
                    errors: {
                        username: "username already taken",
                        email: "email already taken"
                    }
                })
              }
            // check email doesn't already exist
            
            // TODO: Hash the password & 
            password = await brcypt.hash(password, 12)
            // Save user in database
            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            const res = newUser.save()
            // TODO: create auth token
            const token = JWT.sign({
                id: res._id,
                email: res.email,
                username: res.username
            }, SECRET_KEY , { expiresIn: '1h'})

            return {
                ...res._doc,
                id: res._id,
                token,
                username,
                email,
            }
        }
}
}