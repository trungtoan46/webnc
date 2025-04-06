import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ThemeProvider, BaseStyles} from '@primer/react'
//Components
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'
import './index.css'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute';
import AuthProvider  from "./context/AuthContext";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import MainLayout from './layouts/MainLayout'
import AddProduct from './pages/admin/AddProduct'
import Products from './pages/Products'
function App() {
  return (
    <ThemeProvider>
      <BaseStyles>
        <AuthProvider>
          <Router>
            <Routes>
              {/* Routes with Header and Footer */}
              <Route path="/" element={
                <MainLayout>
                  <Home />
                </MainLayout>
              } />
              <Route path="/products" element={
                <MainLayout>
                  <Products />
                </MainLayout>
              } />
              <Route path="/products/:id" element={
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
            </Routes>
          </Router>
        </AuthProvider>
      </BaseStyles>
    </ThemeProvider>
  );
}

export default App;
