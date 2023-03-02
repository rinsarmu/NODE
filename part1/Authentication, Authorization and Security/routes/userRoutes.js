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
     resetPassword,
     updatePassword,
     protect
    } = require('../controllers/authController')

userRouter.post('/signup', signup)
userRouter.post('/forgotPassword', forgotPassword)
userRouter.patch('/resetPassword:token', resetPassword)
userRouter.patch('/updatePassword', protect, updatePassword)


userRouter.post('/login', login)


 
userRouter.route('/')
    .get(getAllUsers)
    .post(createUser)

userRouter.route('/:id')
    .get(getUser)
    .patch(updateUser)
    .delete(deleteUser)

module.exports = userRouter