import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request){
    await connectDb();
    const body = await request.json();

    const amount = Number(body.amount)
    if(isNaN(amount)||amount<=0||amount>100000){
        return NextResponse.json({
            success:false,
            message:"Amount must be between ₹1 to ₹100000"
        },{status:400})
    }
    const creator = await User.findOne({username:body.to_user})
    if(!creator||!creator.razorpayId||!creator.razorpaySecret){
        return NextResponse.json({
            success:false,
            messgae:"Creattor has not  set up payments yet"
        },{status:400});
    }
    const instance = new Razorpay({
        key_id: creator.razorpayId,
        key_secret: creator.razorpaySecret,
    })
    const options  = {
        amount: amount*100,
        currency: "INR"
    }

    const order = await instance.orders.create(options)

    await Payment.create({
        name:body.name,
        to_user:body.to_user,
        oid:order.id,
        amount:body.amount,
        status:"pending",
    })

    return NextResponse.json({...order,key:creator.razorpayId})
}