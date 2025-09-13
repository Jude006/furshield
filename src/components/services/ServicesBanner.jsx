import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { 
  FaPaw, 
  FaHeart, 
  FaShieldAlt, 
  FaStethoscope, 
  FaHome, 
  FaShoppingBasket,
  FaUsers 
} from "react-icons/fa";

const ServicesBanner = () => {
  return (
    <section className="relative flex items-center py-10 justify-center min-h-[70vh] overflow-hidden bg-gradient-to-br from-primary-600 via-primary-700 to-primary-800">
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 rounded-full w-72 h-72 bg-primary-500 mix-blend-multiply filter blur-xl opacity-20 animate-blob"></div>
        <div className="absolute top-0 right-0 rounded-full w-72 h-72 bg-secondary-500 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-0 rounded-full w-72 h-72 bg-primary-400 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 rounded-full w-72 h-72 bg-secondary-400 mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-6000"></div>
      </div>

    

      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="mb-6"
        >
          <div className="inline-flex items-center px-4 py-2 mb-6 text-sm font-medium text-white border rounded-full bg-white/10 backdrop-blur-sm border-white/20">
            <FaPaw className="w-4 h-4 mr-2 text-secondary-400" />
            Premium Pet Care Services
          </div>
          <h1 className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-6xl font-display">
            Comprehensive Care
            <br />
            <span className="text-secondary-400">For Your Beloved Pets</span>
          </h1>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-10"
        >
          <p className="max-w-3xl mx-auto text-lg leading-relaxed text-white md:text-xl opacity-90">
            Discover our full range of professional pet care services designed to keep 
            your furry friends healthy, happy, and thriving. From veterinary care to 
            grooming and everything in between.
          </p>
        </motion.div>

      {/* my service grid box section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="grid grid-cols-2 gap-4 mb-12 sm:grid-cols-3 md:grid-cols-6"
        >
          {[
            { icon: FaStethoscope, label: "Veterinary", color: "text-red-400" },
            { icon: FaHeart, label: "Health", color: "text-pink-400" },
            { icon: FaShieldAlt, label: "Insurance", color: "text-blue-400" },
            { icon: FaHome, label: "Shelter", color: "text-green-400" },
            { icon: FaShoppingBasket, label: "Products", color: "text-yellow-400" },
            { icon: FaUsers, label: "Community", color: "text-purple-400" }
          ].map((service, index) => (
           <a href='#service' key={index}>
            <motion.div
              
              whileHover={{ scale: 1.05, y: -5 }}
              className="p-4 transition-all duration-300 border bg-white/5 rounded-xl backdrop-blur-sm border-white/10 hover:bg-white/10"
            >
              <service.icon className={`w-8 h-8 mx-auto mb-2 ${service.color}`} />
              <span className="text-sm font-medium text-white">{service.label}</span>
            </motion.div>
           </a>
          ))}
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="flex flex-col items-center justify-center gap-4 sm:flex-row"
        >
          <Link
            to="/auth/signup"
            className="px-8 py-4 text-base font-semibold text-white transition-all duration-300 transform rounded-lg shadow-lg bg-gradient-to-r from-secondary-500 to-secondary-600 hover:from-secondary-600 hover:to-secondary-700 hover:shadow-xl hover:-translate-y-1 focus:ring-2 focus:ring-secondary-500 focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            Get Started Today
          </Link>
          <Link
            to="/pricing"
            className="px-8 py-3.5 text-base font-semibold text-white transition-all duration-300 border-2 border-white/30 rounded-lg bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:border-white/40 transform hover:-translate-y-0.5 focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-primary-700"
          >
            View Pricing
          </Link>
        </motion.div>

        {/* Trust Indicators */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
          className="flex flex-col items-center justify-center mt-16 space-y-4 text-white/80 sm:flex-row sm:space-y-0 sm:space-x-8"
        >
          <div className="flex items-center">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 bg-white border-2 rounded-full border-primary-700"
                />
              ))}
            </div>
            <span className="ml-3 text-sm">Trusted by 5,000+ pet owners</span>
          </div>
          
          <div className="flex items-center">
            <div className="flex items-center">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
            </div>
            <span className="ml-2 text-sm">4.9/5 Rating</span>
          </div>
        </motion.div>
      </div>

      {/* Floating Elements */}
      <div className="absolute top-20 left-10 opacity-10">
        <FaPaw className="w-16 h-16 text-white animate-float" />
      </div>
      <div className="absolute top-40 right-20 opacity-10">
        <FaHeart className="w-12 h-12 text-secondary-400 animate-float animation-delay-2000" />
      </div>
      <div className="absolute bottom-20 left-20 opacity-10">
        <FaShieldAlt className="text-white w-14 h-14 animate-float animation-delay-4000" />
      </div>
      <div className="absolute bottom-40 right-10 opacity-10">
        <FaStethoscope className="w-16 h-16 text-secondary-400 animate-float animation-delay-6000" />
      </div>

    
      <style jsx>{`
        @keyframes blob {
          0% { transform: translate(0px, 0px) scale(1); }
          33% { transform: translate(30px, -50px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(0px, 0px) scale(1); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        .animate-blob {
          animation: blob 7s infinite;
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        .animation-delay-6000 {
          animation-delay: 6s;
        }
      `}</style>
    </section>
  );
};

export default ServicesBanner;