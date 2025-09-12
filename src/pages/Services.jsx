import React from 'react'
import ServicesBanner from '../components/services/ServicesBanner'
import ServicesGrid from '../components/services/ServicesGrid'
import ValueProposition from '../components/services/ValueProposition'
import FinalCTA from '../components/home/FinalCTA'

const Services = () => {
  return (
   <div className='pt-16'>
      <ServicesBanner />
      <ServicesGrid />
      <ValueProposition />
      <FinalCTA />
    </div>
  )
}

export default Services
