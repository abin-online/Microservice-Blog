const express=require('express')
const {getPost,addPost,deletePost} =require('../controller/postController.js')
const router=express.Router()

const authenticate = require('../../auth/middleware/authMiddleware.js')


router.get('/api/postservice/getpost', authenticate , getPost)
router.post('/api/postservice/addpost', authenticate , addPost)
router.post('/api/postservice/addpost', authenticate , addPost)
router.delete('/api/postservice/deletepost', authenticate, deletePost)

module.exports=router










