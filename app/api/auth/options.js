import GithubProvider from 'next-auth/providers/github'
import GoogleProvider from 'next-auth/providers/google'
import User from "@/models/User";
import Payment from "@/models/Payment";
import connectDb from "@/db/connectDb";

export const authOptions = {
    providers: [
        GithubProvider({
            clientId: process.env.GITHUB_ID,
            clientSecret: process.env.GITHUB_SECRET
        }),
        GoogleProvider({
            clientId: process.env.GOOGLE_ID,
            clientSecret: process.env.GOOGLE_SECRET
        }),
    ],
    pages:{
        signIn:"/login",
    },
    callbacks: {
        async signIn({user, account, profile}){
            if(account.provider==="github"||account.provider==="google"){
                await connectDb();
                const currentUser = await User.findOne({email:user.email})
                if(!currentUser){
                    await User.create({
                        email:user.email,
                        name:user.name,
                        username: user.email.split("@")[0]

                    })
                }
            }
            return true
        },
        async session({session}){
            await connectDb();
            const user = await User.findOne({
                email: session.user.email,
            });
            if(user){
                session.user.username = user.username;
            }

            return session;
        },
    }
}
