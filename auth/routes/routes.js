const express =require('express')
const { signup,login } = require("../controller/userController");
const router=express.Router()

router.post('/api/userservice/signup',signup)
router.post('/api/userservice/login',login)


module.exports=router
