const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes/routes.js')
const connect = require('./config/dbConnect.js');
const consume = require('./kafka/consume.js');
const app = express()

dotenv.config()
connect()
app.use(express.json())
app.use(router)

consume()


app.listen('3001', () => {
    console.log('server started');
})