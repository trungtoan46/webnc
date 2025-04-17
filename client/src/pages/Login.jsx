import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";

import { useNavigate } from "react-router-dom";
import AuthLayout from "../layouts/AuthLayout";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault();
    setError("");
    console.log(email, password);
    try {
      await login(email, password);
      console.log("Đăng nhập thành công");
      navigate("/");
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
      setError(error.message || "Đăng nhập thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <AuthLayout>
      <div className="flex justify-center items-center min-h-screen bg-gray-100">
        <div className="bg-white p-8 rounded-xl shadow-md w-96">
          <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng nhập</h2>

          {error && (
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4" role="alert">
              <span className="block sm:inline">{error}</span>
            </div>
          )}

          <form onSubmit={onSubmit} className="space-y-4">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mật khẩu"
              className="w-full p-3 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              required
            />
            <button
              type="submit"
              className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
            >
              Đăng nhập
            </button>
          </form>

          <p className="text-sm text-center text-gray-500 mt-4">
            Chưa có tài khoản? <a href="/register" className="text-blue-500 hover:underline">Đăng ký ngay</a>
          </p>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
