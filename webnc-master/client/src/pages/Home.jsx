import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import Banner from '../components/Banner';
import Slide from '../components/Slide';
import CustomerBenefits from '../components/customer-benefits';
import ProductCollection from '../components/ProductCollection';
import CouponSection from "../components/CouponSection";
import FlashSale from "../components/FlashSale";
const Home = () => {
  const categories = [
    {
      name: "Áo thun",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_1_img_large.png",
    },
    {
      name: "Áo sơ mi",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_2_img_large.png?v=107",
    },
    {
      name: "Áo thun",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_3_img_large.png?v=107",
    },
    {
      name: "Quần dài nam",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_4_img_large.png",
    },  
    {
      name: "Quần jeans",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_5_img_large.png",
    },
    {
      name: "Quần short",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/season_coll_6_img_large.png?v=107",
    },
  ];
  
  const benefitsData = [
    {
      icon: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_1.png?v=107",
      title: "Miễn phí vận chuyển",
      description: "Nhận hàng trong vòng 3 ngày",
    },
    {
      icon: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_2.png?v=107",
      title: "Quà tặng hấp dẫn",
      description: "Nhiều ưu đãi khuyến mãi hot",
    },
    {
      icon: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_3.png?v=107",
      title: "Bảo đảm chất lượng",
      description: "Sản phẩm đã được kiểm định",
    },
    {
      icon: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_4.png?v=107",
      title: "Hotline: 19001993",
      description: "Dịch vụ hỗ trợ bạn 24/7",
    },
  ];

    return (
        <div className='w-full'>
            <Slide />
            <CustomerBenefits benefits={benefitsData} />
            <ProductCollection categories={categories} />
            <CouponSection />
            <FlashSale />
        </div>
    );
};

export default Home;
