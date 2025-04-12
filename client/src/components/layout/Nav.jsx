import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Logo from '../common/Logo';
import Dropdown from '../common/Dropdown';
import DropDownFullSize from '../common/DropDownFullSize';
import { AuthContext } from '../../context/AuthContext';
import { useContext } from 'react';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isIntroOpen, setIsIntroOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const items = [
    {
      title: { label: "Bộ sưu tập", to: "/collections" },
      links: [
        { label: "Áo khoác", to: "/collections/jacket" },
        { label: "Áo sơ mi", to: "/collections/shirt" },
        { label: "Áo thun", to: "/collections/tshirt" },
        { label: "Quần dài", to: "/collections/trousers" },
        { label: "Quần jeans", to: "/collections/jeans" },
        { label: "Quần short", to: "/collections/shorts" },
      ],
    },
    {
      title: { label: "Mặc theo dịp", to: "/occasions" },
      links: [
        { label: "Dạo phố", to: "/occasions/streetwear" },
        { label: "Đi biển", to: "/occasions/beachwear" },
        { label: "Du lịch", to: "/occasions/travel" },
        { label: "Đi chơi", to: "/occasions/casual" },
      ],
    },
    {
      title: { label: "Áo nam thời trang", to: "/menswear" },
      links: [
        { label: "Áo thể thao", to: "/menswear/sports" },
        { label: "Áo sơ mi", to: "/menswear/shirt" },
        { label: "Áo khoác", to: "/menswear/jacket" },
        { label: "Áo thun", to: "/menswear/tshirt" },
      ],
    },
    {
      title: { label: "Đồ mặc nhà", to: "/homewear" },
      links: [
        { label: "Đồ dài", to: "/homewear/long" },
        { label: "Đồ ngắn", to: "/homewear/short" },
        { label: "Đồ xuân - hè", to: "/homewear/spring-summer" },
        { label: "Đồ thu - đông", to: "/homewear/fall-winter" },
      ],
    },
  ];

  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 35) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const onLogout = () => {
    handleLogout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  return (
    <nav
      className={`transition-all duration-300 ease-in-out ${
        isScrolled
          ? "fixed top-0 left-0 right-0 bg-white shadow-md z-50"
          : "relative z-50"
      }`}
    >
      <div className="container mx-auto px-4 py-4 flex flex-wrap items-center justify-between z-50" >

      {/* Logo */}
      <div className="flex items-center">
        <Link to="/"><Logo /></Link>
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
          <DropDownFullSize title="Sản phẩm" items={items} link="/products" />

          {/* Deal dropdown */}
          <Dropdown title="Deal" items={[
            { label: "Landing Page - XMas", to: "/xmas" },
            { label: "Landing Page - Black Friday", to: "/black-friday" },
            { label: "Landing Page - OnePage", to: "/onepage" },
            { label: "Landing Page - Flash Sale", to: "/flash-sale" }
          ]} />

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
      {/* Search */}
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
        
        {/* Profile menu with logout option */}
        <div className="relative">
          <button 
            onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
            className="p-2 hover:text-blue-600 flex items-center"
          >
            <span className="mr-2 text-sm">{user ? user.username : 'Tài khoản'}</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </button>
          
          {isProfileMenuOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg shadow-lg bg-white z-20 border border-gray-200">
              <div className="py-1">
                {user ? (
                  <>
                    <Link 
                      to="/profile" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Thông tin tài khoản
                    </Link>
                    <Link 
                      to="/orders" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Đơn hàng của tôi
                    </Link>
                    <button 
                      onClick={onLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Đăng xuất
                    </button>
                  </>
                ) : (
                  <>
                    <Link 
                      to="/login" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Đăng nhập
                    </Link>
                    <Link 
                      to="/register" 
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setIsProfileMenuOpen(false)}
                    >
                      Đăng ký
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
        
        {user && user.role === 'admin' && (
          <Link to="/admin" className="p-2 hover:text-blue-600">
            <Icon className="h-6 w-6 font-bold" icon="material-symbols-light:admin-panel-settings"/>  
          </Link>
        )}
        
      </div>
      </div>
    </nav>
  );
};

export default Nav;
