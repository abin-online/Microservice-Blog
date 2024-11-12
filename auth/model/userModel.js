const mongoose =require('mongoose')

const userSchema=new mongoose.Schema({
    username:{
        required:true,
        type:String
    },
    email:{
        required:true,
        unique:true,
        type:String
    },
    phone:{
        required:true,
        unique:true,
        type:Number
    },
    password:{
        required:true,
        type:String
    }
})

const user=mongoose.model('user',userSchema)

module.exports=user