const mongoose =require('mongoose')

const commentSchema=new mongoose.Schema({
    postId:{
        required:true,
        type:String
    },
    userId:{
        required:true,
        type:String
    },
    comment:{
        required:true,
        type:String
    }
})

const comment=mongoose.model('comment',commentSchema)

module.exports=comment