import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <header className="bg-[#2E2E2E] border-b border-[#3A3A3A] py-4 px-20">
      <div className="container mx-auto flex items-center justify-between">
        {/* Left Side: Logo & Company Name */}
        <Link to="/" className="flex items-center space-x-2">
          {/* Replace with your logo (e.g., SVG or image) */}
          {/* <div className="w-10 h-10 rounded-md bg-[#4A80F0] flex items-center justify-center text-white font-bold">
            Logo
          </div> */}
          <span className="text-xl font-semibold text-[#FFFFFF]">NEWS TELLER</span>
        </Link>

        {/* Right Side: Auth Buttons */}
        <div className="flex items-center space-x-4">
          <Link
            to="/login"
            className="text-[#FFFFFF] hover:text-[#B0B0B0] transition-colors"
          >
            Login
          </Link>
          <Link
            to="/register"
            className="bg-[#4A80F0] hover:bg-[#3A70E0] text-white px-4 py-2 rounded-md transition-colors"
          >
            Sign Up
          </Link>
        </div>
      </div>
    </header>
  );
}

export default Header;