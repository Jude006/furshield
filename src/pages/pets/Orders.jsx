import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { FiArrowLeft, FiShoppingCart, FiSearch } from 'react-icons/fi';

const Orders = () => {
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
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
        console.error('Fetch error:', err);
        if (err.response?.status === 401) {
          localStorage.removeItem('token');
          toast.error('Session expired. Please login again.');
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
          <div className="container mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <h1 className="mb-6 text-3xl font-bold text-neutral-900 font-display">My Orders</h1>
              {filteredOrders.length === 0 ? (
                <div className="p-8 text-center bg-white border shadow-sm rounded-xl border-neutral-200">
                  <FiShoppingCart className="mx-auto mb-4 text-4xl text-neutral-400" />
                  <p className="font-sans text-neutral-600">No orders found.</p>
                  <button
                    onClick={() => navigate('/pets-dashboard/products')}
                    className="px-6 py-2 mt-4 font-sans text-sm font-medium text-white rounded-lg bg-primary-600 hover:bg-primary-700"
                  >
                    Browse Products
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredOrders.map((order) => (
                    <motion.div
                      key={order._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      className="p-6 bg-white border shadow-sm rounded-xl border-neutral-200"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="font-sans text-sm font-medium text-neutral-900">
                            Order #{order._id.slice(-6)} - {new Date(order.orderDate).toLocaleDateString()}
                          </p>
                          <p className="font-sans text-xs text-neutral-600">Status: {order.status}</p>
                          <p className="mt-1 font-sans text-xs text-neutral-600">
                            Total: ₦{order.totalAmount.toLocaleString()}
                          </p>
                        </div>
                        <button
                          onClick={() => navigate(`/pets-dashboard/orders/${order._id}`)}
                          className="font-sans text-sm text-primary-600 hover:text-primary-700"
                        >
                          View Details
                        </button>
                      </div>
                      <div className="mt-4 space-y-2">
                        {order.items.map((item) => (
                          <div key={item._id} className="flex items-center">
                            <img
                              src={item.product?.image || 'https://via.placeholder.com/50'}
                              alt={item.product?.name}
                              className="object-cover w-12 h-12 mr-3 rounded-lg"
                            />
                            <div>
                              <p className="font-sans text-sm text-neutral-900">{item.product?.name}</p>
                              <p className="font-sans text-xs text-neutral-600">
                                {item.quantity} x ₦{item.price.toLocaleString()}
                              </p>
                            </div>
                          </div>
                        ))}
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

export default Orders;