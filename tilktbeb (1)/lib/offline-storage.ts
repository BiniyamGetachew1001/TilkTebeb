"use client"

// Enhanced offline storage using IndexedDB with better error handling and additional features
const DB_NAME = "telktibeb-offline"
const DB_VERSION = 2
const BOOKS_STORE = "books"
const BUSINESS_PLANS_STORE = "business-plans"
const READING_PROGRESS_STORE = "reading-progress"
const NOTES_STORE = "notes"
const HIGHLIGHTS_STORE = "highlights"

// Open the database with improved error handling
export function openDatabase(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = (event.target as IDBOpenDBRequest).result

      // Create object stores if they don't exist
      if (!db.objectStoreNames.contains(BOOKS_STORE)) {
        db.createObjectStore(BOOKS_STORE, { keyPath: "id" })
      }

      if (!db.objectStoreNames.contains(BUSINESS_PLANS_STORE)) {
        db.createObjectStore(BUSINESS_PLANS_STORE, { keyPath: "id" })
      }

      // New stores for enhanced functionality
      if (!db.objectStoreNames.contains(READING_PROGRESS_STORE)) {
        const progressStore = db.createObjectStore(READING_PROGRESS_STORE, { keyPath: "id" })
        progressStore.createIndex("contentId", "contentId", { unique: false })
      }

      if (!db.objectStoreNames.contains(NOTES_STORE)) {
        const notesStore = db.createObjectStore(NOTES_STORE, { keyPath: "id" })
        notesStore.createIndex("contentId", "contentId", { unique: false })
      }

      if (!db.objectStoreNames.contains(HIGHLIGHTS_STORE)) {
        const highlightsStore = db.createObjectStore(HIGHLIGHTS_STORE, { keyPath: "id" })
        highlightsStore.createIndex("contentId", "contentId", { unique: false })
      }
    }

    request.onsuccess = (event) => {
      resolve((event.target as IDBOpenDBRequest).result)
    }

    request.onerror = (event) => {
      console.error("Database error:", (event.target as IDBOpenDBRequest).error)
      reject(new Error("Failed to open database"))
    }
  })
}

// Save a book for offline reading with additional metadata
export async function saveBookOffline(book: any): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(BOOKS_STORE, "readwrite")
    const store = transaction.objectStore(BOOKS_STORE)

    // Add timestamp and sync status
    const bookToSave = {
      ...book,
      savedAt: new Date().toISOString(),
      lastSynced: new Date().toISOString(),
      syncStatus: "synced",
    }

    return new Promise((resolve, reject) => {
      const request = store.put(bookToSave)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error saving book offline:", error)
    throw error
  }
}

// Get a book from offline storage
export async function getOfflineBook(id: string): Promise<any> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(BOOKS_STORE, "readonly")
    const store = transaction.objectStore(BOOKS_STORE)

    return new Promise((resolve, reject) => {
      const request = store.get(id)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error getting offline book:", error)
    throw error
  }
}

// Get all offline books with improved sorting and filtering
export async function getAllOfflineBooks(options?: {
  sortBy?: string
  sortOrder?: "asc" | "desc"
  filterBy?: string
  filterValue?: string
}): Promise<any[]> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(BOOKS_STORE, "readonly")
    const store = transaction.objectStore(BOOKS_STORE)

    return new Promise((resolve, reject) => {
      const request = store.getAll()

      request.onsuccess = () => {
        let results = request.result

        // Apply filtering if specified
        if (options?.filterBy && options?.filterValue) {
          results = results.filter((book) => {
            const value = book[options.filterBy!]
            return value && value.toString().toLowerCase().includes(options.filterValue!.toLowerCase())
          })
        }

        // Apply sorting if specified
        if (options?.sortBy) {
          results.sort((a, b) => {
            const valueA = a[options.sortBy!]
            const valueB = b[options.sortBy!]

            if (valueA < valueB) return options.sortOrder === "desc" ? 1 : -1
            if (valueA > valueB) return options.sortOrder === "desc" ? -1 : 1
            return 0
          })
        } else {
          // Default sort by savedAt (newest first)
          results.sort((a, b) => new Date(b.savedAt).getTime() - new Date(a.savedAt).getTime())
        }

        resolve(results)
      }
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error getting all offline books:", error)
    throw error
  }
}

