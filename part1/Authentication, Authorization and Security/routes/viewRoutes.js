const express = require('express');
const router = express.Router()
const {getBase, getOverview, getTour, getLoginForm} = require('./../controllers/viewController')

router.get('/', getBase )

router.get('/overview',getOverview)

router.get('/tour/:slug', getTour)
router.get('/login', getLoginForm)




module.exports = router