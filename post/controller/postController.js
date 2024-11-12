const userModel = require('../model/userModel.js')
const postModel = require('../model/postModel.js');
const produce = require('../kafka/producer.js');
//post controller
const getPost = async (req, res) => {
    try {
        const postDetails = await postModel.find()
        console.log(postDetails);
        res.status(200).send(postDetails)
    } catch (error) {
        console.log(error);
    }
}

const addUser = async (user) => {
    try {
        console.log('add user ')
        console.log({ user })
        const newUser = new userModel(user);
        await newUser.save();
    } catch (error) {
        console.log(error)
    }
}


const addPost = async (req, res) => {
    try {
        console.log(req.body)
        const { userId, post } = req.body
        const addPost = new postModel({
            userId,
            post
        })
        await addPost.save()
        await produce('add-post', JSON.stringify(req.body))
        res.status(200).send({ message: 'Post added successfully' })

    } catch (error) {
        console.log(error)
    }
}


const deletePost = async (req, res) => {
    try {
        console.log(req.query.id);
        await postModel.deleteOne({ _id: req.query.id })  
        await produce('delete-post',JSON.stringify(req.query.id))
        
        res.status(200).send({message:'post deleted'})
    } catch (error) {
        console.log(error)
    }
}



module.exports = {
    addUser, getPost, addPost, deletePost
}