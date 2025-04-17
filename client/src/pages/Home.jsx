import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Banner from '../components/home/Banner';
import Slide from '../components/home/Slide';
import ProductCollection from '../components/products/ProductCollection';
import FlashSale from '../components/home/FlashSale';
import CouponSection from '../components/products/CouponSection';
import ProductGrid from '../components/products/ProductGrid';
import { products } from '../data/products';

const Home = () => {
  const categories = [
    {
      name: "Áo thun",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_1_img_large.png?v=107"
    },
    {
      name: "Áo sơ mi",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_2_img_large.png?v=107"
    },
    {
      name: "Áo khoác",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_3_img_large.png?v=107"
    },
    {
      name: "Quần jeans",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_4_img_large.png?v=107"
    },
    {
      name: "Phụ kiện",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_5_img_large.png?v=107"
    },
    {
      name: "Giày dép",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_6_img_large.png?v=107"
    }
  ];

  return (
    <div className='w-full'>
      <div className="flex-1">
        <FlashSale />
        <ProductGrid products={products} />
        <ProductCollection categories={categories} />
        <CouponSection />
      </div>
    </div>
  );
};

export default Home;
