const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username : String,
    email : String,
    city : String,
    password : String,
    mobile : Number,
    address : String,
    cart : [Object]
})


const UserModel = mongoose.model('user', userSchema)

module.exports = {UserModel}