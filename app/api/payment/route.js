import connectDb from "@/db/connectDb";
import { NextResponse } from "next/server";
import Payment from "@/models/Payment";
import crypto from 'crypto'

const isValidId = ({oid,pid,signature})=>{
    const body = oid+"|"+pid;
    const expectedSignature = crypto.createHmac("sha256",process.env.KEY_SECRET).update(body).digest("hex");
    if(expectedSignature !== signature){
        return false
    }else return true;
}

export async function POST(request){
    await connectDb();
    const body = await request.json()
    if(!body.oid||!body.pid||!body.signature){
        return NextResponse.json({
            success:false,
            message:"Payment information not found"
        },{status:400})
    }
    const payment = Payment.findOne({oid:body.oid})
    if(!payment){
        return NextResponse.json({
            success:false,
            message:"payment not found"
        },{status:404})
    }
    if(payment.status==="completed"){
        return NextResponse.json({
            success:false,
            message:"Payment already processed"
        },{status:400})
    }
    if(!isValidId({oid:body.oid,pid:body.pid,signature:body.signature})){
        return NextResponse.json({
            success:false,
            message:"Payment verification failed"
        },{status:400})
    }
    await Payment.findOneAndUpdate({oid:body.oid},
        {
            oid:body.oid,
            pid:body.pid,
            message:body.message,
            status:"completed"
        }
    )
    return NextResponse.json({success:true})
}