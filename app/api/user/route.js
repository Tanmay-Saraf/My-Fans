import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/db/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/options";

export async function POST(request){
    try{
        await connectDb()
        const session = await getServerSession(authOptions);
        if(!session){
            return NextResponse.json({
                success:false,
                message:'Unautherized'
            },{status:401})
        }
        const body = await request.json()
        const {name,username,profilepic,coverpic,razorpayId,razorpaySecret,} = body;
        const existingUser = await User.findOne({username:username})
        const email = session.user.email
        if(existingUser && existingUser.email!== email){
            return NextResponse.json({
                success:false,
                message:"Username already taken"
            },{status:400})
        }
        await User.findOneAndUpdate(
            {email},
            {   
                name,
                username,
                profilepic,
                coverpic,
                razorpayId,
                razorpaySecret,
            },
            {
                upsert:true,
                new:true
            }
        )
        return NextResponse.json({
            success:true,
            message:"Profile updated"
        });
    }catch(err){
        console.log(err);
        return NextResponse.json({
            success:false,
            message:"Server Error",
        },{status:500})
    }
}


export async function GET(request){
    await connectDb();
    const session = await getServerSession(authOptions);
    if(!session){
        return NextResponse.json({
            error:"Not logged in"
        },{status:401})
    }
    console.log(session);
    const user = await User.findOne({email:session.user.email})
    if(!user)return NextResponse.json({})
    return NextResponse.json(user)
}