import React from 'react';

const ProductCard = ({ image, title, price, category }) => {
  return (
    <div className="group">
      {/* Image Container with Neuromorphic Effect */}
      <div className="relative overflow-hidden rounded-2xl mb-4 shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform group-hover:scale-105 h-64">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover"
        />
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300"></div>
      </div>

      {/* Product Info with Neuromorphic Style */}
      <div className="px-3">
        <p className="text-xs text-gray-500 uppercase tracking-wider mb-2">{category}</p>
        <h3 className="text-lg font-semibold text-gray-800 mb-3 group-hover:text-gray-900 transition-colors">
          {title}
        </h3>

        {/* Price and Button */}
        <div className="flex items-center justify-between">
          <span className="text-xl font-bold text-gray-800">${price}</span>
          <button className="p-3 rounded-full bg-neuromorphic-light shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform hover:scale-110 active:shadow-neuro_inset">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
