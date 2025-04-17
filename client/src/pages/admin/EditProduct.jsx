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
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    sale_price: '',
    category_id: '',
    status: 'active',
    tags: []
  });
  
  // Định nghĩa các size và màu mặc định
  const defaultSizes = ['S', 'M', 'L', 'XL'];
  const defaultColors = ['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'];
  
  const [sizes, setSizes] = useState(defaultSizes);
  const [colors, setColors] = useState(defaultColors);
  const [selectedSizes, setSelectedSizes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);
  const [variants, setVariants] = useState([]);
  const [thumbnail, setThumbnail] = useState(null);
  const [detailImages, setDetailImages] = useState([]);

  useEffect(() => {
    fetchCategories();
    fetchProduct();
  }, [productId]);

  const fetchCategories = async () => {
    try {
      const response = await api.get('/categories');
      setCategories(response.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      toast.error('Không thể tải danh sách danh mục');
    }
  };

  const fetchProduct = async () => {
    try {
      const response = await api.get(`/products/${productId}`);
      const productData = response.data;
      
      // Lưu toàn bộ dữ liệu sản phẩm
      setProduct(productData);
      
      // Cập nhật form data
      setFormData({
        name: productData.name || '',
        description: productData.description || '',
        price: productData.price?.toString() || '',
        sale_price: productData.sale_price?.toString() || '',
        category_id: productData.category_id || '',
        status: productData.status || 'active',
        tags: productData.tags || []
      });

      // Cập nhật hình ảnh
      setThumbnail(productData.thumbnail || null);
      setDetailImages(productData.detail_images || []);

      // Xử lý variants
      const productVariants = productData.variants || [];
      
      // Lấy sizes và colors từ variants của sản phẩm
      const productSizes = [...new Set(productVariants.map(v => v.size))];
      const productColors = [...new Set(productVariants.map(v => v.color))];
      
      // Cập nhật selected sizes và colors
      setSelectedSizes(productSizes);
      setSelectedColors(productColors);
      
      // Cập nhật variants với số lượng
      const variantsWithQuantity = productVariants.map(v => ({
        size: v.size,
        color: v.color,
        quantity: v.stock || 0
      }));
      setVariants(variantsWithQuantity);

      // Merge sizes và colors từ sản phẩm với danh sách mặc định
      setSizes([...new Set([...defaultSizes, ...productSizes])]);
      setColors([...new Set([...defaultColors, ...productColors])]);

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

    // Validate sale price
    if (formData.sale_price && Number(formData.sale_price) >= Number(formData.price)) {
      toast.error('Giá khuyến mãi phải nhỏ hơn giá gốc');
      return;
    }

    console.log("category_id:", formData.category_id);
    console.log("name:", formData.name);
    try {
      // Xử lý tải lên hình ảnh trước khi cập nhật sản phẩm
      let finalThumbnail = thumbnail;
      let detail_images = [...detailImages];
      
      // Tải lên thumbnail mới (nếu có)
      if (thumbnail && typeof thumbnail === 'object') {
        const thumbnailFormData = new FormData();
        thumbnailFormData.append('images', thumbnail);
        
        const thumbnailResponse = await api.post('/images/upload', thumbnailFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        if (thumbnailResponse.data.urls && thumbnailResponse.data.urls.length > 0) {
          finalThumbnail = thumbnailResponse.data.urls[0];
        }
      }
      
      // Tải lên ảnh chi tiết mới (nếu có)
      const newDetailImages = detailImages.filter(img => typeof img === 'object');
      if (newDetailImages.length > 0) {
        // Tạo FormData để tải lên nhiều ảnh
        const imageFormData = new FormData();
        newDetailImages.forEach(img => {
          imageFormData.append('images', img);
        });
        
        // Gọi API upload ảnh
        const uploadResponse = await api.post('/images/upload', imageFormData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        
        // Lấy URL của ảnh đã tải lên
        const uploadedImageUrls = uploadResponse.data.urls;
        
        // Cập nhật mảng detail_images
        detail_images = [
          ...detailImages.filter(img => typeof img === 'string'), // Giữ lại các ảnh cũ (URL)
          ...uploadedImageUrls // Thêm các URL mới
        ];
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
        category_id: formData.category_id,
        thumbnail: finalThumbnail,
        detail_images: detail_images,
        sale_price: formData.sale_price || null
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
                  categories={categories}
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
