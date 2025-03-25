import { NextResponse } from "next/server"
import type { Book } from "@/types/book"

// Sample database of books (simplified version for the example)
const booksDB: Book[] = [
  {
    id: "the-psychology-of-money",
    title: "The Psychology Of Money",
    author: "Morgan Housel",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Finance",
    rating: 4.4,
    pages: 242,
    language: "English",
    summary: "The Psychology of Money explores how money moves around in an economy and how people behave with it.",
    keyInsights:
      "1. Financial success is not a hard science. 2. No one is crazy with money. 3. Luck and risk are siblings.",
    applications:
      "For Personal Finance: Save money without a specific goal in mind. For Investors: Understand the role of luck and risk.",
    isPremium: false,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Productivity",
    rating: 4.9,
    pages: 320,
    language: "English",
    summary: "Atomic Habits offers a proven framework for improving every day.",
    keyInsights: "1. Habits are the compound interest of self-improvement. 2. Focus on systems instead of goals.",
    applications:
      "For Personal Development: Start with an incredibly small habit. For Business: Reduce friction for good habits.",
    isPremium: false,
  },
]

// GET handler for retrieving a specific book
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find book by ID
  const book = booksDB.find((book) => book.id === id)

  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

// PUT handler for updating a book
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find book by ID
    const bookIndex = booksDB.findIndex((book) => book.id === id)

    if (bookIndex === -1) {
      return NextResponse.json({ error: "Book not found" }, { status: 404 })
    }

    // Update book with new data, keeping the original ID
    const updatedBook: Book = {
      ...booksDB[bookIndex],
      title: body.title || booksDB[bookIndex].title,
      author: body.author || booksDB[bookIndex].author,
      coverUrl: body.coverUrl || booksDB[bookIndex].coverUrl,
      category: body.category || booksDB[bookIndex].category,
      rating: body.rating || booksDB[bookIndex].rating,
      pages: body.pages || booksDB[bookIndex].pages,
      language: body.language || booksDB[bookIndex].language,
      summary: body.summary || booksDB[bookIndex].summary,
      keyInsights: body.keyInsights || booksDB[bookIndex].keyInsights,
      applications: body.applications || booksDB[bookIndex].applications,
      isPremium: body.isPremium !== undefined ? body.isPremium : booksDB[bookIndex].isPremium,
    }

    // In a real application, you would:
    // 1. Update the book in a database
    // 2. Handle cover image updates

    // For demo purposes, we'll just update our in-memory array
    booksDB[bookIndex] = updatedBook

    return NextResponse.json(updatedBook)
  } catch (error) {
    console.error("Error updating book:", error)
    return NextResponse.json({ error: "Failed to update book" }, { status: 500 })
  }
}

// DELETE handler for deleting a book
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find book by ID
  const bookIndex = booksDB.findIndex((book) => book.id === id)

  if (bookIndex === -1) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  // In a real application, you would:
  // 1. Delete the book from a database
  // 2. Clean up associated resources (e.g., cover images)

  // For demo purposes, we'll just remove it from our in-memory array
  booksDB.splice(bookIndex, 1)

  return NextResponse.json({ message: "Book deleted successfully" })
}

