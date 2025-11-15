import React from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import { Eraser, FileText, Hash, House, Menu, Scissors, SquarePen, User, X, Image as ImageIcon } from 'lucide-react';
import { useState } from 'react';
import { useUser,SignIn } from '@clerk/clerk-react';
import Sidebar from '../component/Sidebar'; 


export default function Layout() {
  const navigate = useNavigate()
  const [sidebar , setSidebar] = useState(false);
  const {user} = useUser();

  const navItems = [
    {to:'/ai', label: 'Dashboard' , Icon:House},
    {to:'/ai/write-article', label: 'Write Article' , Icon:SquarePen},
    {to:'/ai/blog-titles', label: 'Blog Title' , Icon:Hash},
    {to:'/ai/generate-image', label: 'Generate Image' , Icon:ImageIcon},
    {to:'/ai/remove-background', label: 'Remove Background' , Icon:Eraser},
    {to:'/ai/remove-object', label: 'Remove Object' , Icon:Scissors},
    {to:'/ai/review-resume', label: 'Review Resume' , Icon:FileText}
  ]

  return  user ?(
    <div className='flex flex-col items-start justify-start h-screen'>
      <nav className='w-full px-8 min-h-14 flex items-center justify-between border-b border-grey-200'>
        <img src={assets.logo} alt="" onClick={()=> navigate('/')} />
        {
          sidebar ? <X onClick= {()=>setSidebar(false)} className='w-6 h-6 text-gray-600 sm:hidden' /> :
          <Menu onClick= {()=>setSidebar(true)} className='w-6 h-6 text-gray-600 sm:hidden'/>

        }
      </nav>
        <div className='flex flex-row w-full h-[calc(100vh-64px)]'>
        <Sidebar sidebar={sidebar} setSidebar = {setSidebar} navItems={navItems} />
          <div className='flex-1 bg-[#F4F7F8]'>
      <Outlet />
          </div>
        </div>
    </div>
  ) : <div className='flex items-center justify-center h-screen'>
    <SignIn />
  </div>
}