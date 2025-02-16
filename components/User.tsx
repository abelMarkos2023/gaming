import Image from 'next/image'
import React from 'react'

const User = ({user}:{user:{username:string,email:string,avatar:{secure_url:string}}}) => {
  return (
    <div className='flex items-center gap-3 text-gray-300'>
        <div className="w-12 h-12 rounded-full relative overflow-hidden">
            <Image className='rounded-full object-cover' fill src={user?.avatar.secure_url} alt={user?.username} />

        </div>
        <div className="flex flex-col">
        <span className=" font-bold text-md">{user?.username}</span>
        <span className="text-sm font-bold">{user?.email}</span>
        </div>
    </div>
  )
}

export default User