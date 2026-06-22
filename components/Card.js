import Link from 'next/link'
import React from 'react'

const Card = ({name,username,tag,profilepic,coverpic,percentGoal,totalSupporters}) => {
    return (
        <div className="card bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl hover:-translate-y-2 transition-all duration-300 min-w-xs max-w-lg mx-auto">
            <div className="h-30 w-full rounded-t-2xl overflow-hidden relative ">
                <img src={!coverpic?"https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop":coverpic} className="w-full h-full object-cover opacity-60" alt="" />
            </div>
            <div className="p-5 relative">
                <div className="absolute -top-8 left-5 rounded-xl">
                    <img className="rounded-xl w-16 h-16 object-cover" src={!profilepic?"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop":profilepic} alt="" />
                </div>
                <div className="flex justify-end mb-2">
                    <Link href={`/creators?tag=${encodeURIComponent(tag)}`} className="text-xs bg-neutral-800 font-bold uppercase tracking-widest p-2 rounded-xl border border-white/50 ">{tag}</Link>
                </div>
                <div className="flex flex-col mt-3 mb-3">
                    <h1 className="font-bold text-xl text-white">{name}</h1>
                    <Link href={`/${username}`} className='font-semibold text-md text-neutral-300'>@{username}</Link>
                </div>
                <div className="lower">
                    <div className="bar h-2 bg-neutral-800 rounded-full mb-2 ">
                        <div style={{ width:`${percentGoal}%`}} className="progress rounded-full bg-violet-600 h-2"></div>
                    </div>
                    <div className="flex justify-between">
                        <span className="text-xs font-semibold text-neutral-400">{percentGoal.toFixed(2)}% of goal</span>
                        <span className="text-xs font-semibold text-neutral-400">{totalSupporters} supporters</span>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card