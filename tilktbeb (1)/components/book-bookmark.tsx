"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Bookmark, BookmarkCheck } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface BookmarkProps {
  bookId: string
  bookTitle: string
}

export function BookBookmark({ bookId, bookTitle }: BookmarkProps) {
  const [isBookmarked, setIsBookmarked] = useState(false)
  const { toast } = useToast()

  const toggleBookmark = () => {
    const newState = !isBookmarked
    setIsBookmarked(newState)

    // Store bookmark state in localStorage as a simple alternative to progress tracking
    if (newState) {
      // Add to bookmarks
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
      bookmarks[bookId] = {
        timestamp: Date.now(),
        title: bookTitle,
      }
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

      toast({
        title: "Bookmarked",
        description: `"${bookTitle}" has been added to your bookmarks.`,
      })
    } else {
      // Remove from bookmarks
      const bookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
      delete bookmarks[bookId]
      localStorage.setItem("bookmarks", JSON.stringify(bookmarks))

      toast({
        title: "Bookmark removed",
        description: `"${bookTitle}" has been removed from your bookmarks.`,
      })
    }
  }

  return (
    <Button variant="outline" size="sm" className="gap-1 rounded-full" onClick={toggleBookmark}>
      {isBookmarked ? (
        <>
          <BookmarkCheck className="h-4 w-4" />
          <span>Bookmarked</span>
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          <span>Bookmark</span>
        </>
      )}
    </Button>
  )
}

