
const jwt = require('jsonwebtoken');
const asyncHandler = require('express-async-handler');
const User = require('../models/user.model');
const secretCode = process.env.SECRET_KEY;

const authenticate = asyncHandler(async(request, response,next)=>{
    let token
        if(request.headers.authorization && request.headers.authorization.startsWith('Bearer')){
            try {
                token = request.headers.authorization.split(' ')[1]
                const decoded = jwt.verify(token, secretCode)
                request.user = await User.findById(decoded.id).select('-password')
                next()
            }
            catch(error){
                console.log(error)
                response.status(401)
                throw new Error ('Not authorized')
            }
        }
        if(!token){
            response.status(401)
            throw new Error ('Not authorized, no token')
    }
});

    module.exports = {authenticate};