const jwt = require('jsonwebtoken')
const User = require('../models/userModels')
const AppError = require('./../utils/AppError')
const catchAsync = require('./../utils/catchAsync')
const bcrypt = require('bcryptjs')

const signToken = (id) =>{
   return jwt.sign({id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })

} 

exports.signup = catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password:req.body.password
    })

    const token = signToken(newUser._id)
    
    res.status(201).json({
        status: 'Success',
        token,
        data:{
            user: newUser
        }
    })
})

exports.login =catchAsync(async (req, res, next)=>{
    const {email, password} = req.body

    // 1) Check if eail and password exist
    if(!email|| !password){
        return next(new AppError('Please provide email and password', 400))
    }

    
    // 2) check if user exist and password is correct

    const user = await User.findOne({email}).select('+password')

    if(!user || !(await user.correctPassword(password, user.password))){
        return next(new AppError("Incorrect email or password", 401))
    }
    console.log('Email')
    console.log(user)
    //  3) if everything ok, send token to client

    const token = signToken(user._id)
    res.status(200).json({
        status: "success",
        token,
      
    })
})