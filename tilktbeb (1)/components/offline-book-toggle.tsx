"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Download, CheckCircle2, Loader2 } from "lucide-react"
import { saveBookOffline, deleteOfflineBook, isBookAvailableOffline } from "@/lib/offline-storage"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"

interface OfflineBookToggleProps {
  book: Book
  onStatusChange?: (isAvailable: boolean) => void
}

export function OfflineBookToggle({ book, onStatusChange }: OfflineBookToggleProps) {
  const [isAvailableOffline, setIsAvailableOffline] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const { toast } = useToast()

  useEffect(() => {
    // Check if the book is already available offline
    const checkOfflineStatus = async () => {
      try {
        const available = await isBookAvailableOffline(book.id)
        setIsAvailableOffline(available)
        if (onStatusChange) onStatusChange(available)
      } catch (error) {
        console.error("Error checking offline status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    checkOfflineStatus()
  }, [book.id, onStatusChange])

  const handleToggleOffline = async () => {
    if (isSaving) return

    setIsSaving(true)

    try {
      if (isAvailableOffline) {
        // Remove from offline storage
        await deleteOfflineBook(book.id)
        setIsAvailableOffline(false)
        if (onStatusChange) onStatusChange(false)

        toast({
          title: "Removed from offline reading",
          description: `"${book.title}" is no longer available offline.`,
        })
      } else {
        // Add to offline storage
        await saveBookOffline(book)
        setIsAvailableOffline(true)
        if (onStatusChange) onStatusChange(true)

        toast({
          title: "Saved for offline reading",
          description: `"${book.title}" is now available offline.`,
        })
      }
    } catch (error) {
      console.error("Error toggling offline status:", error)

      toast({
        title: "Error",
        description: "There was a problem saving this book for offline reading.",
        variant: "destructive",
      })
    } finally {
      setIsSaving(false)
    }
  }

  if (isLoading) {
    return (
      <Button variant="outline" size="sm" className="gap-2" disabled>
        <Loader2 className="h-4 w-4 animate-spin" />
        <span>Checking...</span>
      </Button>
    )
  }

  if (isAvailableOffline) {
    return (
      <Button
        variant="outline"
        size="sm"
        className="gap-2 bg-green-50 text-green-600 border-green-200 hover:bg-green-100 hover:text-green-700 dark:bg-green-900/20 dark:text-green-400 dark:border-green-800 dark:hover:bg-green-900/30"
        onClick={handleToggleOffline}
        disabled={isSaving}
      >
        {isSaving ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            <span>Removing...</span>
          </>
        ) : (
          <>
            <CheckCircle2 className="h-4 w-4" />
            <span>Available Offline</span>
          </>
        )}
      </Button>
    )
  }

  return (
    <Button variant="outline" size="sm" className="gap-2" onClick={handleToggleOffline} disabled={isSaving}>
      {isSaving ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          <span>Saving...</span>
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          <span>Save Offline</span>
        </>
      )}
    </Button>
  )
}

