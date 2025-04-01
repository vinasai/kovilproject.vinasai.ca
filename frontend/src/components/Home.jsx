import React from 'react';
import Header from './Header';
import HeroSection from './HeroSection';
import About from './AboutSection';
import ContactForm from './ContactUs';
import WeeklyPoojaList from './WeeklyPooja';
import Facebook from './Facebook';

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="w-full bg-gradient-to-b from-[#FFFF] to-[#F7F4C5]">
        <div className="w-full max-w-[375px] mx-auto px-4">
          <div className="flex flex-col md:grid md:grid-cols-2 md:gap-4 mt-4">
            {/* Left Column */}
            <div className="w-full mb-4 md:mb-0">
              <Facebook />
            </div>
            {/* Right Column */}
            <div className="w-full">
              <WeeklyPoojaList />
            </div>
          </div>
        </div>
      </div>
      <About />
    </>
  );
};

export default Home;