"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Search, BookOpen, Clock, Star, Filter } from "lucide-react"
import type { Book } from "@/types/book"

// Mock data for user's purchased books
const mockLibraryBooks: (Book & { purchaseDate: string; lastRead?: string; readingProgress: number })[] = [
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Productivity",
    rating: 4.9,
    pages: 320,
    language: "English",
    summary: "An Easy & Proven Way to Build Good Habits & Break Bad Ones",
    price: 13.99,
    isPurchased: true,
    purchaseDate: "2024-01-15",
    lastRead: "2024-01-20",
    readingProgress: 65
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Entrepreneurship",
    rating: 4.8,
    pages: 224,
    language: "English",
    summary: "Notes on Startups, or How to Build the Future",
    price: 12.99,
    isPurchased: true,
    purchaseDate: "2024-01-10",
    lastRead: "2024-01-18",
    readingProgress: 100
  },
  {
    id: "good-to-great",
    title: "Good to Great",
    author: "Jim Collins",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Leadership",
    rating: 4.7,
    pages: 300,
    language: "English",
    summary: "Why Some Companies Make the Leap... and Others Don't",
    price: 11.99,
    isPurchased: true,
    purchaseDate: "2024-01-05",
    readingProgress: 25
  },
  {
    id: "lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Startup",
    rating: 4.6,
    pages: 336,
    language: "English",
    summary: "How Today's Entrepreneurs Use Continuous Innovation to Create Radically Successful Businesses",
    price: 10.99,
    isPurchased: true,
    purchaseDate: "2024-01-01",
    readingProgress: 0
  }
]

type SortOption = 'recent' | 'title' | 'author' | 'progress'
type FilterOption = 'all' | 'reading' | 'completed' | 'unread'

export default function LibraryPage() {
  const [books, setBooks] = useState(mockLibraryBooks)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState<SortOption>('recent')
  const [filterBy, setFilterBy] = useState<FilterOption>('all')
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
    }, 1000)
  }, [])

  const filteredAndSortedBooks = books
    .filter(book => {
      const matchesSearch = book.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                           book.author.toLowerCase().includes(searchQuery.toLowerCase())
      
      const matchesFilter = (() => {
        switch (filterBy) {
          case 'reading':
            return book.readingProgress > 0 && book.readingProgress < 100
          case 'completed':
            return book.readingProgress === 100
          case 'unread':
            return book.readingProgress === 0
          default:
            return true
        }
      })()
      
      return matchesSearch && matchesFilter
    })
    .sort((a, b) => {
      switch (sortBy) {
        case 'title':
          return a.title.localeCompare(b.title)
        case 'author':
          return a.author.localeCompare(b.author)
        case 'progress':
          return b.readingProgress - a.readingProgress
        case 'recent':
        default:
          return new Date(b.purchaseDate).getTime() - new Date(a.purchaseDate).getTime()
      }
    })

  const getProgressColor = (progress: number) => {
    if (progress === 0) return 'bg-gray-200'
    if (progress === 100) return 'bg-green-500'
    return 'bg-primary'
  }

  const getStatusBadge = (progress: number) => {
    if (progress === 0) return <Badge variant="outline">Unread</Badge>
    if (progress === 100) return <Badge className="bg-green-500">Completed</Badge>
    return <Badge variant="secondary">Reading</Badge>
  }

  return (
    <div className="container py-8 md:py-12">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight mb-2">My Library</h1>
          <p className="text-muted-foreground">Your purchased books and reading progress</p>
        </div>

        <div className="w-full md:w-auto flex flex-col sm:flex-row gap-4">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search your library..."
              className="w-full pl-8 rounded-full bg-card border-none"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap gap-4 mb-6">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm text-muted-foreground">Filter:</span>
          {(['all', 'reading', 'completed', 'unread'] as FilterOption[]).map((filter) => (
            <Button
              key={filter}
              variant={filterBy === filter ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilterBy(filter)}
            >
              {filter.charAt(0).toUpperCase() + filter.slice(1)}
            </Button>
          ))}
        </div>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">Sort:</span>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as SortOption)}
            className="text-sm border rounded px-2 py-1 bg-background"
          >
            <option value="recent">Recently Added</option>
            <option value="title">Title</option>
            <option value="author">Author</option>
            <option value="progress">Progress</option>
          </select>
        </div>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <div className="h-48 bg-muted rounded-t-lg"></div>
              <CardContent className="p-4">
                <div className="h-4 bg-muted rounded mb-2"></div>
                <div className="h-3 bg-muted rounded mb-4"></div>
                <div className="h-8 bg-muted rounded"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredAndSortedBooks.map((book) => (
              <Card key={book.id} className="overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
                <div className="aspect-[3/4] relative overflow-hidden">
                  <img
                    src={book.coverUrl}
                    alt={`${book.title} cover`}
                    className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute top-2 right-2">
                    {getStatusBadge(book.readingProgress)}
                  </div>
                </div>
                
                <CardContent className="p-4">
                  <h3 className="font-semibold text-lg line-clamp-1 mb-1">{book.title}</h3>
                  <p className="text-muted-foreground text-sm mb-3">{book.author}</p>
                  
                  {/* Progress Bar */}
                  <div className="mb-3">
                    <div className="flex justify-between text-xs text-muted-foreground mb-1">
                      <span>Progress</span>
                      <span>{book.readingProgress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full transition-all duration-300 ${getProgressColor(book.readingProgress)}`}
                        style={{ width: `${book.readingProgress}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-xs text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                      <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                      <span>{book.rating}</span>
                    </div>
                    <span>{book.pages} pages</span>
                  </div>

                  <Link href={`/reader/${book.id}`}>
                    <Button className="w-full gap-2">
                      <BookOpen className="h-4 w-4" />
                      {book.readingProgress === 0 ? 'Start Reading' : 
                       book.readingProgress === 100 ? 'Read Again' : 'Continue Reading'}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredAndSortedBooks.length === 0 && (
            <div className="text-center py-12">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {searchQuery ? 'No books found matching your search.' : 'Your library is empty. Start by purchasing some books!'}
              </p>
              {!searchQuery && (
                <Link href="/books" className="mt-4 inline-block">
                  <Button>Browse Books</Button>
                </Link>
              )}
            </div>
          )}
        </>
      )}
    </div>
  )
}
