import { Signup } from '@/components/Signup'
import React from 'react'

const page = () => {
  return (
    <div className="flex min-h-screen items-center justify-center" style={{
      backgroundImage: "url('/bg2.jpg')",
      backgroundSize: 'cover',
      backgroundRepeat: 'no-repeat'
  }}>
      <Signup />
    </div>
  )
}

export default page