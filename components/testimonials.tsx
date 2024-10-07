'use client'

import Image from 'next/image'

export function TestimonialsComponent() {
  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Interior Designer",
      quote: "Renvi has revolutionized the way I present design concepts to my clients. It's an invaluable tool for any designer.",
      avatar: "/placeholder.svg?height=64&width=64"
    },
    {
      name: "Mike Thompson",
      role: "Homeowner",
      quote: "I was skeptical at first, but Renvi helped me visualize my home renovation perfectly. It saved me time and money!",
      avatar: "/placeholder.svg?height=64&width=64"
    }
  ]

  return (
    <section id="testimonials" className="py-20 bg-muted">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">What Our Users Say</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-background p-6 rounded-lg shadow-md">
              <p className="text-lg mb-4">"{testimonial.quote}"</p>
              <div className="flex items-center">
                <Image
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  width={64}
                  height={64}
                  className="rounded-full mr-4"
                />
                <div>
                  <h3 className="font-semibold">{testimonial.name}</h3>
                  <p className="text-muted-foreground">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}