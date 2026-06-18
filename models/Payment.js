import mongoose from "mongoose"

const PaymentSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    to_user:{
        type:String,
        required:true,
    },
    oid:{
        type:String,
        required:true,
        unique:true,
    },
    pid:{
        type:String,
        default:"",
    },
    amount:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:Date,
        default:Date.now,
    },
    updatedAt:{
        type:Date,
        default:Date.now,
    },
    message:{
        type:String,
        default:"",
    },
    status:{
        type:String,
        enum:["pending","completed","failed"],
        default:"pending",
    }
})

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;