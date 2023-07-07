import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    firstName : {
        type : String , 
        required : true , 
        min : 2 , 
        max : 30 ,
    },
    lastName : {
        type : String , 
        required : true , 
        min : 2 , 
        max : 30 ,
    },
    email : {
        type : String , 
        required : true , 
       
    },
    password : {
        type : String , 
        required : true , 
        min : 2 , 
        max : 30 ,
    },
    picturePath : {
        type : String , 
        default :"", 
        
    },
    friends : {
        type : Array , 
        default : [] ,
    },
    
    location : String , 
    occupation : String ,
    viewedProfile : Number , 
    impressions : Number ,
},{timestamps : true })

const UserModel = mongoose.model("Users" , UserSchema);

export default UserModel ;