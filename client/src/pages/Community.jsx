// import React, { useState, useEffect } from 'react'
// import { dummyPublishedCreationData } from "../assets/assets";
// import { Heart } from 'lucide-react';
// import { useUser } from "@clerk/clerk-react";

// export default function Community() {
//   const [creation, setCreation] = useState([]);
//   const { user } = useUser();

//   const fetchCreation = async () => {
//     setCreation(dummyPublishedCreationData);
//   };

//   useEffect(() => {
//     fetchCreation();
//   }, []);

//   const toggleLike = (index) => {
//     if (!user) return;
//     const updated = [...creation];
//     const item = updated[index];

//     if (item.likes.includes(user.id)) {
//       item.likes = item.likes.filter(id => id !== user.id);
//     } else {
//       item.likes.push(user.id);
//     }

//     setCreation(updated);
//   };

//   return (
//     <div className='flex-1 h-full flex flex-col gap-4 p-6'>
//       <h2 className='text-xl font-semibold'>Creations</h2>
//       <div className='bg-white h-full w-full rounded-xl overflow-y-scroll p-4 grid sm:grid-cols-2 lg:grid-cols-3 gap-4'>
//         {creation.map((creation, index) => (
//           <div key={index} className='relative group'>
//             <img src={creation.content} alt="" className='w-full h-64 object-cover rounded-lg' />
//             <div className='absolute inset-0 flex justify-between items-end p-3 bg-gradient-to-b from-transparent to-black/80 opacity-0 group-hover:opacity-100 transition'>
//               <p className='text-sm text-white'>{creation.prompt}</p>
//               <div className='flex items-center gap-1 text-white'>
//                 <p>{creation.likes.length}</p>
//                 <Heart
//                   onClick={() => toggleLike(index)}
//                   className={`h-5 w-5 hover:scale-110 cursor-pointer ${
//                     creation.likes.includes(user?.id)
//                       ? 'fill-red-500 text-red-600'
//                       : 'text-white'
//                   }`}
//                 />
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }
