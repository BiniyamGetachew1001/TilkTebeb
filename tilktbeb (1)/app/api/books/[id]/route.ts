import { NextResponse } from "next/server"
import type { Book } from "@/types/book"

// Sample database of books (simplified version - in a real app, this would be in a shared data file)
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
    summary: `
      <p>The Psychology of Money explores how money moves around in an economy and how people behave with it. The author, Morgan Housel, provides timeless lessons on wealth, greed, and happiness.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Financial success is not a hard science</strong></p>
      <p>It's a soft skill where how you behave is more important than what you know. Financial outcomes are driven by luck, independent of intelligence and effort.</p>
      
      <p><strong>2. No one is crazy with money</strong></p>
      <p>People make financial decisions based on their unique experiences, their own personal history, unique worldview, ego, pride, marketing, and odd incentives.</p>
      
      <p><strong>3. Luck and risk are siblings</strong></p>
      <p>They are both the reality that every outcome in life is guided by forces other than individual effort. They both happen because the world is too complex to allow 100% of your actions to dictate 100% of your outcomes.</p>
      
      <p><strong>4. Never enough</strong></p>
      <p>When rich people do crazy things, it's often a case of trying to feel valued after already having more money than they know what to do with.</p>
    `,
    keyInsights: `
      <p><strong>1. Financial success is not a hard science</strong></p>
      <p>It's a soft skill where how you behave is more important than what you know. Financial outcomes are driven by luck, independent of intelligence and effort.</p>
      
      <p><strong>2. No one is crazy with money</strong></p>
      <p>People make financial decisions based on their unique experiences, their own personal history, unique worldview, ego, pride, marketing, and odd incentives.</p>
      
      <p><strong>3. Luck and risk are siblings</strong></p>
      <p>They are both the reality that every outcome in life is guided by forces other than individual effort. They both happen because the world is too complex to allow 100% of your actions to dictate 100% of your outcomes.</p>
      
      <p><strong>4. Never enough</strong></p>
      <p>When rich people do crazy things, it's often a case of trying to feel valued after already having more money than they know what to do with.</p>
    `,
    applications: `
      <p><strong>For Personal Finance:</strong></p>
      <ul>
        <li>Save money without a specific goal in mind</li>
        <li>Gain control over your time</li>
        <li>Be reasonable rather than rational</li>
        <li>Aim for enough, not for maximum</li>
      </ul>
      
      <p><strong>For Investors:</strong></p>
      <ul>
        <li>Understand the role of luck and risk</li>
        <li>Know that getting wealthy and staying wealthy are different skills</li>
        <li>Long tails drive everything - a small number of events can account for the majority of outcomes</li>
        <li>Use room for error when investing - prepare for a range of outcomes</li>
      </ul>
    `,
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
    summary: `
      <p>Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Habits are the compound interest of self-improvement</strong></p>
      <p>Small changes often appear to make no difference until you cross a critical threshold. The effects of your habits multiply as you repeat them.</p>
      
      <p><strong>2. Focus on systems instead of goals</strong></p>
      <p>Goals are about the results you want to achieve. Systems are about the processes that lead to those results. Focus on the system, not the goal.</p>
      
      <p><strong>3. The Four Laws of Behavior Change</strong></p>
      <p>Make it obvious, make it attractive, make it easy, and make it satisfying. These are the fundamental principles behind habit formation.</p>
      
      <p><strong>4. Identity-based habits</strong></p>
      <p>The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.</p>
    `,
    keyInsights: `
      <p><strong>1. Habits are the compound interest of self-improvement</strong></p>
      <p>Small changes often appear to make no difference until you cross a critical threshold. The effects of your habits multiply as you repeat them.</p>
      
      <p><strong>2. Focus on systems instead of goals</strong></p>
      <p>Goals are about the results you want to achieve. Systems are about the processes that lead to those results. Focus on the system, not the goal.</p>
      
      <p><strong>3. The Four Laws of Behavior Change</strong></p>
      <p>Make it obvious, make it attractive, make it easy, and make it satisfying. These are the fundamental principles behind habit formation.</p>
      
      <p><strong>4. Identity-based habits</strong></p>
      <p>The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.</p>
    `,
    applications: `
      <p><strong>For Personal Development:</strong></p>
      <ul>
        <li>Start with an incredibly small habit</li>
        <li>Increase your habit in very small ways</li>
        <li>Break habits into chunks</li>
        <li>When you slip, get back on track quickly</li>
      </ul>
      
      <p><strong>For Business:</strong></p>
      <ul>
        <li>Create an environment where doing the right thing is as easy as possible</li>
        <li>Make good habits obvious in your environment</li>
        <li>Reduce friction for good habits</li>
        <li>Increase friction for bad habits</li>
      </ul>
    `,
    isPremium: false,
  },
  // Additional books would be here in a real implementation
]

// GET handler for retrieving a specific book by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the book with the matching ID
  const book = booksDB.find((book) => book.id === id)

  // If book not found, return 404
  if (!book) {
    return NextResponse.json({ error: "Book not found" }, { status: 404 })
  }

  return NextResponse.json(book)
}

