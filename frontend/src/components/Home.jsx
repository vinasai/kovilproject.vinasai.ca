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
      <div className="flex flex-col items-center bg-gradient-to-b from-[#FFFF] to-[#F7F4C5]">
      <div className="flex justify-center w-[1500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
          {/* Left Column */}
          <div className="space-y-2">
         
            <Facebook />
          </div>
          {/* Right Column */}
          <div>
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
