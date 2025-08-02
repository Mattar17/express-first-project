const jwt = require('jsonwebtoken')

const validateToken = (req, res, next) => {
    const authHeader = req.headers['Authentication'] || req.headers['authentication'];
    if (!authHeader)
        res.status(401).json('token is required');

    const token = authHeader.split(' ')[1];
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_PRIVATE_KEY);
        req.currentUser = decodedToken;
        next();
    } catch (error) {
        res.status(401).json('invalid token');
    }
}

module.exports = validateToken;