import React from 'react'
import UsernameClient from '@/components/UsernameClient'
import connectDb from '@/db/connectDb';
import User from '@/models/User';

export default async function username({params}){
    const {username} = await params;
    return <UsernameClient username={username}/>
}

export async function generateMetadata({ params }) {
  await connectDb();
  const {username} = await params
  const user = User.find({username});
  if(!user){
    return {
      title:"Creator not found | MyFans"
    }
  }
  return {
    title:`${username} | MyFans`,
    description:user.tagline||`Support ${username} on MyFans`
  }
}