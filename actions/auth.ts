"use server"

import User from "@/models/User";
import connect from "./connet"
import bcrypt from 'bcrypt'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { cookies } from "next/headers";

function isJwtPayload(decoded: string | JwtPayload): decoded is JwtPayload {
    return typeof decoded !== 'string' && 'id' in decoded && 'iat' in decoded && 'exp' in decoded;
}


const generateToken = async(id:any) => {
    return await jwt.sign({id},process.env.JWT_SECRET!!,{
        expiresIn:"2d"
    })
}

export const protect = async() => {
    const cookieStore = await cookies();
    
    const token = cookieStore.get('token')?.value;
    if(!token) return {success:false,message:"Your'e Not Authorized To Perform This Action"};

    let decoded : JwtPayload | string;

    try {
        decoded = await jwt.verify(token,process.env.JWT_SECRET!!);
        if (!decoded) return {success:false,message:"Your'e Not Authorized To Perform This Action"};
        console.log('decoded',decoded)
        if (!isJwtPayload(decoded)) {
            return { success: false, message: "You're Not Authorized To Perform This Action" };
        }

        return {decoded}
       

    } catch (error:any) {
        console.log("User is Not Authenticated")
        return {success: false,message:"User Failed to Authenticate",error}
    }


}

export const getUser = async() => {

    const {decoded} = await protect()
    try {
        const user = await User.findById((decoded as any).id)

        if(!user) return {success:false,message:"Your'e Not Authorized To Perform This Action"};
        const userObj = JSON.parse(JSON.stringify(user))


        return {success:true,user: userObj}
    } catch (error:any) {
        console.log(error.message)
        console.log("Getting user failed")
        return {success: false,error}
    }

}
export const signup = async (data: any) => {
    try {
        await connect();

        const hashedPass = await bcrypt.hash(data.password,12);
        const user = await User.create({...data,password:hashedPass});
        const userObj = JSON.parse(JSON.stringify(user));
        return {success:true,message:"User Created Successfully",userObj}

    } catch (error:any) {
        console.log('User Creation Failed')
        return {success:false,message:error.message,error}
    }
}
export const signin = async(data:{email:string,password:string}) => {
    try {
        await connect()
        const user = await User.findOne({email:data.email});

        if(!user){
            throw new Error("Invalid Email Or Password No Email")
        }
        const isMatch = await bcrypt.compare(data.password,user.password)
        if(!isMatch){
            console.log(isMatch)
            throw new Error("Invalid Email Or Password No Password")
        }

        const userObj = JSON.parse(JSON.stringify(user));

        const token = await generateToken(user._id);
        const cookieStore = await cookies();

        cookieStore.set('token',token,{
            httpOnly: true,
            maxAge: 2 * 24 * 60 * 60 *1000,
            path:'/',
            sameSite:'strict'

        })
        return {
            success: true,
            message: "User LogedIn Successfully",
            user: userObj
        }
    } catch (error: any) {
        console.log(error.message);
        return {
            success: false,
            message: "User LoggingIn Failed",
            error
        }
        
    }
}

export const logout = async() => {
    const cookieStore = await cookies();

try {
    cookieStore.delete('token')
    return {
        success:true,
        message: "User Loggedout Successfully"
    }
} catch (error) {
    console.log(error)
    return {
        success:false,
        message: "User Loggedout Failed"
    }
}    
}