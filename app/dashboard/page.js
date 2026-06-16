"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect } from 'react'
import { useRouter } from 'next/navigation'

const dashboard = () => {
    const {data:session,status} = useSession()
    const router = useRouter()
    useEffect(()=>{
      if(status === "unathenticated"){
        router.push('/login')
      }
    },[status,router])
    if (status === "loading" || status === "unauthenticated") {
        return <div className="text-white text-center mt-20">Loading...</div>
    }
  return (
    <div className='text-white pt-20 max-w-2xl mx-auto px-6'>
      <h1 className='text-3xl font-black mb-8'>Welcome to your Dashboard</h1>
      <form className='flex flex-col gap-4 bh-neutral-900/50 p-6 rounded-2xl border border-white/10'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='text-sm text-neutral-400'>Name</label>
          <input type="text" id='name' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white '/>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mail" className='text-sm text-neutral-400'>Email</label>
          <input type="email" id='mail'  className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white '/>
        </div> 
        <div className="flex flex-col gap-1">
          <label htmlFor="Username" className='text-sm text-neutral-400'>Username</label>
          <input type="text" id='username' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Banner" className='text-sm text-neutral-400'>Cover Picture</label>
          <input type="file" id='banner' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white 'accept='image/*'/>
        </div>  
        <div className="flex flex-col gap-1">
          <label htmlFor="profile" className='text-sm text-neutral-400'>Profile Picture</label>
          <input type="file" id='profile' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' accept='image/*'/>
        </div> 
        <div className="flex flex-col gap-1">
          <label htmlFor="RazorPay" className='text-sm text-neutral-400'>Razorpay Credentials</label>
          <input type="text" id='RazorPay' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white '/>
        </div>
        <button type='submit' className='w-full bg-neutral-600 hover:bg-neutral-600/50 text-white font-bold py-3 rounded-lg mt-4 transition-all cursor-pointer'>Save Changes</button>
      </form>
    </div>
  )
}

export default dashboard
