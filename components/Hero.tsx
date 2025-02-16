"use client"

import React,{useState,useEffect} from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCard from './SwiperCard'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'




const swiperSlidesData = [
    {
        id: 1,
        src: '/call-of-duty-black-ops-6-animated-hero-mobile.mp4',
        heading: 'Call Of Duty Blackops',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem tempore, dolorum dolores incidunt corrupti est neque consectetur labore, consequuntur iusto sed illum impedit doloribus earum a! Dolorem saepe eaque sequi aspernatur voluptatibus, hic odit iste ut similique maxime obcaecati aliquam!',
        logo: '/call-of-duty.webp',
        
        url: '',

    },
    {
        id: 2,
        src: '/cyberpunk-phantom-liberty-video-hero.mp4',
        heading: 'Cyberpunk Phantom Liberty',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem tempore, dolorum dolores incidunt corrupti est neque consectetur labore, consequuntur iusto sed illum impedit doloribus earum a! Dolorem saepe eaque sequi aspernatur voluptatibus, hic odit iste ut similique maxime obcaecati aliquam!',
        logo: '/iconcyber.webp',
        url: '',

    },
    {
        id: 3,
        src: '/spidervideo.mp4',
        heading: 'The Amazing Spiderman',
        desc: 'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Rem tempore, dolorum dolores incidunt corrupti est neque consectetur labore, consequuntur iusto sed illum impedit doloribus earum a! Dolorem saepe eaque sequi aspernatur voluptatibus, hic odit iste ut similique maxime obcaecati aliquam!',
        logo: '/news1title.webp',
        url: '',

    },
    
   
]
const pagination = [
    {
        id: 1,
        src: '/call-of-duty-black-ops-6-hero-desktop-01.webp',
        heading: '',
        url: '',

    },
    {
        id: 2,
        src: '/cyb.webp',
        heading: '',
        url: '',  
    },
    {
        id: 3,
        src: '/poster.webp',
        heading: '',
        url: '',  
    }
]

const Hero = () => {
    const [swiper, setSwiper] = useState<SwiperType | null>()
    const [progress,setProgress] = useState(0)

    useEffect(() => {

        const progressInterver = setInterval(() => {
            setProgress(prev => prev += 2.5)
        },75)

        return () => clearInterval(progressInterver)
    },[swiper])

    useEffect(() => {

        swiper?.on('slideChange', () => {
            setProgress(0)
        })
    },[swiper])

  return (
    <div>
        
    <div className = 'h-[24rem] my-6 rounded-2xl overflow-hidden'>
        <Swiper
        autoplay={{delay: 3000}}
              modules={[Autoplay]}
              slidesPerView={1}
              onSwiper={(swiper) => setSwiper(swiper)}
              className='h-full'
        >
            {
                swiperSlidesData.map(slide => (
                                    <SwiperSlide key={slide.id}>
                                         <SwiperCard slide = {slide} />
                                     </SwiperSlide>
                ))
            }
        </Swiper>
        
    </div>
    <div className="flex items-center gap-4 w-full h-40 mt-6 cursor-pointer">
    {
        pagination.map((slide,idx) => (
            <div key={slide.id} 
            onClick = {() => swiper?.slideTo(idx)}
            className="relative  transition duration-200 rounded-lg z-10 w-full h-full  hover:-translate-y-12 overflow-x-hidden">
                <Image fill className = 'object-cover rounded-lg' alt = 'pagination image' src= {slide.src} />
                {idx === swiper?.realIndex && <div className = {`absolute inset-0 opacity-[50%] bg-gray-600`} style={{width: `${progress}%`}}></div>}
            </div>
        ))
    }
</div>
</div>
  )
}

export default Hero