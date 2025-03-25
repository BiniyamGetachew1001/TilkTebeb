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

// POST handler for user login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real application, you would:
    // 1. Validate the email and password
    // 2. Check against a secure database
    // 3. Use proper password hashing
    // 4. Generate a JWT or session token

    // For demo purposes, we'll just check if the email exists
    const user = usersDB.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (!user) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, we would verify the password here
    // For demo, we'll assume the password is correct if the email exists

    // Return user data (excluding sensitive information)
    return NextResponse.json({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      plan: user.plan,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

