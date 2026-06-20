import connectDb from "@/db/connectDb";
import Payment from "@/models/Payment";
import User from "@/models/User";
import { NextResponse } from "next/server";

const formatCount = (count)=>{
    if(count>=10000000){
        return `${Number((count/10000000).toFixed(1))}Cr`
    }
    if(count>=100000){
        return `${Number((count/100000).toFixed(1))}L`;
    }
    if(count>=1000){
        return `${Number((count/1000).toFixed(1))}K`
    }
    return `${count}`
}

export async function GET(request){
    await connectDb();
    const completedPayments = await Payment.find({status:"completed"});
    const totalRaised = completedPayments.reduce((p,item)=>p+item.amount,0);
    const totalSupporters = completedPayments.length
    const totalCreators = await User.countDocuments();
    return NextResponse.json({
        totalRaised:formatCount(totalRaised),
        totalSupporters:formatCount(totalSupporters),
        totalCreators:formatCount(totalCreators),
    })
}