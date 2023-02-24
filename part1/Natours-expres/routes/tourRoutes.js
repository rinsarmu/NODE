const fs = require('fs');

const express = require('express');
const tourRouter = express.Router()
const {
    getAllTours, 
    createTour,
     getTour, 
     updateTour,
      deleteTour,
      checkId,
      checkBody
    } = require('../controllers/tourController')

tourRouter.param('id', checkId)

tourRouter.route('/')
    .get(getAllTours)
    .post(checkBody, createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

    module.exports = tourRouter
