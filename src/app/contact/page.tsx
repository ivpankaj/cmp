import ContactPage from '@/components/Contact'
import HeroSection from '@/mini component/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div>
      <HeroSection
        title={["Contact"]}
        subtitle="Get in Touch with Us"
       
      />
      <ContactPage />
    </div>
  )
}

export default page