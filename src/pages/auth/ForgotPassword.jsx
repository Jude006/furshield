import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Forgot password logic will go here
    console.log(email);
    setSubmitted(true);
  };

  return (
    <div className="flex flex-col justify-center min-h-screen px-4 py-12 bg-neutral-50 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <Link to="/" className="inline-flex items-center">
              <svg className="w-10 h-10 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              <span className="ml-2 text-2xl font-bold text-neutral-900 font-display">FurShield</span>
            </Link>
            <h2 className="mt-6 text-3xl font-bold text-neutral-900">Reset your password</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Or{' '}
              <Link to="/auth/login" className="font-medium text-primary-600 hover:text-primary-500">
                return to sign in
              </Link>
            </p>
          </div>

          <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow sm:px-10">
            {submitted ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-center"
              >
                <div className="flex items-center justify-center w-12 h-12 mx-auto bg-green-100 rounded-full">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="mt-4 text-lg font-medium text-neutral-900">Check your email</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  We've sent a password reset link to <span className="font-medium">{email}</span>
                </p>
                <div className="mt-6">
                  <Link
                    to="/auth/login"
                    className="font-medium text-primary-600 hover:text-primary-500"
                  >
                    Back to sign in
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="mb-6 text-sm text-neutral-600">
                  Enter your email address and we'll send you a link to reset your password.
                </p>
                <form className="space-y-6" onSubmit={handleSubmit}>
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
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="relative block w-full px-4 py-3 border rounded-lg appearance-none border-neutral-300 placeholder-neutral-500 text-neutral-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500 focus:z-10 sm:text-sm"
                      placeholder="Enter your email"
                    />
                  </div>

                  <div>
                    <motion.button
                      type="submit"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      className="relative flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded-lg group bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                    >
                      Send reset link
                    </motion.button>
                  </div>
                </form>
              </>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default ForgotPassword;