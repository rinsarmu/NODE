const express = require('express');
const app = express()
const fs = require('fs');
const tourRouter = require('./routes/tourRoutes')
const userRouter = require('./routes/userRoutes')


// 1. MIDDLEWARES
app.use(express.json())

app.use((req,res,next)=>{
    console.log("Hello from the middleware")
    next();
})

app.use((req,res,next)=>{
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
module.exports = app