"use client"
import { signIn } from 'next-auth/react'
import React from 'react'

const Pill = ({name,domain}) => {
  return (
    <button onClick={()=>signIn(`${domain}`)} className="pill p-3 rounded-4xl flex gap-2 hover:bg-neutral-600/80 hover:border hover:border-neutral-300 bg-neutral-600/50 w-58 cursor-pointer hover:-translate-y-1 transition-all duration-200">
        <img  className="rounded-full"height={24} width={24} src={`https://www.google.com/s2/favicons?domain=${domain}.com`} alt={`${name} icon`} />
        <span>Continue with <span className='font-bold'>{name}</span></span>
    </button>
  )
}

export default Pill
