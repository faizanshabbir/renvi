import ClerkLayout from "@/components/clerkylayout";
import PricingComponent from "@/components/pricing"
import { PricingTiersComponent } from "@/components/pricingtiers"
import { HeaderComponent } from '@/components/header'
import { HeroComponent } from '@/components/hero'
import { FeaturesComponent } from '@/components/features'
import { HowItWorksComponent } from '@/components/howitworks'
import { StylesShowcaseComponent } from '@/components/stylesshowcase'
import { TestimonialsComponent } from '@/components/testimonials'
import { CallToActionComponent } from '@/components/calltoaction'
import { FooterComponent } from '@/components/footer'

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeaderComponent />
      <main>
        <HeroComponent />
        <FeaturesComponent />
        <HowItWorksComponent />
        <StylesShowcaseComponent />
        <TestimonialsComponent />
        <PricingTiersComponent/>
        <CallToActionComponent />
      </main>
      <FooterComponent />
    </div>
  );
}