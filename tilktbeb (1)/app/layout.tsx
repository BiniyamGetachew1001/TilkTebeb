import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { Sidebar } from "@/components/sidebar"
import { OfflineDetector } from "@/components/offline-detector"
import { Toaster } from "@/components/ui/toaster"
import { ParticlesBackground } from "@/components/particles-background"
import { ErrorBoundary } from "@/components/error-boundary"
import { SkipLinks } from "@/components/accessibility/skip-links"
import { PerformanceMonitor } from "@/components/performance-monitor"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "Astewai - Secure Digital Book Platform",
  description: "Discover and purchase digital books securely. Read premium books online with our advanced reader - no downloads, complete protection.",
  manifest: "/manifest.json",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning className={inter.variable}>
      <head>
        <link rel="apple-touch-icon" href="/placeholder-logo.png" />
        <meta name="theme-color" content="#B1732E" />
      </head>
      <body className="font-sans">
        <ErrorBoundary showDetails={true}>
          <SkipLinks />
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <ParticlesBackground />
            <div className="flex flex-col min-h-screen">
              <Sidebar />
              <div className="lg:ml-[70px] transition-all duration-300 ease-in-out flex-1 flex flex-col">
                <Navbar showFullNav={false} />
                <OfflineDetector />
                <main id="main-content" className="flex-1" tabIndex={-1}>
                  {children}
                </main>
                <Footer />
              </div>
            </div>
            <Toaster />
            <PerformanceMonitor />
          </ThemeProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}



import './globals.css'