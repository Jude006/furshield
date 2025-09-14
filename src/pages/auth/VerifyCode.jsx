import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link, useLocation } from 'react-router-dom';

const VerifyCode = () => {
  const location = useLocation();
  const email = location.state?.email || '';
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [isVerified, setIsVerified] = useState(false);
  const [countdown, setCountdown] = useState(60);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (countdown > 0 && !isVerified) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown, isVerified]);

  const handleChange = (index, value) => {
    if (!/^\d*$/.test(value)) return; 
    
    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }

    if (newCode.every(digit => digit !== '') && index === 5) {
      verifyCode(newCode.join(''));
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text');
    if (/^\d{6}$/.test(pastedData)) {
      const digits = pastedData.split('');
      setCode(digits);
      digits.forEach((digit, index) => {
        if (inputRefs.current[index]) {
          inputRefs.current[index].value = digit;
        }
      });
      inputRefs.current[5].focus();
      verifyCode(pastedData);
    }
  };

  const verifyCode = (enteredCode) => {
    console.log('Verifying code:', enteredCode);
    setTimeout(() => {
      setIsVerified(true);
    }, 1000);
  };

  const resendCode = () => {
    console.log('Resending code to:', email);
    setCountdown(60);
    setCode(['', '', '', '', '', '']);
    inputRefs.current[0].focus();
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
            <h2 className="mt-6 text-3xl font-bold text-neutral-900">Enter verification code</h2>
            <p className="mt-2 text-sm text-neutral-600">
              Sent to <span className="font-medium">{email}</span>
            </p>
          </div>

          <div className="px-4 py-8 mt-8 bg-white rounded-lg shadow sm:px-10">
            {isVerified ? (
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
                <h3 className="mt-4 text-lg font-medium text-neutral-900">Code verified</h3>
                <p className="mt-2 text-sm text-neutral-600">
                  Your code has been successfully verified.
                </p>
                <div className="mt-6">
                  <Link
                    to="/auth/reset-password"
                    state={{ email }}
                    className="flex justify-center w-full px-4 py-3 text-sm font-medium text-white transition-colors duration-300 border border-transparent rounded-lg bg-primary-600 hover:bg-primary-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-500"
                  >
                    Continue to reset password
                  </Link>
                </div>
              </motion.div>
            ) : (
              <>
                <p className="mb-6 text-sm text-center text-neutral-600">
                  Enter the 6-digit code we sent to your email address.
                </p>
                
                <form className="space-y-6">
                  <div className="flex justify-center space-x-2">
                    {code.map((digit, index) => (
                      <input
                        key={index}
                        ref={(el) => (inputRefs.current[index] = el)}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        onPaste={index === 0 ? handlePaste : undefined}
                        className="w-12 h-12 text-xl font-semibold text-center border rounded-lg border-neutral-300 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-primary-500"
                        autoFocus={index === 0}
                      />
                    ))}
                  </div>

                  <div className="text-center">
                    <p className="text-sm text-neutral-600">
                      Didn't receive the code?{' '}
                      {countdown > 0 ? (
                        <span className="text-neutral-500">Resend in {countdown}s</span>
                      ) : (
                        <button
                          type="button"
                          onClick={resendCode}
                          className="font-medium text-primary-600 hover:text-primary-500"
                        >
                          Resend code
                        </button>
                      )}
                    </p>
                  </div>

                  <div className="mt-6 text-center">
                    <button
                      onClick={() => setCode(['', '', '', '', '', ''])}
                      type="button"
                      className="text-sm font-medium text-primary-600 hover:text-primary-500"
                    >
                      Clear all
                    </button>
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

export default VerifyCode;