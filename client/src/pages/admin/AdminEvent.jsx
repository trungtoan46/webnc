import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import Search from '../../components/admin/common/Search';
import EventForm from '../../components/admin/forms/EventForm';
import { FiEdit, FiTrash2, FiEye } from 'react-icons/fi';
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
  const [isLoading, setIsLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    start_date: '',
    end_date: '',
    is_active: true,
    image: ''
  });

  useEffect(() => {
    fetchEvents();
  }, []);

  useEffect(() => {
    filterEvents();
  }, [events, filter, searchTerm]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/events`, {
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
      image: ''
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
      image: event.image || ''
    });
    setIsModalOpen(true);
  };

  const openDeleteModal = (event) => {
    setSelectedEvent(event);
    setIsDeleteModalOpen(true);
  };

  const formatDateForInput = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  const formatDateForDisplay = (dateString) => {
    try {
      const date = new Date(dateString);
      return format(date, 'dd/MM/yyyy', { locale: vi });
    } catch (_) {
      return 'Ngày không hợp lệ';
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
          const formDataImage = new FormData();
          formDataImage.append('image', imageFile);
          
          const uploadResponse = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/images/upload`, formDataImage, {
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
        response = await axios.put(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/events/${selectedEvent._id}`, eventData, {
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
        response = await axios.post(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/events`, eventData, {
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
      await axios.delete(`${import.meta.env.VITE_API_URL || 'http://localhost:3000/api'}/events/${selectedEvent._id}`, {
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
      <h1 className="text-2xl font-bold mb-4">Quản Lý Sự Kiện</h1>
      
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
            className="w-full p-2 border border-gray-300 rounded-md"
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
      {isLoading && <div className="text-center py-4">Đang tải...</div>}
      
      {!isLoading && filteredEvents.length === 0 ? (
        <div className="text-center py-8 text-gray-500">
          Không tìm thấy sự kiện nào
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-300 shadow-md rounded-md">
            <thead className="bg-gray-100">
              <tr>
                <th className="py-3 px-4 border-b text-left">Tên sự kiện</th>
                <th className="py-3 px-4 border-b text-left">Hình ảnh</th>
                <th className="py-3 px-4 border-b text-left">Ngày bắt đầu</th>
                <th className="py-3 px-4 border-b text-left">Ngày kết thúc</th>
                <th className="py-3 px-4 border-b text-left">Trạng thái</th>
                <th className="py-3 px-4 border-b text-left">Thao tác</th>
              </tr>
            </thead>
            <tbody>
              {filteredEvents.map(event => (
                <tr key={event._id} className="hover:bg-gray-50">
                  <td className="py-3 px-4 border-b">{event.name}</td>
                  <td className="py-3 px-4 border-b">
                    {event.image ? (
                      <img 
                        src={event.image} 
                        alt={event.name} 
                        className="h-12 w-auto object-contain"
                      />
                    ) : (
                      <span className="text-gray-400">Không có hình</span>
                    )}
                  </td>
                  <td className="py-3 px-4 border-b">{formatDateForDisplay(event.start_date)}</td>
                  <td className="py-3 px-4 border-b">{formatDateForDisplay(event.end_date)}</td>
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
    </div>
  );
};

export default AdminEvent;
