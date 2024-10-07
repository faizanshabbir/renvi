'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function HeroComponent() {
  return (
    <section className="bg-primary from-primary to-primary-foreground text-white py-20">
      <div className="container mx-auto flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Reimagine Your Space with AI</h1>
          <p className="text-xl mb-8">Transform your home with our AI-powered virtual designer. Upload a photo and explore endless style possibilities.</p>
          <Button size="lg" variant="secondary">Try It Now</Button>
        </div>
        <div className="md:w-1/2">
          <Image
            src="/test.jpg"
            alt="AI-powered room transformation"
            width={600}
            height={400}
            className="rounded-lg shadow-lg"
          />
        </div>
      </div>
    </section>
  )
}