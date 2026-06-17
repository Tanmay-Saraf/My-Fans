"use client"
import React from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'

const Navbar = () => {
  const {data:session} = useSession()
  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-center items-center gap-10 px-16 py-4 border-b border-white/6 text-white'>
        <ul className='flex gap-8 text-sm text-white/40'>
        <li className='hover:text-white/70 cursor-pointer transition-colors'>Home</li>
        <li className='hover:text-white/70 cursor-pointer transition-colors'>About</li>
        </ul>
        <h1 className='text-xl font-black tracking-widest'> <Link href={'/'}>MyFans</Link> </h1>
        <ul className='flex gap-8 text-sm text-white/40'>
        <li className='hover:text-white/70 cursor-pointer transition-colors'>Projects</li>
        {!session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={"/login"}>login</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={"/dashboard"}>Dashboard</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={`/${session.user.username}`}>Your Page</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors' > <button onClick={()=>signOut()}>logout</button></li>}
        </ul>
    </nav>
  )
}

export default Navbar
