import React from "react";
import img1 from "../assets/img5.png";

const AboutSection = () => {
  return (
    <section id="aboutsection" className="py-20 bg-gradient-to-r from-[#F7F4C5] to-[#FFFF]">
      <div className="container mx-auto px-6">
        <h2 className="text-3xl text-center md:text-5xl font-extrabold text-gray-900 mb-6 pb-10">
        “Let Love Bind Us All Together”
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left Side - Text & Button */}
          <div className="text-center md:text-left">
            <p className="text-lg md:text-xl text-gray-700 mt-4 text-center">
              Sri Varasiththi Vinaayagar Hindu Temple was established in November
              1999 by Dr. Sivasri Panchadchara Vijayakumara Kurukkal to fulfill
              the spiritual needs of the growing Hindu community in Toronto,
              Ontario, Canada.{" "}
              <a href="/about" className="text-blue-600 hover:underline">
                Read More
              </a>
            </p>

            <h3 className="text-lg text-center  md:text-xl text-yellow-600 font-semibold text-gray-800 mt-6">
              "God is one but names are many."
            </h3>

            {/* Service Hours */}
            <div className="mt-4 p-4  rounded-lg ">
              <h4 className="text-3xl font-bold text-gray-900 mb-2 text-center p-5">
                Hours of Service
              </h4>
              <ul className="text-xl text-gray-700 grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-2">
                <li>07:00 AM - Temple Opens</li>
                <li>10:00 AM - Morning Prayer</li>
                <li>12:00 PM - Afternoon Prayer</li>
                <li>12:30 PM - Temple Closes</li>
                <li>05:00 PM - Temple Opens</li>
                <li>06:30 PM - Evening Prayer</li>
                <li>09:00 PM - Night Prayer</li>
                <li>09:05 PM - Temple Closes</li>
              </ul>
            </div>
          </div>

          {/* Right Side - Image */}
          <div className="flex justify-center md:justify-end">
          <img
            src={img1}
            alt="Hindu Temple"
            className="w-full max-w-sm md:max-w-md lg:max-w-lg rounded-full"
          />
        </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
