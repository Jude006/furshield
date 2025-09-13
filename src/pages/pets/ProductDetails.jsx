import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiShoppingCart, FiChevronLeft, FiChevronRight } from 'react-icons/fi';

const ProductDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const [currentImage, setCurrentImage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000';

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const res = await axios.get(`${API_BASE_URL}/api/products/${id}`);
        console.log('Product ID:', id);
        console.log('Response:', res.data);
        setProduct(res.data.data);
      } catch (err) {
        console.error('Fetch product error:', err);
        setError(err.response?.data?.error || 'Failed to load product');
        toast.error(err.response?.data?.error || 'Failed to load product');
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        toast.error('Please login to add to cart');
        navigate('/login');
        return;
      }
      await axios.post(
        `${API_BASE_URL}/api/orders`,
        { productId: id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast.success('Product added to cart');
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

  if (error || !product) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="text-center">
          <p className="font-sans text-neutral-600">{error || 'Product not found.'}</p>
          <button
            onClick={() => navigate('/pets-dashboard/products')}
            className="mt-4 px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Back to Products
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <div className="flex flex-col flex-1 overflow-hidden">
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <button
                onClick={() => navigate('/pets-dashboard/products')}
                className="flex items-center mb-6 font-sans text-sm font-medium text-neutral-700"
              >
                <FiArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </button>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="relative">
                  <img
                    src={product.images[0] || 'https://via.placeholder.com/300'}
                    alt={product.name}
                    className="object-cover w-full h-96 rounded-lg"
                  />
                  {product.images.length > 1 && (
                    <div className="flex justify-between mt-4">
                      <button
                        onClick={() => setCurrentImage((prev) => Math.max(prev - 1, 0))}
                        disabled={currentImage === 0}
                        className="p-2 text-neutral-600 hover:text-neutral-800 disabled:opacity-50"
                      >
                        <FiChevronLeft className="w-6 h-6" />
                      </button>
                      <div className="flex gap-2">
                        {product.images.map((img, index) => (
                          <img
                            key={index}
                            src={img}
                            alt={`Thumbnail ${index}`}
                            className={`w-16 h-16 object-cover rounded-lg cursor-pointer ${currentImage === index ? 'border-2 border-primary-600' : ''}`}
                            onClick={() => setCurrentImage(index)}
                          />
                        ))}
                      </div>
                      <button
                        onClick={() => setCurrentImage((prev) => Math.min(prev + 1, product.images.length - 1))}
                        disabled={currentImage === product.images.length - 1}
                        className="p-2 text-neutral-600 hover:text-neutral-800 disabled:opacity-50"
                      >
                        <FiChevronRight className="w-6 h-6" />
                      </button>
                    </div>
                  )}
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-neutral-900 font-display">{product.name}</h1>
                  <p className="mt-2 font-sans text-sm text-neutral-600">
                    {product.category.charAt(0).toUpperCase() + product.category.slice(1)}
                  </p>
                  <p className="mt-2 font-sans text-lg font-bold text-primary-600">
                    ₦{product.price.toLocaleString()}
                  </p>
                  <p className="mt-4 font-sans text-sm text-neutral-600">{product.description}</p>
                  <p className="mt-2 font-sans text-sm text-neutral-600">
                    Stock: {product.stockQuantity > 0 ? product.stockQuantity : 'Out of Stock'}
                  </p>
                  <div className="mt-6">
                    <button
                      onClick={handleAddToCart}
                      className="w-full px-4 py-2 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700 disabled:opacity-50"
                      disabled={product.stockQuantity === 0}
                    >
                      <FiShoppingCart className="inline-block w-4 h-4 mr-2" />
                      {product.stockQuantity === 0 ? 'Out of Stock' : 'Add to Cart'}
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