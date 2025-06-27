"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Search, Package, Star, ShoppingCart, BookOpen } from "lucide-react"
import type { BookBundle } from "@/types/book"

// Mock data for book bundles
const mockBundles: BookBundle[] = [
  {
    id: "business-essentials",
    title: "Business Essentials Pack",
    description: "Master the fundamentals of business with these essential reads covering strategy, leadership, and growth.",
    coverUrl: "/placeholder.svg?height=300&width=240",
    books: [
      { id: "good-to-great", title: "Good to Great", author: "Jim Collins", coverUrl: "/placeholder.svg", category: "Leadership", rating: 4.7, price: 12.99 },
      { id: "zero-to-one", title: "Zero to One", author: "Peter Thiel", coverUrl: "/placeholder.svg", category: "Entrepreneurship", rating: 4.8, price: 11.99 },
      { id: "lean-startup", title: "The Lean Startup", author: "Eric Ries", coverUrl: "/placeholder.svg", category: "Startup", rating: 4.6, price: 10.99 },
    ],
    originalPrice: 35.97,
    bundlePrice: 24.99,
    savings: 10.98,
    category: "Business"
  },
  {
    id: "self-development",
    title: "Self-Development Mastery",
    description: "Transform your life with proven strategies for personal growth, productivity, and success.",
    coverUrl: "/placeholder.svg?height=300&width=240",
    books: [
      { id: "atomic-habits", title: "Atomic Habits", author: "James Clear", coverUrl: "/placeholder.svg", category: "Productivity", rating: 4.9, price: 13.99 },
      { id: "mindset", title: "Mindset", author: "Carol Dweck", coverUrl: "/placeholder.svg", category: "Psychology", rating: 4.5, price: 11.99 },
      { id: "7-habits", title: "7 Habits of Highly Effective People", author: "Stephen Covey", coverUrl: "/placeholder.svg", category: "Self-Help", rating: 4.6, price: 12.99 },
    ],
    originalPrice: 38.97,
    bundlePrice: 27.99,
    savings: 10.98,
    category: "Self-Development"
  },
  {
    id: "startup-founders",
    title: "Startup Founders Collection",
    description: "Everything you need to know about building and scaling a successful startup from idea to IPO.",
    coverUrl: "/placeholder.svg?height=300&width=240",
    books: [
      { id: "hard-things", title: "The Hard Thing About Hard Things", author: "Ben Horowitz", coverUrl: "/placeholder.svg", category: "Startup", rating: 4.7, price: 14.99 },
      { id: "blitzscaling", title: "Blitzscaling", author: "Reid Hoffman", coverUrl: "/placeholder.svg", category: "Growth", rating: 4.4, price: 13.99 },
      { id: "venture-deals", title: "Venture Deals", author: "Brad Feld", coverUrl: "/placeholder.svg", category: "Finance", rating: 4.3, price: 12.99 },
    ],
    originalPrice: 41.97,
    bundlePrice: 29.99,
    savings: 11.98,
    category: "Startup"
  }
]

export default function BundlesPage() {
  const [bundles, setBundles] = useState<BookBundle[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setBundles(mockBundles)
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredBundles = bundles.filter(bundle =>
    bundle.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bundle.category.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const handlePurchaseBundle = (bundleId: string) => {
    console.log(`Purchase bundle ${bundleId}`)
    // Handle bundle purchase logic here
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Book Bundles</h1>
          <p className="text-muted-foreground">Curated collections of premium books at special bundle prices</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search bundles..."
              className="w-full pl-8 rounded-full bg-card border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-6">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBundles.map((bundle) => (
              <Card key={bundle.id} className="book-card overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                <div className="aspect-[4/3] relative overflow-hidden rounded-t-xl">
                  <img
                    src={bundle.coverUrl}
                    alt={`${bundle.title} bundle cover`}
                    className="object-cover w-full h-full transition-transform duration-500"
                  />
                  <div className="absolute top-2 right-2 glass dark:glass-dark text-secondary text-xs px-2 py-1 rounded-full">
                    {bundle.category}
                  </div>
                  <div className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
                    {bundle.books.length} Books
                  </div>
                </div>
                
                <CardHeader className="pb-4">
                  <CardTitle className="line-clamp-1 group-hover:text-primary transition-colors">{bundle.title}</CardTitle>
                  <p className="text-sm text-muted-foreground line-clamp-2">{bundle.description}</p>
                </CardHeader>

                <CardContent className="pb-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <BookOpen className="h-4 w-4" />
                      <span>Includes {bundle.books.length} premium books</span>
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className="text-sm text-muted-foreground line-through">
                          ${bundle.originalPrice.toFixed(2)}
                        </span>
                        <span className="text-2xl font-bold text-primary">
                          ${bundle.bundlePrice.toFixed(2)}
                        </span>
                      </div>
                      <Badge variant="secondary" className="bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100">
                        Save ${bundle.savings.toFixed(2)}
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-1">
                      {bundle.books.slice(0, 3).map((book) => (
                        <div key={book.id} className="text-center">
                          <img
                            src={book.coverUrl}
                            alt={book.title}
                            className="w-full aspect-[3/4] object-cover rounded-sm mb-1"
                          />
                          <p className="text-xs text-muted-foreground line-clamp-1">{book.title}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>

                <CardFooter className="pt-0">
                  <Button 
                    className="w-full gap-2" 
                    onClick={() => handlePurchaseBundle(bundle.id)}
                  >
                    <ShoppingCart className="h-4 w-4" />
                    Buy Bundle
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredBundles.length === 0 && (
            <div className="text-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No bundles found matching your search criteria.</p>
            </div>
          )}
        </>
      )}
    </div>
  )
}
