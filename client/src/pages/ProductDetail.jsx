import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import api from '../services/api/api';
import { toast } from 'react-toastify';
import { useCart } from '../context/CartContext';
import '@fortawesome/fontawesome-free/css/all.min.css';
import PromotionBox from '../components/ui/PromotionBox';
import ProductImage from '../components/ui/ProductImage';
import Voucher from '../components/common/Voucher';
import SelectSize from '../components/common/SelectSize';

const ProductDetail = () => {
  const { addToCart } = useCart();
  const { name_slug } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null); 
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSize, setSelectedSize] = useState('');
  const [selectedColor, setSelectedColor] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  const [zoomed, setZoomed] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [showVoucher, setShowVoucher] = useState(false);
  const [showSizeGuide, setShowSizeGuide] = useState(false);
  
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // Sử dụng API endpoint với tên sản phẩm slug
        const response = await api.get(`/products/name/${name_slug}`);
        if (response.data) {
          setProduct(response.data);
          // Không tự động thiết lập size và color mặc định
          // để người dùng có thể tự chọn
        }
        setLoading(false);
      } catch (err) {
        console.error('Lỗi khi tải thông tin sản phẩm:', err);
        setError('Không thể tải thông tin sản phẩm. Vui lòng thử lại sau.');
        setLoading(false);
      }
    };

    fetchProduct();
    window.scrollTo(0, 0);
  }, [name_slug]);

  const handleSizeSelect = (size) => {
    // Nếu đang chọn size này, hủy chọn (set về rỗng)
    if (selectedSize === size) {
      setSelectedSize('');
    } else {
      setSelectedSize(size);
      
      // Nếu đã chọn color, kiểm tra xem variant có tồn tại không
      if (selectedColor && product.variants) {
        const selectedVariant = product.variants.find(
          v => v.size === size && v.color === selectedColor
        );
        
        // Nếu variant không tồn tại hoặc hết hàng, thông báo cho người dùng
        if (!selectedVariant || selectedVariant.stock <= 0) {
          toast.warning(`Sản phẩm ${size} - ${selectedColor} hiện không có sẵn`);
          // Có thể xóa color đã chọn
          setSelectedColor('');
        }
      }
    }
  };

  const handleColorSelect = (color) => {
    // Nếu đang chọn color này, hủy chọn (set về rỗng)
    if (selectedColor === color) {
      setSelectedColor('');
    } else {
      setSelectedColor(color);
      
      // Nếu đã chọn size, kiểm tra xem variant có tồn tại không
      if (selectedSize && product.variants) {
        const selectedVariant = product.variants.find(
          v => v.size === selectedSize && v.color === color
        );
        
        // Nếu variant không tồn tại hoặc hết hàng, thông báo cho người dùng
        if (!selectedVariant || selectedVariant.stock <= 0) {
          toast.warning(`Sản phẩm ${selectedSize} - ${color} hiện không có sẵn`);
          // Có thể xóa size đã chọn
          setSelectedSize('');
        }
      }
    }
  };

  const handleImageMouseEnter = () => {
    setZoomed(true);
  };

  const handleImageMouseLeave = () => {
    setZoomed(false);
  };

  const handleImageMouseMove = (e) => {
    const { left, top, width, height } = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - left) / width) * 100;
    const y = ((e.clientY - top) / height) * 100;
    setMousePosition({ x, y });
  };

  const toggleVoucher = () => {
    setShowVoucher(!showVoucher);
  };
  
  const toggleSizeGuide = (e) => {
    e.preventDefault(); // Ngăn chặn hành vi mặc định của thẻ a
    setShowSizeGuide(!showSizeGuide);
  };

  const handleAddToCart = () => {
    if (!product) {
      toast.error('Thông tin sản phẩm không khả dụng.');
      return;
    }
  
    if (!selectedSize) {
      toast.warning('Vui lòng chọn kích thước.');
      return;
    }
    
    if (!selectedColor) {
      toast.warning('Vui lòng chọn màu sắc.');
      return;
    }
  
    if (quantity < 1) {
      toast.warning('Số lượng phải ít nhất là 1.');
      return;
    }
    
    // Kiểm tra xem variant đã chọn có tồn tại không
    if (product.variants && Array.isArray(product.variants)) {
      const selectedVariant = product.variants.find(
        v => v.size === selectedSize && v.color === selectedColor
      );
      
      if (!selectedVariant) {
        toast.error(`Sản phẩm với kích thước ${selectedSize} và màu ${selectedColor} không tồn tại.`);
        return;
      }
      
      if (selectedVariant.stock <= 0) {
        toast.error(`Sản phẩm với kích thước ${selectedSize} và màu ${selectedColor} đã hết hàng.`);
        return;
      }
      
      if (selectedVariant.stock < quantity) {
        toast.warning(`Chỉ còn ${selectedVariant.stock} sản phẩm với kích thước ${selectedSize} và màu ${selectedColor}. Vui lòng giảm số lượng.`);
        return;
      }
    }
  
    try {
      // Thêm sản phẩm vào giỏ hàng với thông tin đã chọn
      addToCart({
        ...product,
        selectedSize,
        selectedColor,
        quantity
      });
  
      toast.success('Thêm sản phẩm vào giỏ hàng thành công!');
    } catch (err) {
      console.error('Lỗi khi thêm vào giỏ hàng:', err);
      toast.error('Không thể thêm sản phẩm vào giỏ hàng. Vui lòng thử lại.');
    }
  };
  
  const handleBuyNow = () => {
    if (!selectedSize) {
      toast.warning('Vui lòng chọn kích thước.');
      return;
    }
    
    if (!selectedColor) {
      toast.warning('Vui lòng chọn màu sắc.');
      return;
    }
    
    handleAddToCart();
    navigate('/cart');
  };
  
  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
    if (!isFavorite) {
      toast.success('Đã thêm vào danh sách yêu thích!');
    } else {
      toast.info('Đã xóa khỏi danh sách yêu thích!');
    }
  };

  if (loading) return (
    <div className="text-center py-16">
      <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4"></div>
      <p className="text-gray-600">Đang tải thông tin sản phẩm...</p>
    </div>
  );
  
  if (error) return (
    <div className="text-center py-16">
      <div className="text-red-500 text-xl mb-4">⚠️</div>
      <p className="text-red-500">
        {error}
      </p>
      <button 
        onClick={() => navigate('/products')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-medium"
      >
        Quay lại trang sản phẩm
      </button>
    </div>
  );
  
  if (!product) return (
    <div className="text-center py-16">
      <p className="text-gray-600">Không tìm thấy sản phẩm</p>
      <button 
        onClick={() => navigate('/products')}
        className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 font-medium"
      >
        Quay lại trang sản phẩm
      </button>
    </div>
  );
  
  // Xử lý dữ liệu sản phẩm - cải thiện cách xử lý mảng hình ảnh
  let allImages = [];
  
  // Thêm ảnh thumbnail nếu có
  if (product.thumbnail) {
    allImages.push(product.thumbnail);
  }
  
  // Thêm các ảnh chi tiết nếu có
  if (product.detail_images) {
    // Log để debug
    console.log('Detail Images Type:', typeof product.detail_images);
    console.log('Detail Images Value:', product.detail_images);
    
    // Nếu detail_images là mảng, thêm từng ảnh vào
    if (Array.isArray(product.detail_images)) {
      // Đảm bảo loại bỏ các giá trị null, undefined hoặc chuỗi rỗng
      const validDetailImages = product.detail_images.filter(img => img && img !== '');
      allImages = [...allImages, ...validDetailImages];
      console.log('Valid Detail Images:', validDetailImages);
    } 
    // Nếu detail_images là chuỗi, thêm trực tiếp
    else if (typeof product.detail_images === 'string' && product.detail_images !== '') {
      allImages.push(product.detail_images);
    }
  }
  
  // Đảm bảo không có ảnh trùng lặp và lọc ra các ảnh null hoặc undefined
  const images = [...new Set(allImages)].filter(Boolean);
  
  // Debug log - kiểm tra mảng hình ảnh
  console.log('Thumbnail:', product.thumbnail);
  console.log('Detail Images:', product.detail_images);
  console.log('All Images:', allImages);
  console.log('Final Images Array:', images);
  
  // Lấy size và color từ variants của sản phẩm
  let availableSizes = [];
  let availableColors = [];
  
  // Lấy các size và color có sẵn từ variants
  if (product.variants && Array.isArray(product.variants)) {
    // Lấy tất cả các variants có stock > 0
    const availableVariants = product.variants.filter(v => v.stock > 0);
    
    // Lấy danh sách các size và color có sẵn
    availableSizes = [...new Set(availableVariants.map(v => v.size))];
    availableColors = [...new Set(availableVariants.map(v => v.color))];
    
    console.log('Available Variants:', availableVariants);
    console.log('Available Sizes:', availableSizes);
    console.log('Available Colors:', availableColors);
  } else {
    // Nếu không có variants, sử dụng size và color từ sản phẩm
    availableSizes = product.size ? (typeof product.size === 'string' ? product.size.split(',') : product.size) : [];
    availableColors = product.color ? (typeof product.color === 'string' ? product.color.split(',') : product.color) : [];
  }
  
  // Sử dụng các biến này thay vì các biến cũ
  const sizes = availableSizes;
  const colors = availableColors;
  
  const discountPrice = product.discountPrice || 0;
  const discount = discountPrice > 0 ? Math.round(((product.price - discountPrice) / product.price) * 100) : 0;
  
  // Xác định loại sản phẩm để hiển thị bảng size phù hợp
  const productCategory = product.category?.toLowerCase()?.includes('quan') ? 'quan' : 'ao';
  
  // Danh sách mã giảm giá tùy chỉnh dựa trên sản phẩm
  const productCoupons = [
    { code: 'FREESHIP', discount: 'Miễn phí vận chuyển', minOrder: 500000, exp: '31/12/2023' },
    { code: `${product.category?.toUpperCase() || 'SALE'}10`, discount: `Giảm 10% cho ${product.category || 'sản phẩm'}`, minOrder: 300000, exp: '31/12/2023' },
    { code: 'SALE50K', discount: 'Giảm 50,000đ', minOrder: 200000, exp: '31/12/2023' },
    { code: 'NEW20', discount: 'Giảm 20% cho khách hàng mới', minOrder: 0, exp: '31/12/2023' },
  ];
  
  return (
    <div className="container mx-auto px-4 py-8 font-[Mulish]">
      {/* Breadcrumbs */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 py-2 border-b border-gray-200">
        <ol className="flex items-center text-sm text-gray-600 flex-wrap">
          <li className="flex items-center">
            <Link to="/" className="hover:text-blue-500 transition-colors">
              <i className="fas fa-home mr-1"></i>
              Trang chủ
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          <li className="flex items-center">
            <Link to="/products" className="hover:text-blue-500 transition-colors">
              Sản phẩm
            </Link>
            <span className="mx-2 text-gray-400">/</span>
          </li>
          {product?.category_id && (
            <li className="flex items-center">
              <Link 
                to={`/products?category=${product.category_id}`} 
                className="hover:text-blue-500 transition-colors"
              >
                {product.category?.name || 'Danh mục'}
              </Link>
              <span className="mx-2 text-gray-400">/</span>
            </li>
          )}
          <li className="text-blue-500 font-medium truncate max-w-[200px] md:max-w-xs">
            {product?.name || 'Chi tiết sản phẩm'}
          </li>
        </ol>
        <button 
          onClick={() => navigate(-1)}
          className="mt-2 md:mt-0 ml-auto text-sm text-gray-600 flex items-center hover:text-blue-500 transition-colors"
        >
          <i className="fas fa-arrow-left mr-1"></i>
          Quay lại
        </button>
      </div>
      
      {/* Voucher Component */}
      <Voucher isOpen={showVoucher} onClose={() => setShowVoucher(false)} coupons={productCoupons} />
      
      {/* Size Guide Popup */}
      <SelectSize isOpen={showSizeGuide} onClose={() => setShowSizeGuide(false)} category={productCategory} />
      
      <div className="flex flex-col lg:flex-row -mx-4">
        {/* Phần hình ảnh sản phẩm */}
        <div className="lg:w-3/5 px-4 mb-8 lg:mb-0">
          {/* Main Image with Zoom Effect */}
          <div 
            className="relative overflow-hidden rounded-lg mb-4 bg-white"
            style={{ aspectRatio: '4/3' }}
            onMouseEnter={handleImageMouseEnter}
            onMouseLeave={handleImageMouseLeave}
            onMouseMove={handleImageMouseMove}
          >
            {product.event?  (
              <div className="absolute top-0 left-0 w-full h-full">
                <img 
                  src={product.event.image} 
                  alt={product.event.name} 
                  className= "absolute inset-0 w-full h-full object-cover"
                />
                <img 
                  src={images[activeImage] || 'https://via.placeholder.com/600x400'} 
                  alt={product.name} 
                  className="absolute inset-4 w-[calc(100%-2rem)] h-[calc(100%-2rem)] object-contain z-10"
                  />

              </div>
            ): null}
            <img 
                src={images[activeImage] || 'https://via.placeholder.com/600x400'} 
                alt={product.name} 
                className="w-full h-full object-contain"
              />
            
            
            {/* Zoom overlay */}
            {zoomed && images[activeImage] && (
              <div 
                className="absolute inset-0 bg-no-repeat pointer-events-none"
                style={{
                  backgroundImage: `url(${images[activeImage]})`,
                  backgroundPosition: `${mousePosition.x}% ${mousePosition.y}%`,
                  backgroundSize: '200%',
                }}
              />
            )}
            
            {/* Discount badge */}
            {discount > 0 && (
              <div className="absolute top-4 left-4 bg-red-500 text-white font-bold px-3 py-1 rounded-md">
                -{discount}%
              </div>
            )}
            
            {/* Quick action buttons */}
            <div className="absolute top-4 right-4 flex flex-col gap-2">
              <button 
                onClick={toggleFavorite} 
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
              >
                <i className={`${isFavorite ? 'fas' : 'far'} fa-heart text-red-500`}></i>
              </button>
              <button 
                className="w-10 h-10 rounded-full bg-white shadow-md flex items-center justify-center hover:bg-gray-100 transition-colors"
                onClick={() => window.open(`https://www.facebook.com/sharer/sharer.php?u=${window.location.href}`, '_blank')}
              >
                <i className="fab fa-facebook-f text-blue-600"></i>
              </button>
            </div>
          </div>
          
          {/* Thumbnails Gallery */}
          {images.length > 0 && (
            <div className="grid grid-cols-5 gap-2 mt-4">
              {images.map((img, index) => (
                <div 
                  key={index}
                  className={`cursor-pointer border-2 rounded-lg overflow-hidden bg-white transition-all ${
                    activeImage === index 
                      ? 'border-blue-500 ring-2 ring-blue-300 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                  onClick={() => setActiveImage(index)}
                >
                  <div className="aspect-square relative">
                    <img 
                      src={img} 
                      alt={`${product.name} - ảnh ${index + 1}`} 
                      className="w-full h-full object-contain p-1"
                      onError={(e) => {
                        console.error(`Error loading image: ${img}`);
                        e.target.src = 'https://via.placeholder.com/100x100?text=Image+Error';
                      }}
                    />
                    {index === 0 && (
                      <div className="absolute bottom-0 left-0 right-0 text-xs bg-blue-500 text-white p-1 text-center">
                        Chính
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
        
        {/* Phần thông tin sản phẩm */}
        <div className="lg:w-2/5 px-4">
          <div className="pb-6 mb-6 border-b border-gray-200">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-2xl font-bold text-gray-800">{product.name}</h1>
            </div>

            <div className='mb-4'>
              <div className='flex items-center gap-2'>
                <div className='flex items-center gap-1'>
                  <p className="text-sm text-gray-500">Thương hiệu: </p> 
                  <p className="text-sm font-bold text-blue-500">{product.brand? product.brand : 'N/A'}</p>
                </div>
                <div className='flex items-center gap-1'>
                  <p className="text-sm text-gray-500">Mã sản phẩm: </p> 
                  <p className="text-sm font-bold text-blue-500">{product.code? product.code : 'N/A'}</p>
                </div>
              </div>
            </div>
            
            <div className="mb-4">
              <div className="flex items-baseline space-x-2">
                <span className="text-xl font-semibold text-[#155BF6]">
                  {(discountPrice > 0 ? discountPrice : product.price).toLocaleString('vi-VN')}₫
                </span>
                {discountPrice > 0 && (
                  <span className="text-lg text-gray-500 line-through">
                    {product.price.toLocaleString('vi-VN')}₫
                  </span>
                )}
                {discount > 0 && (
                  <span className="text-sm bg-red-100 text-red-600 px-2 py-1 rounded">
                    Tiết kiệm: {(product.price - discountPrice).toLocaleString('vi-VN')}₫
                  </span>
                )}
              </div>
              {product.quantity < 10 && product.quantity > 0 && (
                <p className="text-orange-500 text-sm mt-2">
                  Chỉ còn {product.quantity} sản phẩm
                </p>
              )}
              {product.quantity <= 0 && (
                <p className="text-red-500 text-sm mt-2 font-bold">
                  Hết hàng
                </p>
              )}
            </div>
          </div>
          
          {/* Khuyến mãi */}
          <div className="mb-6 bg-gray-50 rounded-lg overflow-hidden">
            <div className="p-4">
              <PromotionBox product={product} isCart={false} />
            </div>
            <div className="bg-gray-100 p-3 text-center">
              <button 
                onClick={toggleVoucher} 
                className="text-blue-600 font-medium hover:text-blue-800 transition-colors flex items-center justify-center gap-2 w-full"
              >
                <i className="fas fa-ticket-alt"></i>
                <span>Xem tất cả mã khuyến mãi</span>
                <i className="fas fa-chevron-right text-xs"></i>
              </button>
            </div>
          </div>
          
          {/* Kích thước */}
          {sizes.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-700 text-sm uppercase">Kích thước:</h3>
                {selectedSize && (
                  <span className="text-sm text-blue-500">
                    Đã chọn: {selectedSize}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {sizes.map((size) => {
                  // Kiểm tra số lượng tồn kho của size này
                  let stockForSize = 0;
                  let isAvailable = true;
                  
                  if (product.variants && Array.isArray(product.variants)) {
                    // Nếu đã chọn màu, kiểm tra variant cụ thể
                    if (selectedColor) {
                      const variant = product.variants.find(v => v.size === size && v.color === selectedColor);
                      if (variant) {
                        stockForSize = variant.stock;
                        isAvailable = variant.stock > 0;
                      } else {
                        isAvailable = false;
                      }
                    } else {
                      // Nếu chưa chọn màu, kiểm tra tổng tồn kho cho size này
                      const variantsWithSize = product.variants.filter(v => v.size === size);
                      stockForSize = variantsWithSize.reduce((total, v) => total + (v.stock || 0), 0);
                      isAvailable = stockForSize > 0;
                    }
                  }
                  
                  return (
                    <button
                      key={size}
                      disabled={!isAvailable}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedSize === size
                          ? 'border-blue-500 bg-blue-50 text-blue-500 font-medium'
                          : isAvailable
                            ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                            : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed opacity-70'
                      }`}
                      onClick={() => isAvailable && handleSizeSelect(size)}
                    >
                      <span className="block">{size}</span>
                      {!isAvailable && (
                        <span className="text-xs text-red-500 block">Hết hàng</span>
                      )}
                      {isAvailable && stockForSize <= 5 && (
                        <span className="text-xs text-orange-500 block">Còn {stockForSize}</span>
                      )}
                    </button>
                  );
                })}
              </div>
              <div className="mt-2">
                <a 
                  href="#" 
                  className="text-blue-500 text-sm underline flex items-center gap-1 w-fit"
                  onClick={toggleSizeGuide}
                >
                  <i className="fas fa-ruler mr-1"></i>
                  Hướng dẫn chọn size
                </a>
              </div>
            </div>
          )}
          
          {/* Màu sắc */}
          {colors.length > 0 && (
            <div className="mb-6">
              <div className="flex justify-between items-center mb-2">
                <h3 className="font-bold text-gray-700 text-sm uppercase">Màu sắc:</h3>
                {selectedColor && (
                  <span className="text-sm text-blue-500">
                    Đã chọn: {selectedColor}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-2">
                {colors.map((color) => {
                  // Kiểm tra số lượng tồn kho của màu này
                  let stockForColor = 0;
                  let isAvailable = true;
                  
                  if (product.variants && Array.isArray(product.variants)) {
                    // Nếu đã chọn size, kiểm tra variant cụ thể
                    if (selectedSize) {
                      const variant = product.variants.find(v => v.color === color && v.size === selectedSize);
                      if (variant) {
                        stockForColor = variant.stock;
                        isAvailable = variant.stock > 0;
                      } else {
                        isAvailable = false;
                      }
                    } else {
                      // Nếu chưa chọn size, kiểm tra tổng tồn kho cho màu này
                      const variantsWithColor = product.variants.filter(v => v.color === color);
                      stockForColor = variantsWithColor.reduce((total, v) => total + (v.stock || 0), 0);
                      isAvailable = stockForColor > 0;
                    }
                  }
                  
                  return (
                    <button
                      key={color}
                      disabled={!isAvailable}
                      className={`px-4 py-2 border rounded-md transition-all ${
                        selectedColor === color
                          ? 'border-blue-500 bg-blue-50 text-blue-500 font-medium'
                          : isAvailable
                            ? 'border-gray-300 text-gray-700 hover:border-gray-400'
                            : 'border-gray-200 text-gray-400 bg-gray-50 cursor-not-allowed opacity-70'
                      }`}
                      onClick={() => isAvailable && handleColorSelect(color)}
                    >
                      <span className="block">{color}</span>
                      {!isAvailable && (
                        <span className="text-xs text-red-500 block">Hết hàng</span>
                      )}
                      {isAvailable && stockForColor <= 5 && (
                        <span className="text-xs text-orange-500 block">Còn {stockForColor}</span>
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          )}
          {/* Hiển thị thông báo nếu chưa chọn size hoặc color */}
          {(!selectedSize || !selectedColor) && (
            <div className="mb-4 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
              <p className="text-sm text-yellow-700">
                {!selectedSize && !selectedColor 
                  ? "Vui lòng chọn kích thước và màu sắc trước khi thêm vào giỏ hàng" 
                  : !selectedSize 
                    ? "Vui lòng chọn kích thước" 
                    : "Vui lòng chọn màu sắc"}
              </p>
            </div>
          )}
          
          {/* Số lượng */}
          <div className="mb-6 flex gap-4">
            <div className="flex items-center border border-gray-300 rounded-md inline-flex">
              <button 
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium"
              >
                -
              </button>
              <input 
                type="number" 
                value={quantity}
                readOnly
                className="w-12 text-center text-black border-x border-gray-300 py-2 bg-white"
              />
              <button 
                onClick={() => setQuantity(quantity + 1)}
                className="px-4 py-2 text-gray-600 hover:bg-gray-100 font-medium"
              >
                +
              </button>
            </div>

            <button 
              onClick={handleAddToCart}
              disabled={product.quantity <= 0 || !selectedSize || !selectedColor}
              className={`flex-1 px-6 py-3 rounded-md font-medium text-center uppercase tracking-wide ${
                product.quantity <= 0 || !selectedSize || !selectedColor
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-blue-100 text-blue-700 hover:bg-blue-200'
              }`}
            >
              <i className="fas fa-shopping-cart mr-2"></i>
              Thêm vào giỏ
            </button>
          </div>
          
          
          
          {/* Nút thêm vào giỏ hàng và mua ngay */}
          <div className="flex flex-col sm:flex-row gap-4">
            
            <button 
              onClick={handleBuyNow}
              disabled={product.quantity <= 0 || !selectedSize || !selectedColor}
              className={`flex-1 px-6 py-3 rounded-md font-medium text-center uppercase tracking-wide ${
                product.quantity <= 0 || !selectedSize || !selectedColor
                  ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                  : 'bg-red-600 text-white hover:bg-red-700'
              }`}
            >
              <i className="fas fa-bolt mr-2"></i>
              Mua ngay
            </button>
          </div>
          
          {/* Gọi điện đặt hàng */}
          <div className="mt-4 text-center">
            <p className="text-gray-600 text-sm">
              <i className="fas fa-phone-alt mr-2 text-blue-500"></i>
              Gọi đặt mua 1800.0000 (7:30 - 22:00)
            </p>
          </div>
          
          {/* Chính sách */}
          <div className="mt-8 grid grid-cols-3 gap-4">
            <div className="text-center">
              <div className="text-blue-500 text-xl mb-1">
                <i className="fas fa-truck"></i>
              </div>
              <p className="text-xs text-gray-600">Giao hàng toàn quốc</p>
            </div>
            <div className="text-center">
              <div className="text-blue-500 text-xl mb-1">
                <i className="fas fa-medal"></i>
              </div>
              <p className="text-xs text-gray-600">Tích điểm với mỗi đơn hàng</p>
            </div>
            <div className="text-center">
              <div className="text-blue-500 text-xl mb-1">
                <i className="fas fa-credit-card"></i>
              </div>
              <p className="text-xs text-gray-600">Giảm 5% khi thanh toán online</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mô tả sản phẩm */}
      <div className="mt-12">
        <div className="border-b border-gray-200">
          <button className="py-3 px-4 border-b-2 border-blue-500 font-medium text-blue-500 uppercase text-sm">
            Mô tả sản phẩm
          </button>
        </div>
        <div className="py-6">
          <div className="prose max-w-none text-gray-700">
            {product.description ? (
              <div dangerouslySetInnerHTML={{ __html: product.description }} />
            ) : (
              <p className="text-gray-500 italic">Nội dung đang được cập nhật</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail; 