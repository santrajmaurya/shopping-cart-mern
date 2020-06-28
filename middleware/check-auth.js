const HttpError = require('../models/http-error');
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    if(req.method === 'OPTIONS') {
        return next();
    }
    console.log("req", req);
    try {
    const token = req.headers.Authorization.split(" ")[1];
    console.log("token", token);
    if (!token) {
        throw new Error('Authenticatiob failed!');
    }
    const decodedToken = jwt.verify(token, "supersecret_dont_share");
    req.userData = {userId: decodedToken.userId};
    next();
    } catch(err) {
        const error = new HttpError("Authentication failed!", 401);
        return next(error);
    }
}