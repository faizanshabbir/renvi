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
        <div className="mt-4 flex justify-end items-center ml-auto" style={{ marginLeft: 'auto', marginRight: '30%' }}> {/* Adjusted to right align with some margin */}
            <div className="flex space-x-4"> {/* Added a wrapper for buttons */}
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
        </div>
        {children}
      </div>
    );
  }