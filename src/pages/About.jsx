import React from 'react'
import AboutBanner from '../components/about/AboutBanner'
import OurStory from '../components/about/OurStory'
import TeamShowcase from '../components/about/TeamShowcase'
import ValuesSection from '../components/about/ValuesSection'
import AchievementsSection from '../components/about/AchievementItem'
import Testimonials from '../components/home/Testimonials'
import FinalCTA from '../components/home/FinalCTA'

const About = () => {
  return (
    <div className='pt-16'>
    <AboutBanner />
    <OurStory /> 
    <TeamShowcase />
    <ValuesSection />
    <AchievementsSection />
    <Testimonials />
    <FinalCTA />
    </div>
  )
}

export default About
