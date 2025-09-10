import React from 'react';
import { motion } from 'framer-motion';
import CountUp from 'react-countup';
import { useInView } from 'react-intersection-observer';

const AchievementItem = ({ number, suffix, label, description }) => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.3,
  });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      transition={{ duration: 0.6 }}
      className="p-6 text-center"
    >
      <div className="mb-3 text-4xl font-bold md:text-5xl text-primary-600 font-display">
        {inView ? <CountUp end={number} duration={2} suffix={suffix} /> : 0}
      </div>
      <h3 className="mb-2 text-lg font-semibold text-neutral-900">{label}</h3>
      <p className="text-sm text-neutral-600">{description}</p>
    </motion.div>
  );
};

const AchievementsSection = () => {
  const achievements = [
    {
      number: 10000,
      suffix: "+",
      label: "Happy Pets",
      description: "Lives transformed through our platform"
    },
    {
      number: 500,
      suffix: "+",
      label: "Veterinary Partners",
      description: "Professional clinics in our network"
    },
    {
      number: 50,
      suffix: "+",
      label: "Animal Shelters",
      description: "Rescue organizations we support"
    },
    {
      number: 98,
      suffix: "%",
      label: "Satisfaction Rate",
      description: "Of pet owners recommend us"
    }
  ];

  return (
    <section className="py-20 bg-white">
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
            Our <span className="text-primary-600">Impact</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg leading-relaxed text-neutral-600 md:text-xl">
            Numbers that tell the story of our commitment to transforming pet care.
          </p>
        </motion.div>

        {/* Achievements Grid */}
        <div className="grid grid-cols-1 gap-8 mb-16 md:grid-cols-2 lg:grid-cols-4">
          {achievements.map((achievement, index) => (
            <AchievementItem key={index} {...achievement} />
          ))}
        </div>

        {/* Impact Story */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="p-12 border bg-gradient-to-r from-primary-50 to-secondary-50 rounded-2xl border-primary-100"
        >
          <div className="text-center">
            <h3 className="mb-6 text-2xl font-light text-neutral-900 font-display">
              "Together, we've facilitated over 25,000 successful adoptions and provided 
              emergency care for 5,000+ pets in need."
            </h3>
            <p className="font-medium text-primary-600">
              — Making a difference, one paw at a time
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default AchievementsSection;