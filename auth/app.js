const express = require('express')
const dotenv = require('dotenv')
const router = require('./routes/routes.js')
const dbConnect = require('./config/dbConnect.js')
const app = express()

dotenv.config()
dbConnect()
app.use(express.json())
app.use(router)

app.listen(3000, () => {
    console.log('server started');
})

