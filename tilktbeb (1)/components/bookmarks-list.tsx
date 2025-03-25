"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { BookmarkX } from "lucide-react"
import { useToast } from "@/hooks/use-toast"

interface Bookmark {
  id: string
  title: string
  timestamp: number
}

export function BookmarksList() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([])
  const { toast } = useToast()

  useEffect(() => {
    // Load bookmarks from localStorage
    const loadBookmarks = () => {
      const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")

      const formattedBookmarks = Object.entries(storedBookmarks).map(([id, data]: [string, any]) => ({
        id,
        title: data.title,
        timestamp: data.timestamp,
      }))

      // Sort by most recent first
      formattedBookmarks.sort((a, b) => b.timestamp - a.timestamp)

      setBookmarks(formattedBookmarks)
    }

    loadBookmarks()

    // Listen for storage events (if user has multiple tabs open)
    window.addEventListener("storage", loadBookmarks)

    return () => {
      window.removeEventListener("storage", loadBookmarks)
    }
  }, [])

  const removeBookmark = (id: string, title: string) => {
    // Remove from state
    setBookmarks(bookmarks.filter((bookmark) => bookmark.id !== id))

    // Remove from localStorage
    const storedBookmarks = JSON.parse(localStorage.getItem("bookmarks") || "{}")
    delete storedBookmarks[id]
    localStorage.setItem("bookmarks", JSON.stringify(storedBookmarks))

    toast({
      title: "Bookmark removed",
      description: `"${title}" has been removed from your bookmarks.`,
    })
  }

  if (bookmarks.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-muted-foreground">You haven't bookmarked any books yet.</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {bookmarks.map((bookmark) => (
        <Card key={bookmark.id} className="glass dark:glass-dark">
          <CardHeader>
            <CardTitle className="line-clamp-1">{bookmark.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Bookmarked on {new Date(bookmark.timestamp).toLocaleDateString()}
            </p>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link href={`/books/${bookmark.id}`}>
              <Button variant="outline" size="sm">
                Continue Reading
              </Button>
            </Link>
            <Button variant="ghost" size="icon" onClick={() => removeBookmark(bookmark.id, bookmark.title)}>
              <BookmarkX className="h-4 w-4" />
            </Button>
          </CardFooter>
        </Card>
      ))}
    </div>
  )
}

