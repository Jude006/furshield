// import React, { useState, useEffect } from 'react';
// import { motion, AnimatePresence } from 'framer-motion';
// import { Link } from 'react-router-dom';
// import axios from 'axios';
// import { FiSearch, FiX, FiShoppingCart, FiHeart, FiStar, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
// import { toast } from 'react-toastify';

// const ProductShowcase = () => {
//   const [products, setProducts] = useState([]);
//   const [filteredProducts, setFilteredProducts] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [filters, setFilters] = useState({
//     category: '',
//     search: '',
//     priceRange: '',
//     rating: '',
//     sortBy: 'createdAt'
//   });
//   const [cart, setCart] = useState([]);
//   const [currentPage, setCurrentPage] = useState(1);
//   const [selectedProduct, setSelectedProduct] = useState(null);
//   const [showModal, setShowModal] = useState(false);
//   const [productRatings, setProductRatings] = useState([]);
//   const [newRating, setNewRating] = useState({ rating: 0, comment: '' });
//   const productsPerPage = 9;

//   const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

//   const api = axios.create({
//     baseURL: API_BASE_URL,
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${localStorage.getItem('token')}`
//     },
//   });

//   // Fetch products from API
//   useEffect(() => {
//     const fetchProducts = async () => {
//       try {
//         setLoading(true);
//         const response = await api.get('/api/products');
//         const transformedProducts = response.data.data.map(product => ({
//           ...product,
//           rating: product.rating || 4.0, // Fallback rating
//           reviewCount: product.reviewCount || 0
//         }));
//         setProducts(transformedProducts);
//         setFilteredProducts(transformedProducts); // Initialize filteredProducts with transformed data
//       } catch (error) {
//         console.error('Error fetching products:', error);
//         toast.error(error.response?.data?.error || 'Failed to load products');
//       } finally {
//         setLoading(false);
//       }
//     };
//     fetchProducts();
//   }, []);

//   // Fetch ratings when a product is selected
//   useEffect(() => {
//     if (selectedProduct) {
//       const fetchRatings = async () => {
//         try {
//           const response = await api.get(`/api/ratings/product/${selectedProduct._id}`);
//           setProductRatings(response.data.data);
//           if (response.data.data.length > 0) {
//             const avgRating = response.data.data.reduce((sum, r) => sum + r.rating, 0) / response.data.data.length;
//             setSelectedProduct(prev => ({ ...prev, rating: avgRating, reviewCount: response.data.data.length }));
//           }
//         } catch (err) {
//           console.error('Fetch ratings error:', err);
//           toast.error(err.response?.data?.error || 'Failed to load ratings');
//         }
//       };
//       fetchRatings();
//     }
//   }, [selectedProduct]);

//   // Apply filters
//   useEffect(() => {
//     let result = [...products];
//     if (filters.category) {
//       result = result.filter(product => product.category === filters.category);
//     }
//     if (filters.search) {
//       const searchTerm = filters.search.toLowerCase();
//       result = result.filter(product => 
//         product.name.toLowerCase().includes(searchTerm) ||
//         product.description.toLowerCase().includes(searchTerm) ||
//         product.category.toLowerCase().includes(searchTerm)
//       );
//     }
//     if (filters.priceRange) {
//       const [min, max] = filters.priceRange.split('-').map(Number);
//       if (max) {
//         result = result.filter(product => product.price >= min && product.price <= max);
//       } else {
//         result = result.filter(product => product.price >= min);
//       }
//     }
//     if (filters.rating) {
//       const minRating = parseFloat(filters.rating);
//       result = result.filter(product => (product.rating || 4.0) >= minRating);
//     }
//     switch (filters.sortBy) {
//       case 'price-low':
//         result.sort((a, b) => a.price - b.price);
//         break;
//       case 'price-high':
//         result.sort((a, b) => b.price - a.price);
//         break;
//       case 'rating':
//         result.sort((a, b) => (b.rating || 4.0) - (a.rating || 4.0));
//         break;
//       case 'name':
//         result.sort((a, b) => a.name.localeCompare(b.name));
//         break;
//       case '-name':
//         result.sort((a, b) => b.name.localeCompare(a.name));
//         break;
//       default:
//         result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
//     }
//     setFilteredProducts(result);
//     setCurrentPage(1);
//   }, [filters, products]);

//   // Load and save cart
//   useEffect(() => {
//     const savedCart = localStorage.getItem('petCart');
//     if (savedCart) {
//       setCart(JSON.parse(savedCart));
//     }
//   }, []);

//   useEffect(() => {
//     localStorage.setItem('petCart', JSON.stringify(cart));
//   }, [cart]);

//   const addToCart = (product) => {
//     setCart(prev => {
//       const existingItem = prev.find(item => item._id === product._id);
//       if (existingItem) {
//         return prev.map(item =>
//           item._id === product._id
//             ? { ...item, quantity: item.quantity + 1 }
//             : item
//         );
//       }
//       return [...prev, { ...product, quantity: 1 }];
//     });
//     toast.success(`${product.name} added to cart!`);
//   };

//   const removeFromCart = (productId) => {
//     setCart(prev => prev.filter(item => item._id !== productId));
//     toast.info('Item removed from cart');
//   };

//   const updateQuantity = (productId, newQuantity) => {
//     if (newQuantity === 0) {
//       removeFromCart(productId);
//       return;
//     }
//     setCart(prev => prev.map(item =>
//       item._id === productId ? { ...item, quantity: newQuantity } : item
//     ));
//   };

//   const handleFilterChange = (key, value) => {
//     setFilters(prev => ({ ...prev, [key]: value }));
//   };

//   const clearFilters = () => {
//     setFilters({
//       category: '',
//       search: '',
//       priceRange: '',
//       rating: '',
//       sortBy: 'createdAt'
//     });
//   };

//   const viewProductDetails = (product) => {
//     setSelectedProduct(product);
//     setShowModal(true);
//   };

//   const closeModal = () => {
//     setShowModal(false);
//     setSelectedProduct(null);
//     setNewRating({ rating: 0, comment: '' });
//   };

//   const handleRatingSubmit = async () => {
//     if (!localStorage.getItem('token')) {
//       toast.error('Please login to submit a rating');
//       return;
//     }
//     try {
//       const response = await api.post('/api/ratings', {
//         productId: selectedProduct._id,
//         rating: newRating.rating,
//         comment: newRating.comment
//       });
//       setProductRatings(prev => [...prev, {
//         ...response.data.data,
//         userId: { name: 'You' } // Placeholder; actual name fetched from backend
//       }]);
//       setNewRating({ rating: 0, comment: '' });
//       toast.success('Rating submitted successfully');
//       const avgRating = (productRatings.reduce((sum, r) => sum + r.rating, 0) + newRating.rating) / (productRatings.length + 1);
//       setSelectedProduct(prev => ({ ...prev, rating: avgRating, reviewCount: prev.reviewCount + 1 }));
//     } catch (err) {
//       toast.error(err.response?.data?.error || 'Failed to submit rating');
//     }
//   };

//   const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
//   const currentProducts = filteredProducts.slice(
//     (currentPage - 1) * productsPerPage,
//     currentPage * productsPerPage
//   );

//   const categories = [...new Set(products.map(p => p.category))];

//   const containerVariants = {
//     hidden: { opacity: 0 },
//     visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
//   };

//   const itemVariants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
//   };

//   const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
//   const totalCartValue = cart.reduce((total, item) => total + (item.price * item.quantity), 0);

//   if (loading) {
//     return (
//       <section className="py-20 bg-white">
//         <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//           <div className="flex flex-col gap-8 mb-12 lg:flex-row">
//             <div className="lg:w-1/4">
//               <div className="sticky space-y-6 top-6">
//                 <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200 animate-pulse">
//                   <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                   <div className="space-y-4">
//                     <div className="h-10 bg-gray-200 rounded"></div>
//                     <div className="h-10 bg-gray-200 rounded"></div>
//                     <div className="h-10 bg-gray-200 rounded"></div>
//                   </div>
//                 </div>
//                 <div className="p-6 bg-white border shadow-sm rounded-2xl border-primary-200 animate-pulse">
//                   <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
//                   <div className="h-20 bg-gray-200 rounded"></div>
//                 </div>
//               </div>
//             </div>
//             <div className="lg:w-3/4">
//               <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
//                 {[...Array(6)].map((_, i) => (
//                   <div key={i} className="flex flex-col overflow-hidden bg-white border rounded-2xl border-neutral-200 animate-pulse">
//                     <div className="h-48 bg-gray-200"></div>
//                     <div className="flex flex-col flex-1 p-6">
//                       <div className="h-6 bg-gray-200 rounded mb-3"></div>
//                       <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
//                       <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
//                       <div className="h-10 bg-gray-200 rounded"></div>
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="py-20 bg-white">
//       <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8 }}
//           className="mb-12 text-center"
//         >
//           <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
//             Premium <span className="text-primary-600">Pet Products</span>
//           </h2>
//           <p className="max-w-2xl mx-auto mt-4 text-lg text-neutral-600 md:text-xl">
//             Everything your pet needs for a happy, healthy life
//           </p>
//         </motion.div>

//         <div className="flex flex-col gap-8 mb-12 lg:flex-row">
//           <div className="lg:w-1/4">
//             <div className="sticky space-y-6 top-6">
//               <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200">
//                 <div className="flex items-center justify-between mb-4">
//                   <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
//                   {(filters.category || filters.priceRange || filters.rating || filters.search) && (
//                     <button 
//                       onClick={clearFilters}
//                       className="text-sm text-primary-600 hover:text-primary-700"
//                     >
//                       Clear All
//                     </button>
//                   )}
//                 </div>
//                 <div className="space-y-4">
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-neutral-700">Search</label>
//                     <div className="relative">
//                       <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
//                       <input
//                         type="text"
//                         placeholder="Search products..."
//                         value={filters.search}
//                         onChange={(e) => handleFilterChange('search', e.target.value)}
//                         className="w-full pl-10 pr-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                       />
//                       {filters.search && (
//                         <button
//                           onClick={() => handleFilterChange('search', '')}
//                           className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
//                         >
//                           <FiX size={16} />
//                         </button>
//                       )}
//                     </div>
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-neutral-700">Category</label>
//                     <select
//                       value={filters.category}
//                       onChange={(e) => handleFilterChange('category', e.target.value)}
//                       className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                     >
//                       <option value="">All Categories</option>
//                       {categories.map(category => (
//                         <option key={category} value={category}>
//                           {category.charAt(0).toUpperCase() + category.slice(1)}
//                         </option>
//                       ))}
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-neutral-700">Price Range</label>
//                     <select
//                       value={filters.priceRange}
//                       onChange={(e) => handleFilterChange('priceRange', e.target.value)}
//                       className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                     >
//                       <option value="">All Prices</option>
//                       <option value="0-25">Under $25</option>
//                       <option value="25-50">$25 - $50</option>
//                       <option value="50-100">$50 - $100</option>
//                       <option value="100-">Over $100</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-neutral-700">Minimum Rating</label>
//                     <select
//                       value={filters.rating}
//                       onChange={(e) => handleFilterChange('rating', e.target.value)}
//                       className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                     >
//                       <option value="">Any Rating</option>
//                       <option value="4.5">4.5+ Stars</option>
//                       <option value="4">4+ Stars</option>
//                       <option value="3">3+ Stars</option>
//                     </select>
//                   </div>
//                   <div>
//                     <label className="block mb-2 text-sm font-medium text-neutral-700">Sort By</label>
//                     <select
//                       value={filters.sortBy}
//                       onChange={(e) => handleFilterChange('sortBy', e.target.value)}
//                       className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
//                     >
//                       <option value="createdAt">Newest</option>
//                       <option value="price-low">Price: Low to High</option>
//                       <option value="price-high">Price: High to Low</option>
//                       <option value="rating">Highest Rated</option>
//                       <option value="name">Name: A-Z</option>
//                       <option value="-name">Name: Z-A</option>
//                     </select>
//                   </div>
//                 </div>
//               </div>
//               <div className="p-6 bg-white border shadow-sm rounded-2xl border-primary-200">
//                 <h3 className="mb-4 text-lg font-semibold text-neutral-900">Your Cart ({totalCartItems})</h3>
//                 {cart.length === 0 ? (
//                   <p className="text-sm text-neutral-600">Your cart is empty</p>
//                 ) : (
//                   <div className="space-y-4">
//                     {cart.map(item => (
//                       <div key={item._id} className="flex items-center justify-between p-3 rounded-lg bg-primary-50">
//                         <div className="flex-1">
//                           <p className="text-sm font-medium text-neutral-900">{item.name}</p>
//                           <p className="text-sm text-primary-600">${item.price.toFixed(2)} x {item.quantity}</p>
//                         </div>
//                         <div className="flex items-center space-x-2">
//                           <button
//                             onClick={() => updateQuantity(item._id, item.quantity - 1)}
//                             className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
//                           >
//                             -
//                           </button>
//                           <button
//                             onClick={() => updateQuantity(item._id, item.quantity + 1)}
//                             className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
//                           >
//                             +
//                           </button>
//                           <button
//                             onClick={() => removeFromCart(item._id)}
//                             className="p-1 text-red-500 hover:text-red-700"
//                           >
//                             <FiX size={16} />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                     <div className="pt-4 border-t border-primary-200">
//                       <div className="flex justify-between mb-3">
//                         <span className="font-medium">Total:</span>
//                         <span className="font-semibold">${totalCartValue.toFixed(2)}</span>
//                       </div>
//                       <Link
//                         to="/cart"
//                         className="block w-full px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
//                       >
//                         View Cart
//                       </Link>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           <div className="lg:w-3/4">
//             <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
//               <p className="text-neutral-600 mb-2 sm:mb-0">
//                 Showing {currentProducts.length} of {filteredProducts.length} products
//                 {filters.search && ` for "${filters.search}"`}
//                 {filters.category && ` in ${filters.category}`}
//               </p>
//               {filteredProducts.length > productsPerPage && (
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
//                   >
//                     <FiChevronLeft size={16} className="mr-1" />
//                     Previous
//                   </button>
//                   <span className="text-sm text-neutral-600">
//                     Page {currentPage} of {totalPages}
//                   </span>
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
//                   >
//                     Next
//                     <FiChevronRight size={16} className="ml-1" />
//                   </button>
//                 </div>
//               )}
//             </div>

//             {filteredProducts.length === 0 && (
//               <div className="p-8 text-center bg-white border shadow-sm rounded-2xl border-neutral-200">
//                 <FiSearch size={48} className="mx-auto mb-4 text-neutral-400" />
//                 <h3 className="text-lg font-semibold text-neutral-900">No products found</h3>
//                 <p className="text-neutral-600 mb-4">Try adjusting your filters or search terms</p>
//                 <button
//                   onClick={clearFilters}
//                   className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
//                 >
//                   Clear All Filters
//                 </button>
//               </div>
//             )}

//             <motion.div
//               variants={containerVariants}
//               initial="hidden"
//               animate="visible"
//               className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
//             >
//               {currentProducts.map((product) => (
//                 <motion.div
//                   key={product._id}
//                   variants={itemVariants}
//                   className="flex flex-col overflow-hidden transition-all duration-300 bg-white border rounded-2xl border-neutral-200 hover:shadow-lg group"
//                 >
//                   <div className="relative flex-shrink-0 overflow-hidden">
//                     <img
//                       src={product.images?.[0] || 'https://via.placeholder.com/300'}
//                       alt={product.name}
//                       loading='lazy'
//                       className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/300';
//                       }}
//                     />
//                     <div className="absolute top-4 right-4">
//                       <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-secondary-500">
//                         {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
//                       </span>
//                     </div>
//                     <button 
//                       onClick={() => viewProductDetails(product)}
//                       className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
//                     >
//                       <FiEye size={16} className="text-neutral-600" />
//                     </button>
//                   </div>

//                   <div className="flex flex-col flex-1 p-6">
//                     <div className="flex items-start justify-between mb-3">
//                       <h3 className="text-lg font-semibold text-neutral-900 font-display">
//                         {product.name}
//                       </h3>
//                       <div className="flex items-center">
//                         <FiStar className="text-yellow-400 fill-current" />
//                         <span className="ml-1 text-sm text-neutral-600">
//                           {(product.rating || 4.0).toFixed(1)}
//                         </span>
//                       </div>
//                     </div>
//                     <p className="flex-1 mb-4 text-sm text-neutral-600 line-clamp-2">
//                       {product.description}
//                     </p>
//                     <div className="flex items-center justify-between mb-4">
//                       <span className="text-2xl font-bold text-primary-600">${product.price.toFixed(2)}</span>
//                       {product.stockQuantity > 0 ? (
//                         <span className="text-sm text-green-600">In Stock</span>
//                       ) : (
//                         <span className="text-sm text-red-600">Out of Stock</span>
//                       )}
//                     </div>
//                     <div className="flex gap-2">
//                       <button
//                         onClick={() => viewProductDetails(product)}
//                         className="flex-1 px-4 py-2 font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
//                       >
//                         View Details
//                       </button>
//                       <button
//                         onClick={() => addToCart(product)}
//                         disabled={product.stockQuantity === 0}
//                         className="flex items-center justify-center px-4 py-2 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <FiShoppingCart size={18} className="mr-2" />
//                         Add
//                       </button>
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </motion.div>

//             {totalPages > 1 && (
//               <div className="flex justify-center mt-8">
//                 <div className="flex items-center space-x-2">
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
//                     disabled={currentPage === 1}
//                     className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
//                   >
//                     <FiChevronLeft size={16} className="mr-1" />
//                     Previous
//                   </button>
//                   {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
//                     let pageNum;
//                     if (totalPages <= 5) {
//                       pageNum = i + 1;
//                     } else if (currentPage <= 3) {
//                       pageNum = i + 1;
//                     } else if (currentPage >= totalPages - 2) {
//                       pageNum = totalPages - 4 + i;
//                     } else {
//                       pageNum = currentPage - 2 + i;
//                     }
//                     return (
//                       <button
//                         key={pageNum}
//                         onClick={() => setCurrentPage(pageNum)}
//                         className={`px-3 py-1 rounded ${
//                           currentPage === pageNum
//                             ? 'bg-primary-500 text-white'
//                             : 'border border-neutral-300 text-neutral-600 hover:bg-neutral-50'
//                         }`}
//                       >
//                         {pageNum}
//                       </button>
//                     );
//                   })}
//                   {totalPages > 5 && currentPage < totalPages - 2 && (
//                     <span className="px-2 text-neutral-500">...</span>
//                   )}
//                   {totalPages > 5 && currentPage < totalPages - 2 && (
//                     <button
//                       onClick={() => setCurrentPage(totalPages)}
//                       className="px-3 py-1 border rounded border-neutral-300 text-neutral-600 hover:bg-neutral-50"
//                     >
//                       {totalPages}
//                     </button>
//                   )}
//                   <button
//                     onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
//                     disabled={currentPage === totalPages}
//                     className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
//                   >
//                     Next
//                     <FiChevronRight size={16} className="ml-1" />
//                   </button>
//                 </div>
//               </div>
//             )}
//           </div>
//         </div>

//         <motion.div
//           initial={{ opacity: 0, y: 30 }}
//           whileInView={{ opacity: 1, y: 0 }}
//           viewport={{ once: true }}
//           transition={{ duration: 0.8, delay: 0.4 }}
//           className="text-center"
//         >
//           <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100">
//             <h3 className="mb-4 text-2xl font-semibold text-neutral-900 font-display">
//               Ready to Complete Your Pet's Journey?
//             </h3>
//             <p className="max-w-2xl mx-auto mb-6 text-neutral-600">
//               Sign up to save your cart, track orders, and access exclusive offers
//             </p>
//             <Link
//               to="/auth/register"
//               className="inline-flex items-center px-8 py-4 font-semibold text-white transition-colors duration-300 rounded-lg shadow-md bg-primary-500 hover:bg-primary-600 hover:shadow-lg"
//             >
//               Create Account & Checkout
//               <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
//               </svg>
//             </Link>
//           </div>
//         </motion.div>

//         <AnimatePresence>
//           {showModal && selectedProduct && (
//             <motion.div
//               initial={{ opacity: 0 }}
//               animate={{ opacity: 1 }}
//               exit={{ opacity: 0 }}
//               className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
//               onClick={closeModal}
//             >
//               <motion.div
//                 initial={{ scale: 0.9, opacity: 0 }}
//                 animate={{ scale: 1, opacity: 1 }}
//                 exit={{ scale: 0.9, opacity: 0 }}
//                 className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
//                 onClick={(e) => e.stopPropagation()}
//               >
//                 <button
//                   onClick={closeModal}
//                   className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
//                 >
//                   <FiX size={20} />
//                 </button>
//                 <div className="flex flex-col md:flex-row">
//                   <div className="md:w-1/2">
//                     <img
//                       src={selectedProduct.images?.[0] || 'https://via.placeholder.com/500'}
//                       alt={selectedProduct.name}
//                       className="object-cover w-full h-64 md:h-full"
//                       onError={(e) => {
//                         e.target.src = 'https://via.placeholder.com/500';
//                       }}
//                     />
//                   </div>
//                   <div className="flex flex-col p-6 md:w-1/2">
//                     <div className="mb-4">
//                       <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-secondary-500">
//                         {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
//                       </span>
//                     </div>
//                     <h2 className="mb-2 text-2xl font-bold text-neutral-900">{selectedProduct.name}</h2>
//                     <div className="flex items-center mb-4">
//                       <div className="flex">
//                         {[1, 2, 3, 4, 5].map((star) => (
//                           <FiStar
//                             key={star}
//                             className={`${
//                               star <= Math.floor(selectedProduct.rating || 4)
//                                 ? 'text-yellow-400 fill-current'
//                                 : 'text-gray-300'
//                             }`}
//                             size={16}
//                           />
//                         ))}
//                       </div>
//                       <span className="ml-2 text-sm text-neutral-600">
//                         {(selectedProduct.rating || 4.0).toFixed(1)} ({selectedProduct.reviewCount || 0} reviews)
//                       </span>
//                     </div>
//                     <p className="mb-6 text-neutral-600">{selectedProduct.description}</p>
//                     <div className="mb-6">
//                       <h3 className="mb-2 text-lg font-semibold text-neutral-900">Product Details</h3>
//                       <ul className="text-sm text-neutral-600">
//                         <li className="mb-1">
//                           <span className="font-medium">Category:</span> {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
//                         </li>
//                         <li className="mb-1">
//                           <span className="font-medium">Stock:</span> {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} available` : 'Out of stock'}
//                         </li>
//                         {selectedProduct.tags && selectedProduct.tags.length > 0 && (
//                           <li>
//                             <span className="font-medium">Tags:</span> {selectedProduct.tags.join(', ')}
//                           </li>
//                         )}
//                       </ul>
//                     </div>
//                     <div className="flex items-center justify-between mt-auto mb-6">
//                       <span className="text-3xl font-bold text-primary-600">${selectedProduct.price.toFixed(2)}</span>
//                       <button
//                         onClick={() => {
//                           addToCart(selectedProduct);
//                           closeModal();
//                         }}
//                         disabled={selectedProduct.stockQuantity === 0}
//                         className="flex items-center px-6 py-3 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         <FiShoppingCart size={18} className="mr-2" />
//                         Add to Cart
//                       </button>
//                     </div>
//                     <div className="border-t pt-6">
//                       <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rate this Product</h3>
//                       <div className="flex items-center mb-3">
//                         {[1, 2, 3, 4, 5].map(star => (
//                           <FiStar
//                             key={star}
//                             className={`w-6 h-6 cursor-pointer ${star <= newRating.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
//                             onClick={() => setNewRating(prev => ({ ...prev, rating: star }))}
//                           />
//                         ))}
//                       </div>
//                       <textarea
//                         value={newRating.comment}
//                         onChange={(e) => setNewRating(prev => ({ ...prev, comment: e.target.value }))}
//                         placeholder="Leave a comment..."
//                         className="w-full p-3 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
//                         rows="4"
//                       />
//                       <button
//                         onClick={handleRatingSubmit}
//                         disabled={!newRating.rating}
//                         className="w-full px-4 py-2 mt-3 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
//                       >
//                         Submit Rating
//                       </button>
//                       <div className="mt-6">
//                         <h3 className="text-lg font-semibold text-neutral-900 mb-4">Customer Reviews</h3>
//                         {productRatings.length === 0 ? (
//                           <p className="text-sm text-neutral-600">No reviews yet. Be the first to review!</p>
//                         ) : (
//                           <div className="space-y-4 max-h-64 overflow-y-auto">
//                             {productRatings.map(rating => (
//                               <div key={rating._id} className="border-b pb-4">
//                                 <div className="flex items-center justify-between">
//                                   <p className="text-sm font-medium text-neutral-900">{rating.userId.name}</p>
//                                   <div className="flex items-center">
//                                     <span className="text-yellow-400">★</span>
//                                     <span className="ml-1 text-sm text-neutral-600">{rating.rating}</span>
//                                   </div>
//                                 </div>
//                                 <p className="text-sm text-neutral-600 mt-1">{rating.comment}</p>
//                                 <p className="text-xs text-neutral-500 mt-1">{new Date(rating.createdAt).toLocaleDateString()}</p>
//                               </div>
//                             ))}
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             </motion.div>
//           )}
//         </AnimatePresence>
//       </div>
//     </section>
//   );
// };

// export default ProductShowcase;

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiSearch, FiX, FiShoppingCart, FiStar, FiChevronLeft, FiChevronRight, FiEye } from 'react-icons/fi';
import { toast } from 'react-toastify';
import { debounce } from 'lodash';
import productData from '../../data/products.json'

