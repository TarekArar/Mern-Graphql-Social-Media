const brcypt = require('bcryptjs')
const JWT = require('jsonwebtoken')
const {UserInputError} = require('apollo-server')
const {SECRET_KEY} = require('../../config')
const User = require('../../models/User')
const { validateRegisterInput, validateLoginInput } = require('../../util/validators')

function makeToken(user) {

    return JWT.sign({
        id: user._id,
        email: user.email,
        username: user.username
    }, SECRET_KEY , { expiresIn: '1h'})

}

module.exports = {
    Mutation: {
        async login(_, {username, password}) {
            const {valid, errors} = validateLoginInput(username, password)
            if(!valid) throw new UserInputError('Error', {errors})
            loggedUser = await User.findOne({username})

            if (!loggedUser) {
                errors.general = "User Not Found"
                throw new UserInputError("Wrong Credentials", {errors})
            }
            const match = await brcypt.compare(password, loggedUser.password)
            
            if(!match) {
                errors.general = "Wrong Password"
                throw new UserInputError('Wrong Credentials', {errors})
            }

            const token = makeToken(loggedUser)
            return { 
                ...loggedUser._doc,
                id: loggedUser._id,
                token,
             }
        },
        async register(_, { username, email, password, confirmPassword } ) {
            // validate user information
            const {valid , errors} = validateRegisterInput(username, email, password, confirmPassword)
            if (!valid) throw new UserInputError('Error', {errors})
            // check the username & email doesn't already exist
            if( await User.findOne({username}) ||  await User.findOne({email})) 
            {
                throw new UserInputError("User already exist", {
                    errors: {
                        username: "username already taken",
                        email: "email already taken"
                    }
                })
              }
            // check email doesn't already exist
            
            //  Hash the password & 
            password = await brcypt.hash(password, 12)
            // Save user in database
            const newUser = new User({
                username,
                email,
                password,
                createdAt: new Date().toISOString()
            })

            const res = newUser.save()
            // create auth token
            const token = makeToken(res)

            return {
                ...res._doc,
                id: res._id,
                token,
            }
        }
}
}