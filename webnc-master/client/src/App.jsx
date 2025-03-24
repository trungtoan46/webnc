import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import ProductDetail from './pages/ProductDetail'
import Cart from './pages/Cart'
import './App.css'
import './index.css'
import ProductPage from './pages/ProductPage';
import Products from './pages/Products'
function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen w-full">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/products" element={<Home />} />
            <Route path="/products/:id" element={<ProductDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="collections/:category" element={<ProductPage />} />
            <Route path="collections/:occasion" element={<ProductPage />} />
            <Route path="collections/:type" element={<ProductPage />} />
            <Route path="collections/:style" element={<ProductPage />} />
            <Route path="collections/:category/:occasion" element={<ProductPage />} />
            {/* Add more routes as needed */}
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  )
}

export default App
