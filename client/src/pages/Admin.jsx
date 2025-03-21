import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../services/api/api';

const Admin = () => {
    const [categories, setCategories] = useState([]);
    const [products, setProducts] = useState([]);
    const [users, setUsers] = useState([]);
    const [vouchers, setVouchers] = useState([]);
    const navigate = useNavigate();
    return (
        <div className='p-4' >
            <h1 className='text-2xl font-bold mb-4 text-gray-800'>Admin</h1>
            <div className='flex justify-between items-center mb-4'>
                <h2 className='text-xl font-bold text-gray-800'>Products</h2>
                <button className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'
                onClick={() => navigate('/admin/products/create')}
                >
                    Add Product
                </button>
            </div>
            <table className='w-full border-collapse border border-gray-300 rounded-lg shadow-md overflow-hidden'>
            <thead>
                <tr className='bg-gray-100 text-gray-700'>
                    <th className='border border-gray-300 p-2'>Name</th>
                    <th className='border border-gray-300 p-2'>Price</th>
                    <th className='border border-gray-300 p-2'>Description</th>
                    <th className='border border-gray-300 p-2'>Category</th>
                    <th className='border border-gray-300 p-2'>Image</th>
                    <th className='border border-gray-300 p-2'>Created At</th>
                    <th className='border border-gray-300 p-2'>Action</th>
                </tr>   
            </thead>
            <tbody>
                {products.map((product) => (
                    <tr key={product.id}>
                        <td className='border border-gray-300 p-2'>{product.name}</td>
                        <td className='border border-gray-300 p-2'>{product.price}</td>
                        <td className='border border-gray-300 p-2'>{product.description}</td>
                        <td className='border border-gray-300 p-2'>{product.category}</td>
                        <td className='border border-gray-300 p-2'>{product.image_url}</td>
                        <td className='border border-gray-300 p-2'>{product.createdAt}</td>
                        <td className='border border-gray-300 p-2'>
                            <Link to={`/admin/products/${product.id}`} className='text-blue-500 hover:text-blue-700'>Edit</Link>
                            <button className='text-red-500 hover:text-red-700'>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
         </table>

        <div className='fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-1/4 p-4 bg-white shadow-md hidden'>
                <form action="">
                    <div className='mb-4'>
                        <label htmlFor="name" className='block text-gray-700 font-bold mb-2'>Name</label>
                        <input type="text" id="name" name="name" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="price" className='block text-gray-700 font-bold mb-2'>Price</label>
                        <input type="number" id="price" name="price" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>  
                    <div className='mb-4'>  
                        <label htmlFor="description" className='block text-gray-700 font-bold mb-2'>Description</label> 
                        <textarea id="description" name="description" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="category" className='block text-gray-700 font-bold mb-2'>Category</label>
                        <input type="text" id="category" name="category" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <div className='mb-4'>
                        <label htmlFor="image_url" className='block text-gray-700 font-bold mb-2'>Image URL</label>
                        <input type="text" id="image_url" name="image_url" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' />
                    </div>
                    <button type="submit" className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors'>Add Product</button>
                    
                    
                </form>
        </div>

        </div>

        
    );
};

export default Admin;
