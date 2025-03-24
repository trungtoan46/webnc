import React, { useState } from "react";
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import styled from 'styled-components';

const Slide = () => {

    const [currentSlide, setCurrentSlide] = useState(0);
    const CustomDots = styled.div`
        position: absolute;
        bottom: 10px;
        left: 50%;
        transform: translateX(-50%);
        width: 100%;
        text-align: center;

        li {
            display: inline-block;
            margin: 0 5px;
        }

        li button {
            width: 10px;
            height: 10px;
            border-radius: 50%;
            background-color: rgba(255, 255, 255, 0.5);
            border: none;
            transition: background-color 0.3s ease;
        }

        li.slick-active button {
            background-color: red;
        }
        `;

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
        className: "slickMain",
        dotsClass: "custom-dots",        
        beforeChange: (prev, next) => {
          setCurrentSlide(next);
        },
        appendDots: (dots) => <CustomDots><ul>{dots}</ul></CustomDots>,
        customPaging: (i) => (
            <button
                style={{
                    width: "30px",
                    height: "4px",
                    borderRadius: "10%",
                    backgroundColor: i === currentSlide ? "black" : "gray",
                    border: "none",
                    margin: "0 5px",
                }}
          />
        ),
      };

    const slides = [
        {
            image: "https://theme.hstatic.net/200000696635/1001257291/14/slider_1.jpg?v=107",
            title: "slide 1",
            description: "slide 1"
        },
        {
            image: "https://theme.hstatic.net/200000696635/1001257291/14/slider_2.jpg?v=107",
            title: "slide 2",
            description: "slide 2"
        },

    ];

    return (
        <div className="container mx-auto py-8 w-full">
            <div className="w-full mx-auto">
                <Slider {...settings}>
                    {slides.map((slide, index) => (
                        <div key={index} className="relative">
                            <img 
                                src={slide.image} 
                                alt={slide.title}
                                className="w-full h-[500px] object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </Slider>
            </div>
        </div>
    );
};

export default Slide;
