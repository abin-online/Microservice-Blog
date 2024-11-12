
const express=require('express')
const {addComment,getComment} =require('../controller/commentController.js')
const router=express.Router()

router.get('/api/commentservice/getcomment',getComment)
router.post('/api/commentservice/comment',addComment)
module.exports=router