// Delete a book from offline storage
export async function deleteOfflineBook(id: string): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(BOOKS_STORE, "readwrite")
    const store = transaction.objectStore(BOOKS_STORE)

    return new Promise((resolve, reject) => {
      const request = store.delete(id)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error deleting offline book:", error)
    throw error
  }
}

// Check if a book is available offline
export async function isBookAvailableOffline(id: string): Promise<boolean> {
  try {
    const book = await getOfflineBook(id)
    return !!book
  } catch (error) {
    console.error("Error checking if book is available offline:", error)
    return false
  }
}

// Save reading progress
export async function saveReadingProgress(
  contentId: string,
  progress: {
    position: number
    totalLength: number
    lastReadAt: string
    completionPercentage: number
  },
): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(READING_PROGRESS_STORE, "readwrite")
    const store = transaction.objectStore(READING_PROGRESS_STORE)

    const progressData = {
      id: `progress-${contentId}`,
      contentId,
      ...progress,
      updatedAt: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
      const request = store.put(progressData)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error saving reading progress:", error)
    throw error
  }
}

// Get reading progress
export async function getReadingProgress(contentId: string): Promise<any> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(READING_PROGRESS_STORE, "readonly")
    const store = transaction.objectStore(READING_PROGRESS_STORE)

    return new Promise((resolve, reject) => {
      const request = store.get(`progress-${contentId}`)

      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error getting reading progress:", error)
    throw error
  }
}

// Save a note
export async function saveNote(
  contentId: string,
  note: {
    text: string
    position: number
    selection?: string
  },
): Promise<string> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(NOTES_STORE, "readwrite")
    const store = transaction.objectStore(NOTES_STORE)

    const noteId = `note-${contentId}-${Date.now()}`
    const noteData = {
      id: noteId,
      contentId,
      ...note,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
      const request = store.add(noteData)

      request.onsuccess = () => resolve(noteId)
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error saving note:", error)
    throw error
  }
}

