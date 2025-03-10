import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Icon } from "@iconify/react";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [isDealOpen, setIsDealOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);


  return (
    <header className="rounded-lg bg-white">
      <nav className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between">
        {/* Logo */}
        <div className="flex items-center">
          <Link to="/" className="font-semibold text-center text-xl px-4 mx-auto mb-2">Trang chủ</Link>
        </div>

        {/* Mobile menu button */}
        <button 
          className="md:hidden p-2"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16m-7 6h7" />
          </svg>
        </button>

        {/* Navigation */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} md:flex md:items-center w-full md:w-auto mt-4 md:mt-0`}>
          <div className="flex flex-col md:flex-row items-center space-x-4">
            {/* Category dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                className="flex items-center font-semibold text-lg text-black hover:text-blue-600 px-4 py-2"
              >
                Sản phẩm
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform ${isCategoryOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isCategoryOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg z-20 bg-gray-900">
                  <div className="py-1">
                    <Link 
                      to="/category/1" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      Danh mục 1
                    </Link>
                    <Link 
                      to="/category/2" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsCategoryOpen(false)}
                    >
                      Danh mục 2
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Deal dropdown */}
            <div className="relative">
              <button 
                onClick={() => setIsDealOpen(!isDealOpen)}
                className="flex items-center font-semibold text-lg text-black hover:text-blue-600 px-4 py-2"
              >
                Deal
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform ${isDealOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isDealOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-900 z-20">
                  <div className="py-1">
                    <Link 
                      to="/deal/1" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsDealOpen(false)}
                    >
                      Deal 1
                    </Link>
                    <Link 
                      to="/deal/2" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsDealOpen(false)}
                    >
                      Deal 2
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* Intro */}
            <div className="relative">
              <button 
                onClick={() => setIsIntroOpen(!isIntroOpen)}
                className="flex items-center font-semibold text-lg text-black hover:text-blue-600 px-4 py-2"
              >
                Giới thiệu
                <svg 
                  className={`ml-2 w-4 h-4 transition-transform ${isIntroOpen ? 'rotate-180' : ''}`} 
                  fill="currentColor" 
                  viewBox="0 0 20 20"
                >
                  <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
              
              {isIntroOpen && (
                <div className="absolute left-0 mt-2 w-48 rounded-lg shadow-lg bg-gray-900 z-20">
                  <div className="py-1">
                    <Link 
                      to="/intro/1" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsIntroOpen(false)}
                    >
                      Giới thiệu 1
                    </Link>
                    <Link 
                      to="/intro/2" 
                      className="block px-4 py-2 text-lg text-white hover:bg-gray-700"
                      onClick={() => setIsIntroOpen(false)}
                    >
                      Giới thiệu 2
                    </Link>
                  </div>
                </div>
              )}
            </div>
            {/* Check order */}
            <div className="flex items-center">
              <Link to="/check" className="px-4 py-2 text-lg text-black hover:text-blue-600">
                Kiểm tra đơn hàng
              </Link>
            </div>

          </div>
        </div>

        {/* Icons */}
        <div className="flex items-center space-x-4">
          <button onClick={() => setIsSearchOpen(!isSearchOpen)} className="hover:text-blue-600 text-[rgb(0,13,255)] h-6 w-6">
          <Icon className="h-6 w-6 font-bold" icon="material-symbols-light:search"/>
          </button>

          {isSearchOpen && (
            <div className="absolute left-1/2 transform -translate-x-1/2 top-0 mt-2 w-4/5 rounded-lg shadow-lg bg-white text-black z-20 flex">
              <input 
                type="text" 
                placeholder="Tìm kiếm sản phẩm..."  
                className="w-full px-4 py-2 text-lg text-black border border-gray-200 rounded-lg focus:outline-none focus:border-blue-500" 
              />
            </div>
          )}

          <Link to="/cart" className="p-2 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </Link>
          <Link to="/favorites" className="p-2 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </Link>
          <Link to="/profile" className="p-2 hover:text-blue-600">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header; 