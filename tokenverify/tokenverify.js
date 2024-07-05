
// const jwt = require('jsonwebtoken');
const jwt = require('jsonwebtoken');
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (token) {
        const tokendata = token.split(' ')[1];
        jwt.verify(tokendata,"pharmacy", (err, decoded) => {
            if (err) {
               
                return res.status(403).json({ message: 'Failed to authenticate token',token:token });
            } else {
                req.decoded = decoded;
                
                next();
            }
        });
    } else {
        return res.status(403).json({ message: 'No token provided' });
    }
};

module.exports = verifyToken;