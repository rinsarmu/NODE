const AppError = require('./../utils/AppError')
const handleCastError = (err)=>{
    const message = `invalid ${err.path}: ${err.value}`
    return new AppError(message, 400)
}

const sendErrorProd = (err, res)=>{
    // Operational, trusted Error: send message to client
    if(err.isOperational){
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
    
        })

    // Programming or other unknown error: don't leak error details
    } else {
        // 1) Log error
        console.log("Error", err)

        // 2) Send generic message
        res.status(500).json({
            status: "Error",
            message:"Something happened Unexpectedly. Our Engineers take care of that"
    
        })
    }
}
const sendErrorDev = (err, res)=>{
    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
        error: err,
        stack: err.stack

    })
}

module.exports = (err, req, res, next) => {
    console.log(err, 'adisseeeeeeeeeeeeee')

    err.statusCode = err.statusCode || 500
    err.status = err.status || 'Error'

    if(process.env.NODE_DEV === 'development'){
        console.log("...............error in developemtn .......\n")
        sendErrorDev(err, res)
    }
    else if(process.env.NODE_DEV ==='production'){
        console.log("In production er/.....................")
        let error = {...err}
        if(error.name = 'CastError') error=> handleCastErrorDB(error)
        sendErrorProd(error, res)

    }

  
}