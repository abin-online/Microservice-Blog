
const express=require('express')
const {addComment,getComment} =require('../controller/commentController.js')
const router=express.Router()

const authenticate = require('../../auth/middleware/authMiddleware.js')

router.get('/api/commentservice/getcomment' , authenticate , getComment)
router.post('/api/commentservice/comment', addComment)

module.exports=router










