import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ProductShowcase = () => {
  const [filters, setFilters] = useState({
    category: '',
    priceRange: '',
    rating: '',
    sortBy: 'featured'
  });

  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 6;

  const products = [
    {
      id: 1,
      name: "Premium Dog Food",
      category: "Food",
      price: 49.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1596460650795-4775a45ac70d?auto=format&fit=crop&q=80&w=300",
      description: "Organic grain-free formula for adult dogs",
      brand: "PawNatural"
    },
    {
      id: 2,
      name: "Interactive Cat Toy",
      category: "Toys",
      price: 24.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1592194996308-7b43878e84a6?auto=format&fit=crop&q=80&w=300",
      description: "Electronic motion toy keeps cats engaged",
      brand: "PlayPets"
    },
    {
      id: 3,
      name: "Comfort Pet Bed",
      category: "Accessories",
      price: 89.99,
      rating: 4.9,
      image: "https://images.unsplash.com/photo-1559013514-75a5b5d51de1?auto=format&fit=crop&q=80&w=300",
      description: "Orthopedic memory foam for joint support",
      brand: "CozyPaws"
    },
    {
      id: 4,
      name: "Grooming Kit",
      category: "Grooming",
      price: 34.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1593537612373-cc361d0d0af6?auto=format&fit=crop&q=80&w=300",
      description: "Complete grooming set for all coat types",
      brand: "PrettyPets"
    },
    {
      id: 5,
      name: "Health Supplements",
      category: "Health",
      price: 29.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1570042225831-d98fa7577f1e?auto=format&fit=crop&q=80&w=300",
      description: "Vitamins and probiotics for optimal health",
      brand: "VetCare"
    },
    {
      id: 6,
      name: "Training Treats",
      category: "Food",
      price: 15.99,
      rating: 4.8,
      image: "https://images.unsplash.com/photo-1559013515-514055c45e2d?auto=format&fit=crop&q=80&w=300",
      description: "Low-calorie training rewards",
      brand: "TrainSmart"
    },
    {
      id: 7,
      name: "Safety Harness",
      category: "Accessories",
      price: 42.99,
      rating: 4.4,
      image: "https://images.unsplash.com/photo-1559056199-641a0ac8b55e?auto=format&fit=crop&q=80&w=300",
      description: "Adjustable no-pull harness",
      brand: "SafeWalk"
    },
    {
      id: 8,
      name: "Dental Chews",
      category: "Health",
      price: 19.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1570458436417-b4e9b9b8a153?auto=format&fit=crop&q=80&w=300",
      description: "Tartar control dental treats",
      brand: "BrightTeeth"
    },
    {
      id: 9,
      name: "Luxury Cat Tree",
      category: "Accessories",
      price: 129.99,
      rating: 4.7,
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&q=80&w=300",
      description: "Multi-level cat tree with scratching posts",
      brand: "ClawKingdom"
    },
    {
      id: 10,
      name: "Automatic Feeder",
      category: "Accessories",
      price: 79.99,
      rating: 4.3,
      image: "https://images.unsplash.com/photo-1576201836699-124eb242b7b1?auto=format&fit=crop&q=80&w=300",
      description: "Programmable automatic pet feeder",
      brand: "FeedSmart"
    },
    {
      id: 11,
      name: "Dog Jacket",
      category: "Accessories",
      price: 39.99,
      rating: 4.5,
      image: "https://images.unsplash.com/photo-1559056199-5a53f60a4b1a?auto=format&fit=crop&q=80&w=300",
      description: "Waterproof insulated dog jacket",
      brand: "WarmPaws"
    },
    {
      id: 12,
      name: "Pet Camera",
      category: "Accessories",
      price: 149.99,
      rating: 4.6,
      image: "https://images.unsplash.com/photo-1546552768-9e3a5e790aa9?auto=format&fit=crop&q=80&w=300",
      description: "HD pet camera with treat dispenser",
      brand: "PetWatch"
    }
  ];

  // Save cart to localStorage
  useEffect(() => {
    const savedCart = localStorage.getItem('petCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('petCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === product.id);
      if (existingItem) {
        return prev.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const filteredProducts = products.filter(product => {
    if (filters.category && product.category !== filters.category) return false;
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max && (product.price < min || product.price > max)) return false;
      if (!max && product.price < min) return false;
    }
    if (filters.rating && product.rating < parseFloat(filters.rating)) return false;
    return true;
  }).sort((a, b) => {
    switch (filters.sortBy) {
      case 'price-low': return a.price - b.price;
      case 'price-high': return b.price - a.price;
      case 'rating': return b.rating - a.rating;
      default: return 0;
    }
  });

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const categories = [...new Set(products.map(p => p.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5,
        ease: "easeOut"
      }
    }
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-12 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
            Premium <span className="text-primary-600">Pet Products</span>
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-neutral-600 md:text-xl">
            Everything your pet needs for a happy, healthy life
          </p>
        </motion.div>

        {/* Main Content */}
        <div className="flex flex-col gap-8 mb-12 lg:flex-row">
          {/* Filters Sidebar */}
          <div className="lg:w-1/4">
            <div className="sticky space-y-6 top-6">
              <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200">
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">Filters</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => {
                        setFilters(prev => ({ ...prev, category: e.target.value }));
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>{category}</option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => {
                        setFilters(prev => ({ ...prev, priceRange: e.target.value }));
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Price</option>
                      <option value="0-25">Under $25</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-">Over $100</option>
                    </select>
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => {
                        setFilters(prev => ({ ...prev, sortBy: e.target.value }));
                        setCurrentPage(1);
                      }}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Cart Preview */}
              <div className="p-6 bg-white border shadow-sm rounded-2xl border-primary-200">
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">Your Cart ({totalCartItems})</h3>
                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-600">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-3 rounded-lg bg-primary-50">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                          <p className="text-sm text-primary-600">${item.price} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity - 1)}
                            className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateQuantity(item.id, item.quantity + 1)}
                            className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item.id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    ))}
                    <div className="pt-4 border-t border-primary-200">
                      <div className="flex justify-between mb-3">
                        <span className="font-medium">Total:</span>
                        <span className="font-semibold">${totalCartValue.toFixed(2)}</span>
                      </div>
                      <Link
                        to="/auth/register"
                        className="block w-full px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        Checkout Now
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Products Grid */}
          <div className="lg:w-3/4">
            {/* Results Count */}
            <div className="flex items-center justify-between mb-6">
              <p className="text-neutral-600">
                Showing {currentProducts.length} of {filteredProducts.length} products
              </p>
              {filteredProducts.length > productsPerPage && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    Previous
                  </button>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <motion.div
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {currentProducts.map((product) => (
                <motion.div
                  key={product.id}
                  variants={itemVariants}
                  className="flex flex-col overflow-hidden transition-all duration-300 bg-white border rounded-2xl border-neutral-200 hover:shadow-lg group"
                >
                  <div className="relative flex-shrink-0 overflow-hidden">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
                    />
                    <div className="absolute top-4 right-4">
                      <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-secondary-500">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <div className="flex flex-col flex-1 p-6">
                    <div className="flex items-start justify-between mb-3">
                      <h3 className="text-lg font-semibold text-neutral-900 font-display">
                        {product.name}
                      </h3>
                      <div className="flex items-center">
                        <span className="text-yellow-400">★</span>
                        <span className="ml-1 text-sm text-neutral-600">{product.rating}</span>
                      </div>
                    </div>

                    <p className="flex-1 mb-4 text-sm text-neutral-600">{product.description}</p>
                    
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-2xl font-bold text-primary-600">${product.price}</span>
                      <span className="text-sm text-neutral-500">{product.brand}</span>
                    </div>

                    <button
                      onClick={() => addToCart(product)}
                      className="flex items-center justify-center w-full px-4 py-3 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                      </svg>
                      Add to Cart
                    </button>
                  </div>
                </motion.div>
              ))}
            </motion.div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex space-x-2">
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map(page => (
                    <button
                      key={page}
                      onClick={() => setCurrentPage(page)}
                      className={`px-3 py-1 rounded ${
                        currentPage === page
                          ? 'bg-primary-500 text-white'
                          : 'border border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                      }`}
                    >
                      {page}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center"
        >
          <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100">
            <h3 className="mb-4 text-2xl font-semibold text-neutral-900 font-display">
              Ready to Complete Your Pet's Journey?
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-neutral-600">
              Sign up to save your cart, track orders, and access exclusive offers
            </p>
            <Link
              to="/auth/register"
              className="inline-flex items-center px-8 py-4 font-semibold text-white transition-colors duration-300 rounded-lg shadow-md bg-primary-500 hover:bg-primary-600 hover:shadow-lg"
            >
              Create Account & Checkout
              <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ProductShowcase;