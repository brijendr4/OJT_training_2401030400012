import React, { useState, useEffect } from 'react';

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      image: 'https://img.magnific.com/free-photo/retro-man-dressed-shirt-lies-floor-posing_171337-9906.jpg?t=st=1778561432~exp=1778565032~hmac=746bd85533147c325dc3c8e4f3c364cf11837c0bb937a14baef80ad1ec4e9d4f&w=1060',
      title: 'The New Way To Display Product',
      subtitle: 'by Fashion and Freedom'
    },
    {
      image: 'https://img.magnific.com/free-photo/portrait-happy-woman-posing_23-2148212622.jpg?w=1060',
      title: 'Premium Fashion Collection',
      subtitle: 'Discover Your Style'
    },
    {
      image: 'https://img.magnific.com/free-photo/handsome-man-fashion-clothes_23-2148208148.jpg?w=1060',
      title: 'Elegance Redefined',
      subtitle: 'Fashion for Everyone'
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const goToSlide = (index) => setCurrentSlide(index);
  const nextSlide = () => setCurrentSlide((prev) => (prev + 1) % slides.length);
  const prevSlide = () => setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-neuromorphic-light">
      {/* Slides */}
      <div className="relative w-full h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-1000 ${
              index === currentSlide ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            {/* Overlay */}
            <div className="absolute inset-0 bg-black bg-opacity-30"></div>

            {/* Text Content */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <h1 className="text-5xl md:text-6xl font-bold text-white text-center mb-4 drop-shadow-lg">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-white text-center drop-shadow-md">
                {slide.subtitle}
              </p>

              {/* Neuromorphic Button */}
              <button className="mt-8 px-8 py-4 bg-neuromorphic-light text-gray-800 font-semibold rounded-xl shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform hover:scale-105 active:shadow-neuro_inset">
                Explore Collection
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-neuromorphic-light shadow-neuro hover:shadow-neuro_hover transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700">
          <path fillRule="evenodd" d="M12 8a.5.5 0 0 1-.5.5H5.707l2.147 2.146a.5.5 0 0 1-.708.708l-3-3a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H11.5a.5.5 0 0 1 .5.5z" />
        </svg>
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 z-10 p-4 rounded-full bg-neuromorphic-light shadow-neuro hover:shadow-neuro_hover transition-all duration-300"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700">
          <path fillRule="evenodd" d="M4 8a.5.5 0 0 1 .5-.5h5.793L8.146 5.354a.5.5 0 1 1 .708-.708l3 3a.5.5 0 0 1 0 .708l-3 3a.5.5 0 0 1-.708-.708L10.293 8.5H4.5A.5.5 0 0 1 4 8z" />
        </svg>
      </button>

      {/* Dots Navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-10 flex gap-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white shadow-lg w-8'
                : 'bg-white bg-opacity-50 hover:bg-opacity-75 shadow-neuro'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;
