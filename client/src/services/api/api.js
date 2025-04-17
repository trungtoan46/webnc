import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
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

// Lấy tất cả sản phẩm với phân trang
const getProductsWithPagination = async (page = 1, limit = 12) => {
  try {
    const response = await api.get(`/products?page=${page}&limit=${limit}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching products with pagination:', error);
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
    const response = await api.post('/cart', {
      productId,
      quantity
    });
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
    const response = await api.post('/admin/products', productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
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
    const response = await api.put(`/admin/products/${id}`, productData, {
      headers: {
        'Content-Type': 'multipart/form-data',
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error updating product with ID ${id}:`, error);
    throw error;
  }
};

// Xóa sản phẩm (cho admin)
const deleteProduct = async (id) => {
  try {
    const response = await api.delete(`/admin/products/${id}`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    });
    return response.data;
  } catch (error) {
    console.error(`Error deleting product with ID ${id}:`, error);
    throw error;
  }
};

// lấy event
const getEvents = async () => {
  try {
    const response = await api.get('/events');
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};




export default api;

export {
  getProducts,
  getProductsWithPagination,
  getProductById,
  addToCart,
  getCart,
  createProduct,
  updateProduct,
  deleteProduct,
  getEvents
}; 