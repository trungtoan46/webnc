import React, { useState, useEffect, useContext, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Icon } from "@iconify/react";
import Logo from '../common/Logo';
import Dropdown from '../common/Dropdown';
import DropDownFullSize from '../common/DropDownFullSize';
import { AuthContext } from '../../context/AuthContext';

const Nav = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const { user, handleLogout } = useContext(AuthContext);
  const navigate = useNavigate();
  const profileMenuRef = useRef(null);
  const searchInputRef = useRef(null);

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
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileMenuRef.current && !profileMenuRef.current.contains(event.target)) {
        setIsProfileMenuOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  useEffect(() => {
    if (isSearchOpen && searchInputRef.current) {
        searchInputRef.current.focus();
    }
  }, [isSearchOpen]);

  const onLogout = () => {
    handleLogout();
    setIsProfileMenuOpen(false);
    navigate('/');
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      setIsSearchOpen(false);
      setSearchQuery('');
    }
  };

  const renderProfileMenuItems = () => (
    <div ref={profileMenuRef} className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50">
      <div className="py-1">
        {user ? (
          <>
            <span className="block px-4 py-2 text-sm text-gray-700 font-medium border-b border-gray-100">
              Chào, {user.username}
            </span>
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
            {user.role === 'admin' && (
                <Link
                  to="/admin"
                  className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  onClick={() => setIsProfileMenuOpen(false)}
                >
                  Trang quản trị
                </Link>
              )}
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
  );

  const renderNavLinks = (isMobile = false) => (
    <div className={`flex ${isMobile ? 'flex-col space-y-4 p-4' : 'flex-row items-center space-x-1 lg:space-x-4'}`}>
      <DropDownFullSize title="Sản phẩm" items={items} link="/products" isMobile={isMobile} closeMobileMenu={() => isMobile && setIsMobileMenuOpen(false)} />
      <Dropdown title="Deal" items={[
        { label: "Landing Page - XMas", to: "/xmas" },
        { label: "Landing Page - Black Friday", to: "/black-friday" },
        { label: "Landing Page - OnePage", to: "/onepage" },
        { label: "Landing Page - Flash Sale", to: "/flash-sale" }
      ]} isMobile={isMobile} closeMobileMenu={() => isMobile && setIsMobileMenuOpen(false)} />
      
      <Link to="/intro/about" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Giới thiệu</Link>
      <Link to="/check-order" className="px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => isMobile && setIsMobileMenuOpen(false)}>Kiểm tra đơn hàng</Link>
    </div>
  );

  return (
    <nav
      className={`bg-white transition-all duration-300 ease-in-out ${isScrolled ? "fixed top-0 left-0 right-0 shadow-md z-50" : "relative z-40 border-b border-gray-200"}`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex items-center justify-between h-16">
          <div className="absolute inset-y-0 left-0 flex items-center md:hidden">
            <button
              type="button"
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
              aria-controls="mobile-menu"
              aria-expanded={isMobileMenuOpen}
              onClick={toggleMobileMenu}
            >
              <span className="sr-only">Mở menu</span>
              {isMobileMenuOpen ? (
                <Icon icon="heroicons-outline:x" className="block h-6 w-6" />
              ) : (
                <Icon icon="heroicons-outline:menu" className="block h-6 w-6" />
              )}
            </button>
          </div>

          <div className="flex-1 flex items-center justify-center md:items-stretch md:justify-start">
            <div className="flex-shrink-0 flex items-center">
              <Link to="/"><Logo /></Link>
            </div>
            <div className="hidden md:block md:ml-6">
              {renderNavLinks()}
            </div>
          </div>

          <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-2 sm:space-x-4">
            <div className="relative">
                <button
                    onClick={() => setIsSearchOpen(!isSearchOpen)}
                    className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                    <span className="sr-only">Tìm kiếm</span>
                    <Icon icon="heroicons-outline:search" className="h-6 w-6" />
                </button>
                {isSearchOpen && (
                    <form 
                        onSubmit={handleSearchSubmit}
                        className={`absolute right-0 ${isScrolled ? 'top-14' : 'top-16'} mt-2 origin-top-right w-64 sm:w-80 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 focus:outline-none z-50 p-2`}
                    >
                        <div className="relative">
                            <input
                                ref={searchInputRef}
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Tìm kiếm sản phẩm..."
                                className="block w-full pr-10 pl-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                            />
                            <button type="submit" className="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <Icon icon="heroicons-outline:search" className="h-5 w-5 text-gray-400" />
                            </button>
                        </div>
                    </form>
                )}
            </div>
            
            <Link to="/cart" className="p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Giỏ hàng</span>
              <Icon icon="heroicons-outline:shopping-bag" className="h-6 w-6" />
            </Link>
            <Link to="/favorites" className="hidden sm:block p-1 rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <span className="sr-only">Yêu thích</span>
              <Icon icon="heroicons-outline:heart" className="h-6 w-6" />
            </Link>

            <div className="relative ml-3">
              <div>
                <button
                  type="button"
                  className="bg-white p-1 flex text-sm rounded-full text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                  id="user-menu-button"
                  aria-expanded={isProfileMenuOpen}
                  aria-haspopup="true"
                  onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                  <span className="sr-only">Mở menu người dùng</span>
                  <Icon icon="heroicons-outline:user-circle" className="h-6 w-6" />
                </button>
              </div>
              {isProfileMenuOpen && renderProfileMenuItems()}
            </div>
            
          </div>
        </div>
      </div>

      <div className={`md:hidden absolute top-16 inset-x-0 z-40 transform transition-transform duration-300 ease-in-out ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} bg-white shadow-lg`} id="mobile-menu">
        <div className="px-2 pt-2 pb-3 space-y-1">
          {renderNavLinks(true)}
          <div className="border-t border-gray-200 pt-4 mt-4">
             <Link to="/favorites" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                <Icon icon="heroicons-outline:heart" className="h-6 w-6 mr-2" /> Yêu thích
             </Link>
             <hr className="my-2"/>
              {!user ? (
                  <>
                    <Link to="/login" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                      <Icon icon="heroicons-outline:login" className="h-6 w-6 mr-2" /> Đăng nhập
                    </Link>
                    <Link to="/register" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                      <Icon icon="heroicons-outline:user-add" className="h-6 w-6 mr-2" /> Đăng ký
                    </Link>
                  </>
              ) : (
                  <>
                    <Link to="/profile" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                      <Icon icon="heroicons-outline:user" className="h-6 w-6 mr-2" /> Tài khoản
                    </Link>
                    <Link to="/orders" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                      <Icon icon="heroicons-outline:receipt-refund" className="h-6 w-6 mr-2" /> Đơn hàng
                    </Link>
                     {user.role === 'admin' && (
                        <Link to="/admin" className="flex items-center px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-900" onClick={() => setIsMobileMenuOpen(false)}>
                           <Icon icon="heroicons-outline:cog" className="h-6 w-6 mr-2" /> Quản trị
                        </Link>
                      )}
                     <button onClick={() => { onLogout(); setIsMobileMenuOpen(false); }} className="flex items-center w-full text-left px-3 py-2 rounded-md text-base font-medium text-red-600 hover:bg-gray-50 hover:text-red-700">
                        <Icon icon="heroicons-outline:logout" className="h-6 w-6 mr-2" /> Đăng xuất
                    </button>
                 </>
              )}
           </div>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
