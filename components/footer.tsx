'use client'

import Link from 'next/link'

export function FooterComponent() {
  return (
    <footer className="bg-background py-8">
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="mb-4 md:mb-0">
            <Link href="/" className="text-2xl font-bold text-primary">
              Renvi
            </Link>
            <p className="text-muted-foreground mt-2">Reimagine your space with AI</p>
          </div>
          <nav>
            <ul className="flex flex-wrap justify-center md:justify-end space-x-6">
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Terms of Service</Link></li>
              <li><Link href="#" className="text-muted-foreground hover:text-primary">Contact Us</Link></li>
            </ul>
          </nav>
        </div>
        <div className="mt-8 text-center text-muted-foreground">
          &copy; {new Date().getFullYear()} Renvi. All rights reserved.
        </div>
      </div>
    </footer>
  )
}