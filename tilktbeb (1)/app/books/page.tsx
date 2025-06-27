"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { BookCard } from "@/components/book-card"
import { Search, Gift, Filter } from "lucide-react"
import { api, handleApiError } from "@/lib/api"
import type { BookPreview } from "@/types/book"
import { ComponentErrorBoundary } from "@/components/error-boundary"

export default function BooksPage() {
  const [searchQuery, setSearchQuery] = useState("")
  const [activeCategory, setActiveCategory] = useState("all")
  const [priceFilter, setPriceFilter] = useState<"all" | "free" | "paid">("all")
  const [books, setBooks] = useState<BookPreview[]>([])
  const [filteredBooks, setFilteredBooks] = useState<BookPreview[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Fetch books from API
  useEffect(() => {
    const fetchBooks = async () => {
      try {
        setIsLoading(true)
        const data = await api.getBooks()
        setBooks(data)
        setFilteredBooks(data)
      } catch (err) {
        setError(handleApiError(err))
        console.error("Error fetching books:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchBooks()
  }, [])

  // Filter books based on search query, active category, and price filter
  useEffect(() => {
    let result = [...books]

    if (activeCategory !== "all") {
      result = result.filter((book) => book.category.toLowerCase() === activeCategory.toLowerCase())
    }

    if (priceFilter !== "all") {
      if (priceFilter === "free") {
        result = result.filter((book) => book.isFree || (book.price !== undefined && book.price === 0))
      } else if (priceFilter === "paid") {
        result = result.filter((book) => !book.isFree && book.price !== undefined && book.price > 0)
      }
    }

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(
        (book) => book.title.toLowerCase().includes(query) || book.author.toLowerCase().includes(query),
      )
    }

    setFilteredBooks(result)
  }, [books, searchQuery, activeCategory, priceFilter])

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">Digital Books</h1>
          <p className="text-muted-foreground">Discover and purchase premium digital books - secure reading, no downloads</p>
          <div className="mt-3">
            <Link href="/free-books">
              <Badge variant="secondary" className="bg-green-100 text-green-800 hover:bg-green-200">
                <Gift className="mr-1 h-3 w-3" />
                Browse Free Books
              </Badge>
            </Link>
          </div>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search books..."
              className="w-full pl-8 rounded-full bg-card border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-2">
            <Tabs
              defaultValue="all"
              value={activeCategory}
              onValueChange={setActiveCategory}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/50 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full">
                  All
                </TabsTrigger>
                <TabsTrigger value="finance" className="rounded-full">
                  Finance
                </TabsTrigger>
                <TabsTrigger value="productivity" className="rounded-full">
                  Productivity
                </TabsTrigger>
                <TabsTrigger value="entrepreneurship" className="rounded-full">
                  Entrepreneurship
                </TabsTrigger>
              </TabsList>
            </Tabs>

            <Tabs
              defaultValue="all"
              value={priceFilter}
              onValueChange={(value) => setPriceFilter(value as "all" | "free" | "paid")}
              className="w-full sm:w-auto"
            >
              <TabsList className="bg-muted/50 p-1 rounded-full">
                <TabsTrigger value="all" className="rounded-full">
                  All Books
                </TabsTrigger>
                <TabsTrigger value="free" className="rounded-full">
                  <Gift className="mr-1 h-3 w-3" />
                  Free
                </TabsTrigger>
                <TabsTrigger value="paid" className="rounded-full">
                  Premium
                </TabsTrigger>
              </TabsList>
            </Tabs>
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[...Array(8)].map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-3"></div>
              <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
              <div className="h-3 bg-muted rounded w-1/2"></div>
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="text-center py-12">
          <p className="text-destructive">{error}</p>
          <Button variant="outline" className="mt-4" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      ) : (
        <>
          <ComponentErrorBoundary componentName="Books Grid">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
              <BookCard
                key={book.id}
                title={book.title}
                author={book.author}
                coverUrl={book.coverUrl}
                category={book.category}
                rating={book.rating}
                id={book.id}
                price={book.price || 9.99}
                isPurchased={book.isPurchased || false}
                isFree={book.isFree || book.price === 0}
              />
              ))}
            </div>
          </ComponentErrorBoundary>

          {filteredBooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground">No books found matching your search criteria.</p>
            </div>
          )}

          {filteredBooks.length > 0 && filteredBooks.length < books.length && (
            <div className="mt-12 flex justify-center">
              <Button
                variant="outline"
                size="lg"
                className="rounded-full"
                onClick={() => {
                  setSearchQuery("")
                  setActiveCategory("all")
                }}
              >
                Clear Filters
              </Button>
            </div>
          )}

          {filteredBooks.length === books.length && books.length >= 8 && (
            <div className="mt-12 flex justify-center">
              <Button variant="outline" size="lg" className="rounded-full">
                Load More
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}

