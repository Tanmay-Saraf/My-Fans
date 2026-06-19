"use client"
import { useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'

const UsernameClient = ({ username }) => {
    const { data: session, status } = useSession()
    const [notFound, setNotFound] = useState(false)
    const [dynaData, setDynaData] = useState({ username, tagline: "", goal: 0, profilepic: "", coverpic: "" })
    const [payments, setPayments] = useState([])
    const supporters = payments.length;
    const totaAmount = payments.reduce((sum, p) => sum + p.amount, 0)
    const [message, setMessage] = useState("");
    const [amount, setAmount] = useState("");
    const fillData = async () => {
        const res = await fetch(`/api/creator/${username}`)
        if (!res.ok) {
            setNotFound(true)
            return;
        }
        const data = await res.json();
        setDynaData({ username: data.user.username, tagline: data.user.tagline, goal: data.user.goal, profilepic: data.user.profilepic, coverpic: data.user.coverpic })
        setPayments(data.payments);
        console.log(data.user.tagline);
    }
    useEffect(() => {
        fillData()

    }, [username])
    if (status === "loading") {
        return <div className='text-white mt-70'>Loadings</div>
    }
    if (notFound) {
        return (
            <div className='text-white flex flex-col items-center justify-center mt-40 gap-4'>
                <h1 className='text-4xl font-black'>404</h1>
                <p className='text-neutral-400 text-xl'>Creator <span className='font-bold text-white'>@{username}</span> doesn't exist</p>
                <Link href='/' className='mt-4 px-6 py-2 bg-neutral-800 hover:bg-neutral-700 transition-colors'>Go Home</Link>
            </div>
        )
    }
    const pay = async (amount) => {
        if (!amount || isNaN(amount) || Number(amount) <= 0) {
            alert("Please enter a valid amount");
            return;
        }
        if (Number(amount) > 100000) {
            alert("Amount must be between ₹1 to ₹100000")
            return;
        }
        const res = await fetch("/api/razorpay", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                name: session?.user?.name || "Anonymous",
                to_user: username,
                amount,
            })
        })

        if (!res.ok) {
            alert("unable to proceed with the payment");
            return;
        }
        const order = await res.json()
        const options = {
            key: order.key,
            amount: order.amount,
            currency: order.currency,
            order_id: order.id,
            name: "MyFans",
            description: `Support @${username}`,

            prefill: {
                name: session?.user?.name || "",
                email: session?.user?.email || ""
            },

            handler: async function (response) {
                const verifyRes = await fetch('/api/payment', {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify({
                        oid: response.razorpay_order_id,
                        pid: response.razorpay_payment_id,
                        signature: response.razorpay_signature,
                        message,
                    })
                })
                const verifyData = await verifyRes.json()
                if(!verifyData.success){
                    alert("Payment not verified")
                    return ;
                }
                await fillData();
                alert("Payment Successful")
                setMessage("")
                setAmount("");
            },
        };
        const razorpay = new window.Razorpay(options);
        razorpay.open();
    }
    return (
        <>
            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <div className='text-white'>
                <div className="h-80 w-full overflow-hidden relative ">
                    <img src={dynaData.coverpic === "" ? '/hero-bg.jpg' : dynaData.coverpic} className="w-full h-full object-cover opacity-60" alt="" />
                </div>
                <div className="relative p-5 mb-3 flex flex-col gap-4 items-center">
                    <div className="absolute -top-12 rounded-xl">
                        <img className="rounded-xl w-30 h-30 object-cover" src={dynaData.profilepic === "" ? "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=200&auto=format&fit=crop" : dynaData.profilepic} alt="" />
                    </div>
                    <div className="info pt-20 gap-4 flex flex-col justify-center items-center">
                        <div className="name tracking-wider text-2xl font-black">@{dynaData.username}</div>
                        <div className="tagline text-sm text-neutral-300 font-medium">{dynaData.tagline}</div>
                        <div className="tagline text-sm text-neutral-300 font-medium">Goal: ₹{dynaData.goal||0}</div>
                        <div className="w-full max-w-md bg-neutral-800 h-2 rounded-full">
                            <div className="bg-violet-500 h-2 rounded-full" style={{ width: `${dynaData.goal>0?Math.min((totaAmount/dynaData.goal)*100,100):0}` }} />
                        </div>
                        <div className='text-lg text-neutral-200 '>{supporters} supporters &middot; ₹{totaAmount} raised</div>
                    </div>
                </div>
                <div className="payment grid grid-cols-2 gap-3">
                    <div className="supporters gap-3 bg-neutral-800/40 flex flex-col justify-center items-center ml-4 pt-10 rounded-2xl p-3 max-h-130  ">
                        <h2 className='text-xl font-bold'>Supporters</h2>
                        <ul className=' p-10 flex flex-col gap-2 overflow-y-scroll scrollbar-track-neutral-500 scrollbar-thin scrollbar-thumb-neutral-100'>
                            {payments.length===0?(
                                <li className='text-neutral-400'>No Supporters yet!</li>
                            ):(payments.map(item => {
                                return (<li key={item._id}>
                                    {item.name} donated <span className='font-bold'>₹{item.amount}</span> {item.message && <span>with message "{item.message}"</span>}
                                </li>)
                            }))}
                        </ul>
                    </div>
                    <div className="payment bg-neutral-800/40 mr-4 rounded-2xl flex flex-col gap-4 justify-center items-center">
                        <h1 className='text-2xl font-bold '>Make a Payment</h1>
                        <div className='flex flex-col md:flex-row gap-3 '>
                            <input value={message} onChange={(e) => setMessage(e.target.value)} type="text" className='bg-neutral-600/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none  focus:ring-1 focus:ring-neutral-300 transition-all ' placeholder='Enter Message' />
                            <input value={amount} onChange={(e) => setAmount(e.target.value)} type="text" className='bg-neutral-600/50 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-neutral-400 focus:outline-none  focus:ring-1 focus:ring-neutral-300 transition-all ' placeholder='Enter Amout' />
                            <button onClick={() => pay(amount)} className='bg-neutral-400 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-2xl '>Pay</button>
                        </div>
                        <div className="buttons flex gap-3">
                            <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl ' onClick={() => pay(10)}>Pay ₹10</button>
                            <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl ' onClick={() => pay(50)}>Pay ₹50</button>
                            <button className='bg-neutral-700/70 py-3 px-3 text-lg font-semibold hover:bg-neutral-500 cursor-pointer rounded-xl ' onClick={() => pay(100)}>Pay ₹100</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default UsernameClient
