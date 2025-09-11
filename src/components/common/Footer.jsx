import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="py-16 text-white bg-neutral-900">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center mb-4 space-x-2">
              <div className="flex items-center justify-center w-10 h-10 bg-primary-500 rounded-xl">
                <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
              </div>
              <span className="text-xl font-bold font-display">FurShield</span>
            </div>
            <p className="text-sm text-neutral-400">
              Every paw deserves a shield of love. Premium pet care for everyone.
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Quick Links</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><Link to="/about" className="transition-colors hover:text-white">About Us</Link></li>
              <li><Link to="/services" className="transition-colors hover:text-white">Services</Link></li>
              <li><Link to="/contact" className="transition-colors hover:text-white">Contact</Link></li>
              <li><Link to="/faq" className="transition-colors hover:text-white">FAQ</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Services</h3>
            <ul className="space-y-2 text-neutral-400">
              <li><span className="transition-colors hover:text-white">Pet Health Tracking</span></li>
              <li><span className="transition-colors hover:text-white">Veterinary Appointments</span></li>
              <li><span className="transition-colors hover:text-white">Pet Adoption</span></li>
              <li><span className="transition-colors hover:text-white">Product Store</span></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold">Contact Info</h3>
            <div className="space-y-2 text-neutral-400">
              <p>Email: furshield123@gmail.com</p>
              <p>Phone: (+234) 8068078495</p>
              <p>Address: 123 Sango ota ogun state</p>
            </div>
          </div>
        </div>

        <div className="pt-8 mt-12 text-sm text-center border-t border-neutral-800 text-neutral-400">
          <p>© 2025 FurShield. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;