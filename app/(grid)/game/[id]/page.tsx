
'use client'

import { useGetGame } from '@/lib/queryFunctions'
import React,{useState,useEffect} from 'react'
import Image from 'next/image'

import { Swiper, SwiperSlide } from 'swiper/react'
// import SwiperCard from './SwiperCard'
import 'swiper/css'
import { Autoplay } from 'swiper/modules'
import type SwiperType from 'swiper'
import SwiperCard from '@/components/SwiperCard'
import WhishlistGameCard from '@/components/WhishlistGameCard'

const Page = ({
    params,
  }: {
    params: Promise<{ id: string }>
  }) => {

const [swiper, setSwiper] = useState<SwiperType | null>()
const [id,setId] = useState('')
const { res, isLoading } = useGetGame(id);

useEffect(() => {

async function getGameId() {
    const id = (await params).id
        setId(id)
    
}
getGameId()
},[])


console.log(res);

return (
<div>

{
isLoading ? (
    <div>Loading Game...</div>
) : (
    <div className='space-y-8'>
    <h1 className="text-3xl text-gray-100 font-semibold">{res?.data?.name}</h1>

    <div className = 'h-[24rem] my-6 rounded-2xl overflow-hidden space-y-4'>
    <Swiper
    autoplay={{delay: 3000}}
    modules={[Autoplay]}
    slidesPerView={1}
    onSwiper={(swiper) => setSwiper(swiper)}
    className='h-full'
    >
{
    res?.screenshots?.results?.map((slide: any) => (
                    <SwiperSlide key={slide.id}>
                            <div className="h-full w-full relative rounded-2xl">
                                <div className="absolute inset-0  h-full w-full ">
                                <Image alt={slide.id} src={slide.image} fill className='object-cover' />

                                </div>
                            </div>
                        </SwiperSlide>
                                 ))
}
    </Swiper>

  </div>
  <div className="flex items-center gap-4 w-full h-40 mt-6 cursor-pointer">

{
        res?.screenshots?.results?.map((slide: any,idx:number) =>(
            <div key={slide.id} 
            onClick = {() => swiper?.slideTo(idx)}
            className="relative  transition duration-200 rounded-lg z-10 w-full h-full  hover:-translate-y-12 overflow-x-hidden">
                <Image fill className = 'object-cover rounded-lg' alt = 'pagination image' src= {slide.image} />
            
            </div>
         ))
    }

  </div>

  <div className="space-y-8">
  <h1 className="text-4xl font-bold text-gray-50">Similar Games</h1>
     <div className=' w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {
           res?.similar?.results?.map((game:any,idx:number) => <WhishlistGameCard whishlist key = {idx} gameData={game} />)
        }
    </div>
  </div>
 </div>
)
}
</div>
);
};

export default Page;