import React from 'react';
import Banner from '../components/Banner';
import Nav from '../components/Nav'; // Import the Nav component
import bannerImage from '../assets/banner.webp';

const Header = ({ theme = 'light' }) => {
  const items = [
    {
      title: {label:"Sản phẩm", to: "/products/all"},
      links: [
        { label: "Laptop", to: "/products/laptop" },
        { label: "Điện thoại", to: "/products/phone" },
      ],
    },
    {
      title: {label:"Dịch vụ", to: "/services/all"},
      links: [
        { label: "Bảo hành", to: "/services/warranty" },
        { label: "Sửa chữa", to: "/services/repair" },
      ],
    },
  ];

  return (
    <header className={`rounded-lg ${theme === 'dark' ? 'bg-gray-800 text-white' : 'bg-white text-black'}`}>
      <Nav items={items} /> {/* Use the Nav component */}
      <Banner img={bannerImage} />
    </header>
  );
};

export default Header; 