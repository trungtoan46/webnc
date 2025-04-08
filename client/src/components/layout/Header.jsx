import React from 'react';
import Banner from '../home/Banner';
import Nav from './Nav';
import bannerImage from '../../assets/banner.webp';

const Header = ({ theme = 'light' }) => {
 

  return (
    <header className={`rounded-lg ${theme === 'dark' ? 
    'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Nav /> {/* Use the Nav component */}
      <Banner img={bannerImage} />
    </header>
  );
};

export default Header; 