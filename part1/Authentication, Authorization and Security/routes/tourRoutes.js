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
      getMonthlyPlan
    //   checkId,
    //   checkBody
    } = require('../controllers/tourController')

const {protect} = require('./../controllers/authController')


// tourRouter.param('id', checkId)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)
tourRouter.route('/monthly-plan/:year').get(getMonthlyPlan)

tourRouter.route('/')
    .get(protect, getAllTours)
    .post( createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

    module.exports = tourRouter
