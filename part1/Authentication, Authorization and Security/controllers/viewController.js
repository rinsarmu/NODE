const catchAsync = require('./../utils/catchAsync')
const Tour = require('../models/tourModels')


exports.getBase = (req,res,next)=>{
    res.status(200).render('base', {
        text: 'this is natours app',
        title: 'this is natours'
    })
}

exports.getOverview = catchAsync( async (req,res,next)=>{
    const tours = await Tour.find()
    res.status(200).render('overview', {
        tours
    })
}
)

exports.getTour = catchAsync(async (req,res,next)=>{
    const tour = await Tour.find({slug: req.params.slug})
        .populate({
            path: 'reviews',
            select: 'review rating user'
        })
        .lean()

    // console.log(tour)
    // console.log(tour[0].reviews)
    // if (tour.reviews) {
    //     console.log(tour.reviews);
    // }
    console.log(tour.name)
    res.status(200).render('tour1', {
        tour: tour,
        title: tour.name
    })
})

exports.getLoginForm = catchAsync(async (req,res, next)=>{
    console.log('logged in')
    res.status(200).render('login', {
        title: 'Natours  Login'
    })

})

// ATBBEVBzUdLtzA7A7mJBYqBbnFjs403B3648