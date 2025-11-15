import React from "react";

const CTA = () => {
  return (
    <div className="w-full px-4 sm:px-12 py-12">
      <div className="bg-gray-100 rounded-3xl p-10 sm:p-16 flex flex-col sm:flex-row items-center justify-between gap-10 relative overflow-hidden">

        {/* Left Section */}
        <div className="max-w-xl">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900">
            Try it for free
          </h1>

          <p className="mt-4 text-gray-600 text-lg leading-relaxed">
            Clarity gives you the blocks & components you need to create a 
            truly professional website, landing page or admin panel for your SaaS.
          </p>

          {/* Buttons */}
          <div className="flex gap-4 mt-8 flex-wrap">
            <button className="
              bg-blue-600 text-white px-7 py-3 rounded-full font-medium
              hover:bg-blue-700 transition-all
              shadow-[0_4px_0_0_#1d4ed8]
            ">
              Start Building for Free
            </button>

            <button className="
              bg-white text-gray-800 px-7 py-3 rounded-full font-medium
              border border-gray-300 hover:bg-gray-50 transition-all
            ">
              Explore All Blocks
            </button>
          </div>
        </div>

        {/* Right Section Image */}
        <div className="relative">
          <img
            src="https://images.unsplash.com/photo-1595152772835-219674b2a8a6"
            alt="User"
            className="w-60 sm:w-72 rounded-2xl object-cover"
          />

          {/* Speech Bubble */}
          <div className="
            absolute -top-4 left-12 sm:left-16 
            bg-white px-4 py-2 rounded-xl shadow-md text-sm font-medium
          ">
            Hey, it's free for you!
          </div>

          {/* Background Curves */}
          <div className="absolute -z-10 right-0 top-0 w-72 h-72 opacity-40">
            <svg viewBox="0 0 200 200" fill="none" className="w-full h-full">
              <path d="M10 100 Q 80 20, 160 100" stroke="#9ca3af" strokeWidth="4" />
              <path d="M40 130 Q 110 50, 180 130" stroke="#cbd5e1" strokeWidth="4" />
            </svg>
          </div>
        </div>

      </div>
    </div>
  );
};

export default CTA;
