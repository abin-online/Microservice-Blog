const produce = require('../kafka/producer.js')
const userCollection = require('../model/userModel.js')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const secret = 'secret'

const signup = async (req, res) => {
    try {
        
        const { username, email, password, phone } = req.body
        const existingUser = await userCollection.findOne({
            $or: [{ email: email }, { phone: phone }]
        });
        if (existingUser) {
            res.status(409).send({ message: 'user already exists' })
        }

        const hashedPassword = await bcrypt.hash(password , 10);

        const userDetails = await userCollection.create({
            username,
            email,
            password: hashedPassword,
            phone
        })

        try {
            await produce('add-user', JSON.stringify({username, email, phone}))
        } catch (error) {
            console.log('Kafka producer add-user error')
        }

        res.status(200).send({ message: 'user added successfully', user: userDetails })
    } catch (error) {
        console.log(error);
    }
}

const login = async (req, res) => {
    try {
        console.log(req.body);
        const { email, password } = req.body
        const existingUser = await userCollection.findOne({ email })

        if (!existingUser) {
            res.status(400).send({ message: 'user not found' })
        }

        const isPasswordMatch = await bcrypt.compare(password, existingUser.password);
        
        if (!isPasswordMatch) {
            return res.status(401).send({ message: 'Incorrect password' });
        }

        // Generate JWT
        const token = jwt.sign(
            { id: existingUser._id, email: existingUser.email },
            secret,
            { expiresIn: '1h' }
        );


        res.status(200).send({
            message: 'Login successfull',
            token, 
            user : {
                name: existingUser.username,
                email: existingUser.email,
                phone: existingUser.phone
            }

        })

    } catch (error) {
        console.log('Login ERROR',error);
    }
}



module.exports = {
    signup,
    login
}