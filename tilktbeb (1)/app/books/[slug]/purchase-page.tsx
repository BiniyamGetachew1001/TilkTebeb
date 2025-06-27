"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Star, ShoppingCart, BookOpen, Calendar, Globe, User, FileText, List, Shield, Clock, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"
import { mockBooks } from "@/lib/mock-data"

interface BookDetailPageProps {
  params: {
    slug: string
  }
}

export default function BookDetailPage({ params }: BookDetailPageProps) {
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [isPurchasing, setIsPurchasing] = useState(false)
  const [isPurchased, setIsPurchased] = useState(false)
  const router = useRouter()
  const { toast } = useToast()

  useEffect(() => {
    // Simulate API call to fetch book details
    setTimeout(() => {
      const foundBook = mockBooks.find(b => b.id === params.slug)
      if (foundBook) {
        setBook({
          ...foundBook,
          price: foundBook.price || 12.99,
          publisher: "Premium Publishers",
          publishedDate: "2023-01-15",
          isbn: "978-0-123456-78-9",
          genre: foundBook.category,
          tableOfContents: [
            "Introduction: The Journey Begins",
            "Chapter 1: Understanding the Fundamentals",
            "Chapter 2: Building Your Foundation",
            "Chapter 3: Advanced Strategies",
            "Chapter 4: Implementation Guide",
            "Chapter 5: Measuring Success",
            "Conclusion: Your Next Steps"
          ]
        })
      }
      setIsLoading(false)
    }, 1000)
  }, [params.slug])

  const handlePurchase = async () => {
    if (!book) return
    
    setIsPurchasing(true)
    
    // Simulate purchase process
    setTimeout(() => {
      setIsPurchasing(false)
      setIsPurchased(true)
      toast({
        title: "Purchase Successful!",
        description: `You now have access to "${book.title}". Start reading now!`,
      })
    }, 2000)
  }

  const handleReadNow = () => {
    if (book) {
      router.push(`/reader/${book.id}`)
    }
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <div className="animate-pulse">
          <div className="h-8 bg-muted rounded mb-6 w-32"></div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <div className="aspect-[3/4] bg-muted rounded-xl"></div>
            </div>
            <div className="lg:col-span-2 space-y-4">
              <div className="h-8 bg-muted rounded w-3/4"></div>
              <div className="h-6 bg-muted rounded w-1/2"></div>
              <div className="h-12 bg-muted rounded w-full"></div>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (!book) {
    return (
      <div className="container py-8 md:py-12">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Book Not Found</h1>
          <p className="text-muted-foreground mb-6">The book you're looking for doesn't exist.</p>
          <Link href="/books">
            <Button>Browse Books</Button>
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="container py-8 md:py-12">
      <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Books</span>
      </Link>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Book Cover */}
        <div className="lg:col-span-1">
          <div className="sticky top-8">
            <div className="aspect-[3/4] relative overflow-hidden rounded-xl shadow-2xl">
              <img
                src={book.coverUrl || "/placeholder.svg"}
                alt={`${book.title} cover`}
                className="object-cover w-full h-full"
              />
              {isPurchased && (
                <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  <CheckCircle className="h-4 w-4 inline mr-1" />
                  Owned
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Book Information */}
        <div className="lg:col-span-2">
          <div className="space-y-6">
            {/* Header */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{book.category}</Badge>
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{book.rating.toFixed(1)}</span>
                </div>
              </div>
              <h1 className="text-3xl font-bold mb-2">{book.title}</h1>
              <p className="text-xl text-muted-foreground mb-4">by {book.author}</p>
              
              {/* Price and Purchase */}
              <div className="flex items-center justify-between p-6 glass dark:glass-dark rounded-xl border border-white/10">
                <div className="flex items-center gap-4">
                  <div className="text-3xl font-bold text-primary">
                    ${book.price?.toFixed(2)}
                  </div>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="h-4 w-4" />
                    <span>Secure Purchase</span>
                  </div>
                </div>
                
                {isPurchased ? (
                  <Button size="lg" onClick={handleReadNow} className="gap-2">
                    <BookOpen className="h-5 w-5" />
                    Read Now
                  </Button>
                ) : (
                  <Button 
                    size="lg" 
                    onClick={handlePurchase} 
                    disabled={isPurchasing}
                    className="gap-2"
                  >
                    {isPurchasing ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Processing...
                      </>
                    ) : (
                      <>
                        <ShoppingCart className="h-5 w-5" />
                        Buy Now
                      </>
                    )}
                  </Button>
                )}
              </div>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="description" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="description" className="gap-2">
                  <FileText className="h-4 w-4" />
                  Description
                </TabsTrigger>
                <TabsTrigger value="details" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  Details
                </TabsTrigger>
                <TabsTrigger value="contents" className="gap-2">
                  <List className="h-4 w-4" />
                  Contents
                </TabsTrigger>
              </TabsList>

              <TabsContent value="description" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>About This Book</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div 
                      className="prose prose-sm max-w-none dark:prose-invert"
                      dangerouslySetInnerHTML={{ __html: book.summary }}
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="details" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Book Details</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3">
                        <User className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Author</p>
                          <p className="font-medium">{book.author}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Calendar className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Published</p>
                          <p className="font-medium">{book.publishedDate}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Pages</p>
                          <p className="font-medium">{book.pages}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <Globe className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Language</p>
                          <p className="font-medium">{book.language}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">Publisher</p>
                          <p className="font-medium">{book.publisher}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-3">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="text-sm text-muted-foreground">ISBN</p>
                          <p className="font-medium">{book.isbn}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="contents" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Table of Contents</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-2">
                      {book.tableOfContents?.map((chapter, index) => (
                        <div key={index} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors">
                          <span className="text-sm text-muted-foreground w-8">{index + 1}.</span>
                          <span className="text-sm">{chapter}</span>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}
