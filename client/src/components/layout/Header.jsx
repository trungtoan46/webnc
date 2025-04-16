import React, { useState, useEffect } from 'react';
import Banner from '../home/Banner';
import Nav from './Nav';
import bannerImage from '../../assets/banner.webp';

const Header = ({ theme = 'light', showBanner = false }) => {
  const [isNavSticky, setIsNavSticky] = useState(false);

  // This effect listens to the same scroll logic as Nav to adjust padding
  useEffect(() => {
    const handleScroll = () => {
      setIsNavSticky(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Determine background and text color based on theme
  const bgColor = theme === 'dark' ? 'bg-gray-900' : 'bg-white';
  const textColor = theme === 'dark' ? 'text-gray-100' : 'text-gray-900';

  return (
    <header className={`${bgColor} ${textColor} relative`}>
      {/* Navigation Component */}
      <Nav />
      
      {/* Placeholder to prevent content jump when Nav becomes fixed */}
      <div className={`${isNavSticky ? 'h-16' : 'h-0'} transition-height duration-300 ease-in-out`}></div>
      
      {/* Optional Banner */}
      {showBanner && 
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-4">
           <Banner img={bannerImage} />
        </div>
      }
    </header>
  );
};

export default Header; 