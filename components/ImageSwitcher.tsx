"use client"

import { Game } from '@/types'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import {motion} from 'framer-motion'

const ImageSwitcher = ({images,game}:{images:any[],game: Game}) => {

  const [active,setActive] = useState(0);

  useEffect(() => {

    const interval = setInterval(() => {    
      setActive((prev) => (prev + 1) % images.length);
    }, 1000);
    return () => clearInterval(interval);
  },[images.length])
  
    console.log(images)
  return (
    <div className="relative w-60 h-36 rounded-xl overflow-hidden">
        <Image src={images[active].image} fill className='object-cover transisition duration-500' alt={game.name} />
    </div>
  )
}

export default ImageSwitcher