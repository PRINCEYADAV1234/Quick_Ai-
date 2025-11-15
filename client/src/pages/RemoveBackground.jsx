import { Eraser, Sparkles } from 'lucide-react'
import React, { useState } from 'react'
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export default function RemoveBackground() {
  
  const [input, setInput] = useState('')
   const [loading, setLoading] = useState(false);
    const [content, setContent] = useState("");
    const { getToken } = useAuth();
  const onSubmitHandler = async (e)=>{
    e.preventDefault();

    try{
      setLoading(true);

      const formData = new FormData()
      formData.append('image', input)

      const { data } = await axios.post(
        "/api/ai/remove-image-background",formData,
        { headers: { Authorization: `Bearer ${await getToken()}` } }
      );

      if (data.success) {
        setContent(data.content || data.image || "");
        toast.success("Background removed successfully!");
      } else {
        toast.error(data.message || "Failed to remove background");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message)
    } finally {
      setLoading(false)
    }
    }
  return (
        <div className='h-full overflow-y-scroll p-6 pb-60 flex items-start justify-between gap-6 text-slate-700'>
      <form onSubmit={onSubmitHandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className='flex items-center gap-3'>
        <Sparkles className ="w-6 text-[#FF4938]" />

      <h1 className='text-xl font-semibold'>Background Remove</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={(e)=>setInput(e.target.files[0])} type="file" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 ' placeholder=' Upload Your Image that you want to remove background ' required />

        <p className='mt-2 text-gray-500 text-sm font-light'>
           Supports JPG, PNG, and other image formats
        </p>


        <button type="submit" disabled={loading} className='w-full flex justify-center items-center gap-2  bg-gradient-to-r from-[#FF4938] to-[#FF4938] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>

              {
                loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : (
                  <Eraser className='w-5' />
                )
              } 

          Remove Background
        </button>
        </form> 

    {/* right side */}
    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
      <div className='flex items-center gap-3'>
      <Eraser className='w-5 h-5 text-[#FF4938]'/>
      <h1 className='text-xl font-semibold'>
        Processed Image
      </h1>
      </div>
              {
                !content ? (
      <div className='flex-1 flex justify-center items-center'> 
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
      <Eraser className='w-9 h-9'/>
      <p>Upload an image and click "Remove Background" to get started</p>
      </div>
      </div> ) : 
          ( <img
              src={content}
              alt="Generated"
              className="w-full h-full mt-3"
            />)
              }
    </div>

    </div>
  )
}
