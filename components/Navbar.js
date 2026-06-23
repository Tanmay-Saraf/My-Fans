"use client"
import React, { useRef, useState, useEffect } from 'react'
import Link from 'next/link'
import { signOut, useSession } from 'next-auth/react'
import { CiSearch } from "react-icons/ci";
import { IoIosCloseCircle } from "react-icons/io";
import { HiMenu, HiX } from "react-icons/hi";
import { motion} from 'motion/react';

const Navbar = () => {
  const { data: session } = useSession()
  const [searchOpen, setSearchOpen] = useState(false)
  const [query, setQuery] = useState("")
  const [results, setResults] = useState([])
  const [loading, setLoading] = useState(false);
  const searchRef = useRef()
  const inputRef = useRef();
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
      if (e.key === "Escape") {
        setSearchOpen(false);
        setQuery("");
        setResults([]);
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
      setResults([]);
      return;
    }
    const timer = setTimeout(async () => {
      setLoading(true);
      try{
      const res = await fetch(`/api/creators?q=${encodeURIComponent(query)}&sendAll=true`)
      if(!res.ok){
        setResults([]);
        setLoading(false);
        return;
      }
      const data = await res.json();
      setResults(data.creators);
    }catch(err){
        console.log(err);
        setResults([]);
      }
      setLoading(false);
    }, 300)

    return () => {
      clearTimeout(timer);
    }
  }, [query]);

  useEffect(() => {
    if (searchOpen) {
      inputRef.current.focus();
    }
  }, [searchOpen])

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);



  return (
    <nav className='fixed top-0 left-0 w-full z-50 flex justify-center items-center gap-10 px-16 py-4 border-b border-white/6 text-white'>
      <button className='md:hidden text-2xl' onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
        {mobileMenuOpen ? <HiX /> : <HiMenu />}
      </button>
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-neutral-900 border-t border-white/10">
          <div className='flex flex-col p-4 gap-4'>
            <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search Creators' className='w-full bg-neutral-800 rounded-lg px-3 py-2' />
            {query.trim() && results.length === 0 ? (<div className='p-6'>No Creators found</div>) : results.map(item => {
              return (<Link onClick={() => {
                setSearchOpen(false);
                setQuery("");
              }} href={`/${item.username}`} key={item._id} className="p-3 flex hover:bg-neutral-800 cursor-pointer gap-3">
                <img
                  src={!item.profilepic ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" : item.profilepic} className="w-8 h-8 rounded-full object-cover" alt="" />
                <div className='flex flex-col w-full'>
                  <div>{item.name}</div>
                  <div className="flex justify-between items-center w-full">
                    <div className='text-xs text-neutral-400'>@{item.username}</div>
                    <div className='text-xs font-bold text-neutral-500'>{item.tag}</div>
                  </div>
                </div>
              </Link>)
            })
            }

            <Link className='hover:text-white/70 cursor-pointer transition-colors' href='/'>Home</Link>
            <Link className='hover:text-white/70 cursor-pointer transition-colors' href='/creators'>Creators</Link>
            {session && (
              <>
                <Link className='hover:text-white/70 cursor-pointer transition-colors' href='/dashboard'>Dashboard</Link>
                <Link className='hover:text-white/70 cursor-pointer transition-colors' href={`/${session.user.username}`}>Your Page</Link>
              </>
            )}
            {!session && (
              <Link className='hover:text-white/70 cursor-pointer transition-colors' href='/login'>Login</Link>
            )}
            {session && (
              <button onClick={() => signOut()} className="text-left"> Logout </button>
            )}
          </div>
        </div>
      )}
      <ul className='hidden md:flex items-center justify-center gap-8 text-sm text-white/40'>
        <li className='hover:text-white/70 cursor-pointer transition-colors'> <Link href={'/'}>Home</Link> </li>
        <li className='hover:text-white/70 cursor-pointer transition-colors'> <Link href={'/creators'}>Creators</Link> </li>
        <li title='search creators' ref={searchRef} className='relative '>
          {!searchOpen ? (
            <button onClick={() => setSearchOpen(true)} className='text-xl flex items-center'><CiSearch /></button>
          ) : (
            <div className='relative'>
              <div className="relative flex items-center gap-2">
                <input ref={inputRef} value={query} onChange={(e) => setQuery(e.target.value)} placeholder='Search Creators' className='w-64 bg-neutral-900 border border-white/10 rounded-lg px-3 py-1 text-sm' type="text" />
                <button onClick={(e) => {
                  setQuery("")
                  setSearchOpen(false)
                }} className='text-white/50 hover:text-white'><IoIosCloseCircle /></button>
              </div>
              {query.trim() && (
                <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} exit={{opacity:1,scale:0.95}} className="absolute top-full left-0 mt-2 w-80 bg-neutral-900 border border-white/10 rounded-xl overflow-hidden">
                  {loading ? (
                    <div className="p-6 text-neutral-400">
                      Searching...
                    </div>
                  ) : results.length === 0 ? (
                    <div className='p-6'>No Creators found</div>
                  ) : results.map(item => {
                    return (<Link onClick={() => {
                      setSearchOpen(false);
                      setQuery("");
                    }} href={`/${item.username}`} key={item._id} className="p-3 flex hover:bg-neutral-800 cursor-pointer gap-3">
                      <img
                        src={!item.profilepic ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" : item.profilepic} className="w-8 h-8 rounded-full object-cover" alt="" />
                      <div className='flex flex-col w-full'>
                        <div>{item.name}</div>
                        <div className="flex justify-between items-center w-full">
                          <div className='text-xs text-neutral-400'>@{item.username}</div>
                          <div className='text-xs font-bold text-neutral-500'>{item.tag}</div>
                        </div>
                      </div>
                    </Link>)
                  }
                  )}
                </motion.div>
              )}
            </div>
          )}
        </li>
      </ul>
      <h1 className='text-xl font-black tracking-widest'> <Link href={'/'}>MyFans</Link> </h1>
      <ul className='hidden md:flex gap-8 text-sm text-white/40'>
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
