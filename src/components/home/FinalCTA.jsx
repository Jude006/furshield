import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const FinalCTA = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-primary-600 to-primary-800">
      <div className="max-w-4xl px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="mb-6 text-3xl font-bold text-white md:text-4xl lg:text-5xl font-display">
            Ready to Transform Pet Care?
          </h2>
          
          <p className="max-w-2xl mx-auto mb-10 text-xl text-primary-100">
            Join thousands of pet lovers who trust FurShield for complete pet care management
          </p>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <Link
              to="/auth/signup"
              className="px-8 py-4 font-semibold transition-colors duration-300 bg-white rounded-lg text-primary-600 hover:bg-neutral-100"
            >
              Get Started Free
            </Link>
            
            <Link
              to="/contact"
              className="px-8 py-4 font-semibold text-white transition-colors duration-300 border-2 border-white rounded-lg hover:bg-white hover:text-primary-600"
            >
              Contact Us
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FinalCTA;