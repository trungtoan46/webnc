import { useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { Label } from "@primer/react";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { register } = useContext(AuthContext);
  const navigate = useNavigate();
  const [error, setError] = useState("");
  const [username, setUsername] = useState("");

  const onSubmit = async (e) => {
    e.preventDefault(); 
    setError("");
    if (password !== confirmPassword) {
      setError("Mật khẩu xác nhận không khớp!");
      return;
    }
    try {
      await register({ email, password, username });
      navigate("/login");
    } catch (error) {
      console.error("Lỗi đăng ký:", error);
      // Hiển thị message lỗi từ server hoặc message mặc định
      setError(error.response?.data?.message || error.message || "Đăng ký thất bại! Vui lòng thử lại.");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold text-center text-gray-700 mb-6">Đăng ký</h2>

        {error && <Label variant="error" 
        className="text-red-500 text-xl border-none text-center mb-6">
          {error}
        </Label>} 

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
            type="username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
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
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            placeholder="Xác nhận mật khẩu"
            className="w-full p-3 border text-gray-700 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
            required
          />
          <button
            type="submit"
            className="w-full bg-green-500 hover:bg-green-600 text-white py-2 rounded-md transition duration-200"
          >
            Đăng ký
          </button>
        </form>

        <p className="text-sm text-center text-gray-500 mt-4">
          Đã có tài khoản? <a href="/login" className="text-blue-500 hover:underline">Đăng nhập ngay</a>
        </p>
      </div>
    </div>
  );
};

export default Register;
