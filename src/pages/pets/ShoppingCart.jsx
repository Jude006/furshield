import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiTrash2, FiPlusCircle, FiMinusCircle, FiShoppingCart, FiX } from 'react-icons/fi';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cart, setCart] = useState({ items: [], totalAmount: 0 });
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
    const fetchCart = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view cart');
          navigate('/auth/login');
          return;
        }

        const cartRes = await api.get('/api/orders/cart');
        setCart(cartRes.data.data);
      } catch (err) {
        console.error('Fetch cart error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          toast.error('Session expired or unauthorized. Please login again.');
          navigate('/auth/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load cart');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleQuantityChange = async (productId, change) => {
    try {
      const item = cart.items.find(i => i.product._id === productId);
      const newQuantity = item.quantity + change;
      if (newQuantity < 1) return; 

      const updatedCart = await api.put('/api/orders/cart/update', { productId, quantity: newQuantity });
      setCart(updatedCart.data.data);
      toast.success('Cart updated');
    } catch (err) {
      console.error('Quantity change error:', err);
      toast.error(err.response?.data?.error || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (productId) => {
    try {
      const updatedCart = await api.put('/api/orders/cart/update', { productId, quantity: 0 });
      setCart(updatedCart.data.data);
      toast.success('Item removed from cart');
    } catch (err) {
      console.error('Remove item error:', err);
      toast.error(err.response?.data?.error || 'Failed to remove item');
    }
  };

  const handleClearCart = async () => {
    try {
      const updatedCart = await api.delete('/api/orders/cart/clear');
      setCart(updatedCart.data.data);
      toast.success('Cart cleared');
    } catch (err) {
      console.error('Clear cart error:', err);
      toast.error(err.response?.data?.error || 'Failed to clear cart');
    }
  };

  const handleSubmitOrder = async () => {
    try {
      const updatedCart = await api.put('/api/orders/submit');
      setCart(updatedCart.data.data);
      toast.success('Order submitted successfully');
      navigate('/pets-dashboard/orders');
    } catch (err) {
      console.error('Submit order error:', err);
      toast.error(err.response?.data?.error || 'Failed to submit order');
    }
  };

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
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">Shopping Cart</h1>
                <div className="flex gap-2">
                  <button
                    onClick={() => navigate('/products')}
                    className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-neutral-700 bg-neutral-100 hover:bg-neutral-200"
                  >
                    <FiArrowLeft className="w-4 h-4 mr-2" />
                    Continue Shopping
                  </button>
                  {cart.items.length > 0 && (
                    <button
                      onClick={handleClearCart}
                      className="flex items-center px-4 py-2 font-sans text-sm font-medium text-red-600 border border-red-600 rounded-lg hover:bg-red-50"
                    >
                      <FiX className="w-4 h-4 mr-2" />
                      Clear Cart
                    </button>
                  )}
                </div>
              </div>
              {cart.items.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">Your cart is empty.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.items.map((item) => (
                    <motion.div
                      key={item.product._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center">
                          {/* <img
                            src={item.product.image}
                            alt={item.product.name}
                            className="object-cover w-16 h-16 mr-4 rounded-lg cursor-pointer"
                            onClick={() => navigate(`/products/${item.product._id}`)}
                          /> */}
                          <div>
                            <p
                              className="font-sans text-sm font-medium cursor-pointer text-neutral-900 hover:text-primary-600"
                              onClick={() => navigate(`/products/${item.product._id}`)}
                            >
                              {item.product.name}
                            </p>
                            <p className="font-sans text-xs text-neutral-600">
                              {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                            </p>
                            <p className="mt-1 font-sans text-xs text-neutral-600">
                              ₦{item.price.toLocaleString()} x {item.quantity}
                            </p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <button
                            onClick={() => handleQuantityChange(item.product._id, -1)}
                            className="text-neutral-600 hover:text-neutral-800 disabled:text-neutral-300"
                            disabled={item.quantity <= 1}
                          >
                            <FiMinusCircle className="w-5 h-5" />
                          </button>
                          <p className="font-sans text-sm text-neutral-900">{item.quantity}</p>
                          <button
                            onClick={() => handleQuantityChange(item.product._id, 1)}
                            className="text-neutral-600 hover:text-neutral-800 disabled:text-neutral-300"
                            disabled={item.quantity >= item.product.stockQuantity}
                          >
                            <FiPlusCircle className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleRemoveItem(item.product._id)}
                            className="text-red-600 hover:text-red-700"
                          >
                            <FiTrash2 className="w-5 h-5" />
                          </button>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                  <div className="p-4 bg-white border shadow-sm rounded-xl border-neutral-200">
                    <p className="font-sans text-lg font-semibold text-neutral-900">
                      Total: ₦{cart.totalAmount.toLocaleString()}
                    </p>
                    <button
                      onClick={handleSubmitOrder}
                      className="w-full px-4 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      Submit Order
                    </button>
                  </div>
                </div>
              )}
            </motion.div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ShoppingCart;