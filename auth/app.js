const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes/routes.js')
const dbConnect = require('./config/dbConnect.js')

dotenv.config()

const startAuthServer = async () => {
    const app = express()
    await dbConnect()
    app.use(express.json())
    app.use(router)
    app.listen(3000, () => {
        console.log('server started');
    })
}

startAuthServer()

module.exports = startAuthServer;




