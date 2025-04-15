import React, {useContext} from 'react';
import Search from './Search';
import { AuthContext } from '../../../context/AuthContext';

const Header = () => {
  const {user} = useContext(AuthContext); 
  return (
    <div className="bg-white shadow-sm px-6 py-3 flex items-center w-full gap-16">
      <Search />
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <div className="cursor-pointer">
            <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
            </svg>
            <span className="absolute -top-1 -right-1 bg-blue-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">5</span>
          </div>
        </div>
        
        <div className="flex items-center">
          <div className="w-8 h-8 bg-green-500 rounded-full overflow-hidden mr-2">
              <img src={user.avatar} alt="Admin Avatar" className="w-full h-full object-cover" />
          </div>
          <span className="font-medium text-gray-700">Admin</span>
          <svg className="w-5 h-5 ml-1 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default Header; 