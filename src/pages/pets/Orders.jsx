import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiShoppingCart, FiSearch, FiEye } from 'react-icons/fi';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem('token');
        if (!token) {
          toast.error('Please login to view orders');
          navigate('/login');
          return;
        }

        const ordersRes = await api.get('/api/orders');
        setOrders(ordersRes.data.data);
      } catch (err) {
        console.error('Fetch orders error:', err);
        if (err.response?.status === 401 || err.response?.status === 403) {
          localStorage.removeItem('token');
          toast.error('Session expired or unauthorized. Please login again.');
          navigate('/login');
        } else {
          toast.error(err.response?.data?.error || 'Failed to load orders');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [navigate]);

  const handleViewDetails = (order) => {
    setSelectedOrder(selectedOrder && selectedOrder._id === order._id ? null : order);
  };

  const filteredOrders = orders.filter((order) =>
    order.items.some(
      (item) =>
        item.product?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.status.toLowerCase().includes(searchTerm.toLowerCase())
    )
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
          <div className="container max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="flex items-center justify-between mb-6">
                <h1 className="text-3xl font-bold text-neutral-900 font-display">My Orders</h1>
                <div className="relative">
                  <FiSearch className="absolute left-3 top-2.5 text-neutral-400 w-5 h-5" />
                  <input
                    type="text"
                    placeholder="Search orders..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="py-2 pl-10 pr-4 font-sans text-sm border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                  />
                </div>
              </div>
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No orders found.</p>
                  <button
                    onClick={() => navigate('/products')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-6">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5 }}
                      className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200 hover:shadow-md"
                    >
                      <div className="flex items-center justify-between mb-4">
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">
                            Order #{order._id.slice(-6)}
                          </p>
                          <p className="font-sans text-xs text-neutral-600">
                            Date: {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                          <p className="font-sans text-xs text-neutral-600">Status: {order.status}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-600">
                            Total: ₦{order.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => handleViewDetails(order)}
                          className="flex items-center px-4 py-2 font-sans text-sm font-medium rounded-lg text-primary-600 bg-primary-50 hover:bg-primary-100"
                        >
                          <FiEye className="w-4 h-4 mr-2" />
                          {selectedOrder && selectedOrder._id === order._id ? 'Hide Details' : 'View Details'}
                        </button>
                      </div>
                      {selectedOrder && selectedOrder._id === order._id && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.3 }}
                          className="mt-4 space-y-4"
                        >
                          {order.items.map((item) => (
                            <div
                              key={item._id}
                              className="flex items-center p-4 border rounded-lg border-neutral-200"
                            >
                              <img
                                src={item.product.image}
                                alt={item.product.name}
                                className="object-cover w-16 h-16 mr-4 rounded-lg cursor-pointer"
                                onClick={() => navigate(`/products/${item.product._id}`)}
                              />
                              <div>
                                <p
                                  className="font-sans text-sm font-medium cursor-pointer text-neutral-900 hover:text-primary-600"
                                  onClick={() => navigate(`/products/${item.product._id}`)}
                                >
                                  {item.product.name}
                                </p>
                                <p className="font-sans text-xs text-neutral-600">
                                  Category: {item.product.category.charAt(0).toUpperCase() + item.product.category.slice(1)}
                                </p>
                                <p className="font-sans text-xs text-neutral-600">
                                  Quantity: {item.quantity}
                                </p>
                                <p className="font-sans text-xs text-neutral-600">
                                  Price: ₦{item.price.toLocaleString()}
                                </p>
                              </div>
                            </div>
                          ))}
                        </motion.div>
                      )}
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

export default Orders;