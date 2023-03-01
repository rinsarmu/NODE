const express = require('express');
const userRouter = express.Router()

const {
    getAllUsers,
    createUser,
    getUser,
    updateUser,
    deleteUser
} = require('../controllers/userController')

const {
    signup,
     login,
     forgotPassword,
     resetPassword
    } = require('../controllers/authController')

userRouter.post('/signup', signup)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.post('/resetPassword', resetPassword)

userRouter.post('/login', login)

 
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter