import React, { useState, useEffect } from 'react';
import { FormControl, TextInput, Select, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api/api';
import { addProduct } from '../../services/api/admin';

const AddProduct = ({ onCancel }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    category: '',
    price: '',
    discountPrice: '',
    weight: '',
    hasOptions: false,
    isDigital: false,
    tags: [],
    images: []
  });

  const [selectedFiles, setSelectedFiles] = useState([]);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories');
      setCategories(response.data);
    };
    fetchCategories();  
  }, []);
  const handlePriceChange = (price) => {
    const priceInput = document.getElementById('price-input');
    if (priceInput.value == price) {
      priceInput.value = '';
    } else {
      priceInput.value = price;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Kiểm tra các trường bắt buộc
    const requiredFields = {
      name: 'Tên sản phẩm',
      description: 'Mô tả sản phẩm',
      price: 'Giá sản phẩm',
      category: 'Danh mục'
    };

    const emptyFields = [];
    for (const [field, label] of Object.entries(requiredFields)) {
      if (!formData[field]) {
        emptyFields.push(label);
      }
    }

    if (emptyFields.length > 0) {
      toast.error(`Vui lòng nhập: ${emptyFields.join(', ')}`);
      return;
    }

    if (selectedFiles.length === 0) {
      toast.error('Vui lòng thêm ít nhất một hình ảnh sản phẩm');
      return;
    }

    if (sizes.length === 0) {
      toast.error('Vui lòng chọn ít nhất một kích cỡ');
      return;
    }

    if (colors.length === 0) {
      toast.error('Vui lòng chọn ít nhất một màu sắc');
      return;
    }

    if (formData.tags.length === 0) {
      toast.error('Vui lòng thêm ít nhất một thẻ cho sản phẩm');
      return;
    }

    try {
      // Upload ảnh lên Cloudinary trước
      const uploadData = new FormData();
      selectedFiles.forEach(file => {
        uploadData.append('images', file);
      });

      // Log để kiểm tra FormData trước khi upload
      console.log('Files being uploaded:', selectedFiles);

      // Sử dụng API instance để upload ảnh
      const uploadResponse = await api.post('/upload', uploadData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      console.log('Upload response:', uploadResponse);
      
      if (!uploadResponse.data || !uploadResponse.data.urls) {
        throw new Error('Không nhận được URL ảnh từ server');
      }

      // Đảm bảo imageUrls là một mảng
      const imageUrls = Array.isArray(uploadResponse.data.urls) 
        ? uploadResponse.data.urls 
        : [uploadResponse.data.urls];

      console.log('Image URLs received:', imageUrls);

      // Chuẩn bị dữ liệu sản phẩm
      const productData = new FormData();
      productData.append('name', formData.name);
      productData.append('description', formData.description);
      productData.append('price', Number(formData.price));
      productData.append('category_id', formData.category);
      productData.append('size', sizes.join(','));
      productData.append('color', colors.join(','));
      productData.append('quantity', formData.quantity || 0);
      productData.append('is_active', true);
      productData.append('tags', '["' + (formData.tags[0] || '') + '"]');
      productData.append('images', JSON.stringify(imageUrls));
      productData.append('image_url', imageUrls[0] || 'https://placehold.co/600x400/EEE/31343C');

      // Log để kiểm tra dữ liệu trước khi gửi
      console.log('Dữ liệu sản phẩm trước khi gửi:');
      for (let pair of productData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }

      // Gọi API thêm sản phẩm
      const response = await addProduct(productData);
      console.log('Phản hồi từ server:', response);
      
      // Hiển thị thông báo thành công
      toast.success('Thêm sản phẩm thành công!');
      
      // Đóng form
      onCancel();
    } catch (error) {
      console.error('Lỗi chi tiết:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi thêm sản phẩm');
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSizeClick = (size) => {
    if (sizes.includes(size)) {
      setSizes(sizes.filter(s => s !== size));
    } else {
      setSizes([...sizes, size]);
    }
  };

  const handleAddTag = (tag) => {
    if (!formData.tags.includes(tag)) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tag]
      }));
    }
  };

  const handleRemoveTag = (tag) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(t => t !== tag)
    }));
  };

  const handleColorClick = (color) => { 
    if (colors.includes(color)) {
      setColors(colors.filter(c => c !== color));
    } else {
      setColors([...colors, color]);
    }   
  };

  const getColorClass = (color) => {
    const baseColor = color.toLowerCase();
  
    if (baseColor === "white") return "bg-white text-black";
    if (baseColor === "black") return "bg-black text-white border-2 border-gray-300";
  
    return `bg-${baseColor}-100 text-${baseColor}-500 border border-gray-300`;
  };

  const handleFileChange = (e) => {
    try {
      const files = Array.from(e.target.files);
      if (!files.length) return;

      // Kiểm tra loại file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      const invalidFiles = files.filter(file => !validTypes.includes(file.type));
      
      if (invalidFiles.length > 0) {
        toast.error('Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG');
        return;
      }

      // Kiểm tra kích thước file (tối đa 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      const oversizedFiles = files.filter(file => file.size > maxSize);
      
      if (oversizedFiles.length > 0) {
        toast.error('Kích thước file không được vượt quá 5MB');
        return;
      }

      // Log để kiểm tra files
      console.log('Files được chọn:', files.map(f => ({
        name: f.name,
        type: f.type,
        size: f.size
      })));

      // Thêm files vào state
      setSelectedFiles(prev => [...prev, ...files]);

      // Log để kiểm tra state sau khi thêm ảnh
      console.log('Selected files:', files);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      toast.error('Có lỗi xảy ra khi tải file. Vui lòng thử lại!');
    }
  };

  const handleImageDelete = (index) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
  };  
  const prices = [
    {
      name: 'Giá',
      value: 169000
    },
    {
      name: 'Giá 1',
      value: 269000
    },
    {
      name: 'Giá 2',
      value: 369000
    },
    
  ]


  return (
    <div className="min-h-screen bg-gray-100">
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <h2 className="text-xl font-semibold text-blue-600">Thêm Sản Phẩm</h2>
            
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow">
          <div className="grid grid-cols-3 divide-x">
            <div className="col-span-2 p-6">
              <div className="space-y-6">
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Thông Tin</h3>
                  {/* Tên sản phẩm */}
                  <FormControl className="mb-4">
                    <label className="text-sm font-medium text-gray-900 text-center block">Tên Sản Phẩm</label>
                    <input
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Áo thun mùa hè"
                      className="text-gray-900 border-2 border-gray-300 rounded-md p-2"
                    />
                  </FormControl>

                  {/* Mô tả sản phẩm */}  
                  <FormControl>
                    <label className="text-sm font-medium text-gray-700 text-center block">Mô Tả Sản Phẩm</label>
                    <textarea   
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Nhập mô tả sản phẩm"
                      rows={4}
                      className="text-gray-900 w-3/4 border-2 border-gray-300 rounded-md p-2"
                    />
                  </FormControl>
                </section>

                {/* Hình ảnh sản phẩm */}
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
                    Hình Ảnh</h3>
                  <label className="border-2 border-dashed rounded-lg p-8 
                  text-center bg-gray-50 cursor-pointer w-full h-48 
                  flex flex-col items-center justify-center">
                    <FiUpload className="mx-auto h-12 w-12 text-blue-400" />
                    <div className="mt-2">
                      <p className="text-blue-600 font-medium">Thêm Tệp</p>
                      <p className="text-sm text-gray-500">Hoặc kéo và thả tệp</p>
                    </div>
                    <input
                      type="file"
                      multiple
                      className="hidden"
                      onChange={(e) => {
                        handleFileChange(e);
                      }}  
                      
                    />
                  </label>
                </section>

                {/* Giá sản phẩm */}
                <section>
                  <h3 className="text-base font-semibold text-blue-600
                   mb-4 text-left">Giá</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormControl>
                      <input
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Nhập giá"
                        id='price-input'
                        className="text-gray-900 text-center border-2 
                        border-gray-300 rounded-md w-4/5"
                      />
                      <div className='flex gap-5 justify-center'>
                        {prices.map((price, index) => (
                          <button key={index} className='
                          text-sm text-blue-600 
                          text-center block
                          bg-gray-100 p-[5px] rounded-full
                          '
                          onClick={() => handlePriceChange(price.value)}
                          >
                            
                            {price.value.toLocaleString('vi-VN', {
                              style: 'currency',
                              currency: 'VND'
                            })}
                          </button>
                        ))}
                      </div>
                      {/* Kích cỡ sản phẩm */}
                    </FormControl>
                    <div className="mt-4 flex gap-10 flex-wrap ">
                      {selectedFiles.map((file, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={URL.createObjectURL(file)} 
                            alt={`Ảnh ${index + 1}`} 
                            className='w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150'
                          />
                          <button 
                            onClick={() => handleImageDelete(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
                            id='delete-image'
                          >
                            ✕
                          </button>
                        </div>
                      ))}
                    </div>                 
                  </div>

                    {/* Kích cỡ sản phẩm */}
                </section>
                    <div className="">
                      <FormControl className="mb-4">
                        <label className="text-sm font-medium text-gray-700 text-center block">Kích Cỡ</label>
                        <div className="flex flex-wrap gap-2 justify-center">
                          {['S', 'M', 'L', 'XL', 'XXL'].map(size => (
                            <button
                              key={size}
                              onClick={() => handleSizeClick(size)}
                              className={`px-3 py-1 rounded font-medium ${
                                sizes.includes(size)
                                  ? 'bg-blue-100 text-blue-800'
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {size}
                            </button>
                          ))}
                        </div>

                      </FormControl>
                      <FormControl>
                        <label className="text-sm font-medium text-gray-700 text-center block">Màu Sắc</label>
                        <div className="flex pr-4 flex-wrap gap-2 justify-start ">
                          {['Red', 'Blue', 'Green', 'Yellow', 'Purple', 'Black', 'White'].map(color => (
                            <button key={color}
                              onClick={() => handleColorClick(color)}   
                              className={`px-3 py-1 rounded font-medium ${
                                colors.includes(color)  
                                  ? getColorClass(color)  
                                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                              }`}
                            >
                              {color}
                            </button >   
                          ))}
                        </div>
                      </FormControl>
                    </div>
                  

                
              </div>
            </div>
            {/* Danh mục sản phẩm */}
            <div className="p-6 bg-gray-50">
              <div className="space-y-6">
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">Danh Mục</h3>
                  <div className="space-y-2 flex flex-col items-center justify-start">
                    <div className='w-full text-left'>
                    <select 
                      name="category" 
                      id="category" 
                      value={formData.category} 
                      onChange={handleChange}
                      className="text-gray-900 border-2 border-gray-300 rounded-md mb-4 w-full lg:w-1/3 md:w-full"
                    >
                      <option value="" disabled>Chọn danh mục</option>
                      {categories.map(category => (
                        <option key={category._id} value={category._id}>
                          {category.name}
                        </option>
                      ))}
                    </select>
                    </div>
                    <button className="text-blue-600 hover:text-blue-800
                    text-sm font-medium text-left w-full">Tạo Mới</button>
                  </div>
                </section>

                <section
                  name="tags"
                  value={formData.tags }
                  onChange={handleChange}

                >
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">Thẻ</h3>
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-2 justify-center">
                      {formData.tags.map(tag => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-200 rounded-full text-sm
                           text-gray-700 flex items-center lg:w-1/2 md:w-full"
                        >
                          {tag}
                          <button
                            onClick={() => handleRemoveTag(tag)}
                            className="ml-1 text-gray-500 hover:text-gray-700"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>
                    <input
                      placeholder="Thêm thẻ"
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          handleAddTag(e.target.value);
                          e.target.value = '';
                        }
                      }}
                      className="text-gray-900 w-full text-left border-2
                       border-gray-300 rounded-md mb-4 p-2"
                    />
                    <div className="flex flex-wrap gap-2 mt-2 justify-center">
                        <span  className="px-2 py-1 bg-gray-100 rounded-full text-sm text-blue-600">
                          
                          
                          
                        </span>
                      
                    </div>
                  </div>
                </section>
                {/* Cài đặt SEO */}
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Cài Đặt SEO</h3>
                  <FormControl className="mb-4">
                    <label className="text-sm font-medium
                     text-gray-700 text-center block">Tiêu Đề</label>
                    <input
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề"
                      className="text-gray-900 text-center border-2
                       border-gray-300 rounded-md mb-4 lg:w-2/3 md:w-full"
                    />
                  </FormControl>

                  <FormControl>
                    <label className="text-sm font-medium text-gray-700 text-center block">Mô Tả</label>
                    <textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      rows={3}
                      className="text-gray-900 text-center border-2
                       border-gray-300 rounded-md mb-4 lg:w-2/3 md:w-full"
                    />
                  </FormControl>
                  
                </section>
                <div className="space-x-2">
                    <button
                      onClick={onCancel}
                      className="px-4 py-2 text-gray-600 hover:text-gray-800 font-medium"
                    >
                      Hủy
                    </button>
                    <button
                      onClick={handleSubmit}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 font-medium"
                    >
                      Lưu
                    </button>
                  </div>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default AddProduct;
