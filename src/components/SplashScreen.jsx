import React from 'react';
import logo from '../assets/logo2.png'; 

const SplashScreen = () => {
  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#3B060A] animate-fade-out">

      {/* Background animation overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-30 animate-bgMove"
        style={{
          backgroundImage: "url('/logo2.png')", // fallback logo as soft background
        }}
      />

      {/* Main Logo */}
      <img
        src={logo}
        alt="E-Shop Logo"
        className="w-40 h-40 md:w-60 md:h-60 mb-6 animate-pulse z-10"
      />

      {/* Typewriter Heading */}
      <h1 className="text-3xl md:text-5xl font-bold text-[#FFF287] z-10 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-[#BA704F]">
        Winter Sale is Live! 🛍️
      </h1>

      {/* Subheading */}
      <p className="text-[#BA704F] mt-4 text-base md:text-lg z-10 animate-fade-in text-center px-4">
        "Winter Wonders Await – Shop the Chill, Grab the Thrill!"
      </p>
    </div>
  );
};

export default SplashScreen;
