import React from 'react'
import Header from './Header'
import Home from './Home'
import Footer from './Footer'
import Resources from './Resources'
import Loans from './Loans'
import AboutUs from './AboutUs'
import ContactUs from './ContactUs'
import Blog from './Blog'
import ScrollToTop from '../comman/ScrollToTop'

const Landing = () => {
  return (
    <div className='micro_landingpage'>
      <Header />
      <Home />
      <Loans />
      <AboutUs />
      <Resources />
      <Blog />
      <ContactUs />
      <Footer />
      {/* scroll to top */}
      <ScrollToTop />
    </div>
  )
}

export default Landing
