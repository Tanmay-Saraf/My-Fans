"use client"
import React,{useEffect} from 'react'
import Pill from '@/components/Pill'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'

const Login = () => {
    const providers = [
        {name:'Google',domain:'google'},
        {name:'Github',domain:'github'},
    ]
    const {data:session,status} = useSession()
    const router = useRouter()
    useEffect(()=>{
      if(status === "authenticated"){
        router.push('/dashboard')
    }
    },[status,router])
    if (status === "loading" ) {
        return <div className="text-white text-center mt-20">Loading...</div>
    }

    // if(session){
    //     return(
    //         <div className='text-white mx-auto mt-70 flex flex-col gap-6'>
    //             <Link href={"/"} className='absolute top-8 left-4 md:left-20 text-neutral-400 cursor-pointer hover:text-neutral-500 hover:-translate-x-2 transition-all duration-300'> &larr; Back to Home</Link>
    //             <p className='text-xl font-bold'>You are logged in as <span className='font-black'>{session.user.email}</span></p>
    //             <button className='w-full text-lg font-bold hover:bg-neutral-600 hover:-translate-y-2 hover:border hover:border-white/50 bg-neutral-600/30 py-2 rounded-2xl transition-all duration-300 cursor-pointer' onClick={()=>signOut()}>Logout</button>
    //         </div>
    //     )
    // }

  return (
    <div className='text-white mx-auto py-14 max-w-4xl px-6'>
        <Link href={"/"} className='absolute top-8 left-4 md:left-20 text-neutral-400 cursor-pointer hover:text-neutral-500 hover:-translate-x-2 transition-all duration-300'> &larr; Back to Home</Link>
        <h1 className='text-center font-black text-3xl mb-20'>Login to get your fans to support you </h1>
        <div className='flex flex-col justify-center items-center gap-6 '>
            {/* <div className='grid md:grid-cols-2 grid-cols-1 gap-6 items-center'> */}
            {/* <form className='flex flex-col gap-3 md:border-r md:border-neutral-500 md:pr-8' >
                <label htmlFor="email" className='text-neutral-300 text-sm font-semibold ml-1 '>Email</label>
                <input className='bg-neutral-600/50 w-full border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none  focus:ring-1 focus:ring-neutral-300 transition-all ' type="email" placeholder='abc@example.com' name="email" id="email" required/>
                <button type='submit' className='cursor-pointer w-full [word-spacing:2px] text-lg bg-neutral-500/20 hover:bg-neutral-500/30 hover:border hover:border-neutral-400 py-2 rounded-2xl transition-all'>Continue with <span className='font-bold'>Email</span></button>
                
            </form>
            <div className='mt-4 mb-4 md:hidden flex justify-center items-center'>
                <span className=' bg-neutral-500 h-[0.1px] w-full '></span>
                <span className='px-2'>OR</span>
                <span className='bg-neutral-500 h-[0.1px] w-full '></span>
            </div> */}
            <div className="social-login flex flex-col gap-6 justify-center items-center">
                {providers.map(item=>{
                    return <Pill key={item.name} name={item.name} domain={item.domain}/>
                })}
            </div>
        </div>
    </div>
  )
}

export default Login
