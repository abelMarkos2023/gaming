"use client"

import Image from 'next/image'
import React,{useState} from 'react'
import {motion} from 'framer-motion'

const SwiperCard = ({slide}:{slide:{src: string,heading: string,url: string,desc: string,logo: string}}) => {


  return (
    <motion.div className = 'relative h-full w-full rounded-2xl'>
        <video
        autoPlay = {true}
        loop =  {true}
        muted = {true}
        className='object-top object-cover absolute inset-0 h-full w-full'
        >
            <source src = {slide.src} />
           
        </video>
        <div className="absolute z-index-12 max-w-3xl top-8 left-8 flex flex-col items-start gap-3">
              <motion.div initial = {{y: 200,opacity: 0}} whileInView ={{
                y: 0,
                opacity: 1,
                transition: {duration: 2}
              }} className="relative w-96 h-24">
                <Image alt={slide.heading} src={slide.logo} fill className='object-contain' />
              </motion.div>
              <motion.h1 className="font-semibold text-3xl text-gray-50"
                initial = {{x: 500,opacity: 0}} whileInView ={{
                x: 0,
                opacity: 1,
                transition: {duration: 2}
              }}
              >
                {slide.heading}

              </motion.h1>
              <motion.p className="text-muted-foreground w-[60%] text-white text-justify"
              initial = {{y: -200,opacity: 0}} whileInView ={{
                y: 0,
                opacity: 1,
                transition: {duration: 2}
              }}
              >{slide.desc}

              </motion.p>
            </div>
    </motion.div>
  )
}

export default SwiperCard