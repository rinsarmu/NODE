const express = require('express');
const userRouter = express.Router()

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser,
    updateMe,
    deleteMe,
    getMe
} = require('../controllers/userController')

const {
    signup,
     login,
     forgotPassword,
     resetPassword,
     updatePassword,
     protect,
     restrictTo
    } = require('../controllers/authController')

userRouter.post('/signup', signup)
userRouter.post('/login', login)

userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/resetPassword/:token', resetPassword)

//protect all routes after this middleware.
userRouter.use(protect)
userRouter.patch('/updatePassword', updatePassword)
userRouter.patch('/updateMe', updateMe)
userRouter.delete('/deleteMe', deleteMe)
userRouter.get('/me', getMe, getUser)

userRouter.use(restrictTo('admin'))
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter