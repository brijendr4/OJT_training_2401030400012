import React from 'react';

const CategoryGrid = () => {
  const categories = [
    { title: 'NEW ARRIVALS', image: 'https://img.magnific.com/free-photo/front-view-stylish-woman_23-2148212633.jpg?w=500' },
    { title: 'MEN', image: 'https://img.magnific.com/free-photo/fashionable-man-posing_23-2148208134.jpg?w=500' },
    { title: 'WOMEN', image: 'https://img.magnific.com/free-photo/beautiful-woman-fashion_23-2148212648.jpg?w=500' },
    { title: 'ACCESSORIES', image: 'https://img.magnific.com/free-photo/fashion-accessories-flat-lay_23-2148212660.jpg?w=500' },
  ];

  return (
    <div className="bg-neuromorphic-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Shop by Category</h2>
          <p className="text-gray-600 text-lg">Discover our curated collections</p>
        </div>

        {/* Category Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((category, index) => (
            <div
              key={index}
              className="group relative h-64 rounded-2xl overflow-hidden cursor-pointer shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform hover:scale-105"
            >
              {/* Image */}
              <img
                src={category.image}
                alt={category.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
              />

              {/* Overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-40 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="text-center">
                  <h3 className="text-white text-2xl font-bold group-hover:text-3xl transition-all duration-300">
                    {category.title}
                  </h3>
                  <div className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <button className="px-6 py-2 bg-neuromorphic-light text-gray-800 rounded-lg font-semibold shadow-neuro hover:shadow-neuro_hover transition-all duration-300">
                      Explore
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CategoryGrid;
