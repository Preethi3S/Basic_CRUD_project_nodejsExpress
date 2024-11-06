import mongoose from 'mongoose';

const schema = mongoose.Schema({
    user_id :{
        type : mongoose.Schema.Types.ObjectId,
        required : [true , "User id is definitely required"],
        ref : "user"
    },
    name : {
        type  : String , 
        required : [true , "Please Enter your contact name"]
    } , 
    email : {
        type  : String , 
        required : [true , "Please Enter your contact email"]
    } , 
    phone : {
        type  : String , 
        required : [true , "Please Enter your contact number"]
    }},
    
    {
      timestamps : true  
    }
)

export default mongoose.model("Contact" , schema);

