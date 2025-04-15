import React, { useState, useEffect } from 'react';
import Sidebar from '../components/admin/common/Sidebar';
import Header from '../components/admin/common/Header';
import Dashboard from '../components/admin/Dashboard';
import Products from './admin/Products';
import Categories from './admin/Categories';
import AdminEvent from './admin/AdminEvent';
import { FiMenu } from 'react-icons/fi';

const Admin = () => {
    // Khai báo các state cần thiết
    const [stats] = useState({
        totalSales: '$10,546',
        totalOrders: '1,056',
        uniqueVisits: '5,420',
        newUsers: '1,650',
        pageViews: '9,653'
    });
    
    const [recentTransactions] = useState([
        { id: 1, name: 'Jagarmath S.', date: '24.05.2023', amount: '$124.97', status: 'Paid' },
        { id: 2, name: 'Anand G.', date: '23.05.2023', amount: '$55.42', status: 'Pending' },
        { id: 3, name: 'Kartik S.', date: '23.05.2023', amount: '$89.90', status: 'Paid' },
        { id: 4, name: 'Rakesh S.', date: '22.05.2023', amount: '$144.84', status: 'Pending' },
        { id: 5, name: 'Anup S.', date: '22.05.2023', amount: '$70.52', status: 'Paid' }
    ]);
    
    const [topProducts] = useState([
        { id: 1, name: 'Men Grey Hoodie', price: '$49.90', unitsSold: 204, image: '/images/grey-hoodie.jpg' },
        { id: 2, name: 'Women Striped T-Shirt', price: '$34.90', unitsSold: 155, image: '/images/striped-tshirt.jpg' },
        { id: 3, name: 'White T-Shirt', price: '$40.90', unitsSold: 120, image: '/images/white-tshirt.jpg' },
        { id: 4, name: 'Men White T-Shirt', price: '$49.90', unitsSold: 204, image: '/images/men-white-tshirt.jpg' },
        { id: 5, name: 'Women Red T-Shirt', price: '$34.90', unitsSold: 155, image: '/images/red-tshirt.jpg' }
    ]);
    
    const [sidebarActive, setSidebarActive] = useState('dashboard');
    const [currentView, setCurrentView] = useState('dashboard');
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    // Toggle sidebar for mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Fetch data từ API khi component mount
    useEffect(() => {
        const fetchData = async () => {
            try {
                // Ở đây sẽ fetch data thực tế từ API
                // Ví dụ: const response = await api.get('/dashboard/stats');
                // setStats(response.data);
            } catch (error) {
                console.error('Error fetching dashboard data:', error);
            }
        };
        
        fetchData();
    }, []);

    // Close sidebar on mobile when changing views
    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth <= 768) {
                setIsSidebarOpen(false);
            } else {
                setIsSidebarOpen(true);
            }
        };

        window.addEventListener('resize', handleResize);
        handleResize();

        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Render active view content 
    const renderContent = () => {
        switch (currentView) {
            case 'dashboard':
                return (
                    <Dashboard 
                        stats={stats}
                        recentTransactions={recentTransactions}
                        topProducts={topProducts}
                    />
                );
            case 'products':
                return <Products />; 
            case 'categories':
                return <Categories />;
            case 'events':
                return <AdminEvent />;
            default:
                return (
                    <div className="p-6 w-full">
                        <h2 className="text-xl font-semibold text-blue-600">
                            {sidebarActive.charAt(0).toUpperCase() + sidebarActive.slice(1)}
                        </h2>
                        <p className="text-gray-600 mt-2">This section is under development.</p>
                    </div>
                );
        }
    };

    // Sidebar click handler
    const handleSidebarClick = (view) => {
        setSidebarActive(view);
        setCurrentView(view);
        if (window.innerWidth <= 768) {
            setIsSidebarOpen(false);
        }
    };

    return (
        <div className="flex h-screen w-full bg-gray-100 relative">
            {/* Mobile menu button */}
            <button 
                onClick={toggleSidebar}
                className="md:hidden fixed top-4 left-4 z-50 bg-blue-900 text-white p-2 rounded-md"
            >
                <FiMenu size={24} />
            </button>

            {/* Overlay for mobile */}
            {isSidebarOpen && (
                <div 
                    className="md:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed md:static inset-y-0 left-0 z-50
                transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
                transition-transform duration-300 ease-in-out md:translate-x-0
            `}>
                <Sidebar 
                    sidebarActive={sidebarActive} 
                    setSidebarActive={handleSidebarClick} 
                />
            </div>
            
            {/* Main content */}
            <div className="flex-1 overflow-auto bg-gray-50 w-full">
                <div className="pl-0 md:pl-4 md:pr-4">
                    <Header />
                    {renderContent()}
                </div>
            </div>
        </div>
    );
};

export default Admin; 