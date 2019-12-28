const { Schema, model} = require('mongoose')

var userSchema = new Schema({
    username: String,      
    email: String,
    password: String, 
    createdAt: String
},
{
    timestamps: true
} )

const User = model('User', userSchema)

module.exports = User