'use client'

import { Camera, PaintBucket, Zap } from 'lucide-react'

export function FeaturesComponent() {
  const features = [
    {
      icon: <Camera className="h-10 w-10 text-primary" />,
      title: "Easy Upload",
      description: "Simply upload a photo of your room or home exterior to get started."
    },
    {
      icon: <PaintBucket className="h-10 w-10 text-primary" />,
      title: "Multiple Styles",
      description: "Explore various design styles like rustic, bohemian, modern, and more."
    },
    {
      icon: <Zap className="h-10 w-10 text-primary" />,
      title: "Instant Results",
      description: "Get AI-generated designs in seconds, no waiting required."
    }
  ]

  return (
    <section id="features" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              {feature.icon}
              <h3 className="text-xl font-semibold mt-4 mb-2">{feature.title}</h3>
              <p className="text-muted-foreground">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}