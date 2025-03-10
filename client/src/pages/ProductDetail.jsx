import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await api.get(`/products/${id}`);
        setProduct(response.data);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching product details:', err);
        setError('Failed to load product details. Please try again later.');
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await api.post('/cart', { productId: id, quantity });
      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err);
      alert('Failed to add product to cart. Please try again.');
    }
  };

  if (loading) return <div className="text-center py-10">Loading...</div>;
  if (error) return <div className="text-center py-10 text-red-500">{error}</div>;
  if (!product) return <div className="text-center py-10">Product not found</div>;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col md:flex-row gap-8">
        <div className="md:w-1/2">
          <img 
            src={product.image || 'https://via.placeholder.com/600x400'} 
            alt={product.name} 
            className="w-full h-auto rounded-lg shadow-md"
          />
        </div>
        
        <div className="md:w-1/2">
          <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
          <p className="text-gray-700 mb-4">{product.description}</p>
          <p className="text-2xl font-bold text-blue-600 mb-4">${product.price}</p>
          
          <div className="mb-6">
            <label htmlFor="quantity" className="block text-gray-700 mb-2">Quantity:</label>
            <div className="flex items-center">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="bg-gray-200 px-3 py-1 rounded-l"
              >
                -
              </button>
              <input 
                type="number" 
                id="quantity"
                value={quantity}
                onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
                className="w-16 text-center border-t border-b py-1"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="bg-gray-200 px-3 py-1 rounded-r"
              >
                +
              </button>
            </div>
          </div>
          
          <button 
            onClick={handleAddToCart}
            className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 