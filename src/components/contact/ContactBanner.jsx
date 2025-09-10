import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const ContactBanner = () => {
  return (
    <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden py-6">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1583337130417-3346a1be7dee?auto=format&fit=crop&q=80&w=2160"
          alt="Pet care contact background"
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-neutral-900/80 via-primary-900/40 to-secondary-900/30" />
        <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.5 }}
          className="absolute w-64 h-64 rounded-full top-1/4 left-1/4 bg-primary-500/10 blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 2, delay: 0.8 }}
          className="absolute rounded-full bottom-1/3 right-1/4 w-80 h-80 bg-secondary-500/10 blur-3xl"
        />
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-6xl px-4 mx-auto text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center"
        >
          {/* Minimal Breadcrumb */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center mb-8"
          >
            <div className="flex items-center space-x-3 text-sm text-white/80">
              <Link to="/" className="transition-colors hover:text-white">
                Home
              </Link>
              <div className="w-1 h-1 rounded-full bg-white/60" />
              <span className="font-medium text-white">Contact</span>
            </div>
          </motion.nav>

          {/* Main Headline */}
          <div className="mb-8">
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="mb-4 text-5xl font-light tracking-tight text-white sm:text-6xl md:text-7xl lg:text-8xl font-display"
            >
              Let's Connect
            </motion.h1>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="relative inline-block"
            >
              <span className="text-5xl font-light text-white sm:text-6xl md:text-7xl lg:text-8xl font-display">
                For Your
              </span>
              <span className="ml-3 text-5xl font-light text-primary-300 sm:text-6xl md:text-7xl lg:text-8xl font-display">
                Pet's Needs
              </span>
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
                className="absolute left-0 w-full h-1 origin-left bg-gradient-to-r from-primary-300 to-secondary-300 -bottom-2"
              />
            </motion.div>
          </div>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            className="max-w-2xl mx-auto mb-12 text-lg font-light leading-relaxed text-white/90 md:text-xl"
          >
            We're here to help with all your pet care questions. Reach out to our team of experts 
            for support, advice, or partnership opportunities.
          </motion.p>

          {/* Contact Methods Preview */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid max-w-4xl grid-cols-1 gap-6 mx-auto mb-12 sm:grid-cols-3"
          >
            {[
              { icon: '📧', title: 'Email Us', detail: 'support@furshield.com', link: 'mailto:support@furshield.com' },
              { icon: '📞', title: 'Call Us', detail: '+1 (555) 123-PAWS', link: 'tel:+15551237297' },
              { icon: '📍', title: 'Visit Us', detail: '123 Pet Care Ave, City', link: '#location' }
            ].map((method, index) => (
              <motion.a
                key={index}
                href={method.link}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.6, delay: 1.2 + index * 0.2 }}
                className="flex flex-col items-center p-6 transition-all duration-300 rounded-2xl bg-white/5 backdrop-blur-sm hover:bg-white/10 group"
              >
                <div className="mb-4 text-3xl">{method.icon}</div>
                <h3 className="mb-2 text-lg font-medium text-white">{method.title}</h3>
                <p className="transition-colors text-white/70 group-hover:text-primary-200">{method.detail}</p>
              </motion.a>
            ))}
          </motion.div>

          {/* CTA Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.4 }}
            className="flex justify-center"
          >
            <a
              href="#contact-form"
              className="relative px-8 py-4 overflow-hidden font-medium text-white transition-all duration-300 rounded-full group bg-primary-500 hover:bg-primary-600"
            >
              <span className="relative z-10">Send us a Message</span>
              <motion.div
                className="absolute inset-0 transition-opacity duration-300 opacity-0 bg-gradient-to-r from-primary-600 to-secondary-600 group-hover:opacity-100"
                initial={false}
              />
            </a>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ContactBanner;