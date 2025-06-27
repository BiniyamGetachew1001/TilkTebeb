import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Package, ChevronRight, BookOpen, FileText, Shield, Lock } from "lucide-react"
import { HeroSection } from "@/components/hero-section"
import { BookCard } from "@/components/book-card"
import { PricingSection } from "@/components/pricing-section"
import { FeatureSection } from "@/components/feature-section"

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <HeroSection />

      {/* Featured Digital Books */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Featured Digital Books</h2>
              <p className="text-muted-foreground mt-2">Discover premium books with secure, download-free reading</p>
            </div>
            <Link href="/books" className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-1">
                <BookOpen className="h-4 w-4" />
                View all books <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            <BookCard
              id="zero-to-one"
              title="Zero to One"
              author="Peter Thiel"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Entrepreneurship"
              rating={4.8}
              price={12.99}
            />
            <BookCard
              id="good-to-great"
              title="Good to Great"
              author="Jim Collins"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Leadership"
              rating={4.7}
              price={11.99}
            />
            <BookCard
              id="lean-startup"
              title="The Lean Startup"
              author="Eric Ries"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Startup"
              rating={4.6}
              price={10.99}
            />
            <BookCard
              id="atomic-habits"
              title="Atomic Habits"
              author="James Clear"
              coverUrl="/placeholder.svg?height=240&width=180"
              category="Productivity"
              rating={4.9}
              price={13.99}
            />
          </div>
        </div>
      </section>

      {/* Book Bundles Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-center mb-8">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Book Bundles</h2>
              <p className="text-muted-foreground mt-2">Curated collections at special bundle prices</p>
            </div>
            <Link href="/bundles" className="mt-4 md:mt-0">
              <Button variant="outline" className="gap-1">
                <Package className="h-4 w-4" />
                View all bundles <ChevronRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="glass dark:glass-dark p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Business Essentials</h3>
                  <p className="text-sm text-muted-foreground">3 books</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Master business fundamentals with essential reads on strategy, leadership, and growth.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground line-through">$35.97</span>
                  <span className="text-xl font-bold text-primary">$24.99</span>
                </div>
                <Button size="sm">View Bundle</Button>
              </div>
            </div>

            <div className="glass dark:glass-dark p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Self-Development</h3>
                  <p className="text-sm text-muted-foreground">3 books</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Transform your life with proven strategies for personal growth and productivity.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground line-through">$38.97</span>
                  <span className="text-xl font-bold text-primary">$27.99</span>
                </div>
                <Button size="sm">View Bundle</Button>
              </div>
            </div>

            <div className="glass dark:glass-dark p-6 rounded-xl border border-white/10">
              <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-primary/10 rounded-lg">
                  <Package className="h-6 w-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold">Startup Founders</h3>
                  <p className="text-sm text-muted-foreground">3 books</p>
                </div>
              </div>
              <p className="text-sm text-muted-foreground mb-4">
                Everything you need to build and scale a successful startup from idea to IPO.
              </p>
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="text-sm text-muted-foreground line-through">$41.97</span>
                  <span className="text-xl font-bold text-primary">$29.99</span>
                </div>
                <Button size="sm">View Bundle</Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Security & Trust Section */}
      <section className="py-12 px-4 md:px-6 lg:px-8 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight mb-4">Secure Digital Reading</h2>
          <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
            Experience premium books with complete security - no downloads, no piracy, just pure reading enjoyment
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="glass dark:glass-dark p-6 rounded-xl">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Shield className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">100% Secure</h3>
              <p className="text-sm text-muted-foreground">
                Advanced encryption and secure reading environment protect both readers and authors
              </p>
            </div>

            <div className="glass dark:glass-dark p-6 rounded-xl">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <Lock className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">No Downloads</h3>
              <p className="text-sm text-muted-foreground">
                Read directly in your browser with our advanced reader - no files to manage
              </p>
            </div>

            <div className="glass dark:glass-dark p-6 rounded-xl">
              <div className="p-3 bg-primary/10 rounded-full w-fit mx-auto mb-4">
                <BookOpen className="h-8 w-8 text-primary" />
              </div>
              <h3 className="font-semibold mb-2">Premium Experience</h3>
              <p className="text-sm text-muted-foreground">
                Customizable reading settings, progress tracking, and seamless cross-device sync
              </p>
            </div>
          </div>
        </div>
      </section>

      <PricingSection />
      <FeatureSection />
    </div>
  )
}

