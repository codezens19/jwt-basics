class CustomAPIError extends Error {
    constructor(message, statusCode) {
        super(message, statusCode)
        this.statusCode = statusCode
    }
}

module.exports = CustomAPIError 