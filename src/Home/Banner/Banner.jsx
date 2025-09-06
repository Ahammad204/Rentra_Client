import React from "react";
import Lottie from "lottie-react";
import animationData from "../../assets/hero.json";

const Banner = () => {
  return (
    <div className="relative w-full  ">
      {/* Container */}
      <div className=" mx-auto flex flex-col md:flex-row items-center justify-between px-6  py-10 lg:py-0 gap-10">
        {/* Left Side Text */}
        <div className="flex-1 space-y-6 text-center md:text-left">
          <h1 className="text-4xl md:text-6xl font-extrabold leading-tight">
            Welcome to <span className="text-[#0fb894]">Rentra</span>
          </h1>
          <p className="text-lg md:text-xl opacity-90">
            Your one-stop marketplace for
            <span className="font-semibold">errands</span> and
            <span className="font-semibold">peer-to-peer rentals</span>. Post a
            task or rent an item — simple, fast, and secure.
          </p>
          <div className="flex gap-4 justify-center md:justify-start">
            <button className="px-6 py-3 bg-[#0fb894] text-white font-semibold rounded-2xl shadow-md cursor-pointer transition">
              Get Started
            </button>
            <button className="px-6 py-3 border border-white font-semibold rounded-2xl hover:bg-white  transition">
              Learn More
            </button>
          </div>
        </div>

        {/* Right Side Animation */}
        <div className="flex-1">
          <Lottie animationData={animationData} loop={true} />
        </div>
      </div>
    </div>
  );
};

export default Banner;
