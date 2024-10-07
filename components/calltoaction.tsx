'use client'

import { Button } from '@/components/ui/button'

export function CallToActionComponent() {
  return (
    <section className="py-20 bg-primary text-white">
      <div className="container mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Space?</h2>
        <p className="text-xl mb-8">Join thousands of happy users and start reimagining your home today.</p>
        <Button size="lg" variant="secondary">Get Started for Free</Button>
      </div>
    </section>
  )
}