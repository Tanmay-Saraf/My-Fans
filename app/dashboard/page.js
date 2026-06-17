"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

const dashboard = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  })
  const fetchUser = async () => {
    const res = await fetch('/api/user');
    console.log(res)
    const data = await res.json()
    console.log(data)
    setForm({
      name: data.name || "",
      email: data.email || "",
      username: data.username || "",
      profilepic: data.profilepic || "",
      coverpic: data.coverpic || "",
      razorpayId: data.razorpayId || "",
      razorpaySecret: data.razorpaySecret || "",
    });
  }
  useEffect(() => {
    if (session) {
      fetchUser()
    }
  }, [session])

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push('/login')
    }
  }, [status, router])
  if (status === "loading" || status === "unauthenticated") {
    return <div className="text-white text-center mt-20">Loading...</div>
  }


  const saveProfile = async (e) => {
    e.preventDefault();
    console.log("Save button clicked")
    const res = await fetch('/api/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });
    const data = await res.json();
    if (data.success) {
      await update();
      alert("Profile Updated");
    } else {
      alert(data.message);
    }
  };

  return (
    <div className='text-white pt-20 max-w-2xl mx-auto px-6'>
      <h1 className='text-3xl font-black mb-8'>Welcome to your Dashboard</h1>
      <form onSubmit={(e) => saveProfile(e)} className='flex flex-col gap-4 bg-neutral-900/50 p-6 rounded-2xl border border-white/10'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='text-sm text-neutral-400'>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" id='name' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mail" className='text-sm text-neutral-400'>Email</label>
          <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} type="email" id='mail' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Username" className='text-sm text-neutral-400'>Username</label>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" id='username' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="Banner" className='text-sm text-neutral-400'>Cover Picture</label>
          <input value={form.coverpic} onChange={(e) => setForm({ ...form, coverpic: e.target.value })} type="text" id='banner' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="profile" className='text-sm text-neutral-400'>Profile Picture</label>
          <input value={form.profilepic} onChange={(e) => setForm({ ...form, profilepic: e.target.value })} type="text" id='profile' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="RazorPay_ID" className='text-sm text-neutral-400'>Razorpay ID</label>
          <input value={form.razorpayId} onChange={(e) => setForm({ ...form, razorpayId: e.target.value })} type="text" id='RazorPay_ID' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="RazorPay_SECRET" className='text-sm text-neutral-400'>Razorpay SECRET</label>
          <input value={form.razorpaySecret} onChange={(e) => setForm({ ...form, razorpaySecret: e.target.value })} type="text" id='RazorPay_SECRET' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <button type='submit' className='w-full bg-neutral-600 hover:bg-neutral-600/50 text-white font-bold py-3 rounded-lg mt-4 transition-all cursor-pointer'>Save Changes</button>
      </form>
    </div>
  )
}

export default dashboard
