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
    },
    amount:{
        type:Number,
        required:true,
    },
    createdAt:{
        type:String,
        default:Date.now,
    },
    updatedAt:{
        type:String,
        default:Date.now,
    },
    done:{
        type:Boolean,
        default:false,
    }
})

const Payment = mongoose.models.Payment || mongoose.model("Payment", PaymentSchema);

export default Payment;