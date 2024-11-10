const jwt = require('jsonwebtoken')
const { UnauthonticatedError } = require('../errors')

const authenticationMiddleware = async (req, res, next) => {
    const authHeader = req.headers.authorization
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        throw new UnauthonticatedError('No token provided')
    }

    const token = authHeader.split(' ')[1]
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET)
        req.user = { id: decoded.id, email: decoded.email }
        next()
    } catch (err) {
        throw new UnauthonticatedError('Not authorized to access this route')
    }
}

module.exports = authenticationMiddleware