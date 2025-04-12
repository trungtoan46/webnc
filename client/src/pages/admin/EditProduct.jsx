import React, { useState, useEffect } from 'react';
import { FormControl, TextInput, Select, Textarea } from '@primer/react';
import { FiUpload } from 'react-icons/fi';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../../services/api/api';
import { addProduct, checkProductByName } from '../../services/api/admin';
import convertToVietnameseSlug  from '../../hooks/convertToVietnameseSlug';

const EditProduct = ({ onCancel, productId }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [sizes, setSizes] = useState([]);
  const [colors, setColors] = useState([]);
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    name_slug: '',
    category: '',
    price: '',
    discountPrice: '',
    weight: '',
    hasOptions: false,
    isDigital: false,
    tags: [],
    images: [],
    quantity: 0,
    sizes: [],
    color: []
  });
  
  useEffect(() => {
    const fetchCategories = async () => {
      const response = await api.get('/categories');
      setCategories(response.data);
    };
    fetchCategories();

    if (productId) {
      const fetchProductById = async () => {
        try {
          const response = await api.get(`/products/${productId}`);
          const productData = response.data;
          const detailImageFiles = await Promise.all(productData.detail_images.map(urlToFile));
          const thumbnailFile = await urlToFile(productData.thumbnail || null);
          setThumbnailFile(thumbnailFile);
          setSelectedFiles(detailImageFiles || []);
          setSizes(productData.size || []);
          setColors(productData.color || []);
          setFormData({
            name: productData.name || '',
            name_slug: productData.name_slug || '',
            description: productData.description || '',
            category: productData.category_id || '',
            price: productData.price || '',
            tags: Array.isArray(productData.tags) ? productData.tags : [],   
            images: detailImageFiles,
            thumbnail: thumbnailFile,
            quantity: productData.quantity || 0
          });
        } catch (error) {
          console.error('Lỗi khi tải sản phẩm:', error);
          toast.error('Không thể tải thông tin sản phẩm');
        }
      };
      fetchProductById();
    }
  }, [productId]);

  const urlToFile = async (url) => {
    try {
      const response = await fetch(url);
      const blob = await response.blob();
      const fileName = url.split('/').pop() || ''; // Lấy tên file từ URL hoặc mặc định
      return new File([blob], fileName, { type: blob.type });
    } catch (error) {
      console.error('Error fetching image:', error);
      return null;
    }
  };

  const handlePriceChange = (price) => {
    const priceInput = document.getElementById('price-input');
    if (priceInput.value == price) {
      priceInput.value = '';
    } else {
      priceInput.value = price;
    }
  };
  const handleThumbnailChange = (e) => {
    try {
      const file = e.target.files[0];
      if (!file) return;

      // Kiểm tra loại file
      const validTypes = ['image/jpeg', 'image/png', 'image/jpg'];
      if (!validTypes.includes(file.type)) {
        toast.error('Chỉ chấp nhận file ảnh định dạng JPG, JPEG, PNG');
        return;
      }

      // Kiểm tra kích thước file (tối đa 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        toast.error('Kích thước file không được vượt quá 5MB');
        return;
      }

      setThumbnailFile(file);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      toast.error('Có lỗi xảy ra khi tải file. Vui lòng thử lại!');
    }
  };
  

  const handleDetailImagesChange = (e) => {
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

      setSelectedFiles(prev => [...prev, ...files]);
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      toast.error('Có lỗi xảy ra khi tải file. Vui lòng thử lại!');
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    toast.loading('Đang cập nhật sản phẩm...');
    try {
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

      if (!thumbnailFile) {
        toast.error('Vui lòng thêm ảnh đại diện sản phẩm');
        return;
      }

      if (selectedFiles.length === 0) {
        toast.error('Vui lòng thêm ít nhất một ảnh chi tiết sản phẩm');
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

      // Upload ảnh đại diện
      const thumbnailFormData = new FormData();
      thumbnailFormData.append('images', thumbnailFile);
      
      const thumbnailResponse = await api.post('/images/upload', thumbnailFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      // Upload ảnh chi tiết
      const detailFormData = new FormData();
      selectedFiles.forEach(file => {
        detailFormData.append('images', file);
      });

      const detailResponse = await api.post('/images/upload', detailFormData, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });

      const thumbnailUrl = thumbnailResponse.data.urls[0];
      const detailUrls = detailResponse.data.urls;
      
      // Tạo name_slug
      const name_slug = convertToVietnameseSlug(formData.name.trim());
      
      // Kiểm tra tên sản phẩm đã tồn tại chưa
      try {
        const existingProductResponse = await checkProductByName(name_slug);
        
        // API trả về null nếu không tìm thấy, hoặc đối tượng sản phẩm nếu tìm thấy
        if (existingProductResponse && existingProductResponse._id && 
            existingProductResponse._id !== productId) {
          toast.dismiss(); // Đóng toast loading
          toast.error('Tên sản phẩm đã tồn tại, vui lòng chọn tên khác');
          return; // Dừng xử lý
        }
      } catch (error) {
        console.error('Lỗi khi kiểm tra tên sản phẩm:', error);
        // Không return ở đây, tiếp tục với quá trình cập nhật
      }

      // Chuẩn bị dữ liệu sản phẩm
      const productData = {
        name: formData.name.trim(),
        name_slug: name_slug,
        description: formData.description.trim(),
        price: Number(formData.price),
        category_id: formData.category,
        size: Array.isArray(sizes) ? sizes.join(',') : sizes,
        color: Array.isArray(colors) ? colors.join(',') : colors,
        quantity: Number(formData.quantity) || 0,
        is_active: true,
        tags: formData.tags.filter(tag => tag.trim()),
        thumbnail: thumbnailUrl,
        detail_images: detailUrls
      };
      console.log(productData);

      // Gọi API 
      await api.put(`/admin/products/${productId}`, productData);
      
      // Hiển thị thông báo thành công
      toast.dismiss();
      toast.success('Cập nhật sản phẩm thành công!');
    } catch (error) {
      toast.dismiss();
      console.error('Lỗi chi tiết:', error.response?.data || error.message);
      toast.error(error.response?.data?.message || error.message || 'Có lỗi xảy ra khi cập nhật sản phẩm');
    }
  };

  const clearInfo = () => {
    setFormData({
      name: '',
      description: '',
      name_slug: '',
      category: '',
      price: '',
      discountPrice: '',
      weight: '',
      hasOptions: false,
      isDigital: false,
      tags: [],
      images: []
    });
    setThumbnailFile(null);
    setSelectedFiles([]);
    setSizes([]);
    setColors([]);
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

    if (baseColor === "white") return "bg-green-100 text-black border-2 border-gray-300";
    if (baseColor === "black") return "bg-black text-white border-2 border-gray-300";

    return `bg-${baseColor}-100 text-${baseColor}-500 border border-gray-300`;
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
    }
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
            <h2 className="text-xl font-semibold text-blue-600">Cập Nhật Sản Phẩm</h2>
            
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
                  <FormControl>
                    <FormControl.Label
                    sx={{
                      color: "#2563eb",
                      marginBottom: "10px"
                    }}
                    >Tên Sản Phẩm</FormControl.Label>
                    <TextInput
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Áo thun mùa hè"
                      sx={
                        {
                          "& input": {
                            color: "#1F2937",
                            textAlign: "left",
                            padding: "4px",
                            border: "2px solid #d1d5db",
                            borderRadius: "8px",
                          }
                        }
                      }
                    />
                  </FormControl>

                  {/* Mô tả sản phẩm */}  
                  <FormControl>
                    <FormControl.Label
                    sx={{
                      color: "#2563eb",
                      marginBottom: "10px",
                      marginTop: "10px" 
                    }}
                    >Mô Tả Sản Phẩm</FormControl.Label>
                    <Textarea   
                      name="description"
                      value={formData.description}
                      onChange={handleChange}
                      placeholder="Nhập mô tả sản phẩm"
                      rows={4}
                      sx={
                        {
                          "& textarea": {
                            color: "#1F2937",
                            textAlign: "left",
                            border: "2px solid #d1d5db",
                            borderRadius: "8px",
                            padding: "10px"
                          }
                        }
                      }
                    />
                  </FormControl>
                </section>

                {/* Hình ảnh sản phẩm */}
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
                    Hình Ảnh Đại Diện</h3>
                  <label className="border-2 border-dashed rounded-lg p-8 
                  text-center bg-gray-50 cursor-pointer w-full h-36
                  flex flex-col items-center justify-center">
                    <FiUpload className="mx-auto h-12 w-12 text-blue-400" />
                    <div className="mt-2">
                      <p className="text-blue-600 font-medium">Thêm Tệp</p>
                      <p className="text-sm text-gray-500">Hoặc kéo và thả tệp</p>
                    </div>
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleThumbnailChange}
                    />
                  </label>
                  {thumbnailFile && (
                    <div className="mt-4 relative group w-24 h-24">
                      <img 
                        src={URL.createObjectURL(thumbnailFile)} 
                        alt="Ảnh đại diện" 
                        className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
                      />
                      <button 
                          onClick={() => setThumbnailFile(null)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
                        >
                          ✕
                        </button>
                      
                    </div>
                  )}
                </section>
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-left">
                    Hình Ảnh Chi Tiết</h3>
                  <label className="border-2 border-dashed rounded-lg p-8 
                  text-center bg-gray-50 cursor-pointer w-full h-36
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
                      onChange={handleDetailImagesChange}
                    />
                  </label>
                  <div className="mt-4 flex gap-10 flex-wrap">
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="relative group">
                        <img 
                          src={URL.createObjectURL(file)} 
                          alt={`Ảnh ${index + 1}`} 
                          className="w-24 h-24 object-cover rounded-md cursor-pointer hover:scale-150 transition-transform group-hover:scale-150"
                        />
                        <button 
                          onClick={() => handleImageDelete(index)}
                          className="absolute top-1 right-1 bg-red-500 text-white w-6 h-6 flex items-center justify-center rounded-full text-sm font-bold shadow-md transition-transform group-hover:translate-x-[50%] group-hover:translate-y-[-50%] group-hover:scale-150"
                        >
                          ✕
                        </button>
                      </div>
                    ))}
                  </div>
                </section>

                {/* Giá sản phẩm */}
                <section>
                  <h3 className="text-base font-semibold text-blue-600
                   mb-4 text-left">Giá</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <FormControl id="price-input">
                      <FormControl.Label
                      sx={{
                        color: "#2563eb",
                        marginBottom: "10px"
                      }}
                      >Giá Sản Phẩm</FormControl.Label>
                      <TextInput
                        name="price"
                        type="number"
                        value={formData.price}
                        onChange={handleChange}
                        placeholder="Nhập giá"
                        sx={
                          {
                            "& input":{
                                color: "#1F2937",
                                textAlign: "center",
                                border: "2px solid #d1d5db",
                                borderRadius: "8px",
                            },
                            width: "80%"
                          }
                        }
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
                    <FormControl>
                      <FormControl.Label
                      sx={{
                        color: "#2563eb",
                        marginBottom: "10px"
                      }}
                      >Số Lượng</FormControl.Label>
                      <TextInput
                        name="quantity"
                        type="number"
                        value={formData.quantity}
                        onChange={handleChange}
                        placeholder="Nhập số lượng"
                        sx={
                          {
                            "& input":{
                                color: "#1F2937",
                                textAlign: "center",
                                border: "2px solid #d1d5db",
                                borderRadius: "8px",
                            },
                            width: "80%"
                          }
                        }
                      />
                    </FormControl>
                  </div>

                    {/* Kích cỡ sản phẩm */}
                </section>
                    <div className="">
                      <FormControl>
                        <FormControl.Label
                        sx={{
                          color: "#2563eb",
                          marginBottom: "10px"
                        }}
                        >Kích Cỡ</FormControl.Label>
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
                        <FormControl.Label
                        sx={{
                          color: "#2563eb",
                          marginBottom: "10px",
                          marginTop: "10px"
                        }}
                        >Màu Sắc</FormControl.Label>
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
                  <FormControl>
                    <FormControl.Label>Danh Mục</FormControl.Label>
                    <Select 
                      name="category" 
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
                    </Select>
                  </FormControl>
                </section>

                <section>
                  <FormControl>
                    <FormControl.Label
                    sx={{
                        color: "#2563eb"
                    }}
                    >
                        Thẻ
                    </FormControl.Label>
                    <div className="space-y-2">
                      <div className="flex flex-wrap gap-2 justify-center mb-2">
                        {formData.tags.map(tag => (
                          <span
                            key={tag}
                            className="px-2 py-1 bg-gray-200 rounded-full text-sm text-gray-700 flex items-center"
                            
                          >

                            {tag}
                            <button
                              onClick={() => handleRemoveTag(tag)}
                              className="ml-1 text-gray-500 hover:text-gray-700"
                              sx={{
                                "& button": {
                                  color: "#1F2937",
                                  textAlign: "left",
                                  padding: "4px",
                                  border: "2px solid #d1d5db",
                                  borderRadius: "8px",
                                }
                              }}
                            >
                              ×
                            </button>
                          </span>
                        ))}
                      </div>
                      <TextInput
                        placeholder="Thêm thẻ"
                        onKeyPress={(e) => {
                          if (e.key === 'Enter') {
                            handleAddTag(e.target.value);
                            e.target.value = '';
                          }
                        }}
                        sx={{
                          "& input": {
                            padding: "4px",
                            border: "2px solid #d1d5db",
                            borderRadius: "8px",
                            textAlign: "left",
                            color: "#1F2937",
                          }
                        }}
                      />
                    </div>
                  </FormControl>
                </section>
                <section>
                  <h3 className="text-base font-semibold text-blue-600 mb-4 text-center">Cài Đặt SEO</h3>
                  <FormControl>
                    <FormControl.Label
                    sx={{
                        color: "#2563eb",
                        marginBottom: "10px",
                        marginTop: "10px"
                    }}
                    >
                        Tiêu Đề SEO
                    </FormControl.Label>
                    <TextInput
                      name="seoTitle"
                      value={formData.seoTitle}
                      onChange={handleChange}
                      placeholder="Nhập tiêu đề"
                      sx={{
                        "& input": {
                          color: "#1F2937",
                          textAlign: "left",
                          padding: "4px",
                          border: "2px solid #d1d5db",
                          borderRadius: "8px",
                        }
                      }}
                    />
                  </FormControl>

                  <FormControl>
                    <FormControl.Label sx={{
                        color: "#2563eb",
                        margin: "10px"
                    }}>Mô Tả SEO</FormControl.Label>
                    <Textarea
                      name="seoDescription"
                      value={formData.seoDescription}
                      onChange={handleChange}
                      rows={3}
                      className="text-gray-900 text-center border-2 border-gray-300 rounded-md mb-4 lg:w-2/3 md:w-full"
                    />
                  </FormControl>
                </section>
                {/* Cài đặt SEO */}
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

export default EditProduct;
