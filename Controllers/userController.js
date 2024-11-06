import asyncHandler from 'express-async-handler';
import UserSchema from '../models/userSchema.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//@desc register user
//@route post /api/register
//@access public

export const registerUser = asyncHandler (async (req , res)=>{
    const { name , email , password} = req.body;
    if(!email || !name || !password){
        res.status(400);
        throw new Error("All fields are mandatory");
    }

    const userAvailability = await UserSchema.findOne({email});
    if(userAvailability){
        res.status(400);
        throw new Error("Register with a  unique email id , The given id already exists");
    }


    // bcrypt -- It is used to hash the password which will securly protect our password . (password , 10) => the number 10 is known as salt rounds which is 10(number)^2 times hashing our pasword which is used secure our password


    const hashPassword = await bcrypt.hash(password , 10);
    console.log(`Hashed password : ${hashPassword}`);

    const user = await UserSchema.create({
        name ,
        email ,
        password: hashPassword,
    });

    if(user){
        res.status(201).json({_id : user.id , email : user.email});
    }else{
        res.status(400);
        throw new Error("Unable to register your account");
    }

    res.json({message : "Register the user"});
})


// jwt --- json web token -- defines a compact and self-contained way for securely transmitting information between parties as a JSON object.
//     --- It is decoded into three types header , payload , verify Signature.



//@desc login user
//@route post /api/login
//@access public

export const loginUser = asyncHandler (async (req , res)=>{
    const {email , password} = req.body;
    if(!email || !password){
        res.status(400);
        throw new Error("All fields are mandatory!!");
    }

    const user = await UserSchema.findOne({email});

    if(user && (await bcrypt.compare(password , user.password))){

            const accessToken = jwt.sign({
                user : {
                    name : user.name,
                    email : user.email,
                    id : user.id
                }},
            process.env.ACCESS_TOKEN_KEY,
            {expiresIn : "15m"});

        res.status(200).json({ accessToken })
        
}
else{
    res.status(401);
    throw new Error("Invaild email or password");
}
});





//@desc current user
//@route get /api/current
//@access private



export const currentUser = asyncHandler (async (req , res)=>{
    res.json({message : "Current user"});
})
