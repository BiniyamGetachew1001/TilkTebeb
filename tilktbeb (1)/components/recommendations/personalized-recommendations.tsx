"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Loader2, BookOpen, FileText, RefreshCw } from "lucide-react"
import { getPersonalizedRecommendations } from "@/lib/analytics"
import type { Book } from "@/types/book"
import type { BusinessPlan } from "@/types/business-plan"
import Link from "next/link"

interface PersonalizedRecommendationsProps {
  userId: string
}

export function PersonalizedRecommendations({ userId }: PersonalizedRecommendationsProps) {
  const [recommendations, setRecommendations] = useState<Array<Book | BusinessPlan>>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState<"all" | "books" | "business-plans">("all")

  useEffect(() => {
    loadRecommendations()
  }, [userId])

  const loadRecommendations = async () => {
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

      // Get personalized recommendations
      const personalizedRecs = await getPersonalizedRecommendations(userId, books, businessPlans, 6)

      setRecommendations(personalizedRecs)
    } catch (error) {
      console.error("Error loading recommendations:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Filter recommendations based on selected tab
  const filteredRecommendations = recommendations.filter((item) => {
    if (filter === "all") return true
    if (filter === "books") return "author" in item // Book has author property
    if (filter === "business-plans") return "industry" in item // BusinessPlan has industry property
    return true
  })

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
          <CardTitle className="text-lg">Recommended for You</CardTitle>
          <CardDescription>Personalized recommendations based on your activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex justify-center items-center py-8">
            <Loader2 className="h-6 w-6 animate-spin text-primary mr-2" />
            <span>Finding recommendations for you...</span>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <div>
            <CardTitle className="text-lg">Recommended for You</CardTitle>
            <CardDescription>Personalized recommendations based on your activity</CardDescription>
          </div>

          <Button variant="ghost" size="icon" onClick={loadRecommendations} title="Refresh recommendations">
            <RefreshCw className="h-4 w-4" />
          </Button>
        </div>
      </CardHeader>

      <CardContent>
        <Tabs defaultValue="all" className="w-full" onValueChange={(value) => setFilter(value as any)}>
          <TabsList className="mb-4 grid w-full grid-cols-3">
            <TabsTrigger value="all">All</TabsTrigger>
            <TabsTrigger value="books">Books</TabsTrigger>
            <TabsTrigger value="business-plans">Business Plans</TabsTrigger>
          </TabsList>

          <TabsContent value="all" className="mt-0">
            {renderRecommendationsList(filteredRecommendations)}
          </TabsContent>

          <TabsContent value="books" className="mt-0">
            {renderRecommendationsList(filteredRecommendations)}
          </TabsContent>

          <TabsContent value="business-plans" className="mt-0">
            {renderRecommendationsList(filteredRecommendations)}
          </TabsContent>
        </Tabs>

        {recommendations.length === 0 && (
          <div className="text-center py-8">
            <BookOpen className="h-12 w-12 mx-auto text-muted-foreground mb-3" />
            <p className="font-medium mb-1">No recommendations yet</p>
            <p className="text-sm text-muted-foreground mb-4">
              Continue reading and interacting with content to get personalized recommendations
            </p>
          </div>
        )}
      </CardContent>
    </Card>
  )

  function renderRecommendationsList(items: Array<Book | BusinessPlan>) {
    if (items.length === 0) {
      return (
        <div className="text-center py-6">
          <p className="text-sm text-muted-foreground">No recommendations found</p>
        </div>
      )
    }

    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, index) => (
          <Link key={index} href={getItemLink(item)} className="block group">
            <div className="border rounded-lg p-3 h-full transition-colors hover:bg-muted/50">
              <div className="flex gap-3">
                <div className="flex-shrink-0">
                  {isBook(item) ? (
                    <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                      <BookOpen className="h-6 w-6 text-muted-foreground" />
                    </div>
                  ) : (
                    <div className="h-16 w-12 bg-muted rounded flex items-center justify-center">
                      <FileText className="h-6 w-6 text-muted-foreground" />
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

                  <p className="text-xs line-clamp-2 mt-1">
                    {isBook(item)
                      ? item.summary?.replace(/<[^>]*>/g, "").substring(0, 100) + "..."
                      : item.description.substring(0, 100) + "..."}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    )
  }
}

