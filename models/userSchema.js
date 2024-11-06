import mongoose from "mongoose";

const usermodel = mongoose.Schema({
    name : {
        type : String,
        required : [true , "please add the user name"],
    },
    email : {
        type : String,
        required : [true , "please add the user email"],
        unique : [true , "please give an unique email id"],
    },
    password : {
        type : String,
        required : [true , "please add the user password"],
    },
},

{
    timestamps : true
}

);

export default mongoose.model("UserSchema" , usermodel);