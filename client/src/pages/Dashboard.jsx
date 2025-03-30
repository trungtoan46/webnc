import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api/api';
import { logout } from '../services/api/authService';

const Dashboard = () => {

    const navigate = useNavigate();
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await api.get('/products');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };
        fetchProducts();
    }, []);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <div className="container mx-auto p-4">
            <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
            <button onClick={handleLogout} className="bg-blue-500 text-white px-4 py-2 rounded-md">
                Đăng xuất
            </button>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {products.map((product) => (
                        <div key={product._id} className="bg-white p-4 rounded-md shadow-md">
                            <img src={product.image_url} alt={product.name} className="w-full h-48 object-cover rounded-md" />
                            <h2 className="text-lg font-bold text-gray-700 mt-2">{product.name}</h2>

                            <p className="text-gray-600 mt-1">${product.price}</p>
                            
                        </div>
                    ))}
            </div>
        </div>
    )
}

export default Dashboard;
