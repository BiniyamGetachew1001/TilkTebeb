import { NextResponse } from "next/server"

// Define user types
interface User {
  id: string
  firstName: string
  lastName: string
  email: string
  plan: "base" | "small" | "medium" | "large"
  createdAt: string
  lastLogin?: string
  status: "active" | "inactive" | "suspended"
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
    lastLogin: "2023-05-20T08:30:00Z",
    status: "active",
  },
  {
    id: "user-2",
    firstName: "Jane",
    lastName: "Smith",
    email: "jane.smith@example.com",
    plan: "base",
    createdAt: "2023-03-22T00:00:00Z",
    lastLogin: "2023-05-18T14:45:00Z",
    status: "active",
  },
  {
    id: "user-3",
    firstName: "Michael",
    lastName: "Brown",
    email: "michael.brown@example.com",
    plan: "large",
    createdAt: "2023-02-10T00:00:00Z",
    lastLogin: "2023-05-15T10:20:00Z",
    status: "active",
  },
  {
    id: "user-4",
    firstName: "Sarah",
    lastName: "Williams",
    email: "sarah.williams@example.com",
    plan: "small",
    createdAt: "2023-04-05T00:00:00Z",
    lastLogin: "2023-05-19T16:10:00Z",
    status: "inactive",
  },
]

// GET handler for retrieving all users (admin view)
export async function GET() {
  // In a real application, you would:
  // 1. Authenticate the admin user
  // 2. Retrieve users from a database
  // 3. Implement pagination and filtering

  return NextResponse.json(usersDB)
}

// POST handler for creating a new user
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.firstName || !body.lastName || !body.email || !body.plan) {
      return NextResponse.json({ error: "Missing required fields (firstName, lastName, email, plan)" }, { status: 400 })
    }

    // Check if user with the same email already exists
    const existingUser = usersDB.find((user) => user.email.toLowerCase() === body.email.toLowerCase())
    if (existingUser) {
      return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
    }

    // Generate ID (in a real app, you'd use a UUID or similar)
    const id = `user-${usersDB.length + 1}`

    // Create new user
    const newUser: User = {
      id,
      firstName: body.firstName,
      lastName: body.lastName,
      email: body.email,
      plan: body.plan,
      createdAt: new Date().toISOString(),
      status: body.status || "active",
    }

    // In a real application, you would:
    // 1. Save the user to a database
    // 2. Handle password hashing
    // 3. Send welcome email

    // For demo purposes, we'll just add it to our in-memory array
    usersDB.push(newUser)

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    console.error("Error creating user:", error)
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 })
  }
}

