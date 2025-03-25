"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { CheckCircle } from "lucide-react"

export function HeroSection() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false)

  return (
    <section className="relative py-20 px-4 md:px-6 lg:px-8">
      <div className="container mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="glass dark:glass-dark p-8 rounded-2xl transform transition-all duration-500 hover:translate-y-[-5px]">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Unlock Business Wisdom with Premium Summaries
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              Get lifetime access to 200+ business book summaries and 20 free business ideas with a one-time payment.
            </p>

            <div className="space-y-4 mb-8">
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                <p>Access 200+ premium business book summaries</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                <p>Get 20 free business ideas with detailed plans</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                <p>Unlock premium business plans for different business sizes</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle className="h-5 w-5 gold-icon mt-0.5 flex-shrink-0" />
                <p>Lifetime access with a one-time payment</p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/signup">
                <Button size="lg" className="w-full sm:w-auto btn-hover">
                  Get Started
                </Button>
              </Link>
              <Link href="/pricing">
                <Button variant="outline" size="lg" className="w-full sm:w-auto btn-hover">
                  View Pricing
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

