import React from 'react';
import { motion } from 'framer-motion';

const OurStory = () => {
  const timeline = [
    {
      year: "2018",
      title: "The Beginning",
      description: "Founded with a vision to revolutionize pet care through technology. Started as a small team of pet lovers and tech enthusiasts.",
      icon: "🚀"
    },
    {
      year: "2020",
      title: "First Breakthrough",
      description: "Launched our first MVP, connecting 100+ pet owners with local veterinarians. Received our first round of funding.",
      icon: "💡"
    },
    {
      year: "2022",
      title: "Nationwide Expansion",
      description: "Expanded to 50+ cities across the country. Partnered with 500+ veterinary clinics and animal shelters.",
      icon: "📈"
    },
    {
      year: "2024",
      title: "Global Vision",
      description: "Launching AI-powered health tracking and international expansion. Serving over 100,000 happy pets worldwide.",
      icon: "🌍"
    }
  ];

  return (
    <section className="py-20 text-white bg-neutral-900">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="mb-20 text-center"
        >
          <h2 className="mb-6 text-3xl font-light text-white sm:text-4xl md:text-5xl font-display">
            Our <span className="text-primary-400">Journey</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-400 md:text-xl">
            From a simple idea to a movement transforming pet care across the nation. 
            This is our story of passion, innovation, and unwavering commitment.
          </p>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-primary-500 to-secondary-500" />
          
          {/* Timeline items */}
          <div className="space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.7, delay: index * 0.2 }}
                className={`relative flex items-center ${
                  index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                }`}
              >
                {/* Content */}
                <div className={`w-1/2 ${index % 2 === 0 ? 'pr-12' : 'pl-12'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.3 }}
                    className="p-8 transition-all duration-300 border bg-neutral-800 rounded-2xl border-neutral-700 hover:border-primary-500"
                  >
                    <div className="mb-2 text-2xl">{item.icon}</div>
                    <div className="mb-2 text-sm font-semibold text-primary-400">{item.year}</div>
                    <h3 className="mb-4 text-xl font-semibold text-white font-display">{item.title}</h3>
                    <p className="leading-relaxed text-neutral-400">{item.description}</p>
                  </motion.div>
                </div>

                {/* Center dot */}
                <div className="absolute z-10 w-6 h-6 transform -translate-x-1/2 border-4 rounded-full left-1/2 bg-primary-500 border-neutral-900" />

                {/* Year marker */}
                <div className={`absolute top-0 ${
                  index % 2 === 0 ? 'left-1/2 ml-8' : 'right-1/2 mr-8'
                } transform -translate-y-1/2`}>
                  <span className="text-2xl font-bold text-primary-400 font-display">{item.year}</span>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 text-center"
        >
          <div className="p-12 border bg-gradient-to-r from-primary-900 to-secondary-900 rounded-2xl border-primary-700">
            <h3 className="mb-6 text-2xl font-light text-white font-display">
              "Our mission is simple: to ensure every pet receives the love, care, and protection they deserve through innovative technology and compassionate service."
            </h3>
            <p className="text-primary-300">— FurShield Team</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default OurStory;