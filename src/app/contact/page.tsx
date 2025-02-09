import ContactPage from '@/components/Contact'
import HeroSection from '@/mini component/HeroSection'
import React from 'react'

const page = () => {
  return (
    <div>
            <HeroSection
        title={["Contact"]}
        subtitle="Transform your digital presence with our cutting-edge solutions and premium design aesthetics."
        buttonText1="Show Services"
        buttonText2="Learn More"
      />
         <ContactPage />
    </div>
  )
}

export default page