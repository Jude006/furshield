import React, { useState } from 'react';
import { motion } from 'framer-motion';

const SocialNewsletterSection = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Subscribed with:', email);
    setSubscribed(true);
    setEmail('');
    
    setTimeout(() => {
      setSubscribed(false);
    }, 3000);
  };

  const socialMediaPlatforms = [
    {
      name: 'Facebook',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      ),
      url: '#',
      color: 'bg-blue-600',
      hoverColor: 'hover:bg-blue-700'
    },
    {
      name: 'Instagram',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 6.624 5.367 11.99 11.988 11.99s11.987-5.366 11.987-11.99C24.014 5.367 18.641.001 12.017.001zM8.449 16.988c-1.297 0-2.448-.49-3.323-1.297C4.198 14.895 3.7 13.679 3.7 12.316s.498-2.579 1.426-3.375c.875-.807 2.026-1.297 3.323-1.297s2.448.49 3.323 1.297c.928.796 1.426 2.012 1.426 3.375s-.498 2.579-1.426 3.375c-.875.807-2.026 1.297-3.323 1.297zm8.062-5.25c0 .664-.112 1.309-.328 1.907-.498 1.385-1.73 2.365-3.211 2.581-1.48.216-2.925-.288-3.836-1.298-.911-1.021-1.297-2.396-1.004-3.75.293-1.354 1.309-2.438 2.678-2.843 1.368-.405 2.835-.09 3.836.865 1.001.955 1.48 2.341 1.258 3.726-.056.355-.112.664-.193.973h-.945c.028-.237.056-.474.056-.711 0-1.768-1.426-3.208-3.194-3.208-1.768 0-3.194 1.44-3.194 3.208s1.426 3.208 3.194 3.208c.851 0 1.625-.317 2.227-.835.498-.419.823-.994.938-1.623h-2.757v-1.297h4.166c.028.09.056.216.084.316z"/>
        </svg>
      ),
      url: '#',
      color: 'bg-gradient-to-r from-purple-500 to-pink-500',
      hoverColor: 'hover:from-purple-600 hover:to-pink-600'
    },
    {
      name: 'Twitter',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
        </svg>
      ),
      url: '#',
      color: 'bg-blue-400',
      hoverColor: 'hover:bg-blue-500'
    },
    {
      name: 'YouTube',
      icon: (
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      ),
      url: '#',
      color: 'bg-red-600',
      hoverColor: 'hover:bg-red-700'
    }
  ];

  return (
    <section className="py-20 bg-neutral-50">
      <div className="max-w-6xl px-4 mx-auto sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <h2 className="mb-4 text-4xl font-light text-neutral-800 sm:text-5xl font-display">
            Stay <span className="text-primary-600">Connected</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Follow us on social media for pet care tips and subscribe to our newsletter for the latest updates.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
            className="p-8 bg-white border shadow-sm rounded-2xl border-neutral-200"
          >
            <h3 className="mb-6 text-2xl font-light text-neutral-800 font-display">
              Follow <span className="text-primary-600">Our Journey</span>
            </h3>
            <p className="mb-8 text-neutral-600">
              Join our community of pet lovers and get daily tips, behind-the-scenes content, and updates on new features.
            </p>

            <div className="grid grid-cols-2 gap-4">
              {socialMediaPlatforms.map((platform, index) => (
                <motion.a
                  key={index}
                  href={platform.url}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                  className={`flex items-center justify-center p-4 rounded-xl text-white transition-all duration-300 ${platform.color} ${platform.hoverColor} shadow-md`}
                >
                  <div className="mr-3">
                    {platform.icon}
                  </div>
                  <span className="font-medium">{platform.name}</span>
                </motion.a>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              className="p-4 mt-8 border rounded-lg bg-primary-50 border-primary-100"
            >
              <div className="flex items-center">
                <div className="flex-shrink-0 mr-4">
                  <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-primary-700">
                  <span className="font-medium">25% growth</span> in our community this month! Join us today.
                </p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="p-8 bg-white border shadow-sm rounded-2xl border-neutral-200"
          >
            <h3 className="mb-6 text-2xl font-light text-neutral-800 font-display">
              Pet Care <span className="text-primary-600">Newsletter</span>
            </h3>
            <p className="mb-8 text-neutral-600">
              Get expert tips, product updates, and exclusive content delivered directly to your inbox every week.
            </p>

            {subscribed ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="p-6 text-center border border-green-200 bg-green-50 rounded-xl"
              >
                <svg className="w-16 h-16 mx-auto mb-4 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h4 className="mb-2 text-xl font-medium text-green-800">Thank You for Subscribing!</h4>
                <p className="text-green-600">You'll receive our next pet care tips newsletter soon.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-neutral-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="w-full px-4 py-3 transition-colors duration-300 border rounded-lg border-neutral-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                    placeholder="your.email@example.com"
                  />
                </div>

                <div className="flex items-center">
                  <input
                    id="pet-owner"
                    name="user-type"
                    type="checkbox"
                    className="w-4 h-4 rounded text-primary-600 border-neutral-300 focus:ring-primary-500"
                    defaultChecked
                  />
                  <label htmlFor="pet-owner" className="block ml-3 text-sm text-neutral-700">
                    I'm a pet owner
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    id="terms"
                    name="terms"
                    type="checkbox"
                    required
                    className="w-4 h-4 rounded text-primary-600 border-neutral-300 focus:ring-primary-500"
                  />
                  <label htmlFor="terms" className="block ml-3 text-sm text-neutral-700">
                    I agree to receive pet care tips and updates
                  </label>
                </div>

                <motion.button
                  type="submit"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full px-6 py-4 font-medium text-white transition-all duration-300 rounded-lg shadow-md bg-primary-600 hover:bg-primary-700"
                >
                  Subscribe to Newsletter
                  <svg className="inline-block w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </motion.button>
              </form>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.6 }}
              viewport={{ once: true }}
              className="p-4 mt-8 border rounded-lg bg-secondary-50 border-secondary-200"
            >
              <h4 className="mb-2 font-medium text-secondary-800">What to expect:</h4>
              <ul className="space-y-1 text-sm text-secondary-700">
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Weekly pet care tips from experts
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  New product announcements
                </li>
                <li className="flex items-center">
                  <svg className="w-4 h-4 mr-2 text-secondary-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  Exclusive offers for subscribers
                </li>
              </ul>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default SocialNewsletterSection;