import asyncHandler from 'express-async-handler';
import jwt from 'jsonwebtoken';

const ValidateToken = asyncHandler(async(req , res , next)=>{
    let token;
    let authHeader = req.headers.Authorization || req.headers.authorization ;

    if(authHeader && authHeader.startsWith("Bearer")){
        token = authHeader.split(" ")[1];
        jwt.verify(token , process.env.ACCESS_TOKEN_KEY , (err , decoded)=>{
            if(err){
                res.status(401);
                throw new Error("User cannot Authorized");
            }
            req.user = decoded.user;
            next();
        });

        if(!token){
            res.status(400);
            throw new Error("Token has been expired or the not token is not provided by the user properly");
        }
    }
})


export default ValidateToken;