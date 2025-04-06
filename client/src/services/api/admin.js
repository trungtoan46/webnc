import api from './api';

export const addProduct = async (product) => {
    const response = await api.post('/admin/products', product, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    });
    console.log(response);
    return response.data;
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














