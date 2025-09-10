import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData = [
    {
      question: "How do I create a pet profile?",
      answer: "To create a pet profile, log into your account, go to 'My Pets' in the dashboard, and click 'Add New Pet'. You'll need to provide basic information like name, species, breed, and age. You can also upload photos and medical records."
    },
    {
      question: "Can I book appointments with veterinarians through FurShield?",
      answer: "Yes, you can browse our network of verified veterinarians, view their availability, and book appointments directly through the platform. You'll receive confirmation and reminders for your appointments."
    },
    {
      question: "How do I track my pet's vaccination schedule?",
      answer: "Once you've added your pet's vaccination records, our system will automatically track due dates and send you reminders via email and in-app notifications. You can also view the complete vaccination timeline in your pet's profile."
    },
    {
      question: "Is my pet's medical information secure?",
      answer: "Yes, we take data security seriously. All medical information is encrypted and stored securely. You control who can access your pet's records, and we comply with all relevant data protection regulations."
    },
    {
      question: "How can animal shelters use FurShield?",
      answer: "Shelters can create profiles for adoptable pets, manage medical records, coordinate with veterinary partners, and communicate with potential adopters. The platform helps streamline shelter operations and improve pet adoption rates."
    },
    {
      question: "Are there costs associated with using FurShield?",
      answer: "Basic pet owner accounts are free. Premium features and veterinary practice accounts may have subscription fees. Animal shelters often qualify for discounted or free access depending on their size and status."
    },
    {
      question: "How do I reset my password?",
      answer: "Click on 'Forgot Password' on the login page, enter your email address, and we'll send you a link to reset your password. If you're still having trouble, contact our support team for assistance."
    },
    {
      question: "Can I manage multiple pets on one account?",
      answer: "Yes, you can add and manage as many pets as you need from a single account. Each pet will have their own profile with separate medical records, appointment schedules, and reminders."
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
            Frequently Asked <span className="text-primary-600">Questions</span>
          </h2>
          <p className="max-w-2xl mx-auto text-lg text-neutral-600">
            Find answers to common questions about FurShield and how it can help you provide the best care for your pets.
          </p>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          {faqData.map((faq, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="mb-4 overflow-hidden bg-white border rounded-lg border-neutral-200"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="flex items-center justify-between w-full px-6 py-5 text-left focus:outline-none"
              >
                <span className="text-lg font-medium text-neutral-800">{faq.question}</span>
                <svg
                  className={`w-5 h-5 text-primary-600 transition-transform duration-300 ${activeIndex === index ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              <AnimatePresence>
                {activeIndex === index && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                    className="overflow-hidden"
                  >
                    <div className="px-6 pb-5">
                      <p className="text-neutral-600">{faq.answer}</p>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-6 text-neutral-600">
            Still have questions? We're here to help!
          </p>
          <a
            href="#contact-form"
            className="inline-flex items-center px-6 py-3 font-medium text-white transition-colors duration-300 rounded-lg bg-primary-600 hover:bg-primary-700"
          >
            Contact Support
            <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
};

export default FAQSection;