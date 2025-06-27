"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ChevronLeft, Star, ShoppingCart, BookOpen, Calendar, Globe, User, FileText, List, Shield, CheckCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"
import { mockBooks } from "@/lib/mock-data"
import { BookBookmark } from "@/components/book-bookmark"
import { OfflineBookToggle } from "@/components/offline-book-toggle"
import { getOfflineBook, saveReadingProgress, getReadingProgress, isBookAvailableOffline } from "@/lib/offline-storage"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"
import { ReadingProgressBar } from "@/components/reading-progress-bar"
import { HighlightControls } from "@/components/highlight-controls"
import { NotesPanel } from "@/components/notes-panel"
import { TextToSpeechPlayer } from "@/components/text-to-speech-player"
import { FlashcardCreator } from "@/components/flashcard-creator"
import { ReadingSpeedTracker } from "@/components/reading-speed-tracker"
import { SocialSharing } from "@/components/social-sharing"
import { ComprehensionQuiz } from "@/components/comprehension-quiz"
import { SimilarContent } from "@/components/recommendations/similar-content"
import { trackUserActivity } from "@/lib/analytics"
import { api, handleApiError } from "@/lib/api"

export default function BookPage({ params }: { params: { slug: string } }) {
  const router = useRouter()
  const { toast } = useToast()
  const contentRef = useRef<HTMLDivElement>(null)
  const [book, setBook] = useState<Book | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [fontSize, setFontSize] = useState<"small" | "medium" | "large">("medium")
  const [isOffline, setIsOffline] = useState(false)
  const [isOfflineAvailable, setIsOfflineAvailable] = useState(false)
  const [readingProgress, setReadingProgress] = useState<{
    position: number
    totalLength: number
    lastReadAt: string
    completionPercentage: number
  } | null>(null)
  const [showNotes, setShowNotes] = useState(false)
  const [isHighlighting, setIsHighlighting] = useState(false)
  const [activeTab, setActiveTab] = useState("reading")
  const [selectedTextForSharing, setSelectedTextForSharing] = useState<string | null>(null)
  const [isTtsPlaying, setIsTtsPlaying] = useState(false)
  const [readingStartTime, setReadingStartTime] = useState<Date | null>(null)
  const [readingSessionId, setReadingSessionId] = useState<string | null>(null)

  // Check online status
  useEffect(() => {
    setIsOffline(!navigator.onLine)

    const handleOnline = () => setIsOffline(false)
    const handleOffline = () => setIsOffline(true)

    window.addEventListener("online", handleOnline)
    window.addEventListener("offline", handleOffline)

    return () => {
      window.removeEventListener("online", handleOnline)
      window.removeEventListener("offline", handleOffline)
    }
  }, [])

  // Fetch book data
  useEffect(() => {
    const fetchBook = async () => {
      try {
        setIsLoading(true)

        // First check if book is available offline
        const offlineAvailable = await isBookAvailableOffline(params.slug)
        setIsOfflineAvailable(offlineAvailable)

        if (isOffline && !offlineAvailable) {
          // If offline and book not available offline
          setError(
            "You're offline and this book isn't available offline. Please connect to the internet or choose a book you've saved for offline reading.",
          )
          setIsLoading(false)
          return
        }

        let bookData: Book | null = null

        if (offlineAvailable) {
          // Get from offline storage
          bookData = await getOfflineBook(params.slug)
        } else {
          // Fetch from API
          bookData = await api.getBookById(params.slug)
        }

        setBook(bookData)

        // Load reading progress
        const progress = await getReadingProgress(params.slug)
        if (progress) {
          setReadingProgress(progress)
        }

        // Track view activity
        // In a real app, we would get the user ID from authentication
        const mockUserId = "user-123"
        trackUserActivity(mockUserId, "view", bookData.id, "book", {
          title: bookData.title,
          category: bookData.categories?.[0] || "Uncategorized",
        })

        // Start reading session
        setReadingStartTime(new Date())
        setReadingSessionId(`reading-session-${Date.now()}`)
      } catch (err) {
        console.error("Error fetching book:", err)
        setError(handleApiError(err))
      } finally {
        setIsLoading(false)
      }
    }

    fetchBook()

    // Cleanup function to track reading time when component unmounts
    return () => {
      if (book && readingStartTime) {
        const endTime = new Date()
        const timeSpentMinutes = Math.round((endTime.getTime() - readingStartTime.getTime()) / 60000)

        if (timeSpentMinutes > 0) {
          // Track read activity with time spent
          const mockUserId = "user-123"
          trackUserActivity(mockUserId, "read", book.id, "book", {
            title: book.title,
            category: book.categories?.[0] || "Uncategorized",
            timeSpent: timeSpentMinutes,
            progress: readingProgress?.completionPercentage || 0,
            sessionId: readingSessionId,
          })
        }
      }
    }
  }, [params.slug, isOffline])

  // Save reading progress periodically
  useEffect(() => {
    if (!book || !contentRef.current) return

    const content = contentRef.current
    const totalLength = content.scrollHeight

    const saveProgress = async () => {
      const position = content.scrollTop
      const completionPercentage = Math.min(100, Math.round((position / (totalLength - content.clientHeight)) * 100))

      const progress = {
        position,
        totalLength,
        lastReadAt: new Date().toISOString(),
        completionPercentage: isNaN(completionPercentage) ? 0 : completionPercentage,
      }

      setReadingProgress(progress)

      try {
        await saveReadingProgress(book.id, progress)

        // Track progress update if significant change (every 10%)
        if (progress.completionPercentage % 10 === 0) {
          const mockUserId = "user-123"
          trackUserActivity(mockUserId, "read", book.id, "book", {
            title: book.title,
            category: book.categories?.[0] || "Uncategorized",
            progress: progress.completionPercentage,
            sessionId: readingSessionId,
          })

          // If completed, track completion
          if (progress.completionPercentage >= 90) {
            trackUserActivity(mockUserId, "complete", book.id, "book", {
              title: book.title,
              category: book.categories?.[0] || "Uncategorized",
            })
          }
        }
      } catch (error) {
        console.error("Error saving reading progress:", error)
      }
    }

    // Save progress on scroll (debounced)
    let timeout: NodeJS.Timeout
    const handleScroll = () => {
      clearTimeout(timeout)
      timeout = setTimeout(saveProgress, 500)
    }

    content.addEventListener("scroll", handleScroll)

    // Restore scroll position from saved progress
    if (readingProgress?.position) {
      content.scrollTop = readingProgress.position
    }

    // Save progress when leaving the page
    const handleBeforeUnload = () => {
      saveProgress()
    }

    window.addEventListener("beforeunload", handleBeforeUnload)

    return () => {
      content.removeEventListener("scroll", handleScroll)
      window.removeEventListener("beforeunload", handleBeforeUnload)
      clearTimeout(timeout)
      saveProgress()
    }
  }, [book, readingProgress?.position, readingSessionId])

  // Handle text selection for sharing
  useEffect(() => {
    const handleSelection = () => {
      const selection = window.getSelection()
      if (selection && !selection.isCollapsed) {
        setSelectedTextForSharing(selection.toString())
      }
    }

    document.addEventListener("mouseup", handleSelection)

    return () => {
      document.removeEventListener("mouseup", handleSelection)
    }
  }, [])

  const fontSizeClasses = {
    small: "text-sm leading-6",
    medium: "text-base leading-7",
    large: "text-lg leading-8",
  }

  const handleOfflineStatusChange = (available: boolean) => {
    setIsOfflineAvailable(available)

    // Track download activity if made available offline
    if (available && book) {
      const mockUserId = "user-123"
      trackUserActivity(mockUserId, "download", book.id, "book", {
        title: book.title,
        category: book.categories?.[0] || "Uncategorized",
      })
    }
  }

  const handleTtsPlayingChange = (playing: boolean) => {
    setIsTtsPlaying(playing)
  }

  // Estimate word count for reading speed tracking
  const getWordCount = () => {
    if (!book) return 0

    // Strip HTML tags and count words
    const text = book.summary.replace(/<[^>]*>/g, "")
    return text.split(/\s+/).length
  }

  if (isLoading) {
    return (
      <div className="container py-8 md:py-12">
        <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Books</span>
        </Link>

        <div className="flex justify-center items-center h-64">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <p className="ml-2">Loading book details...</p>
        </div>
      </div>
    )
  }

  if (error || !book) {
    return (
      <div className="container py-8 md:py-12">
        <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
          <ChevronLeft className="h-4 w-4" />
          <span>Back to Books</span>
        </Link>

        <div className="text-center py-12">
          <p className="text-destructive mb-4">{error || "Book not found"}</p>
          <Button variant="outline" onClick={() => router.push("/books")}>
            Browse Books
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      <div className="container py-8 md:py-12">
        <div className="flex justify-between items-center mb-6">
          <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground">
            <ChevronLeft className="h-4 w-4" />
            <span>Back to Books</span>
          </Link>

          <div className="flex items-center gap-2">
            {isOffline ? (
              <div className="flex items-center text-amber-600 dark:text-amber-400 bg-amber-50 dark:bg-amber-900/20 px-2 py-1 rounded-full text-xs">
                <WifiOff className="h-3 w-3 mr-1" />
                Offline Mode
              </div>
            ) : (
              <div className="flex items-center text-green-600 dark:text-green-400 bg-green-50 dark:bg-green-900/20 px-2 py-1 rounded-full text-xs">
                <Wifi className="h-3 w-3 mr-1" />
                Online
              </div>
            )}
          </div>
        </div>

        {readingProgress && <ReadingProgressBar progress={readingProgress.completionPercentage} />}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div className="md:col-span-1">
            <div className="sticky top-24 space-y-6">
              <div>
                <img
                  src={book.coverUrl || "/placeholder.svg"}
                  alt={`${book.title} book cover`}
                  className="w-full max-w-[240px] mx-auto rounded-xl shadow-md card-themed"
                />

                <div className="mt-6 space-y-4 gradient-text-overlay p-4 rounded-xl">
                  <h1 className="text-2xl font-bold">{book.title}</h1>
                  <p className="text-muted-foreground">{book.author}</p>

                  <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <span className="text-primary font-semibold">{book.rating}</span>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                        stroke="none"
                        className="text-secondary"
                      >
                        <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                      </svg>
                    </div>
                    <div>
                      <span>{book.pages} pages</span>
                    </div>
                    <div>
                      <span>{book.language}</span>
                    </div>
                  </div>

                  <div className="pt-4 flex flex-wrap gap-2">
                    <BookBookmark
                      bookId={book.id}
                      bookTitle={book.title}
                      onBookmark={() => {
                        // Track bookmark activity
                        const mockUserId = "user-123"
                        trackUserActivity(mockUserId, "bookmark", book.id, "book", {
                          title: book.title,
                          category: book.categories?.[0] || "Uncategorized",
                        })
                      }}
                    />
                    <OfflineBookToggle book={book} onStatusChange={handleOfflineStatusChange} />
                    <SocialSharing
                      contentId={book.id}
                      contentTitle={book.title}
                      contentType="book"
                      quote={selectedTextForSharing || undefined}
                    />
                  </div>
                </div>
              </div>

              {activeTab === "reading" && <ReadingSpeedTracker contentId={book.id} contentLength={getWordCount()} />}

              <SimilarContent contentId={book.id} contentType="book" contentTitle={book.title} />
            </div>
          </div>

          <div className="md:col-span-2">
            <Tabs defaultValue="reading" value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="mb-6">
                <TabsTrigger value="reading" className="gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Reading</span>
                </TabsTrigger>
                <TabsTrigger value="tools" className="gap-2">
                  <Sparkles className="h-4 w-4" />
                  <span>Learning Tools</span>
                </TabsTrigger>
                <TabsTrigger value="quiz" className="gap-2">
                  <Lightbulb className="h-4 w-4" />
                  <span>Quiz</span>
                </TabsTrigger>
              </TabsList>

              <TabsContent value="reading">
                <Card className="p-6 rounded-xl border-none shadow-sm card-themed">
                  <div className="mb-6 flex justify-between items-center">
                    <div className="flex gap-2">
                      <Button
                        variant={fontSize === "small" ? "default" : "outline"}
                        size="sm"
                        className="rounded-full h-8 w-8 p-0"
                        onClick={() => setFontSize("small")}
                      >
                        S
                      </Button>
                      <Button
                        variant={fontSize === "medium" ? "default" : "outline"}
                        size="sm"
                        className="rounded-full h-8 w-8 p-0"
                        onClick={() => setFontSize("medium")}
                      >
                        M
                      </Button>
                      <Button
                        variant={fontSize === "large" ? "default" : "outline"}
                        size="sm"
                        className="rounded-full h-8 w-8 p-0"
                        onClick={() => setFontSize("large")}
                      >
                        L
                      </Button>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        variant={isHighlighting ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={() => setIsHighlighting(!isHighlighting)}
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="m9 11-6 6v3h9l3-3"></path>
                          <path d="m22 12-4.6 4.6a2 2 0 0 1-2.8 0l-5.2-5.2a2 2 0 0 1 0-2.8L14 4"></path>
                        </svg>
                        <span>Highlight</span>
                      </Button>

                      <Button
                        variant={showNotes ? "default" : "outline"}
                        size="sm"
                        className="gap-1"
                        onClick={() => {
                          setShowNotes(!showNotes)

                          // Track note creation activity
                          if (!showNotes && book) {
                            const mockUserId = "user-123"
                            trackUserActivity(mockUserId, "note_create", book.id, "book", {
                              title: book.title,
                              category: book.categories?.[0] || "Uncategorized",
                            })
                          }
                        }}
                      >
                        <MessageSquare className="h-4 w-4" />
                        <span>Notes</span>
                      </Button>
                    </div>
                  </div>

                  <div className="flex">
                    <div className={`flex-1 ${showNotes ? "pr-4" : ""}`}>
                      <Tabs defaultValue="summary" className="w-full">
                        <TabsList className="mb-4 bg-muted/50 p-1 rounded-full">
                          <TabsTrigger value="summary" className="rounded-full">
                            Summary
                          </TabsTrigger>
                          <TabsTrigger value="key-insights" className="rounded-full">
                            Key Insights
                          </TabsTrigger>
                          <TabsTrigger value="applications" className="rounded-full">
                            Applications
                          </TabsTrigger>
                        </TabsList>

                        <div ref={contentRef} className="max-h-[70vh] overflow-y-auto pr-4 custom-scrollbar">
                          <TabsContent value="summary" className={`${fontSizeClasses[fontSize]} space-y-4`}>
                            <div dangerouslySetInnerHTML={{ __html: book.summary }} />
                          </TabsContent>

                          <TabsContent value="key-insights">
                            <div className={`${fontSizeClasses[fontSize]} space-y-4`}>
                              <div dangerouslySetInnerHTML={{ __html: book.keyInsights || book.summary }} />
                            </div>
                          </TabsContent>

                          <TabsContent value="applications">
                            <div className={`${fontSizeClasses[fontSize]} space-y-4`}>
                              <div dangerouslySetInnerHTML={{ __html: book.applications || "" }} />
                            </div>
                          </TabsContent>
                        </div>
                      </Tabs>
                    </div>

                    {showNotes && (
                      <div className="w-64 border-l pl-4">
                        <NotesPanel contentId={book.id} />
                      </div>
                    )}
                  </div>

                  {isHighlighting && (
                    <div className="mt-4 border-t pt-4">
                      <HighlightControls contentId={book.id} />
                    </div>
                  )}

                  {!isTtsPlaying && (
                    <div className="mt-4 border-t pt-4">
                      <TextToSpeechPlayer
                        text={book.summary.replace(/<[^>]*>/g, "")}
                        onPlayingChange={handleTtsPlayingChange}
                      />
                    </div>
                  )}
                </Card>
              </TabsContent>

              <TabsContent value="tools">
                <div className="space-y-6">
                  <Card className="p-6 rounded-xl border-none shadow-sm card-themed">
                    <h2 className="text-xl font-bold mb-4">Flashcards</h2>
                    <FlashcardCreator contentId={book.id} contentTitle={book.title} />
                  </Card>

                  <Card className="p-6 rounded-xl border-none shadow-sm card-themed">
                    <h2 className="text-xl font-bold mb-4">Text-to-Speech</h2>
                    <TextToSpeechPlayer
                      text={book.summary.replace(/<[^>]*>/g, "")}
                      onPlayingChange={handleTtsPlayingChange}
                    />
                  </Card>
                </div>
              </TabsContent>

              <TabsContent value="quiz">
                <Card className="p-6 rounded-xl border-none shadow-sm card-themed">
                  <h2 className="text-xl font-bold mb-4">Test Your Understanding</h2>
                  <ComprehensionQuiz
                    contentId={book.id}
                    contentTitle={book.title}
                    contentType="book"
                    onQuizAttempt={() => {
                      // Track quiz attempt activity
                      const mockUserId = "user-123"
                      trackUserActivity(mockUserId, "quiz_attempt", book.id, "book", {
                        title: book.title,
                        category: book.categories?.[0] || "Uncategorized",
                      })
                    }}
                  />
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  )
}

