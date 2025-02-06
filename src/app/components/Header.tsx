"use client"
import React from 'react'
import Link from "next/link"    
import { signOut, useSession } from 'next-auth/react'

export default function Header() {
    const {data:session}=useSession();
    const handleSignOut = async () => {
        try {
            await signOut();
        } catch (error) {
            console.log(error);
        }
  return (
    <div>
      <button onClick={handleSignOut}>Sign out</button> 
      {session ?(
        <div>welcome</div>
      ):
      <div>
        <Link href="/videos">Videos</Link>
        <Link href="/profile">Profile</Link>
      </div>
      }
    </div>
  )
}
}

