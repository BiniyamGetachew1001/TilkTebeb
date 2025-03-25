import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Briefcase, ChevronRight } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { BookCard } from "@/components/book-card"
import { PricingSection } from "@/components/pricing-section"
import { FeatureSection } from "@/components/feature-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Book Summaries */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Book Summaries</h2>
              <p className="text-muted-foreground mt-2">Unlock 200+ premium business book summaries</p>
            </div>
            <Link href="/books" className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <BookCard
              title="Zero to One"
              author="Peter Thiel"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Entrepreneurship"
              rating={4.8}
            />
            <BookCard
              title="Good to Great"
              author="Jim Collins"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Leadership"
              rating={4.7}
            />
            <BookCard
              title="The Lean Startup"
              author="Eric Ries"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Startup"
              rating={4.6}
            />
            <BookCard
              title="Atomic Habits"
              author="James Clear"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Productivity"
              rating={4.9}
            />
          </div>
        </div>
      </section>

      {/* Business Plans Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Premium Business Plans</h2>
              <p className="text-muted-foreground mt-2">Detailed business plans for different business sizes</p>
            </div>
            <Link href="/business-plans" className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-1">
                View all <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Small Business</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Perfect for solopreneurs and small teams looking to start a business with minimal investment.
                </p>
                <div className="mt-auto">
                  <Link href="/business-plans/small">
                    <Button className="w-full">Explore Plans</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Medium Business</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Comprehensive plans for growing businesses looking to scale operations and increase market share.
                </p>
                <div className="mt-auto">
                  <Link href="/business-plans/medium">
                    <Button className="w-full">Explore Plans</Button>
                  </Link>
                </div>
              </div>
            </div>

            <div className="rounded-lg border bg-card text-card-foreground shadow-sm hover:shadow-md transition-shadow">
              <div className="p-6 flex flex-col h-full">
                <div className="flex items-center gap-2 mb-4">
                  <Briefcase className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Large Business</h3>
                </div>
                <p className="text-muted-foreground mb-6">
                  Enterprise-level business plans for established companies seeking expansion and optimization.
                </p>
                <div className="mt-auto">
                  <Link href="/business-plans/large">
                    <Button className="w-full">Explore Plans</Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      <FeatureSection />
    </div>
  )
}

