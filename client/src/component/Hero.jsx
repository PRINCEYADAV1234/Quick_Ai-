import React from 'react'
import { useNavigate } from 'react-router-dom'
import { assets } from '../assets/assets'
import {useTypewriter,Cursor} from 'react-simple-typewriter'


function Hero() {
    const navigate = useNavigate()
    const [typeEffect] = useTypewriter({
      words : ['Generate Image',' Generate Blog', 'Generate Title', 'Remove Object', 'Remove Background', 'Analyze Resume'],
      loop:{},
      typeSpeed:100,
      deleteSpeed: 40

    })
  return (
    <div className='px-4 sm:px-20 xl:px-32 relative inline-flex flex-col w-full justify-center bg-gradient-to-r from-gray-50 to-blue-100 bg-gradient-to-r from-violet-200 to-pink-200] bg-cover bg-no-repeat min-h-screen'>

      <div className="flex items-center justify-center m-2 gap-2 p-1 pr-3 text-sm text-slate-500">
            <span className="text-indigo-600 border font-semibold border-indigo-200 rounded-full px-3 py-1">What's new?</span>
            <a href="#" className="flex items-center gap-1 px-1">
                Just released v4.3.1
                <svg className="mt-0.5" width="6" height="9" viewBox="0 0 6 9" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="m1 1 4 3.5L1 8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
            </a>
        </div>
      <div className='text-center mb-6'>
        <h1 className='text-3xl sm:text-5xl md:text-6xl 2xl:text-7xl font-medium mx-auto leading-[1.2]'>Boring Work made with <br /> AI tools  <span className='text-primary'>
            {typeEffect}
            </span>
            </h1>
        <p className='mt-4 max-w-xs sm:max-w-lg 2xl:max-w-xl m-auto max-sm:text-xs text-grey-600'>Tranform your content creation with our suite of premium AI tools. Write articles, generate images , and enhance your workflow</p>


      </div>

      <div className='flex flex-wrap justify-center gap-4 text-sm max-sm:text-x5'>
        <button onClick={()=> navigate('/ai')} className='bg-primary text-white px-10 py-3 rounded-lg hover:scale-102 active:scale-95 transition curson-pointer'>
            Start Creating now 
        </button>
        <button className='bg-white px-10 py-3 rounded-lg border border-gray-300 hover:scale-102 active:scale-95 transition cursor pointer'>
            Watch Demo
        </button>
      </div>

    </div>
  )
}

export default Hero
