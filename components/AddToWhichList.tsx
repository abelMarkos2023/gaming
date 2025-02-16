"use client"
import {useWhishListContext, WhishListProvider} from "@/contexts/whichlistContext"
import { PlusCircle, XCircle } from "lucide-react"
import React from 'react'
import { Button } from "./ui/button"
const AddToWhichList = ({plus,id}:{id: string,plus?:boolean}) => {
    const {handleAddtoWhishList,whishListLocal} = useWhishListContext()

    const isInWhishlist = whishListLocal.includes(id)
  return (
    <>
      {
        plus ?(
          isInWhishlist ? <XCircle onClick={() => handleAddtoWhishList(id)}/> : <PlusCircle onClick={() => handleAddtoWhishList(id)}/>
        ) : (<Button onClick={() => handleAddtoWhishList(id)}>addtoWhishlist</Button>) 
      }
    </>
  )
  
 
}

export default AddToWhichList