import {
    ClerkProvider,
    SignInButton,
    SignedIn,
    SignedOut,
    UserButton
  } from '@clerk/nextjs';
  
  export default function ClerkLayout({ children }: { children: React.ReactNode }) {
    return (
      <ClerkProvider>
        <SignedOut>
          <SignInButton />
        </SignedOut>
        <SignedIn>
          <UserButton />
          {children}
        </SignedIn>
      </ClerkProvider>
    );
  }