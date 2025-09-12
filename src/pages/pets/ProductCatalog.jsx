import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiSearch, FiShoppingCart, FiArrowLeft } from 'react-icons/fi';

const ProductCatalog = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

  const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${localStorage.getItem('token')}`,
    },
  });

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const query = category ? `?category=${category}` : '';
        const productsRes = await api.get(`/api/products${query}`);
        setProducts(productsRes.data.data);
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load products');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category, navigate]);

  const handleAddToCart = async (productId) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add items to cart');
        navigate('/login');
        return;
      }

      await api.post('/api/orders', { items: [{ product: productId, quantity: 1, price: products.find((p) => p._id === productId).price }] });
      toast.success('Item added to cart');
    } catch (err) {
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
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Product Catalog</h1>
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="px-3 py-2 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                >
                  <option value="">All Categories</option>
                  <option value="food">Food</option>
                  <option value="grooming">Grooming</option>
                  <option value="toys">Toys</option>
                  <option value="health">Health</option>
                </select>
              </div>

              {filteredProducts.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No products found.</p>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
                  {filteredProducts.map((product) => (
                    <motion.div
                      key={product._id}
                      whileHover={{ y: -5 }}
                      className="overflow-hidden bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="relative h-48">
                        <img
                          src={product.image || 'https://via.placeholder.com/150'}
                          alt={product.name}
                          className="object-cover w-full h-full"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-sans text-lg font-semibold truncate text-neutral-900">{product.name}</h3>
                        <p className="mt-1 font-sans text-sm text-neutral-600">{product.category}</p>
                        <p className="mt-1 font-sans font-bold text-primary-600">₦{product.price.toLocaleString()}</p>
                        <button
                          onClick={() => handleAddToCart(product._id)}
                          className="flex items-center justify-center w-full gap-2 px-4 py-2 mt-3 font-sans text-sm text-white transition-all rounded-lg bg-primary-600 hover:bg-primary-700"
                        >
                          <FiShoppingCart /> Add to Cart
                        </button>
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