const jwt = require('jsonwebtoken');
const secret = 'secret';  // Use your secret key

const authenticate = (req, res, next) => {
    const token = req.headers.authorization;  // Extract the Bearer token
    console.log("req.headers =>  ",req.headers)
    if (!token) {
        return res.status(403).send({ message: 'Token is required' });
    }

    // Verify the token
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid token' });
        }
        // Attach user info to the request object
        req.user = decoded;  // decoded is the payload of the token
        next();  // Proceed to the next middleware/route handler
    });
};

module.exports = authenticate;
