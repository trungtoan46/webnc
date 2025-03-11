import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Dropdown = ({ title, items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center font-semibold text-lg text-black hover:text-blue-600 px-4 py-2"
      >
        {title}
        <svg 
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`} 
          fill="currentColor" 
          viewBox="0 0 20 20"
        >
          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
        </svg>
      </button>
      
      {isOpen && (
        <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-900 z-20">
          <div className="py-1">
            {items.map((item, index) => (
              <Link
                key={index}
                to={item.to}
                className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                onClick={() => setIsOpen(false)}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
