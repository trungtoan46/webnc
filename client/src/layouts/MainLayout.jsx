import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';

const MainLayout = ({ children, showHeader = true, showFooter = true, showBanner = false }) => {
  return (
    <div className="flex flex-col min-h-screen w-full">
      {showHeader && <Header showBanner={showBanner} />}

      <main className="flex-grow">
        {children}
      </main>
      {showFooter && <Footer />}
    </div>
  );
};

export default MainLayout;