"use client"

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import React from 'react'

const NavLink = ({navLink}:{navLink: {id:number,label:string,link:string,icon: React.ReactElement}}) => {
    const pathName = usePathname()
    const {label,link,icon} = navLink;
    const isActive = pathName === link;

  return (
    <Link href={link} className={`flex w-full items-center transition duration-200 gap-2 p-2 rounded-md text-base  ${isActive ? 'text-rose-500 ': 'text-gray-50'} hover:bg-rose-500 hover:text-white`}>
            {React.cloneElement(icon)}
            <span className="hidden md:inline-block">{label}</span>
    </Link>
  )
}

export default NavLink