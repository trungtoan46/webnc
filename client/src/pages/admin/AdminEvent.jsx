import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Search from '../../components/admin/common/Search';
import EventForm from '../../components/admin/forms/EventForm';
import { FiEdit, FiTrash2, FiEye, FiLink } from 'react-icons/fi';
import axios from 'axios';
import { format } from 'date-fns';
import { vi } from 'date-fns/locale';

const AdminEvent = () => {
  const [events, setEvents] = useState([]);
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedEvent, setSelectedEvent] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isLinkModalOpen, setIsLinkModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [products, setProducts] = useState([]);
  const [selectedProducts, setSelectedProducts] = useState([]);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    is_active: true,
    image: '',
    products: []
  });

  useEffect(() => {
    fetchEvents();
    fetchProducts();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, filter, searchTerm]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/events`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      if (response.data && Array.isArray(response.data)) {
        setEvents(response.data);
        setFilteredEvents(response.data);
      } else {
        console.error('Invalid response format:', response.data);
        setEvents([]);
        setFilteredEvents([]);
      }
    } catch (error) {
      console.error('Lỗi khi tải danh sách sự kiện:', error);
      if (error.response?.status === 401) {
        // Xử lý lỗi xác thực
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        // Xử lý lỗi quyền truy cập
        alert('Bạn không có quyền truy cập vào trang này');
        window.location.href = '/';
      }
      setEvents([]);
      setFilteredEvents([]);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/products`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      setProducts(response.data.products);
    } catch (error) {
      console.error('Lỗi khi tải danh sách sản phẩm:', error);
    }
  };

  const filterEvents = () => {
    let result = [...events];

    // Lọc theo trạng thái
    if (filter === 'active') {
      result = result.filter(event => event.is_active);
    } else if (filter === 'inactive') {
      result = result.filter(event => !event.is_active);
    }

    // Lọc theo từ khóa tìm kiếm
    if (searchTerm.trim() !== '') {
      result = result.filter(event => 
        event.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (event.description && event.description.toLowerCase().includes(searchTerm.toLowerCase()))
      );
    }

    setFilteredEvents(result);
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleImageChange = (e) => {
    if (e === null) {
      setImageFile(null);
      return;
    }
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      description: '',
      start_date: '',
      end_date: '',
      is_active: true,
      image: '',
      products: []
    });
    setImageFile(null);
    setSelectedEvent(null);
  };

  const openAddModal = () => {
    resetForm();
    setIsModalOpen(true);
  };

  const openEditModal = (event) => {
    setSelectedEvent(event);
    setFormData({
      name: event.name,
      description: event.description || '',
      start_date: formatDateForInput(event.start_date),
      end_date: formatDateForInput(event.end_date),
      is_active: event.is_active,
      image: event.image || '',
      products: event.products || []
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const openLinkModal = (event) => {
    setSelectedEvent(event);
    setSelectedProducts(event.products || []);
    setIsLinkModalOpen(true);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch {
      return 'Ngày không hợp lệ';
    }
  };

  const handleProductSelect = (selectedOptions) => {
    setSelectedProducts(selectedOptions.map(option => option.value));
  };

  const handleLinkProducts = async () => {
    setIsLoading(true);
    try {
      await axios.put(`${import.meta.env.VITE_API_URL}/events/${selectedEvent._id}/products`, {
        products: selectedProducts
      }, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Cập nhật state
      setEvents(events.map(event => 
        event._id === selectedEvent._id ? { ...event, products: selectedProducts } : event
      ));
      
      setIsLinkModalOpen(false);
    } catch (error) {
      console.error('Lỗi khi liên kết sản phẩm:', error);
      alert('Có lỗi xảy ra khi liên kết sản phẩm, vui lòng thử lại sau.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      let imageUrl = formData.image;

      // Nếu có file hình ảnh mới, upload lên server
      if (imageFile) {
        try {
          console.log(imageFile);
          const formDataImage = new FormData();
          formDataImage.append('image', imageFile);
          for (let [key, value] of formDataImage.entries()) {
            console.log(key, value);
          }
          
          
          const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL}/images/upload-event`, formDataImage, {
            headers: {
              'Content-Type': 'multipart/form-data',
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            },
          });
          
          if (uploadResponse.data && uploadResponse.data.imageUrl) {
            imageUrl = uploadResponse.data.imageUrl;
          } else {
            throw new Error('Không nhận được URL hình ảnh từ server');
          }
        } catch (uploadError) {
          console.error('Lỗi khi tải lên hình ảnh:', uploadError);
          alert('Không thể tải lên hình ảnh. Vui lòng thử lại sau.');
          return;
        }
      }

      const eventData = {
        ...formData,
        image: imageUrl
      };

      let response;
      if (selectedEvent) {
        // Cập nhật sự kiện
        response = await axios.put(`${import.meta.env.VITE_API_URL}/events/${selectedEvent._id}`, eventData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Cập nhật state
        setEvents(events.map(event => 
          event._id === selectedEvent._id ? response.data : event
        ));
      } else {
        // Tạo sự kiện mới
        response = await axios.post(`${import.meta.env.VITE_API_URL}/events`, eventData, {
          headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
          }
        });
        
        // Thêm vào state
        setEvents([...events, response.data]);
      }

      // Đóng modal
      setIsModalOpen(false);
      resetForm();
    } catch (error) {
      console.error('Lỗi khi lưu sự kiện:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        alert('Bạn không có quyền thực hiện thao tác này');
      } else {
        alert(error.response?.data?.message || 'Có lỗi xảy ra khi lưu sự kiện, vui lòng thử lại sau.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!selectedEvent) return;
    setIsLoading(true);

    try {
      await axios.delete(`${import.meta.env.VITE_API_URL}/events/${selectedEvent._id}`, {
        headers: {
          'Authorization': `Bearer ${localStorage.getItem('token')}`
        }
      });
      
      // Cập nhật state
      setEvents(events.filter(event => event._id !== selectedEvent._id));
      
      // Đóng modal
      setIsDeleteModalOpen(false);
      setSelectedEvent(null);
    } catch (error) {
      console.error('Lỗi khi xóa sự kiện:', error);
      if (error.response?.status === 401) {
        localStorage.removeItem('token');
        window.location.href = '/login';
      } else if (error.response?.status === 403) {
        alert('Bạn không có quyền xóa sự kiện này');
      } else {
        alert(error.response?.data?.message || 'Có lỗi xảy ra khi xóa sự kiện, vui lòng thử lại sau.');
      }
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <div className="min-h-screen p-4">
      <h1 className="text-2xl font-bold mb-4 text-gray-900">Quản Lý Sự Kiện</h1>
      
      {/* Bộ lọc và tìm kiếm */}
      <div className="flex flex-wrap items-center gap-4 mb-6">
        <div className="flex space-x-2">
          <button 
            className={`px-4 py-2 rounded-md text-white ${filter === 'all' ? 'bg-blue-600' : 'bg-gray-500'}`}
            onClick={() => handleFilterChange('all')}
          >
            Tất cả
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-white ${filter === 'active' ? 'bg-green-600' : 'bg-gray-500'}`}
            onClick={() => handleFilterChange('active')}
          >
            Đang hoạt động
          </button>
          <button 
            className={`px-4 py-2 rounded-md text-white ${filter === 'inactive' ? 'bg-red-600' : 'bg-gray-500'}`}
            onClick={() => handleFilterChange('inactive')}
          >
            Không hoạt động
          </button>
        </div>
        
        <div className="flex-1 max-w-md">
          <input
            type="text"
            placeholder="Tìm kiếm sự kiện..."
            className="w-full p-2 border border-gray-300 rounded-md text-gray-700"
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
        
        <button 
          className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition"
          onClick={openAddModal}
        >
          Thêm Sự Kiện
        </button>
      </div>

      {/* Bảng sự kiện */}
      {isLoading && <div className="text-center py-4 text-gray-700">Đang tải...</div>}
      
      {!isLoading && filteredEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-600">
          Không tìm thấy sự kiện nào
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left text-gray-900">Tên sự kiện</th>
                <th className="py-3 px-4 border-b text-left text-gray-900">Hình ảnh</th>
                <th className="py-3 px-4 border-b text-left text-gray-900">Ngày bắt đầu</th>
                <th className="py-3 px-4 border-b text-left text-gray-900">Ngày kết thúc</th>
                <th className="py-3 px-4 border-b text-left text-gray-900">Trạng thái</th>
                <th className="py-3 px-4 border-b text-left text-gray-900">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b text-gray-800">{event.name}</td>
                  <td className="py-3 px-4 border-b">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-gray-500">Không có hình</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b text-gray-800">{formatDateForDisplay(event.start_date)}</td>
                  <td className="py-3 px-4 border-b text-gray-800">{formatDateForDisplay(event.end_date)}</td>
                  <td className="py-3 px-4 border-b">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      event.is_active 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-red-100 text-red-800'
                    }`}>
                      {event.is_active ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="py-3 px-4 border-b">
                    <div className="flex space-x-2">
                      <button 
                        onClick={() => openEditModal(event)}
                        className="p-1 text-blue-600 hover:text-blue-800"
                        title="Chỉnh sửa"
                      >
                        <FiEdit size={18} />
                      </button>
                      <button 
                        onClick={() => openLinkModal(event)}
                        className="p-1 text-purple-600 hover:text-purple-800"
                        title="Liên kết sản phẩm"
                      >
                        <FiLink size={18} />
                      </button>
                      <button 
                        onClick={() => openDeleteModal(event)}
                        className="p-1 text-red-600 hover:text-red-800"
                        title="Xóa"
                      >
                        <FiTrash2 size={18} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal Thêm/Sửa Sự Kiện */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h2 className="text-xl font-bold mb-4">
              {selectedEvent ? 'Chỉnh Sửa Sự Kiện' : 'Thêm Sự Kiện Mới'}
            </h2>
            
            <form onSubmit={handleSubmit}>
              <EventForm 
                formData={formData}
                handleChange={handleFormChange}
                handleImageChange={handleImageChange}
                imageFile={imageFile}
              />
              
              <div className="flex justify-end space-x-3 mt-6">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                  disabled={isLoading}
                >
                  Hủy
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-blue-300"
                  disabled={isLoading}
                >
                  {isLoading ? 'Đang lưu...' : 'Lưu Sự Kiện'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác Nhận Xóa */}
      {isDeleteModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Xác Nhận Xóa</h2>
            <p className="mb-6">
              Bạn có chắc chắn muốn xóa sự kiện "{selectedEvent?.name}"? 
              Hành động này không thể hoàn tác.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700 disabled:bg-red-300"
                disabled={isLoading}
              >
                {isLoading ? 'Đang xóa...' : 'Xóa Sự Kiện'}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal Liên kết Sản phẩm */}
      {isLinkModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h2 className="text-xl font-bold mb-4 text-gray-900">Liên kết Sản phẩm với Sự Kiện</h2>
            <div className="mb-4">
              <label className="block text-gray-700 text-sm font-bold mb-2">
                Chọn sản phẩm
              </label>
              <Select
                isMulti
                options={products.map(product => ({
                  value: product._id,
                  label: (
                    <div className="flex items-center space-x-2">
                      <img 
                        src={product.images?.[0] || '/placeholder-image.jpg'} 
                        alt={product.name}
                        className="w-8 h-8 object-cover rounded"
                      />
                      <span className="text-gray-800">{product.name}</span>
                    </div>
                  ),
                  name: product.name,
                  image: product.images?.[0]
                }))}
                value={selectedProducts.map(id => {
                  const product = products.find(p => p._id === id);
                  return {
                    value: id,
                    label: (
                      <div className="flex items-center space-x-2">
                        <img 
                          src={product?.thumbnail || '/placeholder-image.jpg'} 
                          alt={product?.name}
                          className="w-8 h-8 object-cover rounded"
                        />
                        <span className="text-gray-800">{product?.name}</span>
                      </div>
                    )
                  }
                })}
                onChange={handleProductSelect}
                className="basic-multi-select"
                classNamePrefix="select"
                formatOptionLabel={({ label }) => label}
              />
            </div>
            <div className="mt-4">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sản phẩm đã chọn:</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {selectedProducts.map(id => {
                  const product = products.find(p => p._id === id);
                  return (
                    <div key={id} className="flex items-center space-x-2 p-2 bg-gray-50 rounded-lg">
                      <img 
                        src={product?.thumbnail || '/placeholder-image.jpg'} 
                        alt={product?.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="text-sm font-medium text-gray-900">{product?.name}</p>
                        <p className="text-xs text-gray-600">{product?.price?.toLocaleString('vi-VN')}đ</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="flex justify-end space-x-3 mt-6">
              <button
                onClick={() => setIsLinkModalOpen(false)}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
                disabled={isLoading}
              >
                Hủy
              </button>
              <button
                onClick={handleLinkProducts}
                className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:bg-purple-300"
                disabled={isLoading}
              >
                {isLoading ? 'Đang lưu...' : 'Lưu Liên kết'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminEvent;
