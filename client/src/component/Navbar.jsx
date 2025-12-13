import React from 'react'
import { assets } from '../assets/assets'
import { useNavigate } from 'react-router-dom'
import { ArrowRight } from "lucide-react";
import {useClerk, UserButton,useUser} from '@clerk/clerk-react'

const Navbar = () => {
  const navigate = useNavigate()
  const {user} = useUser()
  const {openSignIn} = useClerk()

  return (
      <div className='bg-gradient-to-r from-gray-50 to-blue-100 bg-gradient-to-r from-violet-200 to-pink-200] bg-cover z-5 w-full flex justify-between items-center py-3 px-4 sm:px-20 xl:px-32 cursor-pointer'>
      <img src={assets.logo} alt="logo" className='sm:w-44 cursor-pointer ' onClick={()=> navigate('/')}/>
{
  user ?
  <UserButton /> : 
     ( <button onClick={openSignIn} className='flex items-center gap-2 rounded-full text-sm cursor-pointer bg-primary text-white px-10 py-2.5'>Get Started <ArrowRight className ='w-4 h-4'/></button>
     )
}
    </div>
  )
}

export default Navbar