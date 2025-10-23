import { HeroSection } from '@/components/HeroSection'
import { ServicesSection } from '@/components/ServicesSection'
import { FeaturesSection } from '@/components/FeaturesSection'
import { AIDemo } from '@/components/AIDemo'
import { PricingSection } from '@/components/PricingSection'
import { TestimonialsSection } from '@/components/TestimonialsSection'
import { CTASection } from '@/components/CTASection'
import { StatsSection } from '@/components/StatsSection'

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsSection />
      <ServicesSection />
      <FeaturesSection />
      <AIDemo />
      <PricingSection />
      <TestimonialsSection />
      <CTASection />
    </>
  )
}
