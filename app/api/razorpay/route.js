import Payment from "@/models/Payment";
import { NextResponse } from "next/server";
import Razorpay from "razorpay";

export async function POST(request){
    const body = await request.json();

    const instance = new Razorpay({
        key_id: process.env.KEY_ID,
        key_secret: process.env.KEY_SECRET,
    })
    const amount = Number(body.amount)
    if(isNaN(amount)||amount<=0||amount>100000){
        return NextResponse.json({
            success:false,
            message:"Amount must be between ₹1 to ₹100000"
        },{status:400})
    }
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

    return NextResponse.json(order)
}