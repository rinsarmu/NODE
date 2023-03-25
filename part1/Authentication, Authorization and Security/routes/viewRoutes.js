const express = require('express');
const router = express.Router()
const {getBase, getOverview, getTour} = require('./../controllers/viewController')

router.get('/', getBase )

router.get('/overview',getOverview)

router.get('/tour', getTour)


module.exports = router