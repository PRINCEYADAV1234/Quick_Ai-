import React from 'react'

function CreationItem({item}) {
  return (
    <div className='p-4 max-w-5xl text-sm bg-white border border-green-200 rounded-lg cursor-pointer'>
        
        <div className='flex justify-between items-center gap-4'>
            <div>
                <h2>
                    {item.prompt}
                    <p className='text-gray-500'>{item.type} - {new Date (item.cratedAt).toLocaleDateString()}</p>
                </h2>
            </div>

            <button className='bg-[#EFF6FF] border border-[#BFDBFE] text-[#1E40AF] px-4 py-1 rounded-full'>

                {item.type}
            </button>

        </div>
    </div>
  )
}

export default CreationItem
