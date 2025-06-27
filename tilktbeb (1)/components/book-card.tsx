"use client"

import Link from "next/link"
import { useState } from "react"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Star, ShoppingCart, BookOpen } from "lucide-react"
// import { PurchaseModal } from "@/components/purchase-modal"
import type { Book } from "@/types/book"
import { BookCoverImage } from "@/components/optimized-image"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverUrl: string
  category: string
  rating: number
  price?: number
  isPurchased?: boolean
  isFree?: boolean
}

export function BookCard({ id, title, author, coverUrl, category, rating, price = 9.99, isPurchased = false, isFree = false }: BookCardProps) {
  const [showPurchaseModal, setShowPurchaseModal] = useState(false)

  const book: Book = {
    id,
    title,
    author,
    coverUrl,
    category,
    rating,
    price,
    isPurchased,
    isFree,
    pages: 300,
    language: "English",
    summary: `<p>Discover the insights and strategies that make this book a must-read in the ${category} category.</p>`
  }

  const isBookFree = isFree || price === 0

  const handlePurchaseClick = (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setShowPurchaseModal(true)
  }

  const handlePurchaseComplete = () => {
    // Handle successful purchase
    console.log(`Successfully purchased ${title}`)
    // You could update the book state here or refresh the page
  }

  return (
    <Card className="book-card overflow-hidden h-full transition-all duration-300 hover:shadow-xl group">
      <Link
        href={`/books/${id}`}
        className="block"
        aria-label={`View details for ${title} by ${author}`}
      >
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
          <BookCoverImage
            src={coverUrl || "/placeholder.svg"}
            title={title}
            author={author}
            className="transition-transform duration-500 group-hover:scale-105"
          />
          <div className="absolute top-2 right-2 glass dark:glass-dark text-secondary text-xs px-2 py-1 rounded-full">
            {category}
          </div>
          {isPurchased && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              Owned
            </div>
          )}
          {isBookFree && !isPurchased && (
            <div className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              FREE
            </div>
          )}
        </div>
        <CardContent className="p-4 glass dark:glass-dark">
          <h3 className="font-semibold text-lg line-clamp-1 group-hover:text-primary transition-colors">{title}</h3>
          <p className="text-muted-foreground text-sm">{author}</p>
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4 fill-secondary text-secondary" aria-hidden="true" />
              <span className="text-sm font-medium">
                <span className="sr-only">Rating: </span>
                {rating.toFixed(1)} out of 5 stars
              </span>
            </div>
            <div className="text-lg font-bold text-primary">
              {isBookFree ? (
                <Badge className="bg-green-500 hover:bg-green-600">FREE</Badge>
              ) : (
                `$${price.toFixed(2)}`
              )}
            </div>
          </div>
        </CardContent>
      </Link>
      <CardFooter className="p-4 pt-0 glass dark:glass-dark">
        {isPurchased ? (
          <Link href={`/reader/${id}`} className="w-full">
            <Button className="w-full" variant="outline">
              <BookOpen className="mr-2 h-4 w-4" />
              Read Now
            </Button>
          </Link>
        ) : isBookFree ? (
          <Link href={`/reader/${id}`} className="w-full">
            <Button className="w-full gap-2">
              <BookOpen className="h-4 w-4" />
              Read Free
            </Button>
          </Link>
        ) : (
          <Button
            className="w-full gap-2"
            onClick={handlePurchaseClick}
          >
            <ShoppingCart className="h-4 w-4" />
            Buy Now
          </Button>
        )}
      </CardFooter>

      {/* <PurchaseModal
        book={book}
        isOpen={showPurchaseModal}
        onClose={() => setShowPurchaseModal(false)}
        onPurchaseComplete={handlePurchaseComplete}
      /> */}
    </Card>
  )
}

