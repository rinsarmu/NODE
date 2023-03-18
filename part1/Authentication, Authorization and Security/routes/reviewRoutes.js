const express = require('express')
const {
    getAllReviews,
    createReview,
    deleteReview,
    updateReview,
    setTourUserIds,
    getReview

    } = require('./../controllers/reviewController')

const {protect, restrictTo} =  require('./../controllers/authController')

const reviewRouter = express.Router({mergeParams:true})

reviewRouter.use(protect)
reviewRouter.route('/')
    .get(restrictTo('user'), getAllReviews)
    .post(
        restrictTo('user'), 
        setTourUserIds,
        createReview)

// reviewRouter.route('/:id').delete(protect, restrictTo('user'), deleteReview))
reviewRouter.route('/:id')
    .get(getReview)
    .patch( restrictTo('user', 'admin'),updateReview)
    .delete(  restrictTo('user', 'admin'), deleteReview )

module.exports = reviewRouter

