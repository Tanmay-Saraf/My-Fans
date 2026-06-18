import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";

export async function GET(request,{params}){
    await connectDb();
    const {username} = await params;
    const user = await User.findOne({username});

    if(!user)return NextResponse.json({error:"User not found "},{status:404})
    const payments = await Payment.find({to_user:username,status:"completed"}).sort({amount:-1})
    return NextResponse.json({user,payments});
}