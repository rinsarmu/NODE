const User = require('../models/userModels')
const AppError = require('./../utils/AppError')
const catchAsync = require('./../utils/catchAsync')


exports.getAllUsers = catchAsync(async(req,res, next)=>{

    const tours = await User.find()
    //Send Response
    if(tours.length=== 0){
        // console.log("No tours found")
        return next(new AppError(`No tours found`, 404))
     }
    res.status(200).json({
        status:'success',
        results:tours.length,
        data: {
            tours:tours
        }
    })
 
})

exports.createUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

exports.getUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

exports.updateUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}

exports.deleteUser = (req,res)=>{
    res.status(500).json({
        status:'error',
        message:'THis route is not yet defined'
    })
}
