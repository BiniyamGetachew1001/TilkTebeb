"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Check, Shield, Lock, BookOpen } from "lucide-react"
import { SecurityBadge } from "@/components/security-badge"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass dark:glass-dark p-8 rounded-2xl transform transition-all duration-500 hover:translate-y-[-5px]">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Secure Digital Books, <br />No Downloads Required
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Discover and purchase premium digital books with our secure reading platform. Complete protection for authors, seamless experience for readers.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-2">
                <Shield className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p>100% secure reading - no downloads, complete protection</p>
              </div>
              <div className="flex items-start gap-2">
                <BookOpen className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p>Premium digital books with advanced reader features</p>
              </div>
              <div className="flex items-start gap-2">
                <Lock className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p>Anti-piracy technology protects authors' work</p>
              </div>
              <div className="flex items-start gap-2">
                <Check className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                <p>30-day money-back guarantee</p>
              </div>
            </div>

            <div className="flex flex-wrap gap-2 mb-8">
              <SecurityBadge type="ssl" size="sm" />
              <SecurityBadge type="secure" size="sm" />
              <SecurityBadge type="guarantee" size="sm" />
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/books">
                <Button size="lg" className="w-full sm:w-auto btn-hover">
                  Browse Books
                </Button>
              </Link>
              <Link href="/bundles">
                <Button variant="outline" size="lg" className="w-full sm:w-auto btn-hover">
                  View Bundles
                </Button>
              </Link>
            </div>
          </div>

          <div className="relative aspect-video glass dark:glass-dark rounded-2xl overflow-hidden border border-white/20 shadow-lg card-3d">
            {isVideoPlaying ? (
              <iframe
                className="absolute inset-0 w-full h-full"
                src="about:blank" // Replace with your actual video embed URL
                title="TILkTBEB Introduction"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=400&width=600"
                  alt="TILkTBEB Platform Preview"
                  className="w-full h-full object-cover"
                />
                <Button
                  variant="default"
                  size="lg"
                  className="absolute btn-hover btn-glow"
                  onClick={() => setIsVideoPlaying(true)}
                >
                  Watch Demo
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

