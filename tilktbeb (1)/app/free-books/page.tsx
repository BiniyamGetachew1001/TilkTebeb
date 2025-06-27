"use client"

import { useState, useEffect, Suspense } from "react"
import Link from "next/link"
import dynamic from "next/dynamic"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { 
  Search, 
  Star, 
  BookOpen, 
  Download, 
  Filter,
  SortAsc,
  Grid3X3,
  List,
  Gift
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, handleApiError, type BookPreview } from "@/lib/api"
import { PageErrorBoundary, ComponentErrorBoundary } from "@/components/error-boundary"
import { useAccessibility } from "@/hooks/use-accessibility"
import { FreeBooksMeta } from "@/components/seo/meta-tags"
import { BookCoverImage } from "@/components/optimized-image"

export default function FreeBooksPage() {
  const [books, setBooks] = useState<BookPreview[]>([])
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [sortBy, setSortBy] = useState<"title" | "rating" | "author">("title")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const { announce, AnnouncementRegion } = useAccessibility()

  useEffect(() => {
    const fetchFreeBooks = async () => {
      try {
        setIsLoading(true)
        setError(null)
        const freeBooks = await api.getFreeBooks({
          category: selectedCategory !== "All" ? selectedCategory : undefined,
          query: searchQuery || undefined,
          sortBy: sortBy
        })
        setBooks(freeBooks)
      } catch (err) {
        setError(handleApiError(err))
        console.error("Error fetching free books:", err)
      } finally {
        setIsLoading(false)
      }
    }

    fetchFreeBooks()
  }, [selectedCategory, searchQuery, sortBy])

  // Since filtering is now handled by the API, we just use the books directly
  const filteredBooks = books

  const categories = ["All", ...Array.from(new Set(books.map(book => book.category)))]

  const handleDownload = (book: BookPreview) => {
    const message = `"${book.title}" is being downloaded to your library.`
    toast({
      title: "Download started",
      description: message,
    })
    // Announce to screen readers
    announce(message)
    // In a real app, this would trigger the actual download
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center mb-8">
          <div className="h-8 bg-muted rounded w-1/3 mx-auto mb-4 animate-pulse"></div>
          <div className="h-4 bg-muted rounded w-1/2 mx-auto animate-pulse"></div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="animate-pulse">
              <div className="aspect-[3/4] bg-muted rounded-lg mb-4"></div>
              <div className="h-4 bg-muted rounded mb-2"></div>
              <div className="h-3 bg-muted rounded w-2/3"></div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error}</p>
          <Button
            variant="outline"
            onClick={() => window.location.reload()}
          >
            Try Again
          </Button>
        </div>
      </div>
    )
  }

  return (
    <PageErrorBoundary>
      <FreeBooksMeta />
      <AnnouncementRegion />
      <div className="container py-8 md:py-12">
      {/* Header */}
      <div className="text-center mb-12">
        <div className="flex items-center justify-center gap-2 mb-4">
          <Gift className="h-8 w-8 text-primary" />
          <h1 className="text-3xl font-bold tracking-tight">Free Books</h1>
        </div>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
          Discover our collection of free books, including public domain classics, 
          author samples, and exclusive content from the Astewai community.
        </p>
      </div>

      {/* Search and Filters */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" aria-hidden="true" />
            <Input
              placeholder="Search free books..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
              aria-label="Search free books"
              role="searchbox"
            />
          </div>
          
          <div className="flex gap-2">
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              {categories.map(category => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
            
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as "title" | "rating" | "author")}
              className="px-3 py-2 border border-input bg-background rounded-md text-sm"
            >
              <option value="title">Sort by Title</option>
              <option value="rating">Sort by Rating</option>
              <option value="author">Sort by Author</option>
            </select>
            
            <div className="flex border border-input rounded-md">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid3X3 className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Results count */}
        <div className="text-sm text-muted-foreground">
          {filteredBooks.length} free book{filteredBooks.length !== 1 ? 's' : ''} available
        </div>
      </div>

      {/* Books Grid/List */}
      {filteredBooks.length === 0 ? (
        <div className="text-center py-12">
          <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No books found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search criteria or browse all categories.
          </p>
        </div>
      ) : viewMode === "grid" ? (
        <ComponentErrorBoundary componentName="Books Grid">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-[3/4] relative overflow-hidden rounded-t-lg">
                <BookCoverImage
                  src={book.coverUrl}
                  title={book.title}
                  author={book.author}
                  className="transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute top-2 right-2">
                  <Badge className="bg-green-500 hover:bg-green-600">
                    FREE
                  </Badge>
                </div>
              </div>
              
              <CardHeader className="pb-2">
                <CardTitle className="line-clamp-2 text-base">
                  {book.title}
                </CardTitle>
                <p className="text-sm text-muted-foreground">
                  by {book.author}
                </p>
              </CardHeader>
              
              <CardContent className="pt-0">
                <div className="flex items-center gap-1 mb-3">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{book.rating}</span>
                  <Badge variant="outline" className="ml-auto text-xs">
                    {book.category}
                  </Badge>
                </div>
                
                <div className="flex gap-2">
                  <Link href={`/reader/${book.id}`} className="flex-1">
                    <Button size="sm" className="w-full">
                      <BookOpen className="mr-2 h-4 w-4" />
                      Read
                    </Button>
                  </Link>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDownload(book)}
                  >
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </ComponentErrorBoundary>
      ) : (
        <ComponentErrorBoundary componentName="Books List">
          <div className="space-y-4">
            {filteredBooks.map((book) => (
            <Card key={book.id} className="group hover:shadow-md transition-all duration-300">
              <CardContent className="p-6">
                <div className="flex gap-4">
                  <div className="w-20 h-28 relative overflow-hidden rounded-lg flex-shrink-0">
                    <BookCoverImage
                      src={book.coverUrl}
                      title={book.title}
                      author={book.author}
                      className="w-full h-full"
                    />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between mb-2">
                      <div>
                        <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">
                          {book.title}
                        </h3>
                        <p className="text-muted-foreground">by {book.author}</p>
                      </div>
                      <Badge className="bg-green-500 hover:bg-green-600 ml-2">
                        FREE
                      </Badge>
                    </div>
                    
                    <div className="flex items-center gap-4 mb-3 text-sm text-muted-foreground">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span>{book.rating}</span>
                      </div>
                      <Badge variant="outline">{book.category}</Badge>
                    </div>
                    
                    <div className="flex gap-2">
                      <Link href={`/reader/${book.id}`}>
                        <Button size="sm">
                          <BookOpen className="mr-2 h-4 w-4" />
                          Read Now
                        </Button>
                      </Link>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDownload(book)}
                      >
                        <Download className="mr-2 h-4 w-4" />
                        Download
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        </ComponentErrorBoundary>
      )}
    </div>
    </PageErrorBoundary>
  )
}
