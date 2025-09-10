import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const AboutBanner = () => {
  return (
    <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=2160"
          alt="Happy pets background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-primary-900/40 to-secondary-900/30" />
      <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-primary-500/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute rounded-full bottom-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Minimal Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-3 text-sm text-white/80">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/60" />
              <span className="font-medium text-white">About</span>
            </div>
          </motion.nav>

          {/* Main Headline */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4 text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-display"
            >
              Redefining
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative inline-block"
            >
              <span className="text-5xl font-light text-white sm:text-6xl md:text-7xl lg:text-8xl font-display">
                Pet
              </span>
              <span className="ml-3 text-5xl font-light text-primary-300 sm:text-6xl md:text-7xl lg:text-8xl font-display">
                Care
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 w-full h-1 origin-left bg-gradient-to-r from-primary-300 to-secondary-300 -bottom-2"
              />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            Where innovation meets compassion in pet care. 
            We're building a future where every pet receives the love and attention they deserve.
          </motion.p>

          {/* Animated Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid max-w-2xl grid-cols-3 gap-8 mx-auto mb-12"
          >
            {[
              { number: '10K+', label: 'Happy Pets' },
              { number: '200+', label: 'Expert Partners' },
              { number: '98%', label: 'Satisfaction' }
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                  className="mb-2 text-2xl font-bold text-primary-300 md:text-3xl font-display"
                >
                  {stat.number}
                </motion.div>
                <div className="text-sm font-medium tracking-wide uppercase text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex flex-col items-center justify-center gap-4 sm:flex-row"
          >
            <Link
              to="/services"
              className="relative px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 rounded-full group bg-primary-500 hover:bg-primary-600"
            >
              <span className="relative z-10">Explore Services</span>
              <motion.div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:opacity-100"
                initial={false}
              />
            </Link>
            
            <Link
              to="/story"
              className="flex items-center px-6 py-3 font-medium text-white transition-all duration-300 border rounded-full hover:text-primary-200 group border-white/30 hover:border-primary-300"
            >
              <span>Our Story</span>
              <motion.svg
                className="w-5 h-5 ml-2 transition-transform duration-300 group-hover:translate-x-1"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </motion.svg>
            </Link>
          </motion.div>
        </motion.div>
      </div>

   
    </section>
  );
};

export default AboutBanner;