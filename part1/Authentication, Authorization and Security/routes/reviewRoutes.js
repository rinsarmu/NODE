const express = require('express')
const {
    getAllReviews,
    getReview,
    createReviews
    } = require('./../controllers/reviewController')

const {protect, restrictTo} =  require('./../controllers/authController')

const reviewRouter = express.Router({mergeParams:true})
console.log("hhhhhhhhhhhhhhhhhhhhhhhh")

// reviewRouter.route('/:id')
//     .get(getReview)

reviewRouter.route('/')
    .get(protect,restrictTo('user'), getAllReviews)
    .post(protect,restrictTo('user'), createReviews)

module.exports = reviewRouter