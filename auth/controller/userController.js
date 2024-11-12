const produce = require('../kafka/producer.js')
const userCollection = require('../model/userModel.js')

const signup = async (req, res) => {
    try {
        
        const { username, email, password, phone } = req.body
        const existingUser = await userCollection.findOne({
            $or: [{ email: email }, { phone: phone }]
        });
        if (existingUser) {
            res.status(409).send({ message: 'user already exists' })
        }
        const userDetails = await userCollection.create({ username, email, password, phone })

        try {
            await produce('add-user', JSON.stringify(req.body))
        } catch (error) {
            console.log('Kafka producer add-user error')
            console.log(error.message)
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
        if (existingUser.password !== password) {
            res.status(401).send({ message: 'incorrect password' })
        }
        res.status(200).send({ message: 'login successfull', name:existingUser.username,email:existingUser.email,phone:existingUser.phone  })
    } catch (error) {
        console.log(error);
    }
}



module.exports = {
    signup, login
}