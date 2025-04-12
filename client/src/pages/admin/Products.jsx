import React, { useState } from 'react';
import { FiPlus, FiEdit2, FiTrash2, FiSearch } from 'react-icons/fi';
import {FormControl, TextInput} from '@primer/react'
import AddProduct from './AddProduct';
import EditProduct from './EditProduct';
import { useEffect } from 'react';
import api from '../../services/api/api';

const Products = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [products, setProducts] = useState([]);
  const [error, setError] = useState(null);
  const [showEditForm, setShowEditForm] = useState(false);
  const [productId, setProductId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: '',
    tags: [],
    images: []
  });
  
  const fetchProducts = async () => {
    try {
      const response = await api.get('/admin/products', {
        
      });
      setProducts(response.data);
    } catch (error) {
      setError('Failed to fetch products' + error.message);
    }
  };  
  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    try {
      // Lấy thông tin sản phẩm trước khi xóa
      const productResponse = await api.get(`/admin/products/${id}`);
      const product = productResponse.data;

      // Xóa ảnh từ Cloudinary
      if (product.thumbnail) {
        try {
          const publicId = getPublicIdFromUrl(product.thumbnail);
          console.log('Xóa thumbnail:', publicId);
          await api.post('/images/remove', { public_id: publicId });
        } catch (error) {
          console.error('Lỗi khi xóa thumbnail:', error);
        }
      }
      
      if (product.images && product.images.length > 0) {
        for (const imageUrl of product.images) {
          try {
            const publicId = getPublicIdFromUrl(imageUrl);
            console.log('Xóa hình ảnh:', publicId);
            await api.post('/images/remove', { public_id: publicId });
          } catch (error) {
            console.error('Lỗi khi xóa hình ảnh:', error);
          }
        }
      }

      // Xóa sản phẩm
      await api.delete(`/admin/products/${id}`);
      setProducts(products.filter(product => product._id !== id));
      fetchProducts();
    } catch (error) {
      setError('Failed to delete product: ' + error.message);
    }
  };

  // Hàm trích xuất public_id từ URL Cloudinary
  const getPublicIdFromUrl = (url) => {
    try {
      // URL có dạng: https://res.cloudinary.com/your-cloud-name/image/upload/v1234567890/folder/filename.jpg
      const parts = url.split('/');
      const filename = parts[parts.length - 1];
      const folderAndFilename = parts[parts.length - 2] + '/' + filename.split('.')[0];
      return folderAndFilename;
    } catch (error) {
      console.error('Lỗi khi trích xuất public_id:', error);
      return null;
    }
  };

  const handleEdit = async (id) => {
    try {
      const response = await api.get(`/admin/products/${id}`);
      setFormData({
        name: response.data.name,
        description: response.data.description, 
        price: response.data.price,
        category: response.data.category_id,
        tags: response.data.tags,
        images: response.data.images,
      });
      setProductId(id);
      setShowEditForm(true);
    } catch (error) {
      setError('Failed to fetch product' + error.message);
    }
  };

  if (error) {
    return <div className='text-center py-10 text-red-500' >Error: {error}</div>;
  }

  if (showAddForm) {
    return <AddProduct onCancel={() => setShowAddForm(false)} />;
  }

  if (showEditForm) {
    return <EditProduct onCancel={() => setShowEditForm(false)} productId={productId} />;
  }

  return (
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Quản lý sản phẩm</h2>
        <button 
          className="bg-blue-500 text-white px-4 py-2 rounded-md flex items-center"
          onClick={() => setShowAddForm(true)}
        >
          <FiPlus className="mr-2" />
          Thêm sản phẩm
        </button>
      </div>

      <div className="bg-white rounded-lg shadow">
        <div className="p-4 border-b">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm sản phẩm..."
              className="w-full pl-10 pr-4 py-2 border rounded-md"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Sản phẩm
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Danh mục
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Giá
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Tồn kho
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trạng thái
                </th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Thao tác
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {products.map((product) => (
                <tr key={product._id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="h-10 w-10 flex-shrink-0">
                        <img
                          className="h-10 w-10 rounded-full"
                          src={product.thumbnail ||`https://via.placeholder.com/40`}
                          alt=""
                        />
                      </div>
                      <div className=" w-full">
                        <div className="text-sm font-medium text-center text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-900">{product.category}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-900">{product.price}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-center text-gray-900">{product.stock}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      product.status === 'Còn hàng' 
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {product.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900 mr-3">
                      <FiEdit2 className="inline-block" 
                      onClick={() => handleEdit(product._id)}
                      />
                    </button>
                    <button className="text-red-600 hover:text-red-900">
                      <FiTrash2 className="inline-block" 
                      onClick={() => handleDelete(product._id)}
                      />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Products; 