import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FaArrowLeft } from 'react-icons/fa';
import logo from '../assets/logo.webp';

const Checkout = () => {
  const navigate = useNavigate();
  
  

  return (
    <div className='min-h-screen bg-gray-100'>
      <div className='container mx-auto px-4 py-8'>
        <div className='flex items-center justify-start gap-4 mb-8'>
            <img src={logo} alt="logo" className='w-auto h-20' />
            <div className='border-l-2 border border-blue-200 h-10'></div>
            <h1 className='text-2xl font-bold text-gray-600'>Thanh Toán</h1>
        </div>
      </div>
    </div>
  )
  
  
}

export default Checkout;
