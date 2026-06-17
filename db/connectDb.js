import mongoose from "mongoose";

const connectDb = async ()=>{

    if(mongoose.connections[0].readyState===1){
        return ;
    }

    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log("connected")
    }catch(err){
        console.log(err);
    }
}

export default connectDb