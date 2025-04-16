import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ThemeProvider, BaseStyles} from '@primer/react'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
//Components
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'
import './index.css'
import Admin from './pages/Admin'
import ProtectedRoute from './components/common/ProtectedRoute';
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MainLayout from './layouts/MainLayout'
import AddProduct from './pages/admin/AddProduct'
import Products from './pages/Products'
import Checkout from './pages/Checkout'
import Test from './pages/test'
import OrderSuccess from './pages/OrderSuccess'
import Order from './pages/Order'
import OrderDetail from './pages/OrderDetail'
import CheckOrder from './pages/CheckOrder'
import Profile from './pages/profile/Profile'
import EditProfile from './pages/EditProfile'

function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <AuthProvider>
          <CartProvider>
            <Router>
              <ToastContainer position="top-right" autoClose={1000} />
              <Routes>
                {/* Routes with Header and Footer */}
                <Route path="/test" element={
                  <MainLayout showBanner={true}>
                    <Test />
                  </MainLayout>
                } />
                <Route path="/" element={
                  <MainLayout showBanner={true}>
                    <Home />
                  </MainLayout>
                } />
                <Route path="/products" element={
                  <MainLayout showBanner={true}>
                    <Products />
                  </MainLayout>
                } />
                <Route path="/product/:name_slug" element={
                  <MainLayout>
                    <ProductDetail />
                  </MainLayout>
                } />
                <Route path="/cart" element={
                  <MainLayout>
                    <Cart />
                  </MainLayout>
                } />
                <Route path="/admin" element={
                  <MainLayout showHeader={false} showFooter={false}>
                    <ProtectedRoute>
                      <Admin />
                    </ProtectedRoute>
                  </MainLayout>
                } />

                <Route path="/admin/products/add" element={
                  <MainLayout showHeader={false} showFooter={false}>
                    <AddProduct />
                  </MainLayout>
                } />

                <Route path="/dashboard" element={
                  <MainLayout>
                    <Dashboard />
                  </MainLayout>
                } />

                {/* Routes without Header and Footer */}
                <Route path="/login" element={
                  <MainLayout showHeader={false} showFooter={false}>
                    <Login />
                  </MainLayout>
                } />
                <Route path="/register" element={
                  <MainLayout showHeader={false} showFooter={false}>
                    <Register />
                  </MainLayout>
                } />
                <Route path="/checkout" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <Checkout />
                  </MainLayout>
                } />
                <Route path="/order-success" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <OrderSuccess />
                  </MainLayout>
                } />
                <Route path="/orders" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <Order />
                  </MainLayout>
                } />
                <Route path="/orderdetail" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <OrderDetail />
                  </MainLayout>
                } />
                <Route path="/checkorder" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <CheckOrder />
                  </MainLayout>
                } />
                <Route path="/profile" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <Profile />
                  </MainLayout>
                } />
                <Route path="/profile/edit" element={
                  <MainLayout showHeader={true} showFooter={true}>
                    <EditProfile />
                  </MainLayout>
                } />
              </Routes>
            </Router>
          </CartProvider>
        </AuthProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
