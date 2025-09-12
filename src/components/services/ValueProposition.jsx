import React from 'react';
import { motion } from 'framer-motion';
import { 
  FaShieldAlt, 
  FaUsers, 
  FaClock, 
  FaMobileAlt,
  FaHeart,
  FaSync
} from 'react-icons/fa';

const ValueProposition = () => {
  const features = [
    {
      icon: FaShieldAlt,
      title: "All-in-One Protection",
      description: "Comprehensive care from health tracking to insurance - everything your pet needs in one platform.",
      color: "text-blue-600",
      bgColor: "bg-blue-50"
    },
    {
      icon: FaUsers,
      title: "Trusted Community",
      description: "Join 10,000+ pet owners, 200+ certified veterinarians, and 50+ animal shelters.",
      color: "text-green-600",
      bgColor: "bg-green-50"
    },
    {
      icon: FaClock,
      title: "24/7 Access",
      description: "Round-the-clock access to health records, emergency services, and veterinary support.",
      color: "text-purple-600",
      bgColor: "bg-purple-50"
    },
    {
      icon: FaMobileAlt,
      title: "Seamless Experience",
      description: "Beautiful, intuitive interface that works perfectly on all your devices.",
      color: "text-amber-600",
      bgColor: "bg-amber-50"
    },
    {
      icon: FaHeart,
      title: "Pet-First Approach",
      description: "Designed by pet lovers, for pet lovers. Every feature puts your pet's wellbeing first.",
      color: "text-pink-600",
      bgColor: "bg-pink-50"
    },
    {
      icon: FaSync,
      title: "Always Evolving",
      description: "Regular updates with new features based on feedback from our growing community.",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-primary-50 to-secondary-50">
      <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-3xl font-bold md:text-4xl text-neutral-900 font-display">
            Why Pet Owners Choose FurShield
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Discover why thousands of pet owners trust us with their furry family members
          </p>
        </motion.div>

        {/* Features Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="flex group"
            >
              <div className="flex-1 p-6 transition-all duration-300 bg-white shadow-sm rounded-2xl hover:shadow-md">
                {/* Icon */}
                <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4`}>
                  <feature.icon className={`w-6 h-6 ${feature.color}`} />
                </div>

                {/* Content */}
                <div>
                  <h3 className="mb-3 text-lg font-semibold text-neutral-900">
                    {feature.title}
                  </h3>
                  <p className="text-sm leading-relaxed text-neutral-600">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ValueProposition;