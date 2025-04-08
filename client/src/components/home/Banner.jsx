import React from 'react';

const Banner = ({img}) => {
    return (
        <div className="w-full h-full">
            <img src={img} alt="banner" className="w-full h-full object-cover" />
        </div>
    );
}

export default Banner;