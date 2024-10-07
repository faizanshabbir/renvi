'use client'

import { Upload, Palette, Download } from 'lucide-react'

export function HowItWorksComponent() {
  const steps = [
    {
      icon: <Upload className="h-12 w-12 text-primary" />,
      title: "Upload Your Photo",
      description: "Take a picture of your room or home exterior and upload it to our platform."
    },
    {
      icon: <Palette className="h-12 w-12 text-primary" />,
      title: "Choose Your Style",
      description: "Select from a variety of design styles or create your own custom look."
    },
    {
      icon: <Download className="h-12 w-12 text-primary" />,
      title: "Get Your Design",
      description: "Receive AI-generated designs and visualize your space in a new style."
    }
  ]

  return (
    <section id="how-it-works" className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">How It Works</h2>
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center">
          {steps.map((step, index) => (
            <div key={index} className="flex flex-col items-center text-center mb-8 md:mb-0 md:w-1/3">
              <div className="bg-background rounded-full p-4 mb-4">
                {step.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
              <p className="text-muted-foreground">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}