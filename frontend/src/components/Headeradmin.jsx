import React, { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from '../assets/Varasithi Logo.png'

const Headeradmin = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Top Bar */}
<div className="pb-5">
      <div className="bg-white text-black text-center py-2 text-sm md:text-base flex justify-center items-center gap-4 px-4">
        <span>Blessings in Giving: Support a Cause That Matters!🌟 Give from the Heart<strong>
        </strong></span>
      
      </div>
      {/* Header */}
      <header className="bg-gradient-to-r from-[#9B3A04] to-[#4B0003] text-white shadow-lg  top-8 left-0 w-full z-50">
        {/* fixed */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          {/* Logo Section */}
          <div className="flex items-center space-x-3">
            <img
              src={logo}
              alt="Logo"
              className="w-25 h-25 object-contain"
            />
            <span className="text-2xl font-bold">Sri Varasiththi Vinaayagar</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex flex-grow justify-center space-x-8">
            <a href="/" className="hover:text-gray-300">Users</a>
            <a href="/eventadmin" className="hover:text-gray-300">Events</a>
            <a href="/donateadmin" className="hover:text-gray-300">Donations</a>
            <a href="/gallery" className="hover:text-gray-300">Photo</a>
            <a href="/video" className="hover:text-gray-300">Videos</a>
            <a href="/event" className="hover:text-gray-300">Calendar</a>
            <a href="/contact" className="hover:text-gray-300">Contact</a>
          </nav>

          <div className="hidden md:flex space-x-4">
            <a href="/logout" className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300">
              Logout
            </a>

          
          </div>


          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu Dropdown */}
        {isOpen && (
          <nav className="md:hidden p-4">
            <ul className="flex flex-col items-center space-y-4">
              <li><a href="/" className="block hover:text-gray-300">Users</a></li>
              <li><a href="/eventadmin" className="block hover:text-gray-300">Events</a></li>
              <li><a href="/service" className="block hover:text-gray-300">Donations</a></li>
              <li><a href="/gallery" className="block hover:text-gray-300">Photo</a></li>
              <li><a href="/video" className="block hover:text-gray-300">Videos</a></li>
              <li><a href="/" className="block hover:text-gray-300">Calendar</a></li>
              <li><a href="/" className="block hover:text-gray-300">Donate</a></li>
              <li><a href="/contact" className="hover:text-gray-300">Contact</a></li>
              <button className="bg-red-600 hover:bg-red-700 focus:ring-4 focus:ring-red-300 text-white font-semibold px-6 py-2 rounded-lg shadow-md transition-all duration-300">
                Login
              </button>
            </ul>
          </nav>
        )}
      </header>
      </div>
    </>
  );
};

export default Headeradmin;
