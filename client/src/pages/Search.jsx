import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import api from '../services/api/api';
import { Icon } from "@iconify/react";
import ProductGrid from '../components/products/ProductGrid';

const Search = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const location = useLocation();
  const searchQuery = new URLSearchParams(location.search).get('q') || '';

  useEffect(() => {
    const fetchProducts = async () => {
      if (!searchQuery.trim()) {
        setProducts([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        console.log('Fetching products for query:', searchQuery);
        // Using encodeURIComponent to properly encode the search query
        const encodedQuery = encodeURIComponent(searchQuery.trim());
        const response = await api.get(`/products/search?q=${encodedQuery}`);
        console.log('Search response:', response.data);
        setProducts(response.data || []);
        setError(null);
      } catch (err) {
        console.error('Search error:', err);
        setError('Có lỗi xảy ra khi tìm kiếm sản phẩm');
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <Icon icon="heroicons-outline:exclamation-circle" className="h-12 w-12 mx-auto text-red-500 mb-4" />
        <p className="text-gray-600">{error}</p>
      </div>
    );
  }

  if (!searchQuery.trim()) {
    return (
      <div className="text-center py-8">
        <Icon icon="heroicons-outline:search" className="h-12 w-12 mx-auto text-gray-400 mb-4" />
        <p className="text-gray-600">Vui lòng nhập từ khóa để tìm kiếm</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-black">
          Kết quả tìm kiếm cho "{searchQuery}"
          <span className="text-gray-500 text-lg ml-2">
            ({products.length} sản phẩm)
          </span>
        </h1>
      </div>

      {products.length === 0 ? (
        <div className="text-center py-8">
          <Icon icon="heroicons-outline:search" className="h-12 w-12 mx-auto text-gray-400 mb-4" />
          <p className="text-gray-600">Không tìm thấy sản phẩm nào phù hợp</p>
        </div>
      ) : (
        <ProductGrid products={products} />
      )}
    </div>
  );
};

export default Search;
