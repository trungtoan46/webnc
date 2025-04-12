import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Banner from '../components/home/Banner';
import Slide from '../components/home/Slide';
import CustomerBenefits from '../components/home/customer-benefits';
import ProductCollection from '../components/products/ProductCollection';
import FlashSale from '../components/home/FlashSale';
import CouponSection from '../components/products/CouponSection';
import Voucher from '../components/common/Voucher';

const Home = () => {
  const categories = [
    {
      name: "Áo thun",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_1.png?v=107",
    },
    {
      name: "Áo sơ mi",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_2.png?v=107",
    },
    {
      name: "Áo khoác",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_3.png?v=107",
    },
    {
      name: "Áo khoác",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_3.png?v=107",
    },  
    {
      name: "Áo khoác",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_3.png?v=107",
    },
    {
      name: "Áo khoác",
      image: "https://theme.hstatic.net/200000696635/1001257291/14/policies_icon_3.png?v=107",
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
            <Voucher />
            <Slide />
            <CustomerBenefits benefits={benefitsData} />
            <FlashSale />
            <ProductCollection categories={categories} />
            <CouponSection />
        </div>
    );
};

export default Home;
