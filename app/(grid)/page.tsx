import Hero from "@/components/Hero";
import Image from "next/image";
import {getGamesByIds, searchGames} from "@/app/api/api";
import GameCard from "@/components/GameCard"

import type {Game} from '@/types'

export default async function Home() {

  const {data} = await searchGames("",1,[],9);
  const ps5 = await searchGames("",2,[
    {
      filterName:"platform",
      option:"187"
    },{
      filterName:"ordering",
      option:"-metacritic"
    }
  ],8);
  const pc = await searchGames("",2,[
    {
      filterName:"platform",
      option:"4"
    }
  ],8);
const customeGames =await getGamesByIds(["799265","58550","2462","494384","452642",'452634'])

  return (
   <section className="w-full">
    <Hero />
    <div className = 'mt-12 flex flex-col gap-8'>
    
        <GameCard games = {data.results} title = "top game" />
        <GameCard games = {ps5.data.results} title = "top Playstations game" />
        <GameCard games = {pc.data.results} title = "top PC game" />
        <GameCard games = {customeGames.map(game => game.data)} title = "playstation execlusive" />

    </div>
   </section>
  );
}
