import React from 'react'
import { Skeleton } from '../ui/skeleton'


const UserSkeleton = () => {
  return (
    <div className='flex flext-start gap-3'>
        <Skeleton className = 'w-20 h-20 rounded-full' />
        <Skeleton className = 'w-[200px] h-4' />
    </div>
  )
}

export default UserSkeleton