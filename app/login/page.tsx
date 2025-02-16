import {Login} from '@/components/Login'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{
        backgroundImage: "url('/background.jpg')",
        backgroundSize: 'cover',
        backgroundRepeat: 'no-repeat'
    }}>
        <Login />
    </div>
  )
}

export default page