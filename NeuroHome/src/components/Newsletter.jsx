import React from 'react';

const Newsletter = () => {
  return (
    <div className="bg-gradient-to-r from-gray-800 to-gray-900 py-16 px-4">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">Stay Updated</h2>
        <p className="text-gray-300 text-lg mb-8">Subscribe to get special offers and the latest fashion updates</p>

        {/* Newsletter Form with Neuromorphic Style */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email"
            className="flex-1 px-6 py-3 rounded-xl bg-neuromorphic-light text-gray-800 placeholder-gray-500 shadow-neuro focus:outline-none focus:shadow-neuro_hover transition-all duration-300"
          />
          <button className="px-8 py-3 bg-neuromorphic-light text-gray-800 font-semibold rounded-xl shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform hover:scale-105 active:shadow-neuro_inset">
            Subscribe
          </button>
        </div>
      </div>
    </div>
  );
};

export default Newsletter;
