"use client"

import { useEffect, useState } from "react"
import { useGetUser } from "./queryFunctions"

export const useLocalStorage = <T>(key:string,initialValue:T) :[T,React.Dispatch<React.SetStateAction<T>>] => {

   

    // if(!mount){
    //     return null
    // }

    const [value,setValue] = useState(function(){
        const storedValue = global?.window?.localStorage.getItem(key)
        return storedValue ? JSON.parse(storedValue) : initialValue
    })

    useEffect(()=> {
        global?.window.localStorage.setItem(key,JSON.stringify(value))
    },[value,key])

    return [value,setValue]
}