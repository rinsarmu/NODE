const fs = require('fs');

const express = require('express');
const tourRouter = express.Router()
const {
    getAllTours, 
    createTour,
     getTour, 
     updateTour,
      deleteTour,
      aliasTopTours,
      getTourStats,
      getMonthlyPlan,
      getToursWithIn
    //   checkId,
    //   checkBody
    } = require('../controllers/tourController')

const {protect, restrictTo} = require('./../controllers/authController')
// const {createReviews} = require('./../controllers/reviewController')
const reviewRouter = require('./../routes/reviewRoutes');
const { Router } = require('express');

tourRouter.use('/:tourId/review', protect, reviewRouter)

// tourRouter.param('id', checkId)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)
tourRouter.route('/monthly-plan/:year').get(protect,restrictTo('admin', 'lead-guide'), getMonthlyPlan)


tourRouter.route('/tours-within/:distance/center/:latLang/unit/:unit').get(getToursWithIn)

tourRouter.route('/')
    .get(getAllTours)
    .post(protect,restrictTo('admin', 'lead-guide', 'guide'), createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(
        protect, 
        restrictTo("admin", 'lead-guide'),
        updateTour)
    .delete(
        protect, 
        restrictTo("admin", 'lead-guide'),
        deleteTour
    )

// tourRouter.route('/:tourId/review').post(protect, restrictTo('user'), createReviews)

module.exports = tourRouter
