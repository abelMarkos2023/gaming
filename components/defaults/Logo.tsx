import Link from 'next/link'
import React from 'react'

const Logo = () => {
  return (
    <Link href={'/'} className='font-bold text-gray-100'>
        <h1 className="text-[18px] md:text-2xl">
            Game <span className="text-rose-500">Book</span>
        </h1>
    </Link>
  )
}

export default Logo