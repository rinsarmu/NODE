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
      getTourStats
    //   checkId,
    //   checkBody
    } = require('../controllers/tourController')

// tourRouter.param('id', checkId)
tourRouter.route('/tour-stats').get(getTourStats)
tourRouter.route('/top-5-cheap').get(aliasTopTours, getAllTours)

tourRouter.route('/')
    .get(getAllTours)
    .post( createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

    module.exports = tourRouter
