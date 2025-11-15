
import React from 'react';
import { LogOut } from "lucide-react";
import { NavLink } from 'react-router-dom';
import { useUser, useClerk, Protect} from '@clerk/clerk-react';

function Sidebar({ sidebar, setSidebar, navItems }) {
  const { user, isLoaded } = useUser();
  const { signOut, openUserProfile } = useClerk();

  if (!isLoaded || !user) {
    return <div>Loading...</div>;
  }
  return (
    <div
      className={`w-60 bg-white border-r border-gray-200 flex flex-col justify-between items-center max-sm:absolute top-14 bottom-0 ${
        sidebar ? 'translate-x-0' : 'max-sm:-translate-x-full'
      } transition-all duration-300 ease-in-out`}
    >
      <div className="my-7 w-full">
        <img src={user.imageUrl} alt="User" className="w-13 rounded-full mx-auto" />
        <h1 className="mt-1 text-center">{user.fullName}</h1>
        <div className="mt-6 flex flex-col gap-2 px-4">
          {navItems.map(({ to, label, Icon }) => (
            <NavLink
              key={to}
              to={to}
              end
              onClick={() => setSidebar(false)}
              className={({ isActive }) =>
                `px-3.5 py-2.5 flex items-center gap-3 rounded ${
                  isActive ? 'bg-gradient-to-r from-[#3C81F6] to-[#9234EA] text-white' : 'text-gray-700'
                }`
              }
            >
              {({ isActive }) => (
                <>
                  <Icon className={`w-4 h-4 ${isActive ? 'text-white' : 'text-gray-500'}`} />
                  <span>{label}</span>
                </>
              )}
            </NavLink>
          ))}
        </div>
      </div>

      <div className='w-full border-t border-green-200 p-4 px-7 flex items-center justify-between'>
          <div onClick={openUserProfile}  className='flex gap-2 items-center cursor-pointer'>
          <img src={user.imageUrl} alt="img not show" className='w-8 rounded-full '/>
          <div>
            <h1 className='text-sm font-medium'>
              {user.fullName}
            </h1>
            <p className='text-xs text-gray-500'>
            <Protect plan='premium' fallback ='free'>
            Premium
            </Protect>
            Plan
            </p>
          </div>
          </div>
          <LogOut onClick={signOut} className='w-4.5 text-green-400 hover:text-green-700 transition cursor-pointer'/>
      </div>
    </div>
  );
}

export default Sidebar;