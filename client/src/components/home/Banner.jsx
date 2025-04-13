import React from 'react';

const Banner = ({img}) => {
    return (
        <div className="w-full h-full">
            <img src={img} alt="banner" className="w-full h-full object-cover hover:scale-90 transition-all duration-300 cursor-pointer" />
        </div>
    );
}

export default Banner;