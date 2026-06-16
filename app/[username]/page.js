import React from 'react'
import UsernameClient from '@/components/UsernameClient'

export default async function username({params}){
    const {username} = await params;
    return <UsernameClient username={username}/>
}