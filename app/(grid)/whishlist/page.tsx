"use client"

import GridContainer from '@/components/defaults/GridContainer'
import GameSkelton from '@/components/GameSkelton'
import WhishlistGameCard from '@/components/WhishlistGameCard'
import { useWhishListContext } from '@/contexts/whichlistContext'
import { useGetWhishlistgames } from '@/lib/queryFunctions'
import React from 'react'

const page = () => {
    const context = useWhishListContext()
    const {games,isLoading} = useGetWhishlistgames(context.whishListLocal)
    console.log(games)
    console.log(context.whishListLocal)
    return (
   <div className=" w-[100%] mt-8 space-y-8 col-span-full">
     <h1 className="text-4xl font-bold text-center text-gray-50">My Whishlist</h1>
     <div className=' w-full grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4'>
        {
          isLoading? Array.from({length:context.whishListLocal.length}).map((_,idx) => <GameSkelton key={idx} />) : games?.map((game,idx) => <WhishlistGameCard whishlist key = {idx} gameData={game} />)
        }
    </div>
   </div>
  )
}

export default page