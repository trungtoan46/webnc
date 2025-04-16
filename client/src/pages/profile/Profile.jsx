import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';
import { User, ShoppingBag, Edit3, LogOut } from 'lucide-react';

const Profile = () => {
  const { user, handleLogout } = useContext(AuthContext);

  if (!user) {
    // Optional: Redirect to login or show a message if user is not logged in
    // For now, just showing a simple message
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center">
          <p className="text-gray-700">Vui lòng đăng nhập để xem trang cá nhân.</p>
          <Link to="/login" className="mt-4 inline-block px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors">
            Đăng nhập
          </Link>
        </div>
      </div>
    );
  }

  const getRoleBadgeClasses = (role) => {
    if (role === 'admin') {
      return 'bg-red-50 text-red-700 border border-red-200';
    }
    return 'bg-emerald-50 text-emerald-700 border border-emerald-200';
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Profile Header */}
          <div className="p-6 bg-gradient-to-r from-blue-600 to-blue-700 text-white">
            <div className="flex flex-col sm:flex-row items-center gap-4">
              <div className="flex-shrink-0">
                <span className="inline-block h-16 w-16 sm:h-20 sm:w-20 rounded-full overflow-hidden bg-white/10 backdrop-blur-sm">
                  <User className="h-full w-full text-white p-2" />
                </span>
              </div>
              <div className="text-center sm:text-left">
                <h1 className="text-2xl sm:text-3xl font-bold text-white">{user.username}</h1>
                <p className="text-blue-100 text-sm sm:text-base mt-1">{user.email}</p>
              </div>
            </div>
          </div>

          {/* Profile Content */}
          <div className="p-6 space-y-6">
            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2">Thông tin tài khoản</h2>
            
            <div className="grid grid-cols-1 gap-4">
               <div className="text-sm">
                  <span className="font-medium text-gray-700">Vai trò:</span> 
                  <span className={`ml-2 capitalize px-2 py-0.5 rounded-full text-xs font-medium ${getRoleBadgeClasses(user.role)}`}>
                    {user.role || 'User'}
                  </span>
                </div>
            </div>

            <h2 className="text-xl font-semibold text-gray-900 border-b border-gray-200 pb-2 pt-4">Quản lý tài khoản</h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Link
                to="/orders"
                className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <ShoppingBag className="w-6 h-6 text-blue-600 mr-3 group-hover:text-blue-700" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-700">Đơn hàng của tôi</p>
                  <p className="text-sm text-gray-600 group-hover:text-blue-600">Xem lịch sử mua hàng</p>
                </div>
              </Link>

              <Link
                to="/profile/edit"
                className="group flex items-center p-4 bg-gray-50 rounded-lg hover:bg-blue-50 transition-colors duration-200"
              >
                <Edit3 className="w-6 h-6 text-blue-600 mr-3 group-hover:text-blue-700" />
                <div>
                  <p className="font-medium text-gray-900 group-hover:text-blue-700">Chỉnh sửa thông tin</p>
                  <p className="text-sm text-gray-600 group-hover:text-blue-600">Cập nhật tên, email, mật khẩu</p>
                </div>
              </Link>
            </div>
            
             <div className="border-t border-gray-200 pt-6 mt-6">
                <button
                  onClick={handleLogout}
                  className="w-full sm:w-auto flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-colors duration-200"
                >
                  <LogOut className="w-5 h-5 mr-2" />
                  Đăng xuất
                </button>
              </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile; 