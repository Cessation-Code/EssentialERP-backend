const NotFoundError = require('./not-found')
const BadRequestError = require('./bad-request')
const UnauthenticatedError = require('./unauthenticated')
const CustomAPIError = require('./custom-error')

module.exports = {
    NotFoundError,
    BadRequestError,
    UnauthenticatedError,
    CustomAPIError
}