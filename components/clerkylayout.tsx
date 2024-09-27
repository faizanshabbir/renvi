import {
    SignInButton,
    SignUpButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
  import { Button } from "@/components/ui/button"

  
  export default function ClerkLayout({ children }: { children: React.ReactNode }) {
    return (
      <div>
        <div className="mt-4 flex justify-end space-x-4">
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
                <UserButton />
            </SignedIn>
        </div>
        {children}
      </div>
    );
  }