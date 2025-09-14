import React from 'react'
import Banner from '../components/home/Banner'
import HowItWorks from '../components/home/HowItWorks'
import FeaturedPets from '../components/home/FeaturedPets'
import ProductShowcase from '../components/home/ProductsShowcase'
import VeterinariansDirectory from '../components/home/VeterinariansDirectory'
import Testimonials from '../components/home/Testimonials'
import FinalCTA from '../components/home/FinalCTA'

const Home = () => {
  return (
    <div className='pt-16'>
    <Banner />
    <HowItWorks />
    <ProductShowcase />
    <FeaturedPets />
    <VeterinariansDirectory />
    <Testimonials />
    <FinalCTA />
    </div>
  )
}

export default Home