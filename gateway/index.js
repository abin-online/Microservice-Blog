const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy');

// const startPostServer = require('../post');
// const startAuthServer = require('../auth/app');
// const startCommentServer = require('../comment');

const app = express();

// startAuthServer()
// startPostServer()
// startCommentServer()

app.use(cors());
app.use(express.json());

app.use('/' , proxy('http://localhost:3000/')) //auth service
app.use('/post' , proxy('http://localhost:3001/'))
app.use('/comment' , proxy('http://localhost:3002/'))


app.listen(8000 , ()=> {
    console.log('Running on 8000')
})