const ProductShowcase = () => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: '',
    search: '',
    priceRange: '',
    rating: '',
    sortBy: 'createdAt'
  });
  const [cart, setCart] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [productRatings, setProductRatings] = useState([]);
  const [newRating, setNewRating] = useState({ rating: 0, comment: '' });
  const productsPerPage = 9;

  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3002';

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('token')}`
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        
        const transformedProducts = productData.map(product => ({
          ...product,
          rating: product.rating || 4.0,
          reviewCount: product.reviewCount || 0,
          images: product.images || ['/images/fallback.jpg']
        }));
        setProducts(transformedProducts);
        setFilteredProducts(transformedProducts);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products');
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  useEffect(() => {
    if (selectedProduct) {
      const fetchRatings = async () => {
        try {
          const response = await api.get(`/api/ratings/product/${selectedProduct._id}`);
          setProductRatings(response.data.data);
          if (response.data.data.length > 0) {
            const avgRating = response.data.data.reduce((sum, r) => sum + r.rating, 0) / response.data.data.length;
            setSelectedProduct(prev => ({ ...prev, rating: avgRating, reviewCount: response.data.data.length }));
          }
        } catch (err) {
          console.error('Fetch ratings error:', err);
          toast.error(err.response?.data?.error || 'Failed to load ratings');
        }
      };
      fetchRatings();
    }
  }, [selectedProduct]);

  // Apply filters
  useEffect(() => {
    let result = [...products];
    if (filters.category) {
      result = result.filter(product => product.category === filters.category);
    }
    if (filters.search) {
      const searchTerm = filters.search.toLowerCase();
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchTerm) ||
        product.description.toLowerCase().includes(searchTerm) ||
        product.category.toLowerCase().includes(searchTerm)
      );
    }
    if (filters.priceRange) {
      const [min, max] = filters.priceRange.split('-').map(Number);
      if (max) {
        result = result.filter(product => product.price / 100 >= min && product.price / 100 <= max);
      } else {
        result = result.filter(product => product.price / 100 >= min);
      }
    }
    if (filters.rating) {
      const minRating = parseFloat(filters.rating);
      result = result.filter(product => (product.rating || 4.0) >= minRating);
    }
    switch (filters.sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        result.sort((a, b) => b.price - a.price);
        break;
      case 'rating':
        result.sort((a, b) => (b.rating || 4.0) - (a.rating || 4.0));
        break;
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case '-name':
        result.sort((a, b) => b.name.localeCompare(a.name));
        break;
      default:
        result.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    }
    setFilteredProducts(result);
    setCurrentPage(1);
  }, [filters, products]);

  // Load and save cart
  useEffect(() => {
    const savedCart = localStorage.getItem('petCart');
    if (savedCart) {
      setCart(JSON.parse(savedCart));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('petCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = useCallback((product) => {
    setCart(prev => {
      const existingItem = prev.find(item => item._id === product._id);
      if (existingItem) {
        return prev.map(item =>
          item._id === product._id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      }
      return [...prev, { ...product, quantity: 1 }];
    });
    toast.success(`${product.name} added to cart!`);
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCart(prev => prev.filter(item => item._id !== productId));
    toast.info('Item removed from cart');
  }, []);

  const updateQuantity = useCallback((productId, newQuantity) => {
    if (newQuantity === 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item._id === productId ? { ...item, quantity: newQuantity } : item
    ));
  }, [removeFromCart]);

  const debouncedHandleFilterChange = useCallback(debounce((key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  }, 300), []);

  const clearFilters = () => {
    setFilters({
      category: '',
      search: '',
      priceRange: '',
      rating: '',
      sortBy: 'createdAt'
    });
  };

  const viewProductDetails = useCallback((product) => {
    setSelectedProduct(product);
    setShowModal(true);
  }, []);

  const closeModal = useCallback(() => {
    setShowModal(false);
    setSelectedProduct(null);
    setNewRating({ rating: 0, comment: '' });
  }, []);

  const handleRatingSubmit = async () => {
    if (!localStorage.getItem('token')) {
      toast.error('Please login to submit a rating');
      return;
    }
    try {
      const response = await api.post('/api/ratings', {
        productId: selectedProduct._id,
        rating: newRating.rating,
        comment: newRating.comment
      });
      setProductRatings(prev => [...prev, {
        ...response.data.data,
        userId: { name: 'You' }
      }]);
      setNewRating({ rating: 0, comment: '' });
      toast.success('Rating submitted successfully');
      const avgRating = (productRatings.reduce((sum, r) => sum + r.rating, 0) + newRating.rating) / (productRatings.length + 1);
      setSelectedProduct(prev => ({ ...prev, rating: avgRating, reviewCount: prev.reviewCount + 1 }));
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to submit rating');
    }
  };

  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);
  const currentProducts = filteredProducts.slice(
    (currentPage - 1) * productsPerPage,
    currentPage * productsPerPage
  );

  const categories = [...new Set(products.map(p => p.category))];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1, transition: { duration: 0.5, ease: 'easeOut' } }
  };

  const totalCartItems = cart.reduce((total, item) => total + item.quantity, 0);
  const totalCartValue = cart.reduce((total, item) => total + (item.price * item.quantity / 100), 0);

  const ProductCard = React.memo(({ product, viewProductDetails, addToCart }) => (
    <motion.div
      variants={itemVariants}
      className="flex flex-col overflow-hidden transition-all duration-300 bg-white border rounded-2xl border-neutral-200 hover:shadow-lg group"
    >
      <div className="relative flex-shrink-0 overflow-hidden">
        <img
          src={product.images?.[0] || '/images/fallback.jpg'}
          alt={product.name}
          className="object-cover w-full h-48 transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          onError={(e) => { e.target.src = '/images/fallback.jpg'; }}
        />
        <div className="absolute top-4 right-4">
          <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-secondary-500">
            {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
          </span>
        </div>
        <button
          onClick={() => viewProductDetails(product)}
          className="absolute top-4 left-4 p-2 bg-white rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        >
          <FiEye size={16} className="text-neutral-600" />
        </button>
      </div>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between mb-3">
          <h3 className="text-lg font-semibold text-neutral-900 font-display">{product.name}</h3>
          <div className="flex items-center">
            <FiStar className="text-yellow-400 fill-current" />
            <span className="ml-1 text-sm text-neutral-600">{(product.rating || 4.0).toFixed(1)}</span>
          </div>
        </div>
        <p className="flex-1 mb-4 text-sm text-neutral-600 line-clamp-2">{product.description}</p>
        <div className="flex items-center justify-between mb-4">
          <span className="text-2xl font-bold text-primary-600">${(product.price / 100).toFixed(2)}</span>
          {product.stockQuantity > 0 ? (
            <span className="text-sm text-green-600">In Stock</span>
          ) : (
            <span className="text-sm text-red-600">Out of Stock</span>
          )}
        </div>
        <div className="flex gap-2">
          <button
            onClick={() => viewProductDetails(product)}
            className="flex-1 px-4 py-2 font-medium text-primary-600 border border-primary-600 rounded-lg hover:bg-primary-50 transition-colors"
          >
            View Details
          </button>
          <button
            onClick={() => addToCart(product)}
            disabled={product.stockQuantity === 0}
            className="flex items-center justify-center px-4 py-2 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <FiShoppingCart size={18} className="mr-2" />
            Add
          </button>
        </div>
      </div>
    </motion.div>
  ));

  if (loading) {
    return (
      <section className="py-20 bg-white">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 mb-12 lg:flex-row">
            <div className="lg:w-1/4">
              <div className="sticky space-y-6 top-6">
                <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="space-y-4">
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                </div>
                <div className="p-6 bg-white border shadow-sm rounded-2xl border-primary-200 animate-pulse">
                  <div className="h-6 bg-gray-200 rounded w-1/3 mb-4"></div>
                  <div className="h-20 bg-gray-200 rounded"></div>
                </div>
              </div>
            </div>
            <div className="lg:w-3/4">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="flex flex-col overflow-hidden bg-white border rounded-2xl border-neutral-200 animate-pulse">
                    <div className="h-48 bg-gray-200"></div>
                    <div className="flex flex-col flex-1 p-6">
                      <div className="h-6 bg-gray-200 rounded mb-3"></div>
                      <div className="h-4 bg-gray-200 rounded mb-4 w-3/4"></div>
                      <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
                      <div className="h-10 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-white">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
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

        <div className="flex flex-col gap-8 mb-12 lg:flex-row">
          <div className="lg:w-1/4">
            <div className="sticky space-y-6 top-6">
              <div className="p-6 bg-white border shadow-sm rounded-2xl border-neutral-200">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold text-neutral-900">Filters</h3>
                  {(filters.category || filters.priceRange || filters.rating || filters.search) && (
                    <button
                      onClick={clearFilters}
                      className="text-sm text-primary-600 hover:text-primary-700"
                    >
                      Clear All
                    </button>
                  )}
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Search</label>
                    <div className="relative">
                      <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-neutral-400" />
                      <input
                        type="text"
                        placeholder="Search products..."
                        value={filters.search}
                        onChange={(e) => debouncedHandleFilterChange('search', e.target.value)}
                        className="w-full pl-10 pr-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                      />
                      {filters.search && (
                        <button
                          onClick={() => debouncedHandleFilterChange('search', '')}
                          className="absolute right-3 top-1/2 transform -translate-y-1/2 text-neutral-400 hover:text-neutral-600"
                        >
                          <FiX size={16} />
                        </button>
                      )}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Category</label>
                    <select
                      value={filters.category}
                      onChange={(e) => debouncedHandleFilterChange('category', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Categories</option>
                      {categories.map(category => (
                        <option key={category} value={category}>
                          {category.charAt(0).toUpperCase() + category.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Price Range</label>
                    <select
                      value={filters.priceRange}
                      onChange={(e) => debouncedHandleFilterChange('priceRange', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">All Prices</option>
                      <option value="0-25">Under $25</option>
                      <option value="25-50">$25 - $50</option>
                      <option value="50-100">$50 - $100</option>
                      <option value="100-">Over $100</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Minimum Rating</label>
                    <select
                      value={filters.rating}
                      onChange={(e) => debouncedHandleFilterChange('rating', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="">Any Rating</option>
                      <option value="4.5">4.5+ Stars</option>
                      <option value="4">4+ Stars</option>
                      <option value="3">3+ Stars</option>
                    </select>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-medium text-neutral-700">Sort By</label>
                    <select
                      value={filters.sortBy}
                      onChange={(e) => debouncedHandleFilterChange('sortBy', e.target.value)}
                      className="w-full px-4 py-2 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    >
                      <option value="createdAt">Newest</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="name">Name: A-Z</option>
                      <option value="-name">Name: Z-A</option>
                    </select>
                  </div>
                </div>
              </div>
              <div className="p-6 bg-white border shadow-sm rounded-2xl border-primary-200">
                <h3 className="mb-4 text-lg font-semibold text-neutral-900">Your Cart ({totalCartItems})</h3>
                {cart.length === 0 ? (
                  <p className="text-sm text-neutral-600">Your cart is empty</p>
                ) : (
                  <div className="space-y-4">
                    {cart.map(item => (
                      <div key={item._id} className="flex items-center justify-between p-3 rounded-lg bg-primary-50">
                        <div className="flex-1">
                          <p className="text-sm font-medium text-neutral-900">{item.name}</p>
                          <p className="text-sm text-primary-600">${(item.price / 100).toFixed(2)} x {item.quantity}</p>
                        </div>
                        <div className="flex items-center space-x-2">
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity - 1)}
                            className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
                          >
                            -
                          </button>
                          <button
                            onClick={() => updateQuantity(item._id, item.quantity + 1)}
                            className="w-6 h-6 text-sm bg-white border rounded border-neutral-300 hover:bg-neutral-50"
                          >
                            +
                          </button>
                          <button
                            onClick={() => removeFromCart(item._id)}
                            className="p-1 text-red-500 hover:text-red-700"
                          >
                            <FiX size={16} />
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
                        to="/cart"
                        className="block w-full px-4 py-2 text-sm font-medium text-center text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600"
                      >
                        View Cart
                      </Link>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="lg:w-3/4">
            <div className="flex flex-col items-start justify-between mb-6 sm:flex-row sm:items-center">
              <p className="text-neutral-600 mb-2 sm:mb-0">
                Showing {currentProducts.length} of {filteredProducts.length} products
                {filters.search && ` for "${filters.search}"`}
                {filters.category && ` in ${filters.category}`}
              </p>
              {filteredProducts.length > productsPerPage && (
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    <FiChevronLeft size={16} className="mr-1" />
                    Previous
                  </button>
                  <span className="text-sm text-neutral-600">
                    Page {currentPage} of {totalPages}
                  </span>
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    Next
                    <FiChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              )}
            </div>

            {filteredProducts.length === 0 && (
              <div className="p-8 text-center bg-white border shadow-sm rounded-2xl border-neutral-200">
                <FiSearch size={48} className="mx-auto mb-4 text-neutral-400" />
                <h3 className="text-lg font-semibold text-neutral-900">No products found</h3>
                <p className="text-neutral-600 mb-4">Try adjusting your filters or search terms</p>
                <button
                  onClick={clearFilters}
                  className="px-4 py-2 text-sm font-medium text-primary-600 bg-primary-50 rounded-lg hover:bg-primary-100"
                >
                  Clear All Filters
                </button>
              </div>
            )}

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3"
            >
              {currentProducts.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  viewProductDetails={viewProductDetails}
                  addToCart={addToCart}
                />
              ))}
            </motion.div>

            {totalPages > 1 && (
              <div className="flex justify-center mt-8">
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                    disabled={currentPage === 1}
                    className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    <FiChevronLeft size={16} className="mr-1" />
                    Previous
                  </button>
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-1 rounded ${
                          currentPage === pageNum
                            ? 'bg-primary-500 text-white'
                            : 'border border-neutral-300 text-neutral-600 hover:bg-neutral-50'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <span className="px-2 text-neutral-500">...</span>
                  )}
                  {totalPages > 5 && currentPage < totalPages - 2 && (
                    <button
                      onClick={() => setCurrentPage(totalPages)}
                      className="px-3 py-1 border rounded border-neutral-300 text-neutral-600 hover:bg-neutral-50"
                    >
                      {totalPages}
                    </button>
                  )}
                  <button
                    onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                    disabled={currentPage === totalPages}
                    className="flex items-center px-3 py-1 border rounded disabled:opacity-50 border-neutral-300 hover:bg-neutral-50"
                  >
                    Next
                    <FiChevronRight size={16} className="ml-1" />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

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

        <AnimatePresence>
          {showModal && selectedProduct && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
              onClick={closeModal}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="relative w-full max-w-4xl bg-white rounded-2xl overflow-hidden max-h-[90vh] overflow-y-auto"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  onClick={closeModal}
                  className="absolute top-4 right-4 z-10 p-2 bg-white rounded-full shadow-md hover:bg-gray-100"
                >
                  <FiX size={20} />
                </button>
                <div className="flex flex-col md:flex-row">
                  <div className="md:w-1/2">
                    <img
                      src={selectedProduct.images?.[0] || '/images/fallback.jpg'}
                      alt={selectedProduct.name}
                      className="object-cover w-full h-64 md:h-full"
                      loading="lazy"
                      onError={(e) => { e.target.src = '/images/fallback.jpg'; }}
                    />
                  </div>
                  <div className="flex flex-col p-6 md:w-1/2">
                    <div className="mb-4">
                      <span className="px-3 py-1 text-sm font-medium text-white rounded-full bg-secondary-500">
                        {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                      </span>
                    </div>
                    <h2 className="mb-2 text-2xl font-bold text-neutral-900">{selectedProduct.name}</h2>
                    <div className="flex items-center mb-4">
                      <div className="flex">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <FiStar
                            key={star}
                            className={`${
                              star <= Math.floor(selectedProduct.rating || 4)
                                ? 'text-yellow-400 fill-current'
                                : 'text-gray-300'
                            }`}
                            size={16}
                          />
                        ))}
                      </div>
                      <span className="ml-2 text-sm text-neutral-600">
                        {(selectedProduct.rating || 4.0).toFixed(1)} ({selectedProduct.reviewCount || 0} reviews)
                      </span>
                    </div>
                    <p className="mb-6 text-neutral-600">{selectedProduct.description}</p>
                    <div className="mb-6">
                      <h3 className="mb-2 text-lg font-semibold text-neutral-900">Product Details</h3>
                      <ul className="text-sm text-neutral-600">
                        <li className="mb-1">
                          <span className="font-medium">Category:</span> {selectedProduct.category.charAt(0).toUpperCase() + selectedProduct.category.slice(1)}
                        </li>
                        <li className="mb-1">
                          <span className="font-medium">Stock:</span> {selectedProduct.stockQuantity > 0 ? `${selectedProduct.stockQuantity} available` : 'Out of stock'}
                        </li>
                        {selectedProduct.tags && selectedProduct.tags.length > 0 && (
                          <li>
                            <span className="font-medium">Tags:</span> {selectedProduct.tags.join(', ')}
                          </li>
                        )}
                      </ul>
                    </div>
                    <div className="flex items-center justify-between mt-auto mb-6">
                      <span className="text-3xl font-bold text-primary-600">${(selectedProduct.price / 100).toFixed(2)}</span>
                      <button
                        onClick={() => {
                          addToCart(selectedProduct);
                          closeModal();
                        }}
                        disabled={selectedProduct.stockQuantity === 0}
                        className="flex items-center px-6 py-3 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <FiShoppingCart size={18} className="mr-2" />
                        Add to Cart
                      </button>
                    </div>
                    <div className="border-t pt-6">
                      <h3 className="text-lg font-semibold text-neutral-900 mb-4">Rate this Product</h3>
                      <div className="flex items-center mb-3">
                        {[1, 2, 3, 4, 5].map(star => (
                          <FiStar
                            key={star}
                            className={`w-6 h-6 cursor-pointer ${star <= newRating.rating ? 'text-yellow-400 fill-current' : 'text-neutral-300'}`}
                            onClick={() => setNewRating(prev => ({ ...prev, rating: star }))}
                          />
                        ))}
                      </div>
                      <textarea
                        value={newRating.comment}
                        onChange={(e) => setNewRating(prev => ({ ...prev, comment: e.target.value }))}
                        placeholder="Leave a comment..."
                        className="w-full p-3 text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent resize-none"
                        rows="4"
                      />
                      <button
                        onClick={handleRatingSubmit}
                        disabled={!newRating.rating}
                        className="w-full px-4 py-2 mt-3 text-sm font-medium text-white rounded-lg bg-primary-500 hover:bg-primary-600 disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        Submit Rating
                      </button>
                      <div className="mt-6">
                        <h3 className="text-lg font-semibold text-neutral-900 mb-4">Customer Reviews</h3>
                        {productRatings.length === 0 ? (
                          <p className="text-sm text-neutral-600">No reviews yet. Be the first to review!</p>
                        ) : (
                          <div className="space-y-4 max-h-64 overflow-y-auto">
                            {productRatings.map(rating => (
                              <div key={rating._id} className="border-b pb-4">
                                <div className="flex items-center justify-between">
                                  <p className="text-sm font-medium text-neutral-900">{rating.userId.name}</p>
                                  <div className="flex items-center">
                                    <span className="text-yellow-400">★</span>
                                    <span className="ml-1 text-sm text-neutral-600">{rating.rating}</span>
                                  </div>
                                </div>
                                <p className="text-sm text-neutral-600 mt-1">{rating.comment}</p>
                                <p className="text-xs text-neutral-500 mt-1">{new Date(rating.createdAt).toLocaleDateString()}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default ProductShowcase;