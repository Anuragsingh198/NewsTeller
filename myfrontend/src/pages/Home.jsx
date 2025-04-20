import { useEffect, useContext, useState } from 'react';
import Header from '../components/Header';
import gif from '../assets/NewsImage.gif';
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import NewsCardComponent from '../components/NewsCardComponent'; // Import the NewsCardComponent
import Footer from '../components/Footer';
import context from '../context/contextProvider';

function Home() {
  const { topnews, dispatch  } = useContext(context);

  const responsive = {
    desktop: { breakpoint: { max: 3000, min: 1024 }, items: 3, slidesToSlide: 3 },
    tablet: { breakpoint: { max: 1024, min: 464 }, items: 2, slidesToSlide: 2 },
    mobile: { breakpoint: { max: 464, min: 0 }, items: 1, slidesToSlide: 1 }
  };

  const topNews = [
    { title: "Breaking News 1", img: "https://images.unsplash.com/photo-1575550959106-5a7defe28b56?q=80&w=2070&auto=format&fit=crop", category: "World", url: "https://news.example.com/article-1" },
    { title: "Breaking News 2", img: "https://plus.unsplash.com/premium_photo-1691223733678-095fee90a0a7?q=80&w=2121&auto=format&fit=crop", category: "Sports", url: "https://news.example.com/article-2" },
    { title: "Breaking News 3", img: "https://images.unsplash.com/photo-1461896836934-ffe607ba8211?q=80&w=2070&auto=format&fit=crop", category: "Health", url: "https://news.example.com/article-3" },
    { title: "Breaking News 4", img: "https://images.unsplash.com/photo-1499364615650-ec38552f4f34?q=80&w=1972&auto=format&fit=crop", category: "Entertainment", url: "https://news.example.com/article-4" },
    { title: "Breaking News 5", img: "https://plus.unsplash.com/premium_photo-1673953509975-576678fa6710?q=80&w=2070&auto=format&fit=crop", category: "Technology", url: "https://news.example.com/article-5" },
  ];

  // On mount, set top news
  // useEffect(() => {
  //   setNews(topNews);
  //   setFilteredNews(topNews); // Initialize with all top news
  // }, [setNews, setFilteredNews]);

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

      {/* Top News Carousel */}
      <div className="mt-20 px-6 md:px-20">
        <h2 className="text-3xl font-semibold mb-8 text-center text-white">
          Top News
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
          {topNews.map((item, index) => (
            <div key={index} className="bg-[#2f2f2f] rounded-2xl overflow-hidden shadow-lg">
              <img
                src={item.img}
                alt={item.title}
                className="h-48 w-full object-cover"
              />
              <div className="p-4">
                <h3 className="text-xl font-bold text-white">{item.title}</h3>
                {/* Read More Button */}
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#3B82F6] mt-4 inline-block"
                >
                  Read More
                </a>
              </div>
            </div>
          ))}
        </Carousel>
      </div>

      {/* News Card Component Section */}
      <div className='flex justify-center items-center mb-10'>
        <NewsCardComponent /> {/* This renders the NewsCardComponent */}
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Home;
