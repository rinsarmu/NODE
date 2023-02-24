const fs = require('fs');

const express = require('express');
const tourRouter = express.Router()
const {getAllTours, createTour, getTour, updateTour, deleteTour} = require('../controllers/tourController')

tourRouter.route('/')
    .get(getAllTours)
    .post(createTour)

tourRouter.route('/:id')
    .get(getTour)
    .patch(updateTour)
    .delete(deleteTour)

    module.exports = tourRouter
