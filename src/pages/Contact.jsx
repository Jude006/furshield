import React from 'react'
import ContactBanner from '../components/contact/ContactBanner'
import ContactFormSection from '../components/contact/ContactFormSection'
import TeamShowcase from '../components/about/TeamShowcase'
import FAQSection from '../components/contact/FAQSection'
import LocationMap from '../components/contact/LocationMap'
import SocialNewsletterSection from '../components/contact/SocialNewsletterSection'

const Contact = () => {
  return (
     <div className='pt-16'>
      <ContactBanner />
      <ContactFormSection />
      <TeamShowcase />
      <FAQSection />
      <LocationMap />
      <SocialNewsletterSection />
    </div>
  )
}

export default Contact
