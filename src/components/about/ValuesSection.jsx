import React from 'react';
import { motion } from 'framer-motion';

const ValuesSection = () => {
  const values = [
    {
      icon: "❤️",
      title: "Compassion First",
      description: "Every decision we make is guided by our deep love and respect for animals."
    },
    {
      icon: "⚡",
      title: "Innovation Driven",
      description: "We constantly push boundaries to create better solutions for pet care."
    },
    {
      icon: "🤝",
      title: "Trust & Transparency",
      description: "We build relationships based on honesty, integrity, and open communication."
    },
    {
      icon: "🌍",
      title: "Community Impact",
      description: "We're committed to making a positive difference in the pet community."
    },
    {
      icon: "🎯",
      title: "Excellence Always",
      description: "We strive for the highest standards in everything we do."
    },
    {
      icon: "🔄",
      title: "Continuous Growth",
      description: "We learn, adapt, and evolve to serve pets and owners better."
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
    <section className="py-20 bg-neutral-50">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-16 text-center"
        >
          <h2 className="mb-6 text-3xl font-light text-neutral-900 sm:text-4xl md:text-5xl font-display">
            Our Core <span className="text-primary-600">Values</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 md:text-xl">
            The principles that guide every aspect of our work and define who we are.
          </p>
        </motion.div>

        {/* Values Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
        >
          {values.map((value, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className="p-8 text-center transition-all duration-300 bg-white border group rounded-2xl border-neutral-200 hover:border-primary-300 hover:shadow-lg"
            >
              {/* Icon Container */}
              <motion.div
                whileHover={{ scale: 1.1, rotate: 5 }}
                transition={{ duration: 0.3 }}
                className="flex items-center justify-center w-20 h-20 mx-auto mb-6 text-3xl transition-colors duration-300 bg-gradient-to-br from-primary-50 to-secondary-50 rounded-2xl group-hover:from-primary-100 group-hover:to-secondary-100"
              >
                {value.icon}
              </motion.div>

              {/* Content */}
              <h3 className="mb-4 text-xl font-semibold text-neutral-900 font-display">
                {value.title}
              </h3>
              <p className="leading-relaxed text-neutral-600">
                {value.description}
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* Philosophy Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="p-12 bg-white border rounded-2xl border-neutral-200">
            <div className="max-w-3xl mx-auto">
              <h3 className="mb-6 text-2xl font-light text-neutral-900 font-display">
                "Our values aren't just words on a page—they're the foundation of every interaction, 
                every innovation, and every life we touch through our work."
              </h3>
              <p className="font-medium text-primary-600">— The FurShield Promise</p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ValuesSection;