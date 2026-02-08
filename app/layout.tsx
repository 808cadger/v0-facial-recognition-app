import React from "react"
import type { Metadata, Viewport } from 'next'
import { DM_Sans, Space_Mono } from 'next/font/google'

import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
const spaceMono = Space_Mono({ subsets: ['latin'], weight: ['400', '700'], variable: '--font-space-mono' })

export const metadata: Metadata = {
  title: 'GlowAI - AI Skin Analysis',
  description: 'Get personalized skin analysis, food recommendations, skincare routines, and care suggestions powered by AI. Just take a selfie.',
  generator: 'v0.app',
}

export const viewport: Viewport = {
  themeColor: '#4a9e82',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`${dmSans.variable} ${spaceMono.variable} font-sans antialiased min-h-screen bg-background text-foreground`}>{children}</body>
    </html>
  )
}
