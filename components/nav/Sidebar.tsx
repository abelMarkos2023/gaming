"use client"
import React from 'react'
import { BiCategory, BiHeart, BiHome } from 'react-icons/bi';
import { BsPeopleFill } from 'react-icons/bs';
import NavLink from './NavLink';
import { CgGames } from 'react-icons/cg';
import Logo from '../defaults/Logo';
import { useGetUser } from '@/lib/queryFunctions';
import { Settings } from 'lucide-react';
import { Button } from '../ui/button';
import { logout } from '@/actions/auth';
import { toast } from 'react-toastify';
import { useQueryClient } from '@tanstack/react-query';

const Sidebar = () => {

    const {user,isLoading} = useGetUser()
    const queryClient = useQueryClient()
    const NAV_LINKS = [
        {
          id: 1,
        label: 'Home',
        link: '/',
        icon: <BiHome />
        },
        {
            id: 2,
            label: 'Categories',
            link: '/categories',
            icon: <BiCategory />
        },
        {
            id  : 5,
            label: 'Games',
            link: '/games',
            icon: <CgGames />
        },
        {
            id: 3,
            label: 'Whishlist',
            link: '/whishlist',
            icon: <BiHeart />
        },
        {
            id: 4,
            label: 'Friends',
            link: '/friends',
            icon: <BsPeopleFill />
        },
        
];

const handleLoggout = async() => {
    const res = await logout()

    if(res.success){
        toast.success('Logged out successfully')
        queryClient.invalidateQueries({queryKey:['user']})
    }else{
        toast.error("logging out failed")
    }
}
  return (
    <div className='py-6 px-4 w-full flex flex-col items-start gap-3 bg-black/30 h-screen sticky inset-0 p-2'>
        <Logo />
        {
            NAV_LINKS.map(link => <NavLink key={link.id} navLink={link} />)
        }

        {
            user?.user ? (
                <div className='mt-auto mb-8 space-y-4'>
                    <NavLink 
                    navLink={
                        {
                            id: 4,
                            label: 'Settings',
                            link: '/settings',
                            icon: <Settings />
                        }
                    }
                    />
                    <Button variant="destructive" size="lg" onClick = {handleLoggout}>Logout</Button>
                </div>
            ) : null
        }
    </div>
  )
}

export default Sidebar