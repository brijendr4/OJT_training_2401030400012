import React from 'react';
import ProductCard from './ProductCard';

const ProductShowcase = () => {
  const products = [
    { id: 1, title: 'Classic Leather Jacket', price: 189.99, category: 'Men', image: 'https://img.magnific.com/free-photo/men-brown-jacket-looking-away_23-2148208112.jpg?w=400' },
    { id: 2, title: 'Summer Dress', price: 79.99, category: 'Women', image: 'https://img.magnific.com/free-photo/woman-colorful-dress_23-2148212654.jpg?w=400' },
    { id: 3, title: 'Casual T-Shirt', price: 39.99, category: 'Unisex', image: 'https://img.magnific.com/free-photo/modern-casual-outfit_23-2148208145.jpg?w=400' },
    { id: 4, title: 'Elegant Watch', price: 249.99, category: 'Accessories', image: 'https://img.magnific.com/free-photo/luxury-watch-flat-lay_23-2148212680.jpg?w=400' },
    { id: 5, title: 'Designer Sneakers', price: 129.99, category: 'Footwear', image: 'https://img.magnific.com/free-photo/fashion-sneakers-minimal_23-2148208160.jpg?w=400' },
    { id: 6, title: 'Wool Sweater', price: 89.99, category: 'Men', image: 'https://img.magnific.com/free-photo/man-stylish-sweater_23-2148208098.jpg?w=400' },
  ];

  return (
    <div className="bg-gradient-to-b from-white to-neuromorphic-light py-16 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header with Neuromorphic Style */}
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-gray-800 mb-4">Featured Collection</h2>
          <div className="w-24 h-1 bg-gradient-to-r from-gray-400 to-gray-600 mx-auto rounded-full shadow-neuro"></div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              image={product.image}
              title={product.title}
              price={product.price}
              category={product.category}
            />
          ))}
        </div>

        {/* CTA Button */}
        <div className="text-center mt-12">
          <button className="px-8 py-4 bg-neuromorphic-light text-gray-800 font-semibold rounded-xl shadow-neuro hover:shadow-neuro_hover transition-all duration-300 transform hover:scale-105 active:shadow-neuro_inset text-lg">
            View All Products
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductShowcase;
