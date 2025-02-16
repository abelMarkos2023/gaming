"use client"

import { useGetGames } from '@/lib/queryFunctions';
import React, { useState } from 'react'
import GameCard from './GameCard';
import GameSkelton from './GameSkelton';
import WhishlistGameCard from './WhishlistGameCard';
import CustomPagination from './CustomPagination';

const Filter = ({genres}:{genres:any}) => {
    const [page,setPage] = useState(1)
    const [active,setActive] = useState<any>([]);
    const {games,isLoading} = useGetGames({
        page,
        pageSize: 12,
    
        filters:active.length === 0 ? [] :[{filterName:"genres",option: active.join(',')}]
    });
    const totalPages = Math.ceil(games?.data?.count / 12);
    console.log(games)

    const handdleClick = (id:any) => {
        if(active.includes(id)){
            setActive(active.filter((activeId:any) => activeId !== id));
            setPage(1);
        }else{
            setActive([...active,id]);
            setPage(1);
        }
    }
  return (
    // <div className='relative w-full'>
    <>
         <div className="inset-0 col-span-full lg:h-screen lg:sticky lg:col-span-2">
    <div className=" flex flex-row flex-wrap gap-4 lg:flex-col bg-[#333839] shadow-xl text-slate-50 p-4 rounded-xl">
      {
        genres.map((genre: any) => (
          <button className={`px-3 py-2 rounded-xl cursor-pointer hover:bg-rose-400 hover:text-white ${active.includes(genre.id) ? 'bg-rose-400 text-white' : ''}`} key={genre.id} onClick={() => handdleClick(genre.id)}>
            {genre.name}
          </button>
        ))
      }
    </div>
  </div>
  <div className="col-span-full lg:col-span-10">
    {
       isLoading? Array.from({length:20}).map((_,idx) => <GameSkelton key={idx} />) : games?.data?.results.length === 0 ? <p className="text-center text-gray-300 text-4xl mt-8">No games found</p>:(
            <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4">
            {
              games?.data?.results.map((game: any) => (
                <WhishlistGameCard whishlist key = {game.id} gameData={game} />
              ))
            }
          </div>
        )
  
    }
    
  </div>
 <div className="col-span-full mt-4 flex justify-center">
 <CustomPagination page = {page} setPage = {setPage} count = {totalPages} />
 </div>
  </>
    // </div>
  )
}

export default Filter