const catchAsync = require('./../utils/catchAsync')
const Tour = require('../models/tourModels')


exports.getBase = (req,res,next)=>{
    res.status(200).render('base', {
        text: 'this is natours app'
    })
}

exports.getOverview = catchAsync( async (req,res,next)=>{
    const tours = await Tour.find()
    res.status(200).render('overview', {
        tours
    })
}
)

exports.getTour =  (req,res,next)=>{
    res.status(200).render('tour', {
        title: 'The forest Hiker'
    })
}