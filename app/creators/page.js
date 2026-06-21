"use client"
import React, { useEffect, useState } from 'react'
import Card from '@/components/Card';

const creatorsPage = () => {
    const [page, setPage] = useState(1);
    const [creators, setCreators] = useState([]);
    const [lastPage, setLastPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [selectedTag, setSelectedTag] = useState("All");
    const fetchData = async () => {
        setLoading(true);
        const res = await fetch(`/api/creators?page=${page}&limit=20&tag=${selectedTag}`);
        const data = await res.json();
        setCreators(data.creators);
        setLastPage(Math.ceil(data.totalCreators / 20));
        setLoading(false);
    }
    useEffect(() => {
        fetchData();
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    }, [page, selectedTag])
    const tags = ["All","Developer","Desiogner","Writer","Artist","Musician","Educator","Content Creator"];
    return (
        <div className='pt-20 text-white'>
            <h1 className='text-white text-4xl font-black text-center pb-8'>All Creators</h1>
            <div className="flex flex-wrap justify-center gap-3 mb-10">
                <div className="flex flex-wrap justify-center gap-3 mb-10">
                    {tags.map(item=>(
                        <button
                            key={item}
                            onClick={() => {
                                setSelectedTag(item);
                                setPage(1);
                            }}
                            className={`px-4 py-2 rounded-full text-sm font-semibold border border-white/10 transition-all cursor-pointer ${selectedTag === item? "bg-violet-600 text-white": "bg-neutral-900 text-neutral-400 hover:text-white hover:border-white/20"}`}>
                                {item}
                        </button>
                    ))}
                </div>

            </div>
            <div className='grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3'>
                {loading ? (
                    <div className='col-span-full text-center text-white text-xl font-semibold'>Loading...</div>
                ) :
                    (creators.length === 0 ? (
                        <div className='col-span-full text-center text-neutral-400 py-20 text-xl font-bold'>No creators found</div>
                    ) : (
                        creators.map(item => (
                            <Card key={item._id} name={item.name} username={item.username} tag={item.tag} coverpic={item.coverpic} profilepic={item.profilepic} totalSupporters={item.totalSupporters} percentGoal={item.goal > 0 ? (item.totalAmount / item.goal) * 100 : 0} />
                        ))
                    ))
                }
            </div>
            <div className="buttons flex flex-row justify-center items-center mt-8 gap-3 text-white">
                <button className='disabled:cursor-not-allowed cursor-pointer font-semibold text-xl  hover:-translate-y-0.5 hover:text-neutral-200 transition-all duration-300 bg-neutral-600/60 py-2 px-4 rounded-lg' onClick={() => setPage(page - 1)} disabled={page === 1}>&larr; Prev</button>
                <span>Page {page} of {lastPage}</span>
                <button className='disabled:cursor-not-allowed cursor-pointer font-semibold text-xl  hover:-translate-y-0.5 hover:text-neutral-200 transition-all duration-300 bg-neutral-600/60 py-2 px-4 rounded-lg' onClick={() => { setPage(page + 1) }} disabled={page === lastPage}>Next &rarr;</button>
            </div>
        </div>
    )
}

export default creatorsPage
