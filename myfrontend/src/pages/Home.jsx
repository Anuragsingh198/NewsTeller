import React from 'react';
import Header from '../components/Header';
import gif from '../assets/NewsImage.gif';

function Home() {
  return (
    <div className="bg-[#242424] min-h-screen text-[#F0F0F0]">
      <Header />

      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 mt-10 gap-8">
        {/* Text Section */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Welcome to <span className="text-[#3B82F6]">NEWSteller</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg">
            Your daily dose of curated news, delivered with simplicity and style. Stay informed with personalized content updates and a sleek interface.
          </p>
        </div>

        {/* GIF Section */}
        <div className="w-full md:w-[400px]">
          <img
            className="rounded-2xl w-full h-auto shadow-lg"
            src={gif}
            alt="Gif"
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
