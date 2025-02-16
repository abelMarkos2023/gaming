import { cn } from '@/lib/utils'
import React from 'react'

const MaxWidthWrapper = ({children,className}:{children: React.ReactNode,className?: string}) => {
  return (
    <div className={cn('max-w-[70vw] mx-auto',className || '')}>
        {children}
    </div>
  )
}

export default MaxWidthWrapper