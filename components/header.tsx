'use client'

import {
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton
} from '@clerk/nextjs';
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import ClerkLayout from "@/components/clerkylayout";
import { useAuth } from '@clerk/nextjs'; // Import the useAuth hook

export function HeaderComponent() {
  const { isSignedIn } = useAuth(); // Get the authentication status

  return (
    <header className="bg-background py-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold text-primary">
          Renvi
        </Link>
        <nav className="flex space-x-6">
            <Link href="#features" className="text-muted-foreground hover:text-primary">Features</Link>
            <Link href="#how-it-works" className="text-muted-foreground hover:text-primary">How It Works</Link>
            <Link href="#styles" className="text-muted-foreground hover:text-primary">Styles</Link>
            <Link href="#testimonials" className="text-muted-foreground hover:text-primary">Testimonials</Link>
            <Link href="#pricing" className="text-muted-foreground hover:text-primary">Pricing</Link>
        </nav>
        <div className="flex space-x-4"> {/* Moved Clerk buttons outside of nav */}
            <SignedOut>
                <SignInButton>
                    <Button>
                        Sign In
                    </Button>
                </SignInButton>
                <SignUpButton>
                    <Button>
                        Sign Up
                    </Button>
                </SignUpButton>
            </SignedOut>
            <SignedIn>
                <Link href="/dashboard" className="text-primary">
                  <Button>
                    Dashboard
                  </Button>
                </Link>
                <UserButton />
            </SignedIn>
        </div>
      </div>
    </header>
  )
}