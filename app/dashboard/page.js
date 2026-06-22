"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-toastify'

const dashboard = () => {
  const { data: session, status, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({
    name: "",
    email: "",
    username: "",
    tagline: "",
    tag: "",
    goal: 0,
    profilepic: "",
    coverpic: "",
    razorpayId: "",
    razorpaySecret: "",
  })
  const [hasRazorpaySecret, setHasRazorpaySecret] = useState(false);
  const fetchUser = async () => {
    const res = await fetch('/api/user');
    const data = await res.json()
    setHasRazorpaySecret(data.hasRazorpaySecret)
    setForm({
      name: data.name || "",
      email: data.email || "",
      username: data.username || "",
      tagline: data.tagline || "",
      tag: data.tag || "Developer",
      goal: data.goal || 0,
      profilepic: data.profilepic || "",
      coverpic: data.coverpic || "",
      razorpayId: data.razorpayId || "",
      razorpaySecret: "",
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

  const isValidUrl = (url) => {
    try {
      const newUrl = new URL(url)
      return (
        newUrl.protocol === "https:" || newUrl.protocol === "http:"
      )
    } catch {
      return false;
    }
  }

  const saveProfile = async (e) => {
    e.preventDefault();
    console.log("Save button clicked")
    const username = form.username.trim()
    if (username.length < 3) {
      toast.warning("username must be at least 3 charcters")
      return;
    }
    if (username.length > 20) {
      toast.warning("Username cannot exceed 20 characters")
      return;
    }
    if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      toast.warning("Username can only contain letters, numbers and underscores");
      return;
    }
    if (form.coverpic && !isValidUrl(form.coverpic)) {
      toast.warning("Invalid cover picture URL")
      return;
    }
    if (form.profilepic && !isValidUrl(form.profilepic)) {
      toast.warning("Invalid profile picture URL")
      return;
    }
    if (form.tagline.length > 100) {
      toast.warning("Tagline cannot exceed 100 charcters")
      return;
    }
    if (isNaN(form.goal) || Number(form.goal) < 0) {
      toast.warning("Goal cannot be less than zero")
      return;
    }
    const res = await fetch('/api/user', {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ ...form, goal: Number(form.goal) }),
    });
    const data = await res.json();
    if (data.success) {
      await update();
      toast.success("Profile Updated");
    } else {
      toast.error(data.message);
    }
  };

  const fields = ["name", "username", "tagline", "tag", "goal", "profilepic", "coverpic", "razorpayId", "razorpaySecret"];
  const percentFilled = () => {
    const len = fields.reduce((acc, item) => {
      if(item==="razorpaySecret"){
        return hasRazorpaySecret?acc+1:acc;
      }
      if(item === "goal"){
        return Number(form.goal)>0?acc+1:acc;
      }
      if(form[item]&&form[item]!=="")return acc+1
      return acc;
    }, 0)
    return Math.round((len / fields.length)*100);
  }
  return (
    <div className='text-white pt-20 max-w-2xl mx-auto px-6'>
      <h1 className='text-3xl font-black mb-8'>Welcome to your Dashboard</h1>
      <div className="flex justify-between mb-2">
        <span className="text-sm font-semibold">Profile Completion</span>
        <span className="text-sm font-semibold">{percentFilled()}%</span>
      </div>
      <div className="bar h-2 bg-neutral-800 rounded-full mb-2 ">
        <div style={{ width: `${percentFilled()}%` }} className="progress rounded-full bg-violet-600 h-2"></div>
      </div>
      <form onSubmit={(e) => saveProfile(e)} className='flex flex-col gap-4 bg-neutral-900/50 p-6 rounded-2xl border border-white/10'>
        <div className='flex flex-col gap-1'>
          <label htmlFor="name" className='text-sm text-neutral-400'>Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} type="text" id='name' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="mail" className='text-sm text-neutral-400'>Email</label>
          <input value={form.email} disabled type="email" id='mail' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-neutral-400 cursor-not-allowed' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="username" className='text-sm text-neutral-400'>Username</label>
          <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} type="text" id='username' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tagline" className='text-sm text-neutral-400'>Tagline</label>
          <input value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })} type="text" id='tagline' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="tag" className='text-sm text-neutral-400'>Tag</label>
          <select value={form.tag} className=' bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' onChange={(e) => setForm({ ...form, tag: e.target.value })} name="tag" id="tag">
            <option value="Developer">Developer</option>
            <option value="Designer">Designer</option>
            <option value="Writer">Writer</option>
            <option value="Artist">Artist</option>
            <option value="Musician">Musician</option>
            <option value="Educator">Educator</option>
            <option value="Content Creator">Content Creator</option>
          </select>
        </div>
        <div className="flex flex-col gap-1">
          <label htmlFor="goal" className='text-sm text-neutral-400'>Goal</label>
          <input value={form.goal} onChange={(e) => setForm({ ...form, goal: e.target.value })} type="number" min={0} id='goal' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
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
          <input placeholder={hasRazorpaySecret ? "Secret Saved" : "Enter Razorpay Secret"} value={form.razorpaySecret} onChange={(e) => setForm({ ...form, razorpaySecret: e.target.value })} type="password" id='RazorPay_SECRET' className='bg-neutral-800/40 border border-white/10 rounded-lg p-2 text-white ' />
        </div>
        <button type='submit' className='w-full bg-neutral-600 hover:bg-neutral-600/50 text-white font-bold py-3 rounded-lg mt-4 transition-all cursor-pointer'>Save Changes</button>
      </form>
    </div>
  )
}

export default dashboard
