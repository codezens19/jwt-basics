require('dotenv').config()
require('express-async-errors')

const express = require('express')
const app = express();

const notFoundMiddleware = require('./middleware/not_found')
const errorHandlerMiddleware = require('./middleware/error_handler')

const mainRouter = require('./routes/main')

//middleware
app.use(express.static('./public'))
app.use(express.json())

app.use('/api/v1', mainRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

const port = process.env.port || 3000

const start = async () => {
    try {
        app.listen(
            port,
            console.log(`Listening 👂👂👂 on http://localhost:${port}`)
        )
    } catch (err) {
        console.log(err)
    }
}

start()