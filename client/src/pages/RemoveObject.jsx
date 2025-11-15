import React, { useState } from 'react'
import { Scissors, Sparkles } from 'lucide-react'
import axios from "axios";
import { useAuth } from "@clerk/clerk-react";
import toast from "react-hot-toast";

axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;




export default function RemoveObject() {
  const [input, setInput] = useState(null)
  const [object, setObject] = useState('')
  const [loading, setLoading] = useState(false);
  const [content, setContent] = useState('');
  const { getToken } = useAuth();
  
    const onSubmithandler =  async (e) => {
      e.preventDefault();
      try{
        setLoading(true);
  
          if(object.split(' ').length >1) {
            return toast("Please enter only one object name")
          }
  
        const formData = new FormData()
        formData.append('image', input)
        formData.append('object', object)
  
        const { data } = await axios.post(
          "/api/ai/remove-image-object",formData,
          { headers: { Authorization: `Bearer ${await getToken()}` } }
        );
  
        if (data.success) {
          setContent(data.content || data.image || "");
          toast.success("Object removed successfully!");
        } else {
          toast.error(data.message || "Failed to remove object");
        }
      } catch (error) {
        toast.error(error.response?.data?.message || error.message)
      } finally {
        setLoading(false)
      }
    }
  return (
            <div className='h-full overflow-y-scroll p-6 pb-60 flex items-start justify-between gap-6 text-slate-700'>
      <form onSubmit={onSubmithandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className='flex items-center gap-3'>
        <Sparkles className ="w-6 text-[#4A7AFF]" />

      <h1 className='text-xl font-semibold'>Object Removal</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Upload image</p>
        <input onChange={(e)=>setInput(e.target.files[0])} type="file" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 ' placeholder=' Upload Your Image that you want to remove background ' required />

        <p className='mt-6 text-sm font-medium'>Description</p>
        <textarea onChange={(e)=>setObject(e.target.value)} value={object} type="textarea" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 ' placeholder=' e.g., watch or spoon , Only single object name' rows={4} required />

        <button type="submit" disabled={loading} className='w-full flex justify-center items-center gap-2  bg-gradient-to-r from-[#4A7AFF] to-[#8E37EB] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>

          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : 
          <Scissors className='w-5' />
          }
          Remove Object
        </button>
        </form>  

    
    {/* right side */}
    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
      <div className='flex items-center gap-3'>
      <Scissors className='w-5 h-5 text-[#4A7AFF]'/>
      <h1 className='text-xl font-semibold'>
        Processed Image
      </h1>
      </div>

          {
            !content ? (
      <div className='flex-1 flex justify-center items-center'> 
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
      <Scissors className='w-9 h-9'/>
      <p>Upload an image and click "Remove Object" to get started</p>
      </div>
      </div>
            ) :
           (
            <img src={content} alt="image not show" className='mt-3 h-full w-full' />
           ) 
          }
    </div>

    </div>
  )
}
