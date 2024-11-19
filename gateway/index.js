const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

const app = express();



app.use(cors());
app.use(express.json());

app.use('/post' , proxy('http://localhost:3001/'))
app.use('/auth' , proxy('http://localhost:3000/')) //auth service
app.use('/comment', proxy('http://localhost:3002/'));

app.listen(8000 , ()=> {
    console.log('Running on 8000')
})