import React from 'react';
import Header from '../components/Header';
import gif from '../assets/NewsImage.gif';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewsCardComponent from '../components/NewsCardComponent';
import Footer from '../components/Footer';

function Home() {
  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  const carouselItems = [
    {
      title: "Wildlife",
      img: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "World News",
      img: "https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=2121&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Sports",
      img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Entertainment",
      img: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1972&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
    {
      title: "Health",
      img: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    },
  ];

  return (
    <div className="bg-[#242424] text-[#F0F0F0] min-h-screen">
      <Header />

      {/* Hero Section */}
      <div className="flex flex-col-reverse md:flex-row justify-between items-center px-6 md:px-20 mt-10 gap-8">
        {/* Text */}
        <div className="text-center md:text-left max-w-xl">
          <h1 className="text-4xl font-bold mb-4 text-white">
            Welcome to <span className="text-[#3B82F6]">NEWSteller</span>
          </h1>
          <p className="text-[#B0B0B0] text-lg leading-relaxed">
            Your daily dose of curated news, delivered with simplicity and style. 
            Stay informed with personalized updates and a sleek interface.
          </p>
        </div>

        {/* GIF */}
        <div className="w-full md:w-[400px]">
          <img
            className="rounded-2xl w-full h-auto shadow-2xl"
            src={gif}
            alt="News Animation"
          />
        </div>
      </div>

      {/* Carousel Section */}
      <div className="mt-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Explore News Categories
        </h2>
        <Carousel className='mb-10'
          swipeable={true}
          draggable={true}
          showDots={true}
          responsive={responsive}
          ssr={true}
          infinite={true}
          autoPlay={true}
          autoPlaySpeed={2500}
          keyBoardControl={true}
          customTransition="all 0.5s"
          transitionDuration={500}
          containerClass="carousel-container"
          removeArrowOnDeviceType={["tablet", "mobile"]}
          dotListClass="custom-dot-list-style"
          itemClass="px-4"
        >
          {carouselItems.map((item, index) => (
            <div key={index} className="bg-[#2f2f2f] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
              </div>
            </div>
          ))}
        </Carousel>
      </div>
      <div className='flex justify-center items-center mb-10'>
        <NewsCardComponent/>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  );
}

export default Home;
