"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {motion} from 'framer-motion'
import {toast} from 'react-toastify'
import { useRouter } from 'next/navigation';
import FileUploadInput from "@/components/FileUpload"

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
import {signup} from '@/actions/auth'
import FormFieldInput from "./FormField"
import Link from 'next/link'


const signupSchema = z.object({
  username: z.string().min(3),
  avatar: z.any(),
  email: z.string().email(),
  password: z.string().min(8),
  confirmPassword: z.string().min(8)
}).refine(data => data.confirmPassword === data.password , {
    message: 'Password don\'t match',
    path:['confirmPassword']
})


export function Signup() {
  const router = useRouter();
  const form = useForm<z.infer<typeof signupSchema>>({
    resolver: zodResolver(signupSchema
      ),
      defaultValues: {
        username:'',
        avatar:'',
        email: '',
        password: '',
        confirmPassword: ''
      }
   
  })
  const onSubmit = async (data: z.infer<typeof signupSchema>) => {

   
    if(data.avatar){
      const formData = new FormData();
      formData.append('file',data.avatar[0]);
      formData.append('upload_preset','ml_default');
  //  Iterate over FormData entries
  // formData.forEach((value, key) => {
  //   console.log(key, value);
  // });
  
  // Use the proper URL scheme (https://)
const response = await fetch(`https://api.cloudinary.com/v1_1/${process.env.NEXT_PUBLIC_CLOUD_NAME}/image/upload`, {
  method: 'POST',
  body: formData
})

const imageData = await response.json();

  data.avatar = {
    secure_url: imageData.secure_url,
    public_id: imageData.public_id
  }      

  console.log(data)
  
  const signupRes = await signup(data)

  if(signupRes.success){
    toast.success('User Created Successfuly')
    console.log(signupRes)
    router.push('/login')
  }else{
    toast.error(signupRes.message)
  }
    
   
  }
}
  // ...

  return (
    <motion.div 
    initial = {{y: 400,opacity: 0}}
    animate = {{y: 0,opacity: 1, transition:{duration: 3}}}
    className = "bg-black/70 text-white w-[35rem] rounded-xl p-4">
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col gap-8">
        <FileUploadInput name = 'avatar' />
       <FormFieldInput 
                type="text" 
                label="User Name" 
                name="username" />
        <FormFieldInput 
                type="email" 
                label="Email" 
                name="email" />
       <FormFieldInput 
                type="password" 
                label="Password" 
                name="password" />
       <FormFieldInput 
                type="password" 
                label="Confirm Password" 
                name="confirmPassword" />
        <Button type="submit" className = 'py-2 px-6 rounded-lg shadow-lg cursor-pointer bg-rose-500 text-gray-100 hover:bg-rose-600 transition duration-200'>Submit</Button>
        <p className = 'text-lg font-semibold text-gray-50 text-center'>
          Already Have an account? <Link className = 'text-rose-500 font-bold hover:text-rose-300 duration-200 ' href = '/login'>Signin</Link>
        </p>
      </form>
    </Form>
    </motion.div>
  )
}
