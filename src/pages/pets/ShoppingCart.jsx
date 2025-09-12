import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiShoppingCart, FiTrash2, FiPlus, FiMinus } from 'react-icons/fi';

const ShoppingCart = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
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
          navigate('/login');
          return;
        }

        const ordersRes = await api.get('/api/orders?status=pending');
        setCartItems(ordersRes.data.data.flatMap(order => order.items));
      } catch (err) {
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load cart');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCart();
  }, [navigate]);

  const handleUpdateQuantity = async (orderId, itemId, quantity) => {
    if (quantity < 1) return;
    try {
      await api.put(`/api/orders/${orderId}`, { items: [{ _id: itemId, quantity }] });
      setCartItems((prev) =>
        prev.map((item) => (item._id === itemId ? { ...item, quantity } : item))
      );
      toast.success('Quantity updated');
    } catch (err) {
      toast.error(err.response?.data?.error || 'Failed to update quantity');
    }
  };

  const handleRemoveItem = async (orderId, itemId) => {
    if (window.confirm('Remove item from cart?')) {
      try {
        await api.delete(`/api/orders/${orderId}/items/${itemId}`);
        setCartItems((prev) => prev.filter((item) => item._id !== itemId));
        toast.success('Item removed from cart');
      } catch (err) {
        toast.error(err.response?.data?.error || 'Failed to remove item');
      }
    }
  };

  const handleCheckout = () => {
    toast.info('Checkout process initiated (mock - no payment gateway)');
    navigate('/pets-dashboard/orders');
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen bg-neutral-50">
        <div className="w-12 h-12 border-t-2 border-b-2 rounded-full animate-spin border-primary-600"></div>
      </div>
    );
  }

  const total = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
              {cartItems.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">Your cart is empty.</p>
                  <button
                    onClick={() => navigate('/pets-dashboard/products')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
                  <div className="space-y-4 lg:col-span-2">
                    {cartItems.map((item) => (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="flex items-center p-4 bg-white border shadow-sm rounded-xl border-neutral-200"
                      >
                        <img
                          src={item.product?.image || 'https://via.placeholder.com/100'}
                          alt={item.product?.name}
                          className="object-cover w-20 h-20 mr-4 rounded-lg"
                        />
                        <div className="flex-1">
                          <p className="font-sans text-sm font-medium text-neutral-900">{item.product?.name}</p>
                          <p className="font-sans text-xs text-neutral-600">{item.product?.category}</p>
                          <p className="font-sans font-bold text-primary-600">₦{(item.price * item.quantity).toLocaleString()}</p>
                          <div className="flex items-center mt-2">
                            <button
                              onClick={() => handleUpdateQuantity(item.orderId, item._id, item.quantity - 1)}
                              className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200"
                            >
                              <FiMinus className="w-4 h-4" />
                            </button>
                            <span className="mx-2 font-sans text-sm">{item.quantity}</span>
                            <button
                              onClick={() => handleUpdateQuantity(item.orderId, item._id, item.quantity + 1)}
                              className="p-1 rounded-lg bg-neutral-100 hover:bg-neutral-200"
                            >
                              <FiPlus className="w-4 h-4" />
                            </button>
                          </div>
                        </div>
                        <button
                          onClick={() => handleRemoveItem(item.orderId, item._id)}
                          className="p-2 text-red-600 rounded-lg hover:bg-red-50"
                        >
                          <FiTrash2 className="w-5 h-5" />
                        </button>
                      </motion.div>
                    ))}
                  </div>
                  <div className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200">
                    <h2 className="mb-4 text-xl font-bold text-neutral-900 font-display">Order Summary</h2>
                    <p className="font-sans text-sm text-neutral-600">Total Items: {cartItems.length}</p>
                    <p className="mt-2 font-sans text-lg font-bold text-neutral-900">Total: ₦{total.toLocaleString()}</p>
                    <button
                      onClick={handleCheckout}
                      className="w-full px-4 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                    >
                      Proceed to Checkout
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