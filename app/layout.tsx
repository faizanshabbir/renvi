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
        <head>
          <script
            async
            src="https://js.stripe.com/v3/pricing-table.js">
          </script>
        </head>
        <body className="max-w-screen-xl mx-auto">
          {children}
        </body>
      </ClerkProvider>
    </html>
  );
}