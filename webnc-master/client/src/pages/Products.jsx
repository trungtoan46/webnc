import React, { useEffect, useState } from 'react';
import api from '../services/api';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await api.get('/products');
        setProducts(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError('Failed to load products. Please try again later.');
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Welcome to Our Store</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.length > 0 ? (
          products.map((product) => (
            <div key={product._id} className="border rounded-lg overflow-hidden shadow-md flex flex-col">
              <Link to={`/products/${product._id}`} className="block flex-grow">
                <img 
                  src={product.image_url || 'https://placehold.co/300x200'} 
                  alt={product.name} 
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
                  <p className="text-gray-700 mb-2">{product.description}</p>
                  <p className="text-lg font-bold text-blue-600">${product.price}</p>
                </div>
              </Link>
              <div className="p-4 mt-auto">
                <button className="w-full bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors">
                  Add to Cart 
                </button>
              </div>
            </div>
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">No products available.</p>
        )}
      </div>
    </div>
  );
};

export default Products; 