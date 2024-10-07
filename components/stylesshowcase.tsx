'use client'

import Image from 'next/image'

export function StylesShowcaseComponent() {
  const styles = [
    { name: "Modern", image: "/placeholder.svg?height=300&width=400" },
    { name: "Rustic", image: "/placeholder.svg?height=300&width=400" },
    { name: "Bohemian", image: "/placeholder.svg?height=300&width=400" },
    { name: "Minimalist", image: "/placeholder.svg?height=300&width=400" }
  ]

  return (
    <section id="styles" className="py-20 bg-background">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Explore Different Styles</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {styles.map((style, index) => (
            <div key={index} className="relative group">
              <Image
                src={style.image}
                alt={`${style.name} style room`}
                width={400}
                height={300}
                className="rounded-lg shadow-md transition-transform group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                <span className="text-white text-xl font-semibold">{style.name}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}