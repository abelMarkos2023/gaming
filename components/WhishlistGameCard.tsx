"use client"
import type { Game } from '@/types'
import React from 'react'
import { HoverCard } from './ui/hover-card'
import { HoverCardContent, HoverCardTrigger } from '@radix-ui/react-hover-card'
import Image from 'next/image'
import Link from 'next/link'
import { FaPlaystation, FaSteam, FaXbox } from 'react-icons/fa6'
import AddToWhichList from './AddToWhichList'
import ImageSitcher from './ImageSwitcher'
import ImageSwitcher from './ImageSwitcher'

const WhishlistGameCard = ({gameData,whishlist}:{gameData: any,whishlist?: boolean}) => {
    const {data} = gameData
    const game = data  || gameData
   

return (
    <div className="w-full bg-rose-400 rounded-xl shadow-xl">
<HoverCard>
<div  className= "relative w-full flex flex-col items-start gap-4">
    <HoverCardTrigger asChild className='relative w-full'>
        <div>
            <div className="flex flex-col gap-3">
                <div className="w-full max-w-full h-64 overflow-hidden rounded-xl relative">
                    <Image src={game?.background_image} className='' fill alt={game?.name} />
                </div>
               <div className="p-2">
               <Link href={`/game/${game?.id}`} className='text-white font-semibold line-clamp-1'>
                {game?.name}
                </Link>
                <div className="mt-2 flex items-center gap-2">
                    {
                        game?.parent_platforms.map((platform:any) => (
                            <p key={platform?.platform.id}>
                                {
                                    platform.platform.slug === 'pc' ? <FaSteam />:platform.platform.slug.includes('playstation') ? <FaPlaystation /> : platform.platform.slug.includes('xbox') ? <FaXbox /> : null
                                }
                            </p>
                        ))
                    }
                </div>
               </div>
            </div>
        </div>
    </HoverCardTrigger>
    {whishlist && (
        <div className="absolute top-2 left-2 coursor-pointer z-10 bg-rose-500 text-white rounded-full cursor-pointer">
            <AddToWhichList id={String(game?.id)} plus />
        </div>
    )}
</div>
<HoverCardContent className='bg-transparent border-none w-full h-full absolute -left-[120px] -top-[220px]' align='center'>
{
    gameData.screenshots && (
        <div className="w-full h-full">
            <ImageSwitcher game = {game} images = {whishlist ? gameData.screenshots.results : game.short_screenshots}/>
        </div>
    )
}


</HoverCardContent>
</HoverCard>
</div>
)
}

export default WhishlistGameCard