import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const HowItWorks = () => {
  const steps = [
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
        </svg>
      ),
      title: "Create Your Account",
      description: "Sign up as a Pet Owner, Veterinarian, or Animal Shelter. Set up your profile in minutes.",
      color: "bg-primary-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
        </svg>
      ),
      title: "Set Up Your Profile",
      description: "Add your pets, services, or available animals. Customize based on your role.",
      color: "bg-secondary-500"
    },
    {
      icon: (
        <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
      title: "Start Using Features",
      description: "Access health tracking, appointments, adoption services, or product shopping.",
      color: "bg-primary-600"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="text-3xl font-bold text-neutral-900 md:text-4xl lg:text-5xl font-display">
            How <span className="text-primary-600">FurShield</span> Works
          </h2>
          <p className="max-w-2xl mx-auto mt-4 text-lg text-neutral-600 md:text-xl">
            Simple steps to get started with comprehensive pet care management
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          {steps.map((step, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="relative p-8 transition-all duration-300 border bg-neutral-50 rounded-2xl border-neutral-200 hover:shadow-lg group"
            >
              {/* Step Number */}
              <div className="absolute -top-4 -left-4">
                <div className={`w-12 h-12 rounded-full flex items-center justify-center text-white font-display font-bold text-lg ${step.color} shadow-lg`}>
                  {index + 1}
                </div>
              </div>

              {/* Icon */}
              <div className={`w-16 h-16 rounded-xl ${step.color} flex items-center justify-center text-white mb-6 group-hover:scale-110 transition-transform duration-300`}>
                {step.icon}
              </div>

              {/* Content */}
              <h3 className="mb-3 text-xl font-semibold text-neutral-900 font-display">
                {step.title}
              </h3>
              <p className="leading-relaxed text-neutral-600">
                {step.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-16 text-center"
        >
          <div className="p-8 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100">
            <h3 className="mb-4 text-2xl font-semibold text-neutral-900 font-display">
              Ready to Get Started?
            </h3>
            <p className="max-w-2xl mx-auto mb-6 text-neutral-600">
              Join thousands of pet owners, veterinarians, and shelters already using FurShield
            </p>
            <div className="flex flex-col justify-center gap-4 sm:flex-row">
              <Link
                to="/auth/signup"
                className="px-6 py-3 text-base font-semibold text-white transition-colors duration-300 rounded-lg shadow-md bg-primary-500 hover:bg-primary-600 hover:shadow-lg"
              >
                Sign Up as Pet Owner
              </Link>
              <Link
                to="/auth/signup  "
                className="px-6 py-3 text-base font-semibold transition-all duration-300 border-2 rounded-lg text-primary-600 border-primary-500 hover:bg-primary-500 hover:text-white"
              >
                Join as Veterinarian
              </Link>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default HowItWorks;