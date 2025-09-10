import React from 'react'
import ContactBanner from '../components/contact/ContactBanner'
import ContactFormSection from '../components/contact/ContactFormSection'
import TeamShowcase from '../components/about/TeamShowcase'
import FAQSection from '../components/contact/FAQSection'
import LocationMap from '../components/contact/LocationMap'
import SocialNewsletterSection from '../components/contact/SocialNewsletterSection'
import ChatBot from '../components/common/Chatbot'

const Contact = () => {
  return (
     <div className='pt-16'>
      <ContactBanner />
      <ContactFormSection />
      <TeamShowcase />
      <FAQSection />
      <LocationMap />
      <SocialNewsletterSection />
      <ChatBot />
    </div>
  )
}

export default Contact


// Contact Banner (designed above)

// Contact Form Section (with fields for name, email, subject, message, and user type)

// Team Members Section (with photos and roles of key team members)

// FAQ Section (common questions about your services)

// Live Chat Option (AI-powered chatbot as mentioned in requirements)

// Location Map (using Google Maps API as specified)

// Social Media Links (connections to your platforms)

// Newsletter Signup (for updates and pet care tips)