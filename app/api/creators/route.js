    import connectDb from "@/db/connectDb";
    import User from "@/models/User";
    import Payment from "@/models/Payment";
    import { NextResponse } from "next/server";

    export async function GET(request) {
        await connectDb()
        const { searchParams } = new URL(request.url);
        const search = searchParams.get("q") || "";
        const users = await User.find({
            username: {
                $regex: search,
                $options: "i"
            }
        })
        const allNeed = searchParams.get("sendAll") || "false";
        const creators = [];
        for (const user of users) {
            if (allNeed==="true") {
                creators.push({
                    _id:user._id,
                    name: user.name,
                    username: user.username,
                    profilepic: user.profilepic,
                })
            } else if(allNeed==="false") {
                const payments = await Payment.find({ to_user: user.username, status: "completed" })
                const totalSupporters = payments.length;
                const totalAmount = payments.reduce((p, item) => p + item.amount, 0)
                creators.push({
                    _id: user._id,
                    name: user.name,
                    username: user.username,
                    profilepic: user.profilepic,
                    coverpic: user.coverpic,
                    totalSupporters,
                    totalAmount,
                })
            }
        }
        if(allNeed==="false"){creators.sort((a, b) => b.totalAmount - a.totalAmount)}
        const limit = Number(searchParams.get("limit"));
        if (limit && limit > 0) {
            return NextResponse.json(creators.slice(0, limit));
        }
        return NextResponse.json(creators);
    }