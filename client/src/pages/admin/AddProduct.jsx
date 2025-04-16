import React, { useState, useEffect } from 'react';
import { FormControl, TextInput, Select, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api/api';
import { addProduct } from '../../services/api/admin';
import convertToVietnameseSlug from '../../hooks/convertToVietnameseSlug';
import ProductForm from '../../components/admin/forms/ProductForm';
import ProductImages from '../../components/admin/products/ProductImages';
import ProductVariants from '../../components/admin/products/ProductVariants';

const AddProduct = ({ onCancel }) => {
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
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await api.get('/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error);
        toast.error('Không thể tải danh mục sản phẩm');
      }
    };
    fetchCategories();
  }, []);

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
    if (!formData.name) {
      toast.error('Vui lòng nhập tên sản phẩm');
      return;
    }
    
    if (!formData.category_id) {
      toast.error('Vui lòng chọn danh mục sản phẩm');
      return;
    }
    
    if (selectedSizes.length === 0) {
      toast.error('Vui lòng chọn ít nhất một kích thước');
      return;
    }
    
    if (selectedColors.length === 0) {
      toast.error('Vui lòng chọn ít nhất một màu sắc');
      return;
    }

    if (!thumbnail) {
      toast.error('Vui lòng thêm ảnh đại diện cho sản phẩm');
      return;
    }

    setLoading(true);
    console.log("thumbnail:", thumbnail);
    console.log(thumbnail instanceof File); // true

    console.log("detailImages:", detailImages);
    try {
      // Xử lý tải lên hình ảnh trước khi tạo sản phẩm
      let finalThumbnail = null;
      let detail_images = [];
      
      // Tải lên thumbnail
      if (thumbnail && thumbnail instanceof File) {
        try {
          // Kiểm tra file có hợp lệ không
          if (thumbnail.size === 0) {
            throw new Error('File rỗng');
          }
          if (!thumbnail.type.startsWith('image/')) {
            throw new Error('File không phải là hình ảnh');
          }

          const thumbnailFormData = new FormData();
          // Sử dụng Blob để đảm bảo dữ liệu file được giữ nguyên
          const blob = new Blob([thumbnail], { type: thumbnail.type });
          thumbnailFormData.append('images', blob, thumbnail.name);
          
          // Kiểm tra FormData trước khi gửi
          for (let [key, value] of thumbnailFormData.entries()) {
            console.log(`${key}:`, value instanceof Blob ? `Blob(${value.size} bytes)` : value);
          }
          
          const thumbnailResponse = await api.post('/images/upload', thumbnailFormData, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Accept': 'application/json'
            }
          });
          
          console.log("thumbnailResponse:", thumbnailResponse);
          
          if (!thumbnailResponse.data || !thumbnailResponse.data.urls || thumbnailResponse.data.urls.length === 0) {
            throw new Error('Không nhận được URL ảnh từ server');
          }
          
          finalThumbnail = thumbnailResponse.data.urls[0];
        } catch (error) {
          console.error('Error uploading thumbnail:', error);
          toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi tải lên ảnh đại diện');
          return;
        }
      }
      console.log("finalThumbnail:", finalThumbnail);

      // Tải lên ảnh chi tiết (nếu có)
      if (detailImages.length > 0) {
        // Tạo FormData để tải lên nhiều ảnh
        const imageFormData = new FormData();
        detailImages.forEach(img => {
          imageFormData.append('images', img);
        });
        console.log("imageFormData:", imageFormData);
        // Gọi API upload ảnh
        const uploadResponse = await api.post('/images/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        console.log("uploadResponse:", uploadResponse);
        
        // Lấy URL của ảnh đã tải lên
        if (uploadResponse.data.urls && uploadResponse.data.urls.length > 0) {
          detail_images = uploadResponse.data.urls;
        }
      }
      
      const productData = {
        ...formData,
        name_slug: convertToVietnameseSlug(formData.name),
        quantity: filteredVariants.reduce((acc, v) => acc + (parseInt(v.quantity) || 0), 0),
        variants: filteredVariants.map(v => ({
          size: v.size,
          color: v.color,
          stock: v.quantity || 0
        })),
        tags: formData.tags || [],
        thumbnail: finalThumbnail,
        detail_images: detail_images,
        is_active: true
      };
      
      console.log("productData:", productData);

      // Gọi API tạo sản phẩm mới
      await api.post('/admin/products', productData, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });

      console.log("productData:", productData);
      toast.success('Thêm sản phẩm thành công!');
      
      // Reset form
      clearForm();
      
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(error.response?.data?.message || 'Có lỗi xảy ra khi thêm sản phẩm');
    } finally {
      setLoading(false);
    }
  };

  const clearForm = () => {
    setFormData({
      name: '',
      description: '',
      price: '',
      category_id: '',
      status: 'active',
      tags: []
    });
    setSelectedSizes([]);
    setSelectedColors([]);
    setVariants([]);
    setThumbnail(null);
    setDetailImages([]);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="px-6 py-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-bold text-gray-800">Thêm Sản Phẩm Mới</h2>
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
            <div className="space-y-6">
              <ProductForm
                formData={formData}
                handleChange={handleInputChange}
                handleThumbnailChange={setThumbnail}
                handleDetailImagesChange={setDetailImages}
                thumbnailFile={thumbnail}
                selectedFiles={detailImages}
                categories={categories}
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
              disabled={loading}
              className={`px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${
                loading 
                  ? 'bg-gray-400 cursor-not-allowed' 
                  : 'bg-blue-600 text-white hover:bg-blue-700'
              }`}
            >
              {loading ? (
                <>
                  <span className="inline-block mr-2 animate-spin">⟳</span>
                  Đang xử lý...
                </>
              ) : (
                'Thêm sản phẩm'
              )}
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default AddProduct;
