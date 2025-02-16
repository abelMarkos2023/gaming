import { cn } from '@/lib/utils'
import Link from 'next/link'
import React from 'react'

const Button = ({className,label,icon,link}:{link:string,className?: string,label: string,icon?: React.ReactElement}) => {
  const baseStyle = 'py-2 px-6 bg-transparent text-gray-50 border border-rose-400 hover:border-white hover:text-rose-400 transition duration-300 rounded-lg shadow-lg'
  return (
    <Link href={link} className={cn('',className || 'animated-polygon-button ')}>
        {label}
    </Link>
  )
}

export default Button