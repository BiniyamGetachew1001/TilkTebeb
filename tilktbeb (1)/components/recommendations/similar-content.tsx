"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Loader2, BookOpen, FileText } from "lucide-react"
import { getSimilarContent } from "@/lib/analytics"
import type { Book } from "@/types/book"
import type { BusinessPlan } from "@/types/business-plan"
import Link from "next/link"

interface SimilarContentProps {
  contentId: string
  contentType: "book" | "businessPlan"
  contentTitle: string
}

export function SimilarContent({ contentId, contentType, contentTitle }: SimilarContentProps) {
  const [similarItems, setSimilarItems] = useState<Array<Book | BusinessPlan>>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const loadSimilarContent = async () => {
      try {
        setIsLoading(true)

        // In a real app, we would fetch these from an API
        // For demo purposes, we'll fetch all books and business plans first
        const booksResponse = await fetch("/api/books")
        const businessPlansResponse = await fetch("/api/business-plans")

        if (!booksResponse.ok || !businessPlansResponse.ok) {
          throw new Error("Failed to fetch content")
        }

        const books: Book[] = await booksResponse.json()
        const businessPlans: BusinessPlan[] = await businessPlansResponse.json()

        // Get similar content
        const similar = getSimilarContent(contentId, contentType, books, businessPlans, 3)

        setSimilarItems(similar)
      } catch (error) {
        console.error("Error loading similar content:", error)
      } finally {
        setIsLoading(false)
      }
    }

    loadSimilarContent()
  }, [contentId, contentType])

  // Determine if item is a book or business plan
  const isBook = (item: Book | BusinessPlan): item is Book => {
    return "author" in item
  }

  // Get link for item
  const getItemLink = (item: Book | BusinessPlan) => {
    if (isBook(item)) {
      return `/books/${item.id}`
    } else {
      return `/business-plans/${item.size}/${item.id}`
    }
  }

  if (isLoading) {
    return (
      <Card className="w-full">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Similar Content</CardTitle>
          <CardDescription>You might also like these</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-6">
            <Loader2 className="h-5 w-5 animate-spin text-primary mr-2" />
            <span>Finding similar content...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (similarItems.length === 0) {
    return null
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Similar Content</CardTitle>
        <CardDescription>You might also like these</CardDescription>
      </CardHeader>

      <CardContent>
        <div className="space-y-3">
          {similarItems.map((item, index) => (
            <Link key={index} href={getItemLink(item)} className="block group">
              <div className="border rounded-lg p-3 transition-colors hover:bg-muted/50">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    {isBook(item) ? (
                      <div className="h-14 w-10 bg-muted rounded flex items-center justify-center">
                        <BookOpen className="h-5 w-5 text-muted-foreground" />
                      </div>
                    ) : (
                      <div className="h-14 w-10 bg-muted rounded flex items-center justify-center">
                        <FileText className="h-5 w-5 text-muted-foreground" />
                      </div>
                    )}
                  </div>

                  <div className="flex-1 min-w-0">
                    <h4 className="font-medium text-sm line-clamp-1 group-hover:text-primary transition-colors">
                      {item.title}
                    </h4>

                    <div className="text-xs text-muted-foreground mt-1">
                      {isBook(item) ? (
                        <>
                          <span>By {item.author}</span>
                          {item.rating && <span className="ml-2">★ {item.rating}</span>}
                        </>
                      ) : (
                        <>
                          <span>{item.industry}</span>
                          <span className="ml-2">{item.size} size</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

