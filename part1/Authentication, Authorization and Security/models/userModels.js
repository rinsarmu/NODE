const mongoose = require('mongoose')
const validators = require('validator')
const bcrypt = require('bcryptjs')

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
        validate: [validators.isEmail, 'Email must be a valid email address']
    },
    photo: {
        type: String,
        defaultValue:"profile"

    },

    password:{
        type: String,
        required: [true, 'please provide us a password'],
        minlength: 6,
    },
    date:String,
    confirmPassword:{
        type: String,
        validate:{
            validator: function(el){
                return el === this.password
            },
            message: 'Please confirm your password'
        }
    }

  



    // passwordConfirm:{
    //     type: String,
    //     validate: {
    //         validator: function(val){
    //             console.log("something ....")
    //         return val == this.password
    //         },
    //         message: 'Please confirm a password'
    //     }
        
    // }

    
})

userSchema.pre('save',async function(next){
    //Only run this functin if password was actually modified
   if(!this.isModified('password')) return next()

   // Hash th password with cost of 12
   this.password = await bcrypt.hash(this.password, 12)

   //Delete password confirm field
   this.confirmPassword = undefined
   next()
})

const User = mongoose.model('User', userSchema)
module.exports = User