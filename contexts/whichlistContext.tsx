"use client"
import {useContext,createContext, ReactNode, useEffect, useState} from 'react'
import {useLocalStorage} from "@/lib/useLocalStorage"
import { useGetUser } from '@/lib/queryFunctions';
import { toast } from 'react-toastify';
import { addToWhishlist, removeFromWhishlist } from '@/actions/games';


interface WhishListContextProps {
    handleAddtoWhishList : (gameId:string) => void;
    whishListLocal: string[]
}

type WhishListProviderProps = {
    children: ReactNode;
  };
  
const WhishListContext = createContext<WhishListContextProps | null>(null)

export const WhishListProvider = ({children}:WhishListProviderProps) => {

    const {user} = useGetUser()

    const [whishListLocal,setWhishListLocal] = useLocalStorage<string[]>('whishlist',user?.user ? [...user?.user.whishList]:[])


    const [mount,setMount] = useState(false)

    // const whishlist : string[] = user?.user ? user.user.whishList : whishListLocal



   useEffect(() => {
    setMount(true);
    if(user?.user){
        setWhishListLocal(user?.user.whishList)
    }
   },[])


    const handleAddtoWhishList = async (gameId:string) => {

        if(!mount) return null;
        
        const isInWhishList =  whishListLocal.some((whish:string) => whish === gameId)

       try {
        if(user?.user)
            {
            console.log(isInWhishList,user?.user.whishList)

          const res =   isInWhishList ? await removeFromWhishlist(gameId) : await addToWhishlist(gameId)
          console.log(res?.user)
          console.log(isInWhishList)
          if(res?.success)
             {
                toast.success(res.message);
                setWhishListLocal([...res?.user])
                console.log('setting up local storage',whishListLocal)
                

             }
             else
             { 
                toast.error(res.message);
             //  setWhishListLocal([...res?.user.whishList])

             }
        }
        else{
       
            isInWhishList ?  setWhishListLocal(prev  => prev.filter(whish => whish !== gameId)) : setWhishListLocal((prev) => [...prev,gameId])

      
    };
       } catch (error: any) {
        console.log(error?.message)
       }


}


return (
    <WhishListContext.Provider value = {{whishListLocal,handleAddtoWhishList}} >
         {children}
    </WhishListContext.Provider>
)
}

export const useWhishListContext = () => {
    const context = useContext(WhishListContext);

    if(!context)
    {
        throw new Error("Whichlist Context Must Be Used Within WhichListProvider");
        
    }
    return context;
}