// Update a note
export async function updateNote(
  noteId: string,
  updates: {
    text?: string
    position?: number
    selection?: string
  },
): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(NOTES_STORE, "readwrite")
    const store = transaction.objectStore(NOTES_STORE)

    return new Promise((resolve, reject) => {
      const getRequest = store.get(noteId)

      getRequest.onsuccess = () => {
        const note = getRequest.result
        if (!note) {
          reject(new Error("Note not found"))
          return
        }

        const updatedNote = {
          ...note,
          ...updates,
          updatedAt: new Date().toISOString(),
        }

        const updateRequest = store.put(updatedNote)
        updateRequest.onsuccess = () => resolve()
        updateRequest.onerror = () => reject(updateRequest.error)
      }

      getRequest.onerror = () => reject(getRequest.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error updating note:", error)
    throw error
  }
}

// Get all notes for a content item
export async function getContentNotes(contentId: string): Promise<any[]> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(NOTES_STORE, "readonly")
    const store = transaction.objectStore(NOTES_STORE)
    const index = store.index("contentId")

    return new Promise((resolve, reject) => {
      const request = index.getAll(contentId)

      request.onsuccess = () => {
        // Sort by position
        const notes = request.result
        notes.sort((a, b) => a.position - b.position)
        resolve(notes)
      }
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error getting content notes:", error)
    throw error
  }
}

// Delete a note
export async function deleteNote(noteId: string): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(NOTES_STORE, "readwrite")
    const store = transaction.objectStore(NOTES_STORE)

    return new Promise((resolve, reject) => {
      const request = store.delete(noteId)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error deleting note:", error)
    throw error
  }
}

// Save a highlight
export async function saveHighlight(
  contentId: string,
  highlight: {
    text: string
    startPosition: number
    endPosition: number
    color?: string
  },
): Promise<string> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(HIGHLIGHTS_STORE, "readwrite")
    const store = transaction.objectStore(HIGHLIGHTS_STORE)

    const highlightId = `highlight-${contentId}-${Date.now()}`
    const highlightData = {
      id: highlightId,
      contentId,
      ...highlight,
      color: highlight.color || "yellow",
      createdAt: new Date().toISOString(),
    }

    return new Promise((resolve, reject) => {
      const request = store.add(highlightData)

      request.onsuccess = () => resolve(highlightId)
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error saving highlight:", error)
    throw error
  }
}

// Get all highlights for a content item
export async function getContentHighlights(contentId: string): Promise<any[]> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(HIGHLIGHTS_STORE, "readonly")
    const store = transaction.objectStore(HIGHLIGHTS_STORE)
    const index = store.index("contentId")

    return new Promise((resolve, reject) => {
      const request = index.getAll(contentId)

      request.onsuccess = () => {
        // Sort by position
        const highlights = request.result
        highlights.sort((a, b) => a.startPosition - b.startPosition)
        resolve(highlights)
      }
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error getting content highlights:", error)
    throw error
  }
}

// Delete a highlight
export async function deleteHighlight(highlightId: string): Promise<void> {
  try {
    const db = await openDatabase()
    const transaction = db.transaction(HIGHLIGHTS_STORE, "readwrite")
    const store = transaction.objectStore(HIGHLIGHTS_STORE)

    return new Promise((resolve, reject) => {
      const request = store.delete(highlightId)

      request.onsuccess = () => resolve()
      request.onerror = () => reject(request.error)

      transaction.oncomplete = () => db.close()
    })
  } catch (error) {
    console.error("Error deleting highlight:", error)
    throw error
  }
}

// Get storage usage statistics
export async function getStorageStats(): Promise<{
  books: number
  businessPlans: number
  totalSize: number
}> {
  try {
    const db = await openDatabase()
    const booksTx = db.transaction(BOOKS_STORE, "readonly")
    const bpTx = db.transaction(BUSINESS_PLANS_STORE, "readonly")

    const booksStore = booksTx.objectStore(BOOKS_STORE)
    const bpStore = bpTx.objectStore(BUSINESS_PLANS_STORE)

    const booksCountPromise = new Promise<number>((resolve, reject) => {
      const request = booksStore.count()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })

    const bpCountPromise = new Promise<number>((resolve, reject) => {
      const request = bpStore.count()
      request.onsuccess = () => resolve(request.result)
      request.onerror = () => reject(request.error)
    })

    // Estimate storage size (this is an approximation)
    const [booksCount, bpCount] = await Promise.all([booksCountPromise, bpCountPromise])

    // Rough estimate: average book is 50KB, average business plan is 30KB
    const totalSize = (booksCount * 50 + bpCount * 30) * 1024

    return {
      books: booksCount,
      businessPlans: bpCount,
      totalSize,
    }
  } catch (error) {
    console.error("Error getting storage stats:", error)
    throw error
  }
}

// Clear all offline data (for troubleshooting or reset)
export async function clearAllOfflineData(): Promise<void> {
  try {
    const db = await openDatabase()
    const stores = [BOOKS_STORE, BUSINESS_PLANS_STORE, READING_PROGRESS_STORE, NOTES_STORE, HIGHLIGHTS_STORE]

    const clearPromises = stores.map((storeName) => {
      return new Promise<void>((resolve, reject) => {
        const transaction = db.transaction(storeName, "readwrite")
        const store = transaction.objectStore(storeName)
        const request = store.clear()

        request.onsuccess = () => resolve()
        request.onerror = () => reject(request.error)

        transaction.oncomplete = () => db.close()
      })
    })

    await Promise.all(clearPromises)
  } catch (error) {
    console.error("Error clearing offline data:", error)
    throw error
  }
}

