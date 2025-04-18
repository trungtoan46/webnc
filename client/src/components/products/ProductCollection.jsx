import React from 'react';
import { Link } from 'react-router-dom';

const ProductCollection = () => {
    const categories = [
        {
            id: "68013521c54a9c8211b95bcc",
            name: "Áo khoác",
            image: "https://res.cloudinary.com/dekwog3si/image/upload/v1744909915/products/cfpcamjrr2i6qjoagqg8.webp"
        },
        {
            id: "680138fcc54a9c8211b95c47",
            name: "Áo sơ mi",
            image: "https://res.cloudinary.com/dekwog3si/image/upload/v1744910821/products/uocm8lgxezkoru9jtumj.webp"
        },
        {
            id: "67fe66ec61e67ef88d8e4056",
            name: "Áo thun",
            image: "https://res.cloudinary.com/dekwog3si/image/upload/v1744912639/products/np1gbwydpxphr4tzgjk0.webp"
        },
        {
            id: "68011ef2b213d65b6fa2c150",
            name: "Quần dài",
            image: "https://res.cloudinary.com/dekwog3si/image/upload/v1744951272/products/cvaocnmar1y6bbb38mmh.webp"
        },
        {
            id: "67fe66f061e67ef88d8e4059",
            name: "Quần short",
            image: "https://res.cloudinary.com/dekwog3si/image/upload/v1744914582/products/ltg4w1sbfp4kcfralr3q.webp"
        }
    ];

    return (
        <div className='container mx-auto'>
            <div className='w-full flex justify-between items-center'>
                <div className='w-full'>
                    <h2 className='text-2xl text-gray-700 font-semibold'>Danh mục sản phẩm</h2>
                </div>
            </div>

            <div className='w-full flex justify-around items-center mt-4 gap-10'>
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 w-full p-10'>
                    {categories.map((category) => (
                        <div key={category.id} className='w-full'>
                            <Link to={`/products?category=${category.id}`} className='w-full block text-center'>
                                <div className='w-full aspect-square rounded-lg overflow-hidden border border-gray-200'>
                                    <img 
                                        src={category.image} 
                                        alt={category.name} 
                                        className="w-full h-full object-cover transform transition-transform duration-300 ease-in-out hover:scale-110"
                                    />
                                </div>
                                <h3 className='mt-4 text-lg text-gray-700 font-semibold'>{category.name}</h3>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductCollection;
