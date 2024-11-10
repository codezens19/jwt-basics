const jwt = require('jsonwebtoken')
const { BadRequest } = require('../errors')

const login = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        throw new BadRequest('Please provide email and password')
    }

    const id = new Date().getDate()
    const token = jwt.sign(
        { id, email },
        process.env.JWT_SECRET,
        { expiresIn: '30d' }
    )

    res.status(200).json({ msg: 'user created', token })
}

const dashboard = async (req, res) => {
    const luckeyNumber = Math.floor(Math.random() * 100)

    res.status(200).json({
        msg: `Hello ${req.user.email}`,
        secret: `Here is your authorized data. Your lucky number is ${luckeyNumber}`
    })
}

module.exports = {
    login,
    dashboard,
}