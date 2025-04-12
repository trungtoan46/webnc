import api from './api';

export const addProduct = async (productData) => {
  try {
    const response = await api.post('/admin/products', productData, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    return response.data;
  } catch (error) {
    console.error('Error creating product:', error);
    throw error;
  }
};

export const getProducts = async () => {
    const response = await api.get('/admin/products');
    return response.data;
};

export const updateProduct = async (id, product) => {
    const response = await api.put(`/admin/products/${id}`, product);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await api.delete(`/admin/products/${id}`);
    return response.data;
};

export const getCategories = async () => {
    const response = await api.get('/categories');
    return response.data;
};

export const checkProductByName = async (name_slug) => {
    const response = await api.get(`/admin/products/check-name/${name_slug}`);
    return response.data;
};














