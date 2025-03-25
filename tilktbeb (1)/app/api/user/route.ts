import { NextResponse } from "next/server"

// Define user types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: "base" | "small" | "medium" | "large"
  createdAt: string
}

interface UserActivity {
  id: string
  userId: string
  type: "book_read" | "plan_viewed" | "book_saved"
  itemId: string
  itemTitle: string
  timestamp: string
}

// Sample user database
const usersDB: User[] = [
  {
    id: "user-1",
    firstName: "John",
    lastName: "Doe",
    email: "john.doe@example.com",
    plan: "medium",
    createdAt: "2023-01-15T00:00:00Z",
  },
  {
    id: "user-2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    plan: "base",
    createdAt: "2023-03-22T00:00:00Z",
  },
]

// Sample user activity database
const userActivitiesDB: UserActivity[] = [
  {
    id: "activity-1",
    userId: "user-1",
    type: "book_read",
    itemId: "the-psychology-of-money",
    itemTitle: "The Psychology of Money",
    timestamp: "2023-05-15T14:30:00Z",
  },
  {
    id: "activity-2",
    userId: "user-1",
    type: "plan_viewed",
    itemId: "small-1",
    itemTitle: "Local Coffee Shop",
    timestamp: "2023-05-14T10:15:00Z",
  },
  {
    id: "activity-3",
    userId: "user-1",
    type: "book_saved",
    itemId: "atomic-habits",
    itemTitle: "Atomic Habits",
    timestamp: "2023-05-12T16:45:00Z",
  },
]

// GET handler for retrieving user data
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // In a real application, you would:
  // 1. Authenticate the request using a JWT or session token
  // 2. Retrieve the user ID from the authenticated token

  // For demo purposes, we'll use a query parameter
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // Find the user
  const user = usersDB.find((user) => user.id === userId)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // Get user activities
  const activities = userActivitiesDB
    .filter((activity) => activity.userId === userId)
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())

  // Return user data with activities
  return NextResponse.json({
    user: {
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      plan: user.plan,
    },
    activities: activities,
  })
}

