import React from 'react';

const TopBar = () => {
  return (
    <div className="bg-gray-900 text-white py-3 px-6">
      <div className="flex justify-between items-center max-w-7xl mx-auto">
        <h4 className="text-sm font-light">Free shipping. 30-day return or refund guarantee</h4>
        <div className="flex items-center gap-6">
          <a href="#" className="text-sm hover:underline transition-all duration-300">SIGN IN</a>
          <a href="#" className="text-sm hover:underline transition-all duration-300">FAQ</a>
          <select className="bg-gray-800 text-white text-sm px-3 py-1 rounded cursor-pointer border border-gray-700 hover:border-gray-600">
            <option>USD</option>
            <option>INR</option>
            <option>EURO</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
