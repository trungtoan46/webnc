import React, { useState, useEffect } from 'react';
import api from '../services/api/api';
import './Products.css';
import PopupDetail from '../components/ui/Popup_Detail';
import FilterSidebar from '../components/ui/FilterSidebar';
import ProductGrid from '../components/ui/ProductGrid';
import { addToCart, getEvents } from '../services/api/api';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [events, setEvents] = useState([]);
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '', 
    colors: [],
    sizes: []
  });
  const [categories, setCategories] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    limit: 12
  });

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, [pagination.currentPage, filters]);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const events = await getEvents();
        setEvents(events);
      } catch (error) {
        console.error('Error fetching events:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchEvents();
  }, []);
  console.log("events:", events);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
    }
  };

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const queryParams = new URLSearchParams();
      
      // Thêm các filter vào query params
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.priceRange) queryParams.append('priceRange', filters.priceRange);
      if (filters.colors.length > 0) queryParams.append('colors', filters.colors.join(','));
      if (filters.sizes.length > 0) queryParams.append('sizes', filters.sizes.join(','));
      
      // Thêm pagination
      queryParams.append('page', pagination.currentPage);
      queryParams.append('limit', pagination.limit);

      const response = await api.get(`/products?${queryParams.toString()}`);
      
      if (response.data && response.data.products) {
        setProducts(response.data.products);
        setPagination(prev => ({
          ...prev,
          totalPages: response.data.totalPages || 1
        }));
      } else {
        setProducts([]);
        setPagination(prev => ({
          ...prev,
          totalPages: 1
        }));
      }
    } catch (error) {
      console.error('Error fetching products:', error);
      setProducts([]);
      setPagination(prev => ({
        ...prev,
        totalPages: 1
      }));
    } finally {
      setLoading(false);
    }
  };

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 })); 
  };

  const handleColorToggle = (color) => {
    setFilters(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handleSizeToggle = (size) => {
    setFilters(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
    setPagination(prev => ({ ...prev, currentPage: 1 }));
  };

  const handlePageChange = (newPage) => {
    setPagination(prev => ({
      ...prev,
      currentPage: newPage
    }));
  };

  const handleOpenPopup = (product) => {
    setSelectedProduct(product);
    setShowPopup(true);
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    setSelectedProduct(null);
  };

  const handleAddToCart = async (product, quantity) => {
    if (!product) {
      alert('Product information is not available.');
      return;
    }
  
    if (quantity < 1) {
      alert('Quantity must be at least 1.');
      return;
    }
  
    try {
      console.log(`Adding product ${product._id} to cart with quantity:`, quantity);
      
      await addToCart({ productId: product._id, quantity });
  
      alert('Product added to cart successfully!');
    } catch (err) {
      console.error('Error adding to cart:', err.response?.data || err.message);
      alert('Failed to add product to cart. Please try again.');
    }
  };
  

    return (
      <div className="min-h-screen bg-gray-50 products-container">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col lg:flex-row gap-8">
          <FilterSidebar
            filters={filters}
            categories={categories}
            onFilterChange={handleFilterChange}
            onColorToggle={handleColorToggle}
            onSizeToggle={handleSizeToggle}
          />
          <div className="flex-1">
            {loading ? (
              <div className="flex justify-center items-center h-64">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
              </div>
            ) : products.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-semibold text-gray-600">No products found</h2>
                <p className="mt-2 text-gray-500">Try adjusting your filters or check back later.</p>
              </div>
            ) : (
              <>
                <ProductGrid
                  products={products}
                  events={events}
                  loading={loading}
                  onOpenPopup={handleOpenPopup}
                  onAddToCart={handleAddToCart}
                />
                
                {/* Pagination */}
                {pagination.totalPages > 1 && (
                  <div className="mt-8 flex justify-center">
                    <nav className="relative z-0 inline-flex rounded-md shadow-sm -space-x-px" aria-label="Pagination">
                      <button
                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                        disabled={pagination.currentPage === 1}
                        className={`relative inline-flex items-center px-2 py-2 rounded-l-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.currentPage === 1
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Previous
                      </button>
                      
                      {(() => {
                        const totalPages = Math.max(1, Math.min(pagination.totalPages || 1, 100)); // Ensure valid range
                        const currentPage = pagination.currentPage;
                        const delta = 2; // Number of pages to show before and after current page
                        
                        let pages = [];
                        let leftBound = Math.max(1, currentPage - delta);
                        let rightBound = Math.min(totalPages, currentPage + delta);

                        // Adjust bounds to always show 5 pages when possible
                        if (rightBound - leftBound < 4) {
                          if (leftBound === 1) {
                            rightBound = Math.min(5, totalPages);
                          } else if (rightBound === totalPages) {
                            leftBound = Math.max(1, totalPages - 4);
                          }
                        }

                        // Add first page if needed
                        if (leftBound > 1) {
                          pages.push(1);
                          if (leftBound > 2) pages.push('...');
                        }

                        // Add pages in range
                        for (let i = leftBound; i <= rightBound; i++) {
                          pages.push(i);
                        }

                        // Add last page if needed
                        if (rightBound < totalPages) {
                          if (rightBound < totalPages - 1) pages.push('...');
                          pages.push(totalPages);
                        }

                        return pages.map((page, index) => 
                          page === '...' ? (
                            <span
                              key={`ellipsis-${index}`}
                              className="relative inline-flex items-center px-4 py-2 border border-gray-300 bg-white text-gray-700"
                            >
                              ...
                            </span>
                          ) : (
                            <button
                              key={page}
                              onClick={() => handlePageChange(page)}
                              className={`relative inline-flex items-center px-4 py-2 border text-sm font-medium ${
                                currentPage === page
                                  ? 'z-10 bg-blue-50 border-blue-500 text-blue-600'
                                  : 'bg-white border-gray-300 text-gray-500 hover:bg-gray-50'
                              }`}
                            >
                              {page}
                            </button>
                          )
                        );
                      })()}
                      
                      <button
                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                        disabled={pagination.currentPage === pagination.totalPages}
                        className={`relative inline-flex items-center px-2 py-2 rounded-r-md border border-gray-300 bg-white text-sm font-medium ${
                          pagination.currentPage === pagination.totalPages
                            ? 'text-gray-300 cursor-not-allowed'
                            : 'text-gray-500 hover:bg-gray-50'
                        }`}
                      >
                        Next
                      </button>
                    </nav>
                  </div>
                )}
              </>
            )}
          </div>
        </div>
      </div>
      {showPopup && (
        <PopupDetail 
          product={selectedProduct} 
          onClose={handleClosePopup}
        />
      )}
    </div>
  );
};

export default Products; 