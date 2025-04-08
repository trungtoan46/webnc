import React from "react";
import { Link } from "react-router-dom";
import logo from "../../assets/logo.webp";
import '../../index.css';


const Logo = () => {
    return (    
        <div className="flex items-center">
            <Link to="/" className="font-semibold text-center text-xl px-4 mx-auto">
                <img src={logo} alt="logo" className="" />
            </Link>
        </div>
    );
}

export default Logo;
