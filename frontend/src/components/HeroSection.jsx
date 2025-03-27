import React from 'react'
import backImg from '../assets/DeWatermark.ai_1740677724359.jpg'
import Facebook from './Facebook'

const HeroSection = () => {
  return (
    <div>
      <section
        className="relative bg-cover bg-center flex items-center justify-start"
        style={{ backgroundImage: `url(${backImg})`, height: '90vh' }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div> {/* Overlay */}
        <div className="relative text-left text-white p-10">
          <h1 className="typing-effect text-5xl text-yellow-500 md:text-7xl lg:text-8xl font-bold mb-3">
            Sri Varasiththi Vinaayagar
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold mb-3">
            Hindu Temple
          </h1>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold">
            Toronto
          </h1>
        </div>
      </section>
    </div>
  )
}

export default HeroSection
