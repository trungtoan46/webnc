import React from 'react';
import { 
  FiHome, 
  FiUsers, 
  FiShoppingBag, 
  FiShoppingCart, 
  FiSettings, 
  FiPackage,
  FiBarChart2
} from 'react-icons/fi';

const Sidebar = ({ sidebarActive, setSidebarActive }) => {
  // Menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiHome size={20} /> },
    { id: 'products', label: 'Products', icon: <FiShoppingBag size={20} /> },
    { id: 'categories', label: 'Categories', icon: <FiPackage size={20} /> },
    { id: 'orders', label: 'Orders', icon: <FiShoppingCart size={20} /> },
    { id: 'customers', label: 'Customers', icon: <FiUsers size={20} /> },
    { id: 'analytics', label: 'Analytics', icon: <FiBarChart2 size={20} /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings size={20} /> },
  ];

  return (
    <div className="min-h-screen w-64 bg-blue-900 text-white">
      <div className="p-5">
        <h2 className="text-xl font-bold">EGA Admin</h2>
      </div>
      
      <nav className="mt-5">
        <ul>
          {menuItems.map((item) => (
            <li 
              key={item.id}
              className={`flex items-center px-5 py-3 cursor-pointer hover:bg-blue-800 transition-colors
                ${sidebarActive === item.id ? 'bg-blue-700 border-l-4 border-white' : ''}`}
              onClick={() => setSidebarActive(item.id)}
            >
              <span className="mr-3 text-white">
                {item.icon}
              </span>
              <span className="text-white text-sm font-medium">
                {item.label}
              </span>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="absolute bottom-0 p-5 w-64">
        <div className="flex items-center">
          <div className="w-10 h-10 bg-white rounded-full overflow-hidden">
            <img src="/images/admin-avatar.jpg" alt="Admin" className="w-full h-full object-cover" />
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <p className="text-xs text-gray-300">admin@ega.com</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar; 