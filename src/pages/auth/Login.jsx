import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Login logic will go here
    console.log(formData);
  };

  return (
    <div className="flex min-h-screen bg-neutral-50">
      {/* Left side - Form */}
      <div className="flex flex-col justify-center flex-1 px-4 py-12 sm:px-6 lg:px-20 xl:px-24">
        <div className="w-full max-w-md mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-8 text-center">
              <Link to="/" className="inline-flex items-center">
                <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <span className="ml-2 text-2xl font-bold text-neutral-900 font-display">FurShield</span>
              </Link>
              <h1 className="mt-6 text-3xl font-bold text-neutral-900">Sign in to your account</h1>
              <p className="mt-2 text-sm text-neutral-600">
                Or{' '}
                <Link to="/auth/signup" className="font-medium text-primary-600 hover:text-primary-500">
                  create a new account
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="email" className="block mb-1 text-sm font-medium text-neutral-700">
                    Email address
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className="relative block w-full px-4 py-3 border rounded-lg appearance-none border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your email"
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-1 text-sm font-medium text-neutral-700">
                    Password
                  </label>
                  <input
                    id="password"
                    name="password"
                    type="password"
                    autoComplete="current-password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className="relative block w-full px-4 py-3 border rounded-lg appearance-none border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                    placeholder="Enter your password"
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="remember-me"
                    name="rememberMe"
                    type="checkbox"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 rounded text-primary-600 focus:ring-primary-500 border-neutral-300"
                  />
                  <label htmlFor="remember-me" className="block ml-2 text-sm text-neutral-700">
                    Remember me
                  </label>
                </div>

                <div className="text-sm">
                  <Link to="/auth/forgot-password" className="font-medium text-primary-600 hover:text-primary-500">
                    Forgot your password?
                  </Link>
                </div>
              </div>

              <div>
                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded-lg group bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                >
                  Sign in
                </motion.button>
              </div>

              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-neutral-300" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-neutral-50 text-neutral-500">Or continue with</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 mt-6">
                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-300 bg-white border rounded-lg shadow-sm border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  >
                    <svg className="w-5 h-5 text-blue-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
                    </svg>
                  </button>

                  <button
                    type="button"
                    className="inline-flex justify-center w-full px-4 py-2 text-sm font-medium transition-colors duration-300 bg-white border rounded-lg shadow-sm border-neutral-300 text-neutral-700 hover:bg-neutral-50"
                  >
                    <svg className="w-5 h-5 text-red-500" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0C5.376 0 0 5.376 0 12c0 5.304 3.456 9.792 8.256 11.424.6.096.816-.264.816-.576 0-.288-.012-1.044-.018-2.088-3.36.732-4.068-1.62-4.068-1.62-.546-1.392-1.332-1.764-1.332-1.764-1.092-.744.084-.744.084-.744 1.2.084 1.836 1.236 1.836 1.236 1.068 1.824 2.808 1.296 3.492.996.108-.78.42-1.308.762-1.608-2.664-.3-5.466-1.332-5.466-5.94 0-1.308.468-2.388 1.236-3.228-.12-.3-.54-1.524.12-3.168 0 0 1.008-.324 3.3 1.232.96-.264 1.98-.396 3-.396 1.02 0 2.04.132 3 .396 2.292-1.56 3.3-1.232 3.3-1.232.66 1.644.24 2.868.12 3.168.768.84 1.236 1.92 1.236 3.228 0 4.62-2.808 5.628-5.484 5.928.432.372.816 1.104.816 2.22 0 1.608-.012 2.904-.012 3.3 0 .324.216.696.828.576C20.544 21.792 24 17.304 24 12c0-6.624-5.376-12-12-12z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </form>
          </motion.div>
        </div>
      </div>

      {/* Right side - Illustration */}
      <div className="relative flex-1 hidden w-0 lg:block">
        <div className="absolute inset-0 w-full h-full bg-gradient-to-br from-primary-600 to-secondary-600 opacity-90"></div>
        <div className="absolute inset-0 flex items-center justify-center p-12">
          <div className="text-center text-white">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <svg className="w-24 h-24 mx-auto mb-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h2 className="mb-4 text-3xl font-bold font-display">Welcome back to FurShield</h2>
              <p className="text-xl opacity-90">Every paw deserves a shield of love</p>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;