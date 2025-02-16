"use server"

import User from "@/models/User";
import { protect } from "./auth"

export const removeFromWhishlist = async(id:string) => {
    const {decoded} = await protect();

    try {

        const user = await User.findById(decoded?.id);
        if(!user) return {success:false,message:"You are not logged in"}
        user.whishList = user?.whishList.filter((gameId:string) => gameId !== id);

        await user.save()
        return {success:true,message:"Game removed from Whishlist",user:user.whishList}

    } catch (error: any) {
        return {success:false,message:"Game didn't get removed to Whishlist"}


        console.log(error)
    }
}

export const addToWhishlist = async(id:string) => {
    const {decoded} = await protect();
    console.log(decoded)

    try {
        const user = await User.findById(decoded?.id);
        if(!user) return {success:false,message:"You are not logged in"}
         user.whishList = [...user?.whishList.filter((gameId:string) => gameId !== id),id];
       // user.whishList.push(id)
        await user.save()
        console.log(id,user)
        return {success:true,message:"Game Added to Whishlist",user:user.whishList}

    } catch (error: any) {
        console.log(error)

        return {success:false,message:"Game didn't added to Whishlist"}

    }
}