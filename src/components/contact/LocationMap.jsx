import React from 'react';
import { motion } from 'framer-motion';

const LocationMap = () => {
  return (
    <section id="location" className="py-20 bg-white">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-light text-neutral-800 sm:text-5xl font-display">
            Find Our <span className="text-primary-600">Location</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Visit us at our headquarters or reach out to our dedicated team for assistance.
          </p>
        </motion.div>      
      </div>

      <div className='px-6 rounded md:px-8 lg:px-20'>
        <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3962.498230259276!2d3.2353293750418537!3d6.708883693286827!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x103b995b41b7dd6d%3A0xb6c08985374e0e09!2sAptech%20Computer%20Education%20-Sango%20Ota!5e0!3m2!1sen!2sng!4v1757502248762!5m2!1sen!2sng" width='100%' height='400'  loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe> 
      </div>
    </section>
  );
};

export default LocationMap;