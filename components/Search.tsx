import React, { useEffect, useRef, useState } from 'react'
import { Input } from './ui/input'
import { SearchIcon } from 'lucide-react'
import { useGetGames } from '@/lib/queryFunctions';
import { AnimatePresence,motion } from 'framer-motion';
import { Skeleton } from './ui/skeleton';
import Image from 'next/image';
import Link from 'next/link';

const Search = () => {
  const outsideRef = useRef(null)

  const [query,setQuery] = useState("");
  const [search,setSearch] = useState("")

  useEffect(()=>{
    const t = setTimeout(()=>{  

      setSearch(query)
    },1000)

    return () => clearTimeout(t);
  },[query])

  const handleClickOutside = (e) => {
    if (outsideRef.current &&!outsideRef.current.contains(e.target)) {
      setQuery("");
      setSearch("")
    }
  }
  useEffect(() => {
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, []);
  const {games,isLoading} = useGetGames({query:search,isDisabled:query === ''})
  console.log('search games',games)
  return (
    <div ref ={outsideRef} className='relative w-full md:w-[40%] bg-[#333839]  rounded-xl flex flex-col gap-2 items-center justify-between px-2 text-gray-100'>
        <div className="flex  flex-1 justify-between items-center w-full">
        <Input className='rounded-xl bg-transparent py-2 px-6 active:outline-none placeholder:text-gray-50 text-gray-100 outline-none border-none w-full focus:outline-none' placeholder='Search Games' value={query} onChange={(e) => setQuery(e.target.value)}/>
        <SearchIcon />
        </div>
        <AnimatePresence>
          {
            ((games?.data || isLoading)  && (search !== "")) && (
              <motion.div className={`w-full max-h-[40vh] overflow-y-scroll absolute left-0 z-50 top-full bg-gray-800`} initial ={{ height: 0 }} animate={{ height: 'auto' }}>
                {
                isLoading ? Array.from({length:3}).map((_,idx) => (
                  <div key={idx} className="flex space-y-3 items-start gap-3 px-4 py-2">
                    <Skeleton className='h-20 w-[40%] rounded-2xl'/>
                    <div className="flex flex-col gap-3">
                      <Skeleton className='w-[150px] h-4'/>
                    </div>
                  </div>
                )): games?.data?.results?.length > 0 ? games?.data?.results.map((game:any,idx:number) => (
                  <Link href={`/game/${game?.id}`} onClick={() => {
                    setQuery("")
                    setSearch("")
                  }} className="flex items-start px-4 py-2 gap-2" key={game?.id}>
                    <div className="relative rounded-2xl h-20 w-[40%]">
                      <Image className='rounded-2xl object-cover' fill src={game.background_image} alt={game.name}  />
                    </div>
                    <div className="flex flex-col gap-1">
                      <p className='text-xl font-semibold'>{game.name}</p>
                      <p className='text-xs'>{game.released}</p>
  
                  </div>
                  </Link>
                )) : (
                  <h3 className="text-2xl font-semibold">{`No results for ${search}`}</h3>
                )
              }
              </motion.div>
            )
          }
        </AnimatePresence>
    </div>
  )
}

export default Search