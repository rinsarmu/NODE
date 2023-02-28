// const User = require('./../models/userModels')
const User = require('../models/userModels')

const catchAsync = require('./../utils/catchAsync')

exports.signup = catchAsync(async(req,res,next)=>{
    console.log(req.body)
    const newUser = await User.create(req.body)
    res.status(201).json({
        status: 'Success',
        data:{
            user: newUser
        }
    })
})