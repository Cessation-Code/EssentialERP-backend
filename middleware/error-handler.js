const { StatusCodes } = require('http-status-codes')

const errorHandlerMiddleware = async (err, req, res, next) => {

    console.log(err)

    let customError = {
        message: err.message || 'Something went wrong, please try again later',
        statusCode: err.statusCode || StatusCodes.INTERNAL_SERVER_ERROR,
        error: err.statusCode
    }

    // Duplication Error
    if (err.code === 11000) {
        customError.message = 'key already exists, choose another one'
    }

    // Request time-out error
    if (err.name === 'TimeoutError') {
        res.status(408).send('Request Timeout');
    }

    res.status(customError.statusCode).json(customError)
}

module.exports = errorHandlerMiddleware




// Casting Error







// Validation Error
    // if (err.name === 'ValidationError') {
    //     customError.msg = Object.values(err.errors).map((item) => item.message).join(',')
    //     customError.statusCode = StatusCodes.BAD_REQUEST
    // } else if (err.name == 'AxiosError') {
    //     customError.msg = 'Payment Failed'
    //     customError.statusCode = StatusCodes.BAD_REQUEST
    // }