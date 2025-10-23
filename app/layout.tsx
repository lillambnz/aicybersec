import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Navigation } from '@/components/Navigation'
import { Footer } from '@/components/Footer'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'AI CyberSec - Advanced AI-Powered Cybersecurity Solutions',
  description: 'Cutting-edge AI cybersecurity services protecting your digital assets with machine learning, threat intelligence, and automated security solutions.',
  keywords: 'AI cybersecurity, machine learning security, threat detection, penetration testing, security consulting, AI threat intelligence',
  authors: [{ name: 'AI CyberSec' }],
  openGraph: {
    title: 'AI CyberSec - Advanced AI-Powered Cybersecurity Solutions',
    description: 'Protect your business with next-generation AI cybersecurity',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className="dark">
      <body className={inter.className}>
        <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950">
          <Navigation />
          <main>{children}</main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
