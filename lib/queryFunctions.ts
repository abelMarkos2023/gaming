"use client"

import { getUser } from "@/actions/auth"
import { getGame, getGamesByIds, searchGames } from "@/app/api/api"
import { useQuery } from "@tanstack/react-query"

export const useGetUser = () => {
    const {data: user,isLoading} = useQuery({
        queryKey: ['user'],
        queryFn: () => getUser()
    })

    return {user,isLoading}
}
export const useGetGame = (id:string) => {
    const {data: res,isLoading} = useQuery({
        queryKey: ['game', id],
        queryFn: () => getGame(id)
    })

    return {res,isLoading}
}
export const useGetWhishlistgames = (ids:string[]) => {
    const {data:games,isLoading} = useQuery({
        queryKey: ['games',ids],
        queryFn: () => getGamesByIds(ids)
    })
    return {games, isLoading}
}
export const useGetGames = (
    {query="",filters=[],page=1,pageSize=12,isDisabled=false}:
    {query?:string,page?:number,pageSize?:number,
    filters?:{filterName:string,option:string}[],
    isDisabled?:boolean
    }) => {
    const {data:games,isLoading} = useQuery({
        queryKey: [`games-${page}-${query}-${JSON.stringify(filters)}`],
        queryFn: async () => await searchGames(query,page,filters,pageSize),
        enabled: !isDisabled
    })

   
    return {games,isLoading}
}