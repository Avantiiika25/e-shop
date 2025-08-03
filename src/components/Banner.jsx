import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import banner1 from "../assets/banner1.jpg";
import banner2 from "../assets/banner2.jpg";
import banner3 from "../assets/banner3.jpg";

//banners 
const banners = [
  {
    image: banner1,
    title: "Mega Sale - Upto 50% Off!",
    description: "Grab the best deals on top categories now. Limited time only!",
    link: "/products",
  },
  {
    image: banner2,
    title: "Trendy Collections 2025",
    description: "Explore fresh arrivals curated for your style. Shop today!",
    link: "/products",
  },
  {
    image: banner3,
    title: "Exclusive Offers on Electronics",
    description: "Unbeatable prices on the latest gadgets and accessories.",
    link: "/products",
  },
];
//current banner
const Banner = () => {
  const [current, setCurrent] = useState(0);
  
  const nextSlide = () => {                                                     //next banner
    setCurrent((prev) => (prev === banners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {                                                         //prev banner
    setCurrent((prev) => (prev === 0 ? banners.length - 1 : prev - 1));
  };

  //auto slide every 5 sec
  useEffect(() => {
    const interval = setInterval(nextSlide, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full h-[60vh] overflow-hidden rounded-md">
      <AnimatePresence mode="wait">
        <motion.div
          key={current}
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.6 }}
          className="absolute inset-0 w-full h-full"
        >
          <img
            src={banners[current].image}
            alt={banners[current].title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/10 md:bg-black/20 flex flex-col justify-center items-start px-10 text-white">
            <motion.h2
              className="text-3xl md:text-5xl font-bold mb-2 drop-shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {banners[current].title}
            </motion.h2>
            <motion.p
              className="text-md md:text-xl drop-shadow-md mb-4"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
            >
              {banners[current].description}
            </motion.p>

            <motion.a
              href={banners[current].link}
              className="px-6 py-2 bg-[#BA704F] hover:bg-[#DFA878] text-white font-semibold rounded-full transition drop-shadow-md"
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.7 }}
            >
              Shop Now
            </motion.a>
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Navigation buttons */}
      <button
        onClick={prevSlide}
        aria-label="Previous slide"
        className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-black p-2 rounded-full z-10 transition"
      >
        <FaChevronLeft size={20} />
      </button>
      <button
        onClick={nextSlide}
        aria-label="Next slide"
        className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white/70 text-black p-2 rounded-full z-10 transition"
      >
        <FaChevronRight size={20} />
      </button>

      {/* Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2 z-10">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            aria-label={`Go to slide ${index + 1}`}
            className={`w-3 h-3 rounded-full transition ${
              current === index ? "bg-white" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
