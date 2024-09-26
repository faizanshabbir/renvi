import type { Metadata } from "next";
import "./globals.css";
import { ClerkProvider } from '@clerk/nextjs';

export const metadata: Metadata = {
  title: "Renvi",
  description: "Home Design Services",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <ClerkProvider appearance={{
            layout: {
              unsafe_disableDevelopmentModeWarnings: true,
            },
        }}>
        <body className="max-w-screen-lg mx-auto">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}