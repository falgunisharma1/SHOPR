const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    userName:  { type: String, required: true },
    name:  { type: Number, required: true },
    password: {type: String, required: true},
    
})

const User = mongoose.model('User', userSchema)

module.exports = User;