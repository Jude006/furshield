import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiShoppingCart } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
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
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const productRes = await api.get(`/api/products/${id}`);
        setProduct(productRes.data.data);
      } catch (err) {
        console.error('Fetch product error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          toast.error('Session expired or unauthorized. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load product');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, navigate]);

  const handleAddToCart = async () => {
    try {
      await api.post('/api/orders', { productId: id, quantity: 1 });
      toast.success('Product added to cart');
      navigate('/pets-dashboard/cart');
    } catch (err) {
      console.error('Add to cart error:', err);
      toast.error(err.response?.data?.error || 'Failed to add to cart');
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <p className="font-sans text-neutral-600">Product not found.</p>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <button
                  onClick={() => navigate('/products')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                >
                  <FiArrowLeft className="w-4 h-4 mr-2" />
                  Back to Products
                </button>
                <button
                  onClick={() => navigate('/pets-dashboard/cart')}
                  className="flex items-center px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                >
                  <FiShoppingCart className="w-4 h-4 mr-2" />
                  View Cart
                </button>
              </div>
              <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                <div className="flex flex-col gap-6 md:flex-row">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-full h-64 rounded-lg md:w-1/2 md:h-96"
                  />
                  <div className="flex-1">
                    <h1 className="text-2xl font-bold text-neutral-900 font-display">{product.name}</h1>
                    <p className="mt-2 font-sans text-sm text-neutral-600">
                      Category: {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                    </p>
                    <p className="mt-2 font-sans text-lg font-bold text-primary-600">
                      ₦{product.price.toLocaleString()}
                    </p>
                    <p className="mt-4 font-sans text-neutral-700">{product.description}</p>
                    <p className="mt-2 font-sans text-sm text-neutral-600">
                      Stock: {product.stockQuantity > 0 ? `${product.stockQuantity} available` : 'Out of stock'}
                    </p>
                    <button
                      onClick={handleAddToCart}
                      disabled={product.stockQuantity === 0}
                      className={`w-full px-4 py-2 mt-6 font-sans text-sm font-medium text-white rounded-lg ${
                        product.stockQuantity === 0
                          ? 'bg-neutral-400 cursor-not-allowed'
                          : 'bg-primary-600 hover:bg-primary-700'
                      }`}
                    >
                      <FiShoppingCart className="inline-block w-4 h-4 mr-2" />
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ProductDetails;