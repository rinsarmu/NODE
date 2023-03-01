// const User = require('./../models/userModels')
const User = require('../models/userModels')
const jwt = require('jsonwebtoken')

const catchAsync = require('./../utils/catchAsync')

exports.signup = catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const newUser = await User.create({
        name:req.body.name,
        email: req.body.email,
        password:req.body.password
    })

    const token = jwt.sign({id:newUser._id}, process.env.JWT_SECRET,{
        expiresIn: process.env.JWT_EXPIRES_IN
    })
    res.status(201).json({
        status: 'Success',
        token,
        data:{
            user: newUser
        }
    })
})