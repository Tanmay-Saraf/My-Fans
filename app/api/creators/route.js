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
        const totalCreators = users.length;
        const allNeed = searchParams.get("sendAll") || "false";
        const creators = [];
        const limit = Number(searchParams.get("limit"))||0;
        const page = Number(searchParams.get("page"))||1;
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
                    goal:user.goal,
                    coverpic: user.coverpic,
                    totalSupporters,
                    totalAmount,
                })
            }
        }
        if(allNeed==="false"){creators.sort((a, b) => b.totalAmount - a.totalAmount)}
        if (limit && limit > 0) {
            const start = (page-1)*limit;
            const end = start+limit
            return NextResponse.json({
                creators: creators.slice(start,end),
                totalCreators
            });
        }
        return NextResponse.json({
            creators:creators,
            totalCreators
        });
    }