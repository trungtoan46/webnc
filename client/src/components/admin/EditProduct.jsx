import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Heading, Text, Flex, Spinner, FormControl } from '@primer/react';
import { FiArrowLeft } from 'react-icons/fi';
import ProductForm from './ProductForm';
import ProductOptions from './ProductOptions';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    discount: '',
    category: '',
    sizes: [],
    colors: []
  });
  const [thumbnailFile, setThumbnailFile] = useState(null);
  const [detailFiles, setDetailFiles] = useState([]);
  const [variants, setVariants] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`/api/products/${id}`);
        const data = await response.json();
        setProduct(data);
        setFormData({
          name: data.name,
          description: data.description,
          price: data.price,
          discount: data.discount,
          category: data.category,
          sizes: data.sizes || [],
          colors: data.colors || []
        });
        setVariants(data.variants || []);
      } catch (error) {
        console.error('Error fetching product:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSizeClick = (size) => {
    setFormData(prev => ({
      ...prev,
      sizes: prev.sizes.includes(size)
        ? prev.sizes.filter(s => s !== size)
        : [...prev.sizes, size]
    }));
  };

  const handleColorClick = (color) => {
    setFormData(prev => ({
      ...prev,
      colors: prev.colors.includes(color)
        ? prev.colors.filter(c => c !== color)
        : [...prev.colors, color]
    }));
  };

  const getColorClass = (color) => {
    const colorMap = {
      'Red': 'bg-red-100 text-red-800',
      'Blue': 'bg-blue-100 text-blue-800',
      'Green': 'bg-green-100 text-green-800',
      'Yellow': 'bg-yellow-100 text-yellow-800',
      'Purple': 'bg-purple-100 text-purple-800',
      'Black': 'bg-gray-800 text-white',
      'White': 'bg-white text-gray-800 border border-gray-300'
    };
    return colorMap[color] || 'bg-gray-100 text-gray-800';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach(key => {
        if (key === 'sizes' || key === 'colors') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });

      if (thumbnailFile) {
        formDataToSend.append('thumbnail', thumbnailFile);
      }

      detailFiles.forEach((file) => {
        formDataToSend.append(`detailImages`, file);
      });

      const response = await fetch(`/api/products/${id}`, {
        method: 'PUT',
        body: formDataToSend
      });

      if (response.ok) {
        navigate('/admin/products');
      } else {
        console.error('Error updating product');
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  if (loading) {
    return (
      <Box p={4}>
        <Spinner size="large" />
      </Box>
    );
  }

  if (!product) {
    return (
      <Box p={4}>
        <Text>Product not found</Text>
      </Box>
    );
  }

  return (
    <Box p={4}>
      <Flex alignItems="center" mb={4}>
        <Button
          variant="invisible"
          onClick={() => navigate('/admin/products')}
          sx={{ mr: 2 }}
        >
          <FiArrowLeft />
        </Button>
        <Heading>Edit Product</Heading>
      </Flex>

      <form onSubmit={handleSubmit}>
        <ProductForm
          formData={formData}
          handleInputChange={handleInputChange}
          thumbnailFile={thumbnailFile}
          setThumbnailFile={setThumbnailFile}
          detailFiles={detailFiles}
          setDetailFiles={setDetailFiles}
        />

        <ProductOptions
          sizes={formData.sizes}
          colors={formData.colors}
          handleSizeClick={handleSizeClick}
          handleColorClick={handleColorClick}
          getColorClass={getColorClass}
        />

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
                    formData.sizes.includes(size)
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
                    formData.colors.includes(color)  
                      ? getColorClass(color)  
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {color}
                </button >   
              ))}
            </div>
          </FormControl>

          {/* Variants Management Section */}
          {formData.sizes.length > 0 && formData.colors.length > 0 && (
            <div className="mt-6">
              <h3 className="text-base font-semibold text-blue-600 mb-4">
                Quản Lý Số Lượng Theo Kích Cỡ & Màu Sắc
              </h3>
              <div className="space-y-4">
                {formData.sizes.map(size => (
                  <div key={size} className="border rounded-lg p-4">
                    <h4 className="font-medium text-gray-700 mb-3">Kích cỡ: {size}</h4>
                    <div className="grid grid-cols-2 gap-4">
                      {formData.colors.map(color => {
                        const variant = variants.find(v => v.size === size && v.color === color) || {
                          size,
                          color,
                          quantity: 0
                        };
                        return (
                          <div key={`${size}-${color}`} className="flex items-center gap-2">
                            <div className={`w-6 h-6 rounded-full ${getColorClass(color)}`}></div>
                            <span className="text-sm text-gray-600">{color}</span>
                            <input
                              type="number"
                              min="0"
                              value={variant.quantity}
                              onChange={(e) => {
                                const newQuantity = parseInt(e.target.value) || 0;
                                setVariants(prev => {
                                  const existingVariant = prev.find(v => v.size === size && v.color === color);
                                  if (existingVariant) {
                                    return prev.map(v => 
                                      v.size === size && v.color === color 
                                        ? { ...v, quantity: newQuantity }
                                        : v
                                    );
                                  }
                                  return [...prev, { size, color, quantity: newQuantity }];
                                });
                              }}
                              className="w-20 px-2 py-1 border rounded text-center"
                            />
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <Button type="submit" variant="primary" mt={4}>
          Update Product
        </Button>
      </form>
    </Box>
  );
};

export default EditProduct; 