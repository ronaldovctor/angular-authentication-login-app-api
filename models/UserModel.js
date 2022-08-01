let mongoose = require('mongoose')
let Schema = mongoose.Schema

let UserSchema = Schema({
    'firstName': String,
    'lastName': String,
    'address': String,
    'city': String,
    'state': String,
    'phone': String,
    'mobilePhone': String,
    'email': String,
    'password': String,
})

module.exports = mongoose.model('User', UserSchema)