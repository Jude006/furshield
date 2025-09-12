import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaStethoscope, 
  FaHeart, 
  FaShieldAlt, 
  FaHome, 
  FaShoppingBasket,
  FaArrowRight
} from 'react-icons/fa';

const ServicesGrid = () => {
  const services = [
    {
      icon: FaStethoscope,
      title: "Veterinary Care",
      description: "Professional medical services, health checkups, and emergency care from certified veterinarians.",
      color: "bg-red-500",
      gradient: "from-red-500 to-red-600",
      features: ["Health Checkups", "Vaccinations", "Emergency Care", "Surgery"]
    },
    {
      icon: FaHeart,
      title: "Health & Wellness",
      description: "Comprehensive wellness programs including grooming, nutrition, and preventive care.",
      color: "bg-pink-500",
      gradient: "from-pink-500 to-pink-600",
      features: ["Grooming", "Nutrition", "Dental Care", "Preventive Medicine"]
    },
    {
      icon: FaShieldAlt,
      title: "Pet Insurance",
      description: "Financial protection and insurance plans to safeguard your pet's health and your budget.",
      color: "bg-blue-500",
      gradient: "from-blue-500 to-blue-600",
      features: ["Health Coverage", "Accident Protection", "Wellness Plans", "Emergency Funds"]
    },
    {
      icon: FaHome,
      title: "Shelter Services",
      description: "Adoption services, shelter management, and community outreach programs for homeless pets.",
      color: "bg-green-500",
      gradient: "from-green-500 to-green-600",
      features: ["Adoption", "Foster Care", "Rescue Operations", "Community Outreach"]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0 },
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
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center px-4 py-2 mb-4 text-sm font-medium rounded-full text-primary-600 bg-primary-50">
            <FaHeart className="w-4 h-4 mr-2" />
            Our Services
          </div>
          <h2 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl text-neutral-900 font-display">
            Comprehensive Pet Care Solutions
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600 md:text-xl">
            Everything your pet needs for a healthy, happy life in one unified platform
          </p>
        </motion.div>

        {/* Service Grid - Now 4 items max per row */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full p-8 transition-all duration-300 bg-white border shadow-sm rounded-2xl border-neutral-100 hover:shadow-xl">
                {/* Icon */}
                <div className="mb-6">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-r ${service.gradient} flex items-center justify-center shadow-lg`}>
                    <service.icon className="w-8 h-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-3 text-xl font-semibold text-neutral-900 font-display">
                    {service.title}
                  </h3>
                  <p className="mb-6 text-sm leading-relaxed text-neutral-600">
                    {service.description}
                  </p>

                  {/* Features List */}
                  <ul className="mb-6 space-y-2">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-sm">
                        <div className={`w-1.5 h-1.5 rounded-full ${service.color} mr-3`}></div>
                        <span className="text-neutral-700">{feature}</span>
                      </li>
                    ))}
                  </ul>

                  {/* CTA Button */}
                  <button className="flex items-center text-sm font-medium transition-colors duration-200 text-primary-600 hover:text-primary-700 group-hover:translate-x-1">
                    Learn more
                    <FaArrowRight className="w-3 h-3 ml-2 transition-transform group-hover:translate-x-1" />
                  </button>
                </div>

                {/* Hover Effect Border */}
                <div className="absolute inset-0 transition-all duration-300 border-2 border-transparent pointer-events-none rounded-2xl group-hover:border-primary-100"></div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.3 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-20"
        >
          <div className="grid grid-cols-2 gap-8 text-center md:grid-cols-4">
            {[
              { number: "200+", label: "Certified Vets", color: "text-red-600" },
              { number: "5K+", label: "Happy Pets", color: "text-blue-600" },
              { number: "24/7", label: "Emergency Care", color: "text-green-600" },
              { number: "98%", label: "Satisfaction", color: "text-amber-600" }
            ].map((stat, index) => (
              <div key={index} className="p-6 bg-neutral-50 rounded-xl">
                <div className={`text-2xl font-bold md:text-3xl ${stat.color} font-display`}>
                  {stat.number}
                </div>
                <div className="mt-2 text-sm font-medium text-neutral-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mt-16 text-center"
        >
          <p className="mb-6 text-neutral-600">
            Ready to give your pet the best care?
          </p>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <button className="px-8 py-3 font-semibold text-white transition-all duration-200 rounded-lg shadow-md bg-gradient-to-r from-primary-600 to-primary-700 hover:from-primary-700 hover:to-primary-800 hover:shadow-lg">
              Get Started Free
            </button>
            <button className="px-8 py-3 font-semibold transition-all duration-200 border rounded-lg text-primary-600 border-primary-200 hover:border-primary-300 hover:bg-primary-50">
              View All Services
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ServicesGrid;