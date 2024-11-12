const express=require('express')
const router=require ('./routes/routes.js')
const dotenv = require('dotenv')
const consume = require('./kafka/consume.js');
const connect = require('./config/dbConnect.js');

const app=express()
dotenv.config()
connect()
app.use(express.json())
app.use(router)
consume()

app.listen(3002,()=>{
    console.log('server started');
})




