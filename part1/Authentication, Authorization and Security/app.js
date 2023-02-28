const express = require('express');
const app = express()
const path = require('path');
const fs = require('fs');
const morgan = require('morgan');

const globalErrorHandler = require('./controllers/errorController')
const AppError = require('./utils/AppError')
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')


// 1.  MIDDLEWARES
console.log(process.env.NODE_ENV)
if (process.env.NODE_ENV !== 'development') {
    app.use(morgan('dev'))

}

app.use(express.json())
// app.use(express.static(`${__dirname}/public}`))
console.log(typeof (`(${__dirname}/public`))
console.log(typeof (path.join(__dirname, "public")))

app.use(express.static(path.join(__dirname, "public")))

app.use((req, res, next) => {
    console.log("Hello from the middleware")
    next();
})

app.use((req, res, next) => {
    req.requestTime = new Date().toISOString()
    console.log("Hello from the middleware")
    next();
})

//2. CONTROLLERS





// app.get('/api/v1/tours', getAllTours)

// app.post('/api/v1/tours',createTour)
// app.get('/api/v1/tours/:id',getTour)


// app.patch('/api/v1/tours/:id',updateTour)

// app.delete('/api/v1/tours/:id',deleteTour)

//3. ROUTE





app.use('/api/v1/tours', tourRouter)
app.use('/api/v1/users', userRouter)
app.all('*', (req, res, next) => {
    // res.status(404).json({
    //     status: 'fail',
    //     message: `Cant find ${req.originalUrl} on this server!`
    // })
    // const err = new Error(`Cant find ${req.originalUrl} on this server!`)
    // err.status= 'fail'
    // err.statusCode = 404
    // console.log(err, 'eeeeeeeeeeeeee')
    next(new AppError(`Cant find ${req.originalUrl} on this server!`,400))
})
app.use(globalErrorHandler)
module.exports = app