import React from 'react'
import type { Metadata } from 'next'
// import Header from '@/components/custom/Header'
export const metadata: Metadata = {
  title: {
    template: '%s | My Blog',
    default: 'My Blog'
  },
  description: 'Explore articles about technology, programming, and digital life',
}

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
    {/* <Header /> */}
    <div className="min-h-screen bg-slate-400">

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </div>

      {/* <Footer /> */}
    </div>
    </>
  )
} 