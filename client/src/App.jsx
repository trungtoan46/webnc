import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import {ThemeProvider, BaseStyles} from '@primer/react'
//Components
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'
import './index.css'
import Admin from './pages/Admin'
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from "./context/AuthContext";
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'

function App() {
  return (
  <ThemeProvider>
    <BaseStyles>
      <AuthProvider>
        <Router>
          <div className="flex flex-col min-h-screen w-full">
            <Header />
            <main className="flex-grow">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/products" element={<Home />} />
                <Route path="/products/:id" element={<ProductDetail />} />
                <Route path="/cart" element={<Cart />} />
                <Route 
                    path="/admin" 
                    element={
                      <ProtectedRoute>
                        <Admin />
                      </ProtectedRoute>
                    } 
                  />
                <Route path="/login" element={<Login />} />
                <Route path='/register' element={<Register />} />
                <Route path='/dashboard' element={<Dashboard />} /> 
                
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </AuthProvider>
      </BaseStyles>
    </ThemeProvider>


  );
}

export default App;
