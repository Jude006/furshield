import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";

const Banner = () => {
  return (
    <section className="relative flex items-center justify-center min-h-screen overflow-hidden ">
      <div className="absolute inset-0 bg-fixed bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
        <div className="absolute inset-0 bg-fixed bg-[url('https://images.unsplash.com/photo-1543466835-00a7907e9de1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80')] bg-cover bg-center bg-no-repeat mix-blend-overlay opacity-20"></div>
      </div>

      <div className="relative z-10 max-w-6xl px-4 pt-16 mx-auto text-center sm:px-6 lg:px-8 md:pt-0">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-8"
        >
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-6xl lg:text-7xl font-display">
            Every Paw Deserves
            <br />
            <span className="text-secondary-400">A Shield of Love</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <p className="max-w-3xl mx-auto text-xl leading-relaxed text-white md:text-2xl opacity-90">
            Premium pet care, health tracking, and expert veterinary services
            all in one place. Your companion deserves the best protection.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/auth/signup"
            className="px-6 py-3.5 text-base font-semibold text-white transition-all duration-300 rounded-lg bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Get Started Free
          </Link>
          <Link
            to="/services"
            className="px-6 py-3.5 text-base font-semibold text-white hover:scale-100 transition-all duration-300 border-2 border-white/30 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:border-white/40 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Learn More
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.8 }}
          className="grid grid-cols-1 gap-8 pt-8 mt-20 border-t md:grid-cols-3 border-white/20"
        >
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl font-display">
              5,000+
            </div>
            <div className="text-white/80">Happy Pets</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl font-display">
              200+
            </div>
            <div className="text-white/80">Expert Vets</div>
          </div>
          <div className="text-center">
            <div className="mb-2 text-3xl font-bold text-white md:text-4xl font-display">
              50+
            </div>
            <div className="text-white/80">Animal Shelters</div>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator - Hidden on small screens, visible on medium+ */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute hidden transform -translate-x-1/2 bottom-8 left-1/2 md:block"
      >
        <div className="flex justify-center w-6 h-10 border-2 rounded-full border-white/30">
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-1 h-3 mt-2 rounded-full bg-white/60"
          ></motion.div>
        </div>
      </motion.div>
    </section>
  );
};

export default Banner;