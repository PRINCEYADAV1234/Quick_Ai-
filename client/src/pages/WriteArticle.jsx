import React, { useState } from 'react'
import { Edit, Sparkles } from "lucide-react";
import axios from 'axios'
import { useAuth } from '@clerk/clerk-react';
import toast from 'react-hot-toast';
import Markdown from 'react-markdown'
axios.defaults.baseURL = import.meta.env.VITE_BASE_URL;


export default function WriteArticle() {
 const articleLength = [
  {length:800, text:'Short(500-800 words)'},
  {length:1200, text:'Medium(800-1200 words)'},
  {length:1600, text:'Long(1200+ words)'}
 ]

 const [selectedLength, setSelectedLength] = useState(articleLength[0])
 const[input,setInput] = useState('')
 const [loading, setLoading] = useState(false) 
 const [content, setContent] = useState('')
 const{ getToken} = useAuth()
 

 // Test server connection on component mount
 React.useEffect(() => {
   const testConnection = async () => {
     const baseURL = import.meta.env.VITE_BASE_URL;
     if (baseURL) {
       try {
         const response = await axios.get('/health');
         console.log(' Server connection test successful:', response.data);
       } catch (error) {
         console.error(' Server connection test failed:', error);
         console.error('Make sure server is running on:', baseURL);
       }
     } else {
       console.warn(' VITE_BASE_URL is not set in .env file');
     }
   };
   testConnection();
 }, [])

 const onSubmithandler = async(e) =>{
  e.preventDefault();
  try{
    setLoading(true)
    
    // Check if base URL is configured
    const baseURL = import.meta.env.VITE_BASE_URL;
    if (!baseURL) {
      toast.error('Server URL is not configured. Please check your .env file in client folder.');
      console.error('VITE_BASE_URL is missing. Expected format: VITE_BASE_URL=http://localhost:5000');
      setLoading(false)
      return;
    }

    // Log the base URL for debugging (remove in production)
    console.log('Base URL:', baseURL);
    console.log('Full API URL:', `${baseURL}/api/ai/generate-article`);

    const prompt = `write an article about ${input} in ${selectedLength.text}`
    const {data} = await axios.post('/api/ai/generate-article', {prompt, length:selectedLength.length},{
      headers:{Authorization: `Bearer ${await getToken()}`}
    })
    if(data.success){
      setContent(data.content)
      toast.success('Article generated successfully!')
    }
    else{
      toast.error(data.message || 'Failed to generate article')
    }
  }
  catch(error){
    console.error('Error generating article:', error);
    console.error('Error details:', {
      code: error.code,
      message: error.message,
      response: error.response?.data,
      request: error.request,
      baseURL: import.meta.env.VITE_BASE_URL
    });
    
    // Handle different types of errors
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      const baseURL = import.meta.env.VITE_BASE_URL;
      toast.error(`Network Error: Cannot connect to server at ${baseURL || 'undefined'}. Please check:
1. Server is running on port 5000
2. VITE_BASE_URL is set correctly in .env file
3. No firewall blocking the connection`);
      console.error('Troubleshooting steps:');
      console.error('1. Check if server is running: cd server && npm start');
      console.error('2. Check VITE_BASE_URL in client/.env file');
      console.error('3. Verify server is accessible at:', baseURL);
    } else if (error.response) {
      // Server responded with error status
      toast.error(error.response.data?.message || `Server Error: ${error.response.status}`);
    } else if (error.request) {
      // Request was made but no response received
      toast.error('No response from server. Please check your connection and server status.');
      console.error('Server is not responding. Check if server is running.');
    } else {
      // Something else happened
      toast.error(error.message || 'An unexpected error occurred');
    }
  }
  finally{
    setLoading(false)
  }
 }
  return (
    <div className='h-full overflow-y-scroll p-6 pb-60 flex items-start justify-between gap-6 text-slate-700'>
      <form onSubmit={onSubmithandler} className="w-full max-w-lg p-4 bg-white rounded-lg border border-gray-200">
        <div className='flex items-center gap-3'>
        <Sparkles className ="w-6 text-[#4A7AFF]" />

      <h1 className='text-xl font-semibold'>Article Configuration</h1>
        </div>
        <p className='mt-6 text-sm font-medium'>Article Topic</p>
        <input onChange={(e)=>setInput(e.target.value)} value={input} type="text" className='w-full p-2 px-3 mt-2 outline-none text-sm rounded-md border border-gray-300 ' placeholder=' The future of artificial Intelligence is ...' required />

        <p className='mt-4 text-sm font-medium'>
            Article Length
        </p>


        <div className='mt-3 flex gap-3 flex-wrap sm:max-w-9/11'>
          {articleLength.map((item,index)=>(<span  onClick={()=>setSelectedLength(item)} className={`text-xs px-4 py-1 border rounded-full cursor-pointer ${selectedLength.text === item.text ? 'bg-blue-50 text-blue-700' : 'text-gray-500 border-gray-300' }`}  key={index}>
            {item.text}
          </span>))}
        </div>

        <br />
        <button disabled={loading} className='w-full flex justify-center items-center gap-2  bg-gradient-to-r from-[#2268FF] to-[#65ADFF] text-white px-4 py-2 mt-6 text-sm rounded-lg cursor-pointer '>
          {
            loading ? <span className='w-4 h-4 my-1 rounded-full border-2 border-t-transparent animate-spin'></span> : <Edit className='w-5'/>
          }
          Generate Article
        </button>
        </form> 

    {/* right side */}
    <div className='w-full max-w-lg p-4 bg-white rounded-lg flex flex-col border border-gray-200 min-h-96 max-h-[600px]'>
      <div className='flex items-center gap-3'>
      <Edit className='w-5 h-5 text-[#4A7AFF]'/>
      <h1 className='text-xl font-semibold'>
        Generate Article
      </h1>
      </div>
    {!content ? (
      <div className='flex-1 flex justify-center items-center'> 
      <div className='text-sm flex flex-col items-center gap-5 text-gray-400'>
      <Edit className='w-9 h-9'/>
      <p>Enter a Topic and click "Generate article" to get started </p>
      </div>
      </div>
    ) : (
      <div className='mt-3 h-full overflow-y-scroll text-sm text-slate-600'>
        <div className='reset-tw'>
        <Markdown>
          {content}
          </Markdown>
          </div>
      </div>
    )}
    </div>
    </div>
  )
}
