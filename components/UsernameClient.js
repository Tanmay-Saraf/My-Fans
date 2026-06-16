"use client"
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React from 'react'

const UsernameClient = ({username}) => {
    const {data:session} = useSession()
    if(!session){
        return (
            <div className='max-w-lg text-white mx-auto mt-70 flex flex-col gap-6'>
                <p className='text-xl font-bold'>You are <span className='font-black'>NOT</span> logged in , login to see the {username}'s profile</p>
                <Link href={"/login"} className=' text-center w-full text-lg font-bold hover:bg-neutral-600 hover:-translate-y-2 hover:border hover:border-white/50 bg-neutral-600/30 py-2 rounded-2xl transition-all duration-300 cursor-pointer'>Login</Link>
            </div>
        )
    }
  return (
    <div className='text-white'>
        <div className="h-80 w-full overflow-hidden relative ">
          <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="" />
        </div>
        <div className="relative p-5 mb-3 flex flex-col gap-4 items-center">
            <div className="absolute -top-12 rounded-xl">
                <img className="rounded-xl w-30 h-30 object-cover" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" alt="" />
            </div>
            <div className="info pt-20 gap-4 flex flex-col justify-center items-center">
                <div className="name tracking-wider text-2xl font-black">@{username}</div>
                <div className="tagline text-sm text-neutral-300 font-medium">Creating Animated art for VIT's</div>
                <div className='text-lg text-neutral-200 '>9719 members &middot; 82 posts &middot; $15450/release</div>
            </div>
        </div>
        <div className="payment grid grid-cols-2 gap-3">
            <div className="supporters gap-3 bg-neutral-800/40 flex flex-col justify-center items-center ml-4 pt-10 rounded-2xl p-3 max-h-130  ">
                <h2 className='text-xl font-bold'>Supporters</h2>
                <ul className=' p-10 flex flex-col gap-2 overflow-y-scroll scrollbar-track-neutral-500 scrollbar-thin scrollbar-thumb-neutral-100'>
                    <li>Hanuman donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                    <li>Shubham donated <span className="font-bold">$50</span> </li>
                </ul>
            </div>
            <div className="payment bg-neutral-800/40 mr-4 rounded-2xl flex flex-col gap-4 justify-center items-center">
                <h1 className='text-2xl font-bold '>Make a Payment</h1>
                <div className='flex gap-3'>
                    <input type="text" className='bg-neutral-600/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none  focus:ring-1 focus:ring-neutral-300 transition-all '  placeholder='Enter Name' />
                    <input type="text" className='bg-neutral-600/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none  focus:ring-1 focus:ring-neutral-300 transition-all '  placeholder='Enter Amout' />
                    <button className='bg-neutral-400 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-2xl '>Pay</button>
                </div>
                <div className="buttons flex gap-3">
                    <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl '>Pay $10</button>
                    <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl '>Pay $50</button>
                    <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl '>Pay $100</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default UsernameClient
