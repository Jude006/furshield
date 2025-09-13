import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiSearch, FiShoppingCart, FiEye, FiArrowLeft } from 'react-icons/fi';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = category ? `?category=${category}` : '';
        const productsRes = await axios.get(`${API_BASE_URL}/api/products${query}`);
        console.log('Fetched products:', productsRes.data.data); // Debug log
        setProducts(productsRes.data.data);
      } catch (err) {
        console.error('Fetch products error:', err);
        toast.error(err.response?.data?.error || 'Failed to load products');
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add to cart');
        navigate('/auth/login');
        return;
      }
      const cartRes = await axios.post(
        `${API_BASE_URL}/api/orders`,
        { productId, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product added to cart');
      return cartRes.data.data;
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto max-w-7xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Product Catalog</h1>
                <button
                  onClick={() => navigate('/pets-dashboard/cart')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  View Cart
                </button>
              </div>
              <div className="flex flex-col gap-4 mb-6 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative flex-1">
                  <FiSearch className="absolute w-5 h-5 transform -translate-y-1/2 left-3 top-1/2 text-neutral-400" />
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-2 pl-10 pr-4 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-4 py-2 font-sans border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  <option value="food">Food</option>
                  <option value="grooming">Grooming</option>
                  <option value="toys">Toys</option>
                  <option value="health">Health</option>
                  <option value="accessories">Accessories</option>
                </select>
              </div>
              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No products found.</p>
                  <button
                    onClick={() => navigate('/pets-dashboard/cart')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    View Cart
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200 hover:shadow-md"
                    >
                      <img
                        src={product.images[0] || 'https://via.placeholder.com/300'}
                        alt={product.name}
                        className="object-cover object-top  w-full h-48 cursor-pointer"
                        onClick={() => navigate(`/pets-dashboard/products/${product._id}`)}
                      />
                      <div className="p-4">
                        <h3 className="font-sans text-lg font-semibold text-neutral-900">{product.name}</h3>
                        <p className="mt-1 font-sans text-sm text-neutral-600">
                          {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                        </p>
                        <p className="mt-1 font-sans text-xs text-neutral-600 line-clamp-2">{product.description}</p>
                        <p className="mt-2 font-sans text-lg font-bold text-primary-600">
                          ₦{product.price.toLocaleString()}
                        </p>
                        <div className="flex gap-2 mt-4">
                          <button
                            onClick={() => navigate(`/pets-dashboard/products/${product._id}`)}
                            className="flex-1 px-4 py-2 font-sans text-sm border rounded-lg text-primary-600 border-primary-600 hover:bg-primary-50"
                          >
                            <FiEye className="inline-block w-4 h-4 mr-2" />
                            View Details
                          </button>
                          <button
                            onClick={() => handleAddToCart(product._id)}
                            className="flex-1 px-4 py-2 font-sans text-sm text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                          >
                            <FiShoppingCart className="inline-block w-4 h-4 mr-2" />
                            Add to Cart
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductCatalog;