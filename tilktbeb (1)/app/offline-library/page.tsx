"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getAllOfflineBooks, deleteOfflineBook, getStorageStats, clearAllOfflineData } from "@/lib/offline-storage"
import { BookOpen, ChevronLeft, Search, Trash2, HardDrive, Clock, AlertTriangle, Loader2 } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { formatDistanceToNow } from "date-fns"
import { formatBytes } from "@/lib/utils"

export default function OfflineLibraryPage() {
  const [offlineBooks, setOfflineBooks] = useState<any[]>([])
  const [filteredBooks, setFilteredBooks] = useState<any[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("savedAt")
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc")
  const [storageStats, setStorageStats] = useState<{
    books: number
    businessPlans: number
    totalSize: number
  } | null>(null)
  const [isClearing, setIsClearing] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    loadOfflineBooks()
    loadStorageStats()
  }, [])

  useEffect(() => {
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      setFilteredBooks(
        offlineBooks.filter(
          (book) =>
            book.title.toLowerCase().includes(query) ||
            book.author.toLowerCase().includes(query) ||
            book.category.toLowerCase().includes(query),
        ),
      )
    } else {
      setFilteredBooks(offlineBooks)
    }
  }, [offlineBooks, searchQuery])

  const loadOfflineBooks = async () => {
    try {
      setIsLoading(true)
      const books = await getAllOfflineBooks({
        sortBy,
        sortOrder,
      })
      setOfflineBooks(books)
    } catch (error) {
      console.error("Error loading offline books:", error)
      toast({
        title: "Error",
        description: "Failed to load your offline library",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const loadStorageStats = async () => {
    try {
      const stats = await getStorageStats()
      setStorageStats(stats)
    } catch (error) {
      console.error("Error loading storage stats:", error)
    }
  }

  const handleSort = async (newSortBy: string) => {
    // If clicking the same column, toggle order
    const newSortOrder = sortBy === newSortBy && sortOrder === "desc" ? "asc" : "desc"

    setSortBy(newSortBy)
    setSortOrder(newSortOrder)

    try {
      setIsLoading(true)
      const books = await getAllOfflineBooks({
        sortBy: newSortBy,
        sortOrder: newSortOrder,
      })
      setOfflineBooks(books)
    } catch (error) {
      console.error("Error sorting books:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDeleteBook = async (bookId: string) => {
    try {
      await deleteOfflineBook(bookId)

      // Update the book list
      setOfflineBooks(offlineBooks.filter((book) => book.id !== bookId))

      // Refresh storage stats
      loadStorageStats()

      toast({
        title: "Book removed",
        description: "The book has been removed from your offline library",
      })
    } catch (error) {
      console.error("Error deleting book:", error)
      toast({
        title: "Error",
        description: "Failed to remove the book from your offline library",
        variant: "destructive",
      })
    }
  }

  const handleClearAllData = async () => {
    try {
      setIsClearing(true)
      await clearAllOfflineData()

      // Reset state
      setOfflineBooks([])
      setFilteredBooks([])

      // Refresh storage stats
      loadStorageStats()

      toast({
        title: "Offline library cleared",
        description: "All offline content has been removed",
      })
    } catch (error) {
      console.error("Error clearing offline data:", error)
      toast({
        title: "Error",
        description: "Failed to clear offline library",
        variant: "destructive",
      })
    } finally {
      setIsClearing(false)
    }
  }

  return (
    <div className="container py-8 md:py-12">
      <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Books</span>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Offline Library</h1>
          <p className="text-muted-foreground">Books and summaries you've saved for offline reading</p>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search offline books..."
              className="pl-8 w-full md:w-[200px]"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>

          <Select value={sortBy} onValueChange={handleSort}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="savedAt">Date Saved</SelectItem>
              <SelectItem value="title">Title</SelectItem>
              <SelectItem value="author">Author</SelectItem>
              <SelectItem value="category">Category</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="books" className="w-full">
        <TabsList>
          <TabsTrigger value="books">Books ({offlineBooks.length})</TabsTrigger>
          <TabsTrigger value="storage">Storage</TabsTrigger>
        </TabsList>

        <TabsContent value="books">
          {isLoading ? (
            <div className="flex justify-center items-center h-64">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
              <p className="ml-2">Loading your offline library...</p>
            </div>
          ) : filteredBooks.length === 0 ? (
            <div className="text-center py-12">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-muted mb-4">
                <BookOpen className="h-8 w-8 text-muted-foreground" />
              </div>
              <h2 className="text-xl font-semibold mb-2">Your offline library is empty</h2>
              <p className="text-muted-foreground mb-6">
                Save books for offline reading to access them when you don't have an internet connection.
              </p>
              <Link href="/books">
                <Button>Browse Books</Button>
              </Link>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {filteredBooks.map((book) => (
                <Card key={book.id} className="flex flex-col h-full">
                  <CardHeader className="pb-4">
                    <CardTitle className="line-clamp-1">{book.title}</CardTitle>
                    <p className="text-sm text-muted-foreground">by {book.author}</p>
                  </CardHeader>
                  <CardContent className="pb-4 flex-grow">
                    <div className="aspect-[3/4] relative overflow-hidden rounded-md mb-4">
                      <img
                        src={book.coverUrl || "/placeholder.svg?height=240&width=180"}
                        alt={`${book.title} book cover`}
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full w-fit mb-2">
                      {book.category}
                    </div>
                    <div className="text-xs text-muted-foreground flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      <span>Saved {formatDistanceToNow(new Date(book.savedAt), { addSuffix: true })}</span>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <Link href={`/books/${book.id}`} className="w-full">
                      <Button variant="outline" className="w-full">
                        Read Now
                      </Button>
                    </Link>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="w-full text-destructive hover:text-destructive"
                      onClick={() => handleDeleteBook(book.id)}
                    >
                      <Trash2 className="h-4 w-4 mr-2" />
                      Remove
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="storage">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Storage Usage</CardTitle>
              </CardHeader>
              <CardContent>
                {storageStats ? (
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" />
                        <span>Books</span>
                      </div>
                      <span className="font-medium">{storageStats.books}</span>
                    </div>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                        <HardDrive className="h-5 w-5 text-primary" />
                        <span>Total Storage Used</span>
                      </div>
                      <span className="font-medium">{formatBytes(storageStats.totalSize)}</span>
                    </div>

                    <div className="bg-muted p-4 rounded-md mt-4">
                      <p className="text-sm text-muted-foreground">
                        Your browser allows approximately 50-100MB of storage for offline content. Consider removing
                        unused content if you're saving many books.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="flex justify-center items-center h-32">
                    <Loader2 className="h-6 w-6 animate-spin text-primary" />
                    <p className="ml-2">Loading storage information...</p>
                  </div>
                )}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Manage Offline Data</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <p className="text-sm text-muted-foreground">
                    You can clear all offline data if you're experiencing issues or want to free up storage space. This
                    will remove all saved books and reading progress.
                  </p>

                  <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-md border border-amber-200 dark:border-amber-800 flex items-start gap-2">
                    <AlertTriangle className="h-5 w-5 text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-amber-800 dark:text-amber-300">
                      Clearing offline data cannot be undone. You'll need to re-download any content you want to access
                      offline.
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <AlertDialog>
                  <AlertDialogTrigger asChild>
                    <Button variant="destructive" className="w-full" disabled={isClearing || storageStats?.books === 0}>
                      {isClearing ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin mr-2" />
                          Clearing...
                        </>
                      ) : (
                        <>
                          <Trash2 className="h-4 w-4 mr-2" />
                          Clear All Offline Data
                        </>
                      )}
                    </Button>
                  </AlertDialogTrigger>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                      <AlertDialogDescription>
                        This will permanently delete all your offline books and reading progress. This action cannot be
                        undone.
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Cancel</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={handleClearAllData}
                        className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                      >
                        Clear All Data
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </CardFooter>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}

