"use client"

import React, { useRef } from 'react'
import type {Game} from '@/types'
import Image from 'next/image'
import { Swiper, SwiperSlide } from 'swiper/react'
import SwiperCard from './SwiperCard'
import { Autoplay } from 'swiper/modules'
import AddToWhichList from './AddToWhichList'
import { WhishListProvider } from '@/contexts/whichlistContext'


export default function({games,title,slidesPerView}:{slidesPerView?:number,title:string,games: Game[]}){
    const swiperRef = useRef(null);

    return (
        <div className='relative'>
            
            <h3 className="text-2xl font-bold mb-4 lg:text-4xl text-gray-400 capitalize">{title}</h3>
            <Swiper
              autoplay={{delay: 3000}}
              modules={[Autoplay]}
              slidesPerView={4}
              ref={swiperRef}
              spaceBetween = {40}
            //   onSlideChange={() => console.log('slide change')}
              onSwiper={(swiper) => console.log('swiper loaded')}
              className='h-full'
             
        >
            {
                games.map((game) => (
                    <SwiperSlide key = {game.id}>
                    <div className = 'cursor-pointer group'>
                        <div className = 'w-full h-80 overflow-hidden rounded-2xl relative after:h-full after:absolute after:inset-0 after:w-0 after:bg-rose-400/60 hover:after:w-full after:duration-200'>
                         <Image alt ={ game.name} src = {game.background_image} fill className = 'object-cover group-hover:scale-125 group-hover:rotate-60 duration-200' />
                        </div>
                        <h1 className = 'text-base text-white font-semibold mt-2 line-clamp-1'>{game.name}</h1>
                     </div>
                     <div className="absolute top-4 left-4 cursor-pointer bg-rose-400 rounded-full text-gray-50">
                        <AddToWhichList id={game.id.toString()} plus/>
                     </div>
                     </SwiperSlide>
                ))
            }

        </Swiper>
     
        </div>

    )
}