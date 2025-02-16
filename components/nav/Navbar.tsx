"use client"

import React from 'react'
import Search from '../Search'
import Button from '../defaults/Button'
import { useGetUser } from '@/lib/queryFunctions'
import { Skeleton } from '../ui/skeleton'
import User from '../User'

const Navbar = () => {
  const {user,isLoading} = useGetUser();

  console.log(user);
  return (
    <div className='flex justify-between items-center pt-6'>
      <Search/>
      {
        isLoading ? <Skeleton /> : user?.user ? <User user={user?.user}/> : (
          <div className="flex items-center gap-2">
        <Button link='/login' label = 'Signin' />
        <Button link='/register' label='Signup' />
      </div>
        )
      }
      
    </div>
  )
}

export default Navbar