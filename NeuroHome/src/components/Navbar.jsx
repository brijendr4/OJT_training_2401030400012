import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-neuromorphic-light shadow-neuro px-8 py-6">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo */}
        <div className="flex-shrink-0">
          <a href="#" className="text-2xl font-bold text-gray-800 hover:text-gray-600 transition-colors">
            Fashion & Freedom
          </a>
        </div>

        {/* Menu Links */}
        <div className="flex gap-8 items-center">
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">New</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">Men</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">Women</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">Accessories</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">Jewelry</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">About</a>
          <a href="#" className="text-gray-700 hover:text-gray-900 transition-all duration-300 hover:underline">Contact</a>
        </div>

        {/* Icons */}
        <div className="flex gap-6 items-center">
          {/* Search */}
          <button className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700 group-hover:text-gray-900 transition-colors">
              <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.867-3.834zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0" />
            </svg>
          </button>

          {/* Profile */}
          <button className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700 group-hover:text-gray-900 transition-colors">
              <path d="M8 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6m2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0m4 8c0 1-1 1-1 1H3s-1 0-1-1 1-4 6-4 6 3 6 4m-1-.004c-.001-.246-.154-.986-.832-1.664C11.516 10.68 10.289 10 8 10s-3.516.68-4.168 1.332c-.678.678-.83 1.418-.832 1.664z" />
            </svg>
          </button>

          {/* Cart */}
          <button className="relative group">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" fill="currentColor" viewBox="0 0 16 16" className="text-gray-700 group-hover:text-gray-900 transition-colors">
              <path d="M0 1.5A.5.5 0 0 1 .5 1H2a.5.5 0 0 1 .485.379L2.89 3H14.5a.5.5 0 0 1 .491.592l-1.5 8A.5.5 0 0 1 13 12H4a.5.5 0 0 1-.491-.408L2.01 3.607 1.61 2H.5a.5.5 0 0 1-.5-.5M3.102 4l1.313 7h8.17l1.313-7zM5 12a2 2 0 1 0 0 4 2 2 0 0 0 0-4m7 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4m-7 1a1 1 0 1 1 0 2 1 1 0 0 1 0-2m7 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2" />
            </svg>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
