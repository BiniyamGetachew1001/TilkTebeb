import { NextResponse } from "next/server"
import type { Book } from "@/types/book"

// Sample database of books - in a real implementation, this would be in a database
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

// GET handler for retrieving all books (admin view)
export async function GET() {
  // In a real application, you would:
  // 1. Authenticate the admin user
  // 2. Retrieve books from a database

  return NextResponse.json(booksDB)
}

// POST handler for creating a new book
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.author || !body.category) {
      return NextResponse.json({ error: "Missing required fields (title, author, category)" }, { status: 400 })
    }

    // Generate ID from title (in a real app, you'd use a UUID or similar)
    const id = body.title.toLowerCase().replace(/[^a-z0-9]+/g, "-")

    // Create new book
    const newBook: Book = {
      id,
      title: body.title,
      author: body.author,
      coverUrl: body.coverUrl || "/placeholder.svg?height=240&width=180",
      category: body.category,
      rating: body.rating || 0,
      pages: body.pages || 0,
      language: body.language || "English",
      summary: body.summary || "",
      keyInsights: body.keyInsights || "",
      applications: body.applications || "",
      isPremium: body.isPremium || false,
    }

    // In a real application, you would:
    // 1. Save the book to a database
    // 2. Handle cover image upload

    // For demo purposes, we'll just add it to our in-memory array
    booksDB.push(newBook)

    return NextResponse.json(newBook, { status: 201 })
  } catch (error) {
    console.error("Error creating book:", error)
    return NextResponse.json({ error: "Failed to create book" }, { status: 500 })
  }
}

