import { NextResponse } from "next/server";
import User from "@/models/User";
import connectDb from "@/db/connectDb";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/options";

const isValidUrl = (url) => {
    try {
        const newUrl = new URL(url)
        return (
            newUrl.protocol==="https:"||newUrl.protocol==="http:"
        )
    } catch {
        return false;
    }
}

export async function POST(request) {
    try {
        await connectDb()
        const session = await getServerSession(authOptions);
        if (!session) {
            return NextResponse.json({
                success: false,
                message: 'Unautherized'
            }, { status: 401 })
        }
        const body = await request.json()
        const { name, username, profilepic, coverpic, razorpayId, razorpaySecret, } = body;
        const reserved = ["login", "dashboard", "api"];
        if (username.length < 3) {
            return NextResponse.json({
                success: false,
                message: "Username must be atleast 3 characters"
            }, { status: 400 })
        }
        if (username.length > 20) {
            return NextResponse.json({
                success: false,
                message: "Username cannot exceed 20 characters"
            }, { status: 400 })
        }
        if (!/^[a-zA-Z0-9_]+$/.test(username)) {
            return NextResponse.json({
                success: false,
                message: "Only letters, numbers and underscores are allowed"
            }, { status: 400 })
        }
        if (reserved.includes(username.toLowerCase())) {
            return NextResponse.json({
                success: false,
                message: "Username not available"
            }, { status: 400 })
        }
        if (form.coverpic && !isValidUrl(form.coverpic)) {
            return NextResponse.json({
                success: false,
                message: "Invalid cover picture url"
            }, { status: 400 })
        }
        if (form.profilepic && !isValidUrl(form.profilepic)) {
            return NextResponse.json({
                success: false,
                message: "Invalid profile picture url"
            }, { status: 400 })
        }
        const existingUser = await User.findOne({ username: username })
        const email = session.user.email
        if (existingUser && existingUser.email !== email) {
            return NextResponse.json({
                success: false,
                message: "Username already taken"
            }, { status: 400 })
        }
        await User.findOneAndUpdate(
            { email },
            {
                name,
                username,
                profilepic,
                coverpic,
                razorpayId,
                razorpaySecret,
            },
            {
                upsert: true,
                new: true
            }
        )
        return NextResponse.json({
            success: true,
            message: "Profile updated"
        });
    } catch (err) {
        console.log(err);
        return NextResponse.json({
            success: false,
            message: "Server Error",
        }, { status: 500 })
    }
}


export async function GET(request) {
    await connectDb();
    const session = await getServerSession(authOptions);
    if (!session) {
        return NextResponse.json({
            error: "Not logged in"
        }, { status: 401 })
    }
    console.log(session);
    const user = await User.findOne({ email: session.user.email })
    if (!user) return NextResponse.json({})
    return NextResponse.json(user)
}