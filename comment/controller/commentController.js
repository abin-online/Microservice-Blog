const userModel = require('../model/userModel.js')
const postModel = require('../model/postModel.js')
const commentModel = require('../model/commentModel.js')

const addPost = async (post) => {
    try {
        console.log('post reached');
        console.log({ post })
        const newPost = new postModel(post);
        await newPost.save();
    } catch (error) {
        console.log(error);
    }
}

const addUser = async (user) => {
    try {
        console.log('add user')
        console.log({ user })
        const newUser = new userModel(user);
        await newUser.save();
    } catch (error) {
        console.log(error)
    }
}

const addComment = async (req, res) => {
    try {
        console.log(req.body)
        const { postId, comment, userId } = req.body
        const commentDetails = await commentModel.create({
            postId,
            comment,
            userId
        })
        res.status(200).send({ message: 'comment added successfully' })
    } catch (error) {
        console.log(error)
    }
}
const getComment = async (req, res) => {
    try {
        const commentDetails = await commentModel.find()
        res.send(commentDetails)
    } catch (error) {
        console.log(error)
    }
}

const deletePost = async (post) => {
    try {
        console.log('deletepost');
        console.log( post );
        await commentModel.deleteOne({})
        await postModel.deleteOne({})
    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    addPost, addUser, addComment, getComment, deletePost
}
