const CustomAPIError = require("./custom_errors");
const { StatusCodes } = require('http-status-codes')

class UnauthonticatedError extends CustomAPIError {
    constructor(message) {
        super(message)
        this.statusCode = StatusCodes.UNAUTHORIZED
    }
}

module.exports = UnauthonticatedError