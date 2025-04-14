import React, { useState, useEffect } from 'react';
import { FormControl, Select, TextInput, Textarea } from '@primer/react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api/api';
import ProductForm from '../../components/admin/forms/ProductForm';
import ProductImages from '../../components/admin/products/ProductImages';
import ProductVariants from '../../components/admin/products/ProductVariants';
import convertToVietnameseSlug  from '../../hooks/convertToVietnameseSlug';

const EditProduct = ({ productId, onCancel }) => {
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category_id: '',
    status: 'active',
    tags: []
  });
  const [sizes, setSizes] = useState(['S', 'M', 'L', 'XL']);
  const [colors, setColors] = useState(['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White']);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [variants, setVariants] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [detailImages, setDetailImages] = useState([]);

  useEffect(() => {
    fetchProduct();
  }, [productId]);

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      const productData = response.data;
      setProduct(productData);
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price || '',
        category_id: productData.category_id || '',
        status: productData.status || 'active',
        tags: productData.tags || []
      });
      
      setVariants(productData.variants || []);
      setSizes(['S', 'M', 'L', 'XL']);
      setColors(['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White']);

      setThumbnail(productData.thumbnail);
      setDetailImages(productData.detail_images || []);

      const fetchedVariants = productData.variants || [];
      setVariants(fetchedVariants);

      // Get unique sizes and colors from variants
      const fetchedSizes = [...new Set(fetchedVariants.map(v => v.size))];
      const fetchedColors = [...new Set(fetchedVariants.map(v => v.color))];
      setSelectedSizes(fetchedSizes);
      setSelectedColors(fetchedColors);

    } catch (error) {
      console.error('Error fetching product:', error);
      toast.error('Không thể tải thông tin sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeToggle = (size) => {
    setSelectedSizes(prev => 
      prev.includes(size) 
        ? prev.filter(s => s !== size)
        : [...prev, size]
    );
  };

  const handleColorToggle = (color) => {
    setSelectedColors(prev => 
      prev.includes(color)
        ? prev.filter(c => c !== color)
        : [...prev, color]
    );
  };

  const handleVariantQuantityChange = (size, color, value) => {
    const quantity = parseInt(value) || 0;
    setVariants(prev => {
      const existingIndex = prev.findIndex(v => v.size === size && v.color === color);
      if (existingIndex >= 0) {
        return prev.map((v, i) => 
          i === existingIndex ? { ...v, quantity } : v
        );
      }
      return [...prev, { size, color, quantity }];
    });
  };

  const filteredVariants = variants.filter(v => 
    selectedSizes.includes(v.size) && selectedColors.includes(v.color)
  );

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.name || !formData.category_id || selectedSizes.length === 0 || selectedColors.length === 0) {
      toast.error('Vui lòng điền đầy đủ thông tin bắt buộc');
      return;
    }
    console.log("category_id:", formData.category_id);
    console.log("name:", formData.name);
    try {
      const productData = {
        ...formData,
        name_slug: convertToVietnameseSlug(formData.name),
        quantity: filteredVariants.reduce((acc, v) => acc + (parseInt(v.quantity) || 0), 0),
        variants: filteredVariants.map(v => ({
          size: v.size,
          color: v.color,
          stock: v.quantity || 0
        })),
        tags: formData.tags || [], // Required field
        category_id: formData.category_id, // Required field
        thumbnail,
        detailImages
        
      };
      console.log("productData:", productData);



      await api.put(`/admin/products/${productId}`, productData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      toast.success('Cập nhật sản phẩm thành công!');
    } catch (error) {
      console.error('Error updating product:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-xl text-gray-600">Không tìm thấy sản phẩm</div>
      </div>
    );
  }


  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Chỉnh Sửa Sản Phẩm</h2>
              <button
                onClick={onCancel}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
          </div>

        
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 m-4">
              {/* Left Column - Product Info */}  
              <div className=" space-y-6">
                <ProductForm
                  formData={formData}
                  handleChange={handleInputChange}
                  handleThumbnailChange={setThumbnail}
                  handleDetailImagesChange={setDetailImages}
                  thumbnailFile={thumbnail}
                  selectedFiles={detailImages}
                  handleImageDelete={(index) => {
                    const newImages = [...detailImages];
                    newImages.splice(index, 1);
                    setDetailImages(newImages);
                  }}
                  handlePriceChange={(value) => {
                    setFormData(prev => ({
                      ...prev,
                      price: value
                    }));
                  }}
                />
                <ProductVariants
                  sizes={sizes}
                  colors={colors}
                  selectedSizes={selectedSizes}
                  selectedColors={selectedColors}
                  variants={variants}
                  onSizeSelect={handleSizeToggle}
                  onColorSelect={handleColorToggle}
                  onQuantityChange={handleVariantQuantityChange}
                />
              </div>
              

              {/* Right Column - Images & Variants */}
              <div className="space-y-6">
                <ProductImages
                  thumbnailFile={thumbnail}
                  setThumbnailFile={setThumbnail}
                  selectedFiles={detailImages}
                  handleThumbnailChange={(e) => {
                    if (e && e.target && e.target.files) {
                      setThumbnail(e.target.files[0]);
                    } else {
                      setThumbnail(null);
                    }
                  }}
                  handleDetailImagesChange={(e) => {
                    if (e && e.target && e.target.files) {
                      setDetailImages(prev => [...prev, ...Array.from(e.target.files)]);
                    }
                  }}
                  handleImageDelete={(index) => {
                    const newImages = [...detailImages];
                    newImages.splice(index, 1);
                    setDetailImages(newImages);
                  }}
                />

                

              </div>
            </div>

            {/* Footer */}
            <div className="m-6 pt-6 border-t border-gray-200 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Hủy
              </button>
              <button
                onClick={handleSubmit}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Lưu thay đổi
              </button>
            </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default EditProduct;
