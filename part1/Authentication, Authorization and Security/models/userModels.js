const mongoose = require('mongoose')
const validator = require('validator')

const userSchema  = new mongoose.Schema({
    name:{
        type: String,
        required: [true, "Please tell us ur name"]
    },
    email:{
        type: String,
        unique: true,
        lowercase: true,

        required: [true, "Please provide your email"],
        validate: [validator.isEmail, 'Email must be a valid email address']
    },
    photo: String,
    password:{
        type: String,
        required: [true, 'please provide us a password'],
        minlength: 6,
        select: false
    },
    passwordConfirm:{
        type: String,
        validate: {
            validator: function(val){
            return val == this.password
            },
            message: 'Please confirm a password'
        }
        
    }

    
})

const User = mongoose.model('User', userSchema)
module.exports = User