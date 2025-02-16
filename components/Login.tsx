"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useRouter } from 'next/navigation';
import { useForm } from "react-hook-form"
import { z } from "zod"
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import {signin} from "@/actions/auth"

import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { CgPassword } from "react-icons/cg"
import FormFieldInput from "./FormField"
import { redirect } from 'next/navigation';
import Link from 'next/link'
const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8)
})


export function Login() {

  const router = useRouter();
  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema
      ),
      defaultValues: {
        email: '',
        password: ''
      }
   
  })
  const onSubmit = async (data: z.infer<typeof loginSchema>) => {
    try{
     const signinRes = await signin(data);
     console.log(signinRes)
     if(signinRes.success){
      toast.success("Logging in was a success")
      console.log(signinRes);
      router.push('/')
     // window.location.href = '/'
     }
     else{
      throw new Error(signinRes.message)
     }
      
    }catch(error: any){
  console.log(error.message)
  toast.error("Logging in failed")
    }
  }
  // ...

  return (
    <motion.div 
    initial = {{y: 400,opacity: 0}}
    animate = {{y: 0,opacity: 1, transition:{duration: 3}}}
    className = "bg-black/70 text-white w-[30rem] rounded-xl p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
       <FormFieldInput 
                    type="email" 
                    label="Email" 
                    name="email" />
       <FormFieldInput 
                    type="password" 
                    label="Password" 
                    name="password" />
                    
        <Button type="submit" className = 'py-2 px-6 rounded-lg shadow-lg cursor-pointer bg-rose-500 text-gray-100 hover:bg-rose-600 transition duration-200'>Submit</Button>
        <p className = 'text-lg font-semibold text-gray-50 text-center'>
          Dont't Have an account? <Link className = 'text-rose-500 font-bold hover:text-rose-300 duration-200 ' href = '/register'>Signup</Link>
        </p>
      </form>
    </Form>
    </motion.div>
  )
}
