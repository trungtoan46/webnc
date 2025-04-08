import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const DropDownFullSize = ({ title, items, link }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className="relative"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <div className="flex items-center font-semibold text-lg text-black hover:text-blue-600 px-4 py-2 cursor-pointer">
         <Link to={link}  className='hover:text-blue-600 text-black'>{title}</Link>
        <svg
          className={`ml-2 w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path
            fillRule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clipRule="evenodd"
          />
        </svg>
      </div>

      {isOpen && (
        <>
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-30 top-[4rem]"
            onClick={() => setIsOpen(false)}
            style={{ pointerEvents: 'none' }}
          ></div>

          <div className="fixed left-1/2 transform -translate-x-1/2 w-screen bg-white border border-gray-300 shadow-lg rounded-lg 
          overflow-auto z-50 flex flex-col md:flex-row gap-4 max-h-[80vh]">
            <div className="py-2">
              {items && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-center">
                  {items.map((group, groupIndex) => (
                    <div key={groupIndex} className="px-4 md:pl-20">
                      {/* Tiêu đề nhóm */}
                      <div className="text-lg font-bold text-gray-900 mb-2">
                        <Link to={link}>{group.title.label}</Link>
                      </div>

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
