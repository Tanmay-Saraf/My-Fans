"use client"
import React, { useEffect, useState } from "react";
import Card from "@/components/Card";
import Link from "next/link";

export default function Home() {

  const [creators,setCreators] = useState([]);
  const [stats,setStats] = useState();

  const fetchCreatorsData = async ()=>{
    const res = await fetch('/api/creators?limit=3')
    const data = await res.json()
    setCreators(data.creators)
  }

  const fetchStats = async ()=>{
    const res = await fetch('/api/stats');
    const data = await res.json();
    console.log(data);
    setStats(data);
  }

  useEffect(() => {
    fetchCreatorsData();
    fetchStats();
  }, [])
  

  return (
    <div className="text-white">
      <div className=" hero relative bg-[url('/hero-bg.jpg')] bg-cover bg-center min-h-screen ">
        <div className="absolute inset-0 bg-black/60"></div>
        <div className="relative z-10 flex flex-col items-center pt-60 pb-20  ">
          <h1 className=" max-w-lg font-black text-4xl text-center">Fund the work you actually care about</h1>
          <div className="tagline max-w-md text-center mt-4 mb-6 text-lg text-neutral-300">MyFans lets you support the writers, artists, and builders doing their best work directly, no middlemen</div>
          <div className="buttons grid grid-cols-2 gap-4">
            <Link href={'/creators'} className="font-bold text-md py-2 px-4 rounded-lg border border-white/50 cursor-pointer hover:bg-neutral-500/30 transition-colors ">Start supporting</Link>
            <Link href={'/dashboard'} className="font-bold text-md py-2 px-4 rounded-lg border border-white/50 cursor-pointer hover:bg-neutral-500/30 transition-colors ">Apply as a creator</Link>
          </div>
          <div className="stats grid grid-cols-3 gap-10 mt-8">
            <div className="stat flex flex-col items-center gap-1">
              <span className="text-2xl block font-black">₹{stats?.totalRaised||0}</span>
              <span className="text-sm text-neutral-300">paid to creators</span>
            </div>
            <div className="stat flex flex-col items-center gap-1">
              <span className="text-2xl block font-black">{stats?.totalSupporters||0}</span>
              <span className="text-sm text-neutral-300">active supporters</span>
            </div>
            <div className="stat flex flex-col items-center gap-1">
              <span className="text-2xl block font-black">{stats?.totalCreators||0}</span>
              <span className="text-sm text-neutral-300">creators funded</span>
            </div>
          </div>
        </div>
      </div>
      <div className="trending flex flex-col items-center py-24 px-6 w-full max-w-6xl mx-auto">
        <div className="w-full">
          <div className="flex flex-col gap-1 text-left mb-10">
            <h2 className="text-3xl font-black tracking-widest text-white">Trending Creators</h2>
            <h6 className="text-neutral-400 text-md">Suport the people building amazing things</h6>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {creators.length===0?(
            <p className="text-neutral-400">No Creators Yet</p>
          ):(creators.map(item=><Card key={item._id} name={item.name} username={item.username} coverpic={item.coverpic} profilepic={item.profilepic} totalSupporters={item.totalSupporters} percentGoal={item.goal>0?(item.totalAmount/item.goal)*100:0}/>))}
          {/* <div className="card bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl hover:-translate-y-2 transition-all duration-300 min-w-xs max-w-lg mx-auto">
            <div className="h-30 w-full rounded-t-2xl overflow-hidden relative ">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="" />
            </div>
            <div className="p-5 relative">
              <div className="absolute -top-8 left-5 rounded-xl">
                <img className="rounded-xl w-16 h-16 object-cover" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" alt="" />
              </div>
              <div className="flex justify-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest ">Open Source</span>
              </div>
              <div className="mt-3 mb-3">
                <h1 className="font-bold text-xl text-white">Tanmay Saraf</h1>
              </div>
              <div className="lower">
                <div className="bar h-2 bg-neutral-800 rounded-full mb-2 ">
                  <div className="progress rounded-full bg-violet-600 w-[66%] h-2"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-neutral-400">66% of goal</span>
                  <span className="text-xs font-semibold text-neutral-400">201 supporters</span>
                </div>
              </div>
            </div>
          </div>
          <div className="card bg-neutral-900/80 backdrop-blur-md border border-white/10 hover:border-white/20 rounded-2xl hover:-translate-y-2 transition-all duration-300 min-w-xs max-w-lg mx-auto">
            <div className="h-30 w-full rounded-t-2xl overflow-hidden relative ">
              <img src="https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=600&auto=format&fit=crop" className="w-full h-full object-cover opacity-60" alt="" />
            </div>
            <div className="p-5 relative">
              <div className="absolute -top-8 left-5 rounded-xl">
                <img className="rounded-xl w-16 h-16 object-cover" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" alt="" />
              </div>
              <div className="flex justify-end mb-2">
                <span className="text-xs font-bold uppercase tracking-widest ">Open Source</span>
              </div>
              <div className="mt-3 mb-3">
                <h1 className="font-bold text-xl text-white">Tanmay Saraf</h1>
              </div>
              <div className="lower">
                <div className="bar h-2 bg-neutral-800 rounded-full mb-2 ">
                  <div className="progress rounded-full bg-violet-600 w-[66%] h-2"></div>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs font-semibold text-neutral-400">66% of goal</span>
                  <span className="text-xs font-semibold text-neutral-400">201 supporters</span>
                </div>
              </div>
            </div>
          </div> */}
        </div>
      </div>
      <div className="divider w-full h-0.5 bg-neutral-900"></div>
      <div className="why flex flex-col md:flex-row md:justify-between justify-center items-center gap-16 py-32 px-6 max-w-6xl mx-auto">
        <div className="flex-1 relative w-full flex justify-center md:justify-start">
          <div className="absolute top-4 -left-2 md:-left-4 w-full max-w-sm h-full bg-neutral-800 rounded-3xl z-0 border border-white/5"></div>
          <img className="relative z-10 w-full max-w-sm rounded-3xl shadow-2xl object-cover" src="https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1000&auto=format&fit=crop" alt="" />
        </div>
        <div className="flex-1 flex flex-col gap-10">
          <div>
            <h1 className="font-black  text-xl text-neutral-300 tracking-wider">Why Support Creators Directly</h1>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold tracking-widest">Community Driven</h2>
              <p className="font-semibold text-md text-neutral-400 max-w-4xl">Built around supporters</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold tracking-widest">Direct Support</h2>
              <p className="font-semibold text-md text-neutral-400 max-w-4xl">100% transparent</p>
            </div>
            <div className="flex flex-col justify-center items-center gap-2">
              <h2 className="text-2xl font-bold tracking-widest">No Middlemen</h2>
              <p className="font-semibold text-md text-neutral-400 max-w-4xl">Creators get funded directly</p>
            </div>
          </div>
        </div>
      </div>
      <div className="divider w-full h-0.5 bg-neutral-900"></div>
      <div className="flex flex-col md:flex-row justify-center items-center gap-20 py-20 px-3 max-w-5xl mx-auto">
        <div className="how flex-1 flex flex-col gap-4">
          <h2 className="text-3xl font-black">Set up your page easily</h2>
          <p className="text-neutral-400 text-lg max-w-sm">Just create a profile and send your link to your supporters</p>
        </div>
        <div className=" flex-1 w-full flex justify-center">
          <div className="card bg-neutral-900/70 backdrop-blur-md border border-white/10 p-6 rounded-xl shadow-2xl w-full max-w-sm ">
            <div className="flex gap-6 justify-center items-center mb-2">
              <img className="rounded-xl w-20 h-20 object-cover" src="https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" alt="" />
              <h1 className="font-bold text-xl text-center ">Show your favourite creators some love</h1>
            </div>
            <Link className="w-full font-bold text-md py-2 px-4 rounded-lg bg-violet-600 hover:bg-violet-700 transition-colors mt-4" href={'/creators'}>Support</Link>
          </div>
        </div>
      </div>
    </div>
  );

}

