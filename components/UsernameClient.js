"use client"
import { useSession } from 'next-auth/react'
import React ,{useEffect,useState}from 'react'
import Link from 'next/link'

const UsernameClient = ({username}) => {
    const {data:session,status} = useSession()
    const [notFound,setNotFound] = useState(false)
    const [dynaData,setDynaData] = useState({username,profilepic:"",coverpic:""})
    const fillData = async ()=>{
        const res = await fetch(`/api/creator/${username}`)
        if(!res.ok){
            setNotFound(true)
            return 
        }
        const data = await res.json();
        setDynaData({username:data.username,profilepic:data.profilepic,coverpic:data.coverpic})
    }
    useEffect(()=>{
        if(status==="authenticated"){
            fillData();
        }
    },[status,username])
    if(status==="loading"){
        return <div className='text-white mt-70'>Loadings</div>
    }
    if(notFound){
        return (
            <div className='text-white flex flex-col items-center justify-center mt-40 gap-4'>
                <h1 className='text-4xl font-black'>404</h1>
                <p className='text-neutral-400 text-xl'>Creator <span className='font-bold text-white'>@{username}</span> doesn't exist</p>
                <Link href='/' className='mt-4 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors'>Go Home</Link>
            </div>
        )
    }
  return (
    <div className='text-white'>
        <div className="h-80 w-full overflow-hidden relative ">
          <img src={dynaData.coverpic===""?'/hero-bg.jpg':dynaData.coverpic} className="w-full h-full object-cover opacity-60" alt="" />
        </div>
        <div className="relative p-5 mb-3 flex flex-col gap-4 items-center">
            <div className="absolute -top-12 rounded-xl">
                <img className="rounded-xl w-30 h-30 object-cover" src={dynaData.profilepic===""?"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop":dynaData.profilepic}  alt="" />
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
