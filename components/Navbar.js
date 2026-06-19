"use client"
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";

const Navbar = () => {
  const { data: session } = useSession()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading,setLoading] = useState(false);
  const searchRef = useRef()
  const inpiutRef = useRef();
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => {
      document.removeEventListener("mousedown", handleClickOutside)
    }
  }, [])
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key==="Escape") {
        setSearchOpen(false);
        setQuery("");
      }
    }
    document.addEventListener("keydown", handleEsc)
    return () => {
      document.removeEventListener("keydown", handleEsc)
    }
  }, [])

  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      setLoading(false);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      const res = await fetch(`/api/creators?q=${encodeURIComponent(query)}&sendAll=true`)
      const data = await res.json();
      setResults(data);
      setLoading(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      inpiutRef.current.focus();
    }
  }, [searchOpen])

  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-center items-center gap-10 px-16 py-4 border-b border-white/6 text-white'>
      <ul className='flex items-center justify-center gap-8 text-sm text-white/40'>
        <li className='hover:text-white/70 cursor-pointer transition-colors'> <Link href={'/'}>Home</Link> </li>
        <li className='hover:text-white/70 cursor-pointer transition-colors'>About</li>
        <li title='search creators' ref={searchRef} className='relative '>
          {!searchOpen ? (
            <button onClick={() => setSearchOpen(true)} className='text-xl flex items-center'><CiSearch /></button>
          ) : (
            <div className='relative'>
              <div className="relative flex items-center gap-2">
                <input ref={inpiutRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search Creators' className='w-64 bg-neutral-900 border border-white/10 rounded-lg px-3 py-1 text-sm' type="text" />
                <button onClick={(e) => {
                  setQuery("")
                  setSearchOpen(false)
                }} className='text-white/50 hover:text-white'><IoIosCloseCircle /></button>
              </div>
              {query.trim() && (
                <div className="absolute top-full left-0 mt-2 w-full bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                  {loading?(
                    <div className="p-6 text-neutral-400">
                      Searching...
                    </div>
                  ): results.length === 0 ? (
                    <div className='p-6'>No Creators found</div>
                  ) : results.map(item => {
                    return (<Link onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }} href={`/${item.username}`} key={item._id} className="p-3 flex hover:bg-neutral-800 cursor-pointer gap-3">
                      <img
                        src={!item.profilepic?"https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop":item.profilepic} className="w-8 h-8 rounded-full object-cover" alt=""/>
                      <div>
                        <div>{item.name}</div>
                        <div className='text-xs text-neutral-400'>@{item.username}</div>
                      </div>
                    </Link>)
                  }
                  )}
                </div>
              )}
            </div>
          )}
        </li>
      </ul>
      <h1 className='text-xl font-black tracking-widest'> <Link href={'/'}>MyFans</Link> </h1>
      <ul className='flex gap-8 text-sm text-white/40'>
        {/* <li className='hover:text-white/70 cursor-pointer transition-colors'>Projects</li> */}
        {!session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={"/login"}>login</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={"/dashboard"}>Dashboard</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors'> <Link href={`/${session.user.username}`}>Your Page</Link> </li>}
        {session && <li className='text-white/60 hover:text-white/90 cursor-pointer transition-colors' > <button onClick={() => signOut()}>logout</button></li>}
      </ul>
    </nav>
  )
}

export default Navbar
