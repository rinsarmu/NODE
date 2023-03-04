const express = require('express')
const {
    getAllReviews,
    getReview,
    createReviews,
    deleteReview
    } = require('./../controllers/reviewController')

const {protect, restrictTo} =  require('./../controllers/authController')

const reviewRouter = express.Router({mergeParams:true})
console.log("")

// reviewRouter.route('/:id')
//     .get(getReview)

reviewRouter.route('/')
    .get(protect,restrictTo('user'), getAllReviews)
    .post(protect,restrictTo('user'), createReviews)

// reviewRouter.route('/:id').delete(protect, restrictTo('user'), deleteReview))
reviewRouter.route('/:id').delete( deleteReview)

module.exports = reviewRouter