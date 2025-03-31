import React from 'react';
import img1 from '../assets/m1.jpg'
import img2 from '../assets/m2.jpg'
import img3 from '../assets/m3.jpg'
import img4 from '../assets/m4.jpg'
import img5 from '../assets/m5.jpg'
import img6 from '../assets/m6.jpg'
import img7 from '../assets/m7.jpg'

const images = [
  { src: img1, alt: 'Image 1' },
  { src: img2, alt: 'Image 2' },
  { src: img3, alt: 'Image 3' },
  { src: img4, alt: 'Image 4' },
  { src: img5, alt: 'Image 5' },
  { src: img6, alt: 'Image 6' },
  { src: img7, alt: 'Image 7' },
];

const Gallery = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Sri Varasiththi Vinaayagar Bramothsavam 2021</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {images.map((image, index) => (
          <div key={index} className="group relative overflow-hidden rounded-lg shadow-lg">
            <img
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-50 transition-opacity duration-300"></div>
            <div className="absolute inset-0 flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Gallery;
