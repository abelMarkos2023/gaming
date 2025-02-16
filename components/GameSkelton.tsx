"use client"

import React from 'react'
import { Skeleton } from './ui/skeleton'

const GameSkelton = () => {
  return (
    <div className="flex flex-col space-y-3">
        <Skeleton className='w-full h-[125px] rounded-xl space-y-2' />
        <div className="space-y-2">
            <Skeleton className='w-full h-[4px]' />
            <Skeleton className='w-[90%] h-[4p]' />
        </div>
    </div>
  )
}

export default GameSkelton