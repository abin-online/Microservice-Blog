const express=require('express')
const {getPost,addPost,deletePost} =require('../controller/postController.js')
const router=express.Router()

router.get('/api/postservice/getpost',getPost)
router.post('/api/postservice/addpost',addPost)
router.post('/api/postservice/addpost',addPost)
router.delete('/api/postservice/deletepost',deletePost)

module.exports=router










