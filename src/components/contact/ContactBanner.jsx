import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactBanner = () => {
  return (
    <section className="relative min-h-[85vh] flex items-center justify-center overflow-hidden py-12">
      <div className="absolute inset-0 overflow-hidden">
        <motion.div 
          className="absolute top-0 left-0 w-full h-full bg-fixed bg-gradient-to-br from-primary-900 via-neutral-900 to-secondary-900"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
        />
        
        <motion.div
          className="absolute rounded-full top-1/4 left-1/4 w-72 h-72 bg-primary-500/5 blur-xl"
          animate={{
            scale: [1, 1.2, 1],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        <motion.div
          className="absolute rounded-full bottom-1/3 right-1/4 w-96 h-96 bg-secondary-500/5 blur-xl"
          animate={{
            scale: [1, 1.3, 1],
            x: [0, 15, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        <motion.div
          className="absolute w-64 h-64 rounded-full top-1/3 right-1/3 bg-primary-400/5 blur-xl"
          animate={{
            scale: [1, 1.1, 1],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />
        
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#808080_1px,transparent_1px),linear-gradient(to_bottom,#808080_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-10"
          >
            <div className="flex items-center space-x-4 text-sm font-light text-white/80">
              <Link to="/" className="flex items-center transition-all duration-300 hover:text-primary-300">
                <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-primary-400/60" />
              <span className="font-medium text-primary-300">Contact</span>
            </div>
          </motion.nav>

          <div className="mb-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-6"
            >
              <h1 className="text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-display">
                <span className="inline-block">
                  {"Let's Connect".split('').map((char, i) => (
                    <motion.span
                      key={i}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: i * 0.05 }}
                      className="inline-block"
                    >
                      {char}
                    </motion.span>
                  ))}
                </span>
              </h1>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative"
            >
              <h2 className="text-4xl font-light text-white sm:text-5xl md:text-6xl lg:text-7xl font-display">
                <span className="text-primary-200">For Your Beloved</span>{' '}
                <span className="text-secondary-300">Companions</span>
              </h2>
              
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "100%" }}
                transition={{ duration: 1.2, delay: 1.2, ease: "easeOut" }}
                className="absolute left-0 h-1 rounded-full -bottom-4 bg-gradient-to-r from-primary-400 to-secondary-400"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 1.8, ease: "easeOut" }}
                className="absolute w-10 h-1 rounded-full -bottom-6 left-1/3 bg-primary-300"
              />
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.8, delay: 2, ease: "easeOut" }}
                className="absolute w-10 h-1 rounded-full -bottom-6 right-1/3 bg-secondary-300"
              />
            </motion.div>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-16 text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            Our dedicated team is ready to provide exceptional support for all your pet care needs. 
            Reach out to us for assistance, guidance, or collaboration opportunities.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid max-w-5xl grid-cols-1 gap-8 mx-auto mb-16 md:grid-cols-3"
          >
            {[
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                ), 
                title: 'Email Us', 
                detail: 'support@furshield.com', 
                link: 'mailto:support@furshield.com',
                delay: 0.1
              },
              { 
                icon: (
                  <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                ), 
                title: 'Call Us', 
                detail: '+1 (555) 123-PAWS', 
                link: 'tel:+15551237297',
                delay: 0.2
              },
              { 
                icon: (
                  <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                ), 
                title: 'Visit Us', 
                detail: '123 Pet Care Avenue', 
                link: '#location',
                delay: 0.3
              }
            ].map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial={{ scale: 0.8, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 1.2 + method.delay }}
                whileHover={{ y: -8, transition: { duration: 0.3 } }}
                className="relative flex flex-col items-center p-8 overflow-hidden transition-all duration-500 border rounded-2xl bg-gradient-to-b from-white/5 to-transparent backdrop-blur-md border-white/10 hover:border-primary-400/30 group"
              >
                <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-br from-primary-500/5 to-secondary-500/5 group-hover:opacity-100" />
                
                <motion.div 
                  className="relative z-10 flex items-center justify-center w-20 h-20 mb-6 transition-all duration-500 rounded-2xl bg-gradient-to-br from-primary-700/20 to-primary-400/20 group-hover:from-primary-600/30 group-hover:to-primary-300/30"
                  whileHover={{ rotate: 5, scale: 1.05 }}
                >
                  <div className="transition-colors duration-500 text-primary-300 group-hover:text-primary-200">
                    {method.icon}
                  </div>
                </motion.div>
                
                <h3 className="relative z-10 mb-3 text-xl font-medium text-white">{method.title}</h3>
                <p className="relative z-10 transition-colors duration-500 text-white/70 group-hover:text-primary-200">
                  {method.detail}
                </p>
                
                <motion.div 
                  className="relative z-10 mt-4 transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                  initial={{ x: -5 }}
                  whileHover={{ x: 5, transition: { yoyo: Infinity, duration: 0.5 } }}
                >
                  <svg className="w-5 h-5 text-primary-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.div>
              </motion.a>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex justify-center"
          >
            <motion.a
              href="#contact-form"
              className="relative px-10 py-5 overflow-hidden font-medium text-white transition-all duration-500 rounded-2xl group"
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-600 to-secondary-600 rounded-2xl" />
              
              <div className="absolute inset-0 transition-opacity duration-500 opacity-0 bg-gradient-to-r from-primary-500 to-secondary-500 group-hover:opacity-100 rounded-2xl" />
              
              <div className="absolute top-0 left-0 w-10 h-full bg-white/20 skew-x-12 -translate-x-16 transition-transform duration-700 group-hover:translate-x-[300%] rounded-2xl" />
              
              <span className="relative z-10 flex items-center text-lg tracking-wide">
                Send us a Message
                <svg className="w-5 h-5 ml-3 transition-transform duration-300 group-hover:translate-x-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </span>
            </motion.a>
          </motion.div>
        </motion.div>
      </div>

      <motion.div
        className="absolute text-6xl bottom-20 left-10 opacity-10"
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      >
        🐕
      </motion.div>
      <motion.div
        className="absolute text-6xl top-20 right-10 opacity-10"
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      >
        🐈
      </motion.div>
    </section>
  );
};

export default ContactBanner;