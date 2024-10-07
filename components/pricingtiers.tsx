'use client'

import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

export function PricingTiersComponent() {
  const tiers = [
    {
      name: "Basic",
      price: "$9.99",
      description: "Perfect for individuals looking to reimagine their living spaces",
      features: [
        "5 room redesigns per month",
        "Access to basic design templates",
        "24-hour turnaround time",
        "Email support",
      ],
    },
    {
      name: "Pro",
      price: "$24.99",
      description: "Ideal for homeowners and interior design enthusiasts",
      features: [
        "15 room redesigns per month",
        "Access to premium design templates",
        "12-hour turnaround time",
        "Home exterior redesigns",
        "Priority email and chat support",
      ],
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For professional designers and real estate agencies",
      features: [
        "Unlimited room redesigns",
        "Custom design templates",
        "4-hour turnaround time",
        "Home exterior and landscape redesigns",
        "Virtual staging for real estate",
        "Dedicated account manager",
        "API access for integration",
      ],
    },
  ]

  return (
    <section id="pricing">
    <div className="py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="sm:flex sm:flex-col sm:align-center">
          <h1 className="text-5xl font-extrabold text-gray-900 sm:text-center">Pricing Plans</h1>
          <p className="mt-5 text-xl text-gray-500 sm:text-center">
            Choose the perfect plan for your virtual design needs
          </p>
        </div>
        <div className="mt-12 space-y-4 sm:mt-16 sm:space-y-0 sm:grid sm:grid-cols-2 sm:gap-6 lg:max-w-4xl lg:mx-auto xl:max-w-none xl:mx-0 xl:grid-cols-3">
          {tiers.map((tier) => (
            <Card key={tier.name} className="flex flex-col justify-between">
              <CardHeader>
                <CardTitle className="text-2xl font-semibold">{tier.name}</CardTitle>
                <CardDescription className="mt-4 text-4xl font-extrabold">{tier.price}</CardDescription>
                <p className="mt-6 text-gray-500">{tier.description}</p>
              </CardHeader>
              <CardContent>
                <ul className="mt-6 space-y-4">
                  {tier.features.map((feature) => (
                    <li key={feature} className="flex">
                      <Check className="flex-shrink-0 w-6 h-6 text-green-500" />
                      <span className="ml-3 text-gray-500">{feature}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Button className="w-full" variant={tier.name === "Pro" ? "default" : "outline"}>
                  {tier.name === "Enterprise" ? "Contact Sales" : "Get Started"}
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </div>
    </div>
    </section>
  )
}