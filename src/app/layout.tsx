'use client'

import './globals.css'
import Header from '@/components/layout/header'
import Footer from '@/components/layout/footer'

import { ClerkProvider, useAuth } from "@clerk/clerk-react";
import { ConvexProviderWithClerk } from "convex/react-clerk";
import { ConvexReactClient } from 'convex/react'

const convex = new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <title>The Sky Is Fake</title>
        <meta name="description" content="The sky is fake. Everyone knows it. We can stop pretending now." />
        <link rel="icon" href='/favicon.ico' />
      </head>
      <body className="">
      <ClerkProvider publishableKey={process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY as string}>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <div className="bg-[#f5f5f5]">
            <Header />
            {children}
            <Footer />
          </div>
        </ConvexProviderWithClerk>
      </ClerkProvider>
      </body>
    </html>
  )
}
