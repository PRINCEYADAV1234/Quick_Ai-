import React from 'react'
import Navbar from '../component/Navbar'
import Hero from '../component/Hero'
import AiTools from '../component/AiTools'
import Testimonial from '../component/Testimonial'
import { Plane } from 'lucide-react'
import CTA from '../component/CTA'

import Plans from '../component/Plans'
import Footer from '../component/Footer'

export default function Home() {
  return (
    <>
    <Navbar />
    <Hero />
    <AiTools />
    <Testimonial />
    <CTA />
    <Plans />
    <Footer />
    </>
  )
}
