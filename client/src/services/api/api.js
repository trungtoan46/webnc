import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:3000/api',
  withCredentials: true,
});

// Khởi tạo token từ localStorage nếu có
const token = localStorage.getItem("token");
if (token) {
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
}

// Interceptors for request
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    console.log('Token:', token);
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    // Không set Content-Type mặc định để axios tự động xử lý
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptors for response
api.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn hoặc không hợp lệ
      localStorage.removeItem("token");
      delete api.defaults.headers.common["Authorization"];
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);

// Các hàm gọi API

// Lấy tất cả sản phẩm
const getProducts = async () => {
  try {
    const response = await api.get('/products');
    return response.data;
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
};

// Lấy chi tiết sản phẩm theo ID
const getProductById = async (id) => {
  try {
    const response = await api.get(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    throw error;
  }
};

// Thêm sản phẩm vào giỏ hàng
const addToCart = async ({ productId, quantity }) => {
  try {
    console.log('Adding to cart:', { productId, quantity }); // Kiểm tra dữ liệu gửi đi
    
    const response = await api.post('/cart', {
      productId,
      quantity
    });

    console.log('Response:', response.data); // Kiểm tra phản hồi từ API

    return response.data;
  } catch (error) {
    console.error('Error adding product to cart:', error.response?.data || error.message);
    throw error;
  }
};


// Lấy thông tin giỏ hàng
const getCart = async () => {
  try {
    const response = await api.get('/cart');
    return response.data;
  } catch (error) {
    console.error('Error fetching cart:', error);
    throw error;
  }
};

// Tạo sản phẩm mới (cho admin)
const createProduct = async (productData) => {
  try {
    const response =
    await api.post('/products', productData, 
      {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

// Cập nhật sản phẩm (cho admin)
const updateProduct = async (id, productData) => {
  try {
    const response = await api.put(`/products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Xóa sản phẩm (cho admin)
const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/products/${id}`);
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

export default api;

// Export các hàm API
export {
  getProducts,
  getProductById,
  addToCart,
  getCart,
  createProduct,
  updateProduct,
  deleteProduct
}; 