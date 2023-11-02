'use client'

import type { Metadata } from 'next'
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
      <body className="">
      <ClerkProvider publishableKey='pk_test_cmlnaHQtY2F0dGxlLTY3LmNsZXJrLmFjY291bnRzLmRldiQ'>
        <ConvexProviderWithClerk client={convex} useAuth={useAuth}>
          <div className="max-w-6xl mx-auto p-4">
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
