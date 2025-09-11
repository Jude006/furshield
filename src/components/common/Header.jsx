import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white shadow-lg backdrop-blur-sm bg-opacity-95' 
        : 'bg-white md:bg-white/0 md:backdrop-blur-sm'
    }`}>
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center flex-shrink-0">
            <div className="flex items-center space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className={`text-xl font-display font-bold tracking-tight transition-colors duration-500 ${
                isScrolled ? 'text-neutral-900' : 'text-neutral-900 md:text-neutral-900'
              }`}>
                FurShield
              </span>
            </div>
          </Link>

          <div className="hidden md:block">
            <div className="flex items-baseline ml-10 space-x-8">
              {navItems.map((item) => (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`relative px-3 py-2 text-sm font-medium transition-all duration-500 ${
                    isActive(item.path)
                      ? 'text-primary-600'
                      : 'text-neutral-700 hover:text-primary-600'
                  }`}
                >
                  {item.name}
                  {isActive(item.path) && (
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-primary-500 rounded-full transition-all duration-500"></span>
                  )}
                </Link>
              ))}
            </div>
          </div>

          <div className="hidden md:block">
            <div className="flex items-center space-x-4">
              <Link
                to="/auth/login"
                className={`px-4 py-2 text-sm font-medium rounded-lg transition-all duration-500 ${
                  isScrolled
                    ? 'text-neutral-700 hover:text-primary-600'
                    : 'text-neutral-700 hover:text-primary-600'
                }`}
              >
                Sign In
              </Link>
              <Link
                to="/auth/signup"
                className={`px-6 py-2.5 text-sm font-medium rounded-lg transition-all duration-500 transform hover:scale-105 shadow-md hover:shadow-lg ${
                  isScrolled
                    ? 'bg-primary-500 hover:bg-primary-600 text-white'
                    : 'bg-primary-500 hover:bg-primary-600 text-white'
                }`}
              >
                Get Started
              </Link>
            </div>
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className={`p-2 rounded-md transition-all duration-500 ${
                isScrolled
                  ? 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
                  : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-100'
              }`}
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>

      {isOpen && (
        <div className="bg-white shadow-lg md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <Link
                key={item.name}
                to={item.path}
                className={`block px-3 text-neutral-900 py-2 rounded-md text-base font-medium transition-all duration-500 ${
                  isActive(item.path)
                    ? 'text-primary-600 bg-primary-50'
                    : 'text-neutral-700 hover:text-primary-600 hover:bg-neutral-50'
                }`}
                onClick={() => setIsOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="pt-4 pb-3 border-t border-neutral-200">
              <div className="flex items-center px-5 space-x-3">
                <Link
                  to="/auth/login"
                  className="flex-1 px-4 py-2 text-sm font-medium text-center transition-colors rounded-lg text-neutral-700 hover:text-primary-600"
                  onClick={() => setIsOpen(false)}
                >
                  Sign In
                </Link>
                <Link
                  to="/auth/signup"
                  className="flex-1 text-center px-4 py-2.5 bg-primary-500 hover:bg-primary-600 text-white text-sm font-medium rounded-lg transition-colors"
                  onClick={() => setIsOpen(false)}
                >
                  Get Started
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Header;