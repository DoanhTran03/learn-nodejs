const jwt = require('jsonwebtoken');
const config = require('config');

function auth (req,res,next) {
    const token = req.header('x-auth-token');
    if (!token) return res.status(404).send('Authentication token is required!')

    try {
        const encoded = jwt.verify(token, config.get('jwtPrivateKey'));
        req.user = encoded;
        next();
    }
    catch (ex) {
        res.status(404).send('Invalid Token');
    }
}