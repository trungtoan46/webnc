import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropDownFullSize = ({ title , items }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="relative"
        onMouseEnter={() => setIsOpen(true)}
         onMouseLeave={() => setIsOpen(false)}
    >
      <div 
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
      </div>
      
      {isOpen && (
        <>
        <div className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[4rem]"
        onClick={() => setIsOpen(false)}
        style={{ pointerEvents: "none" }}>

        </div>

         <div className="fixed left-1/2 transform -translate-x-1/2 w-screen bg-white border 
                    border-gray-300 shadow-lg rounded-lg overflow-hidden z-50 flex gap-4">
          <div className="py-2">
          {items && (
            <div className="flex gap-32 justify-center">
                {items.map((group, groupIndex) => (
                <div key={groupIndex} className="pl-20">
                    {/* Tiêu đề nhóm */}
                    <div className="text-lg font-bold text-gray-900 mb-2">
                        <Link to={group.title.to}>
                        {group.title.label}
                        </Link></div>
                    
                    {/* Danh sách mục */}
                    <div>
                    {group.links.map((item, itemIndex) => (
                        <Link
                        key={itemIndex}
                        to={item.to}
                        className="block px-4 py-2 text-sm text-gray-800 hover:text-blue-600"
                        onClick={() => setIsOpen(false)}
                        >
                        {item.label}
                        </Link>
                    ))}
                    </div>
                </div>
                ))}
            </div>
    )}

          </div>
        </div>
        </>
      )}
    </div>
  );
};

export default DropDownFullSize;
