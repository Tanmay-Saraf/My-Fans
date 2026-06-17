import mongoose from "mongoose"

const UserSchema = new mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique:true,
    },
    name:{
        type:String,
    },
    username:{
        type:String,
        required:true,
    },
    profilepic:{
        type:String
    },
    coverpic:{
        type:String
    },
    razorpayId:{
        type:String,
    },
    razorpaySecret:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
})

const User = mongoose.models.User || mongoose.model("User", UserSchema);

export default User;