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

// Sample user database (simplified version for the example)
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
]

// GET handler for retrieving a specific user
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find user by ID
  const user = usersDB.find((user) => user.id === id)

  if (!user) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  return NextResponse.json(user)
}

// PUT handler for updating a user
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find user by ID
    const userIndex = usersDB.findIndex((user) => user.id === id)

    if (userIndex === -1) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    // If email is being changed, check if it already exists
    if (body.email && body.email !== usersDB[userIndex].email) {
      const existingUser = usersDB.find(
        (user) => user.email.toLowerCase() === body.email.toLowerCase() && user.id !== id,
      )

      if (existingUser) {
        return NextResponse.json({ error: "A user with this email already exists" }, { status: 409 })
      }
    }

    // Update user with new data, keeping the original ID and creation date
    const updatedUser: User = {
      ...usersDB[userIndex],
      firstName: body.firstName || usersDB[userIndex].firstName,
      lastName: body.lastName || usersDB[userIndex].lastName,
      email: body.email || usersDB[userIndex].email,
      plan: body.plan || usersDB[userIndex].plan,
      status: body.status || usersDB[userIndex].status,
    }

    // In a real application, you would:
    // 1. Update the user in a database

    // For demo purposes, we'll just update our in-memory array
    usersDB[userIndex] = updatedUser

    return NextResponse.json(updatedUser)
  } catch (error) {
    console.error("Error updating user:", error)
    return NextResponse.json({ error: "Failed to update user" }, { status: 500 })
  }
}

// DELETE handler for deleting a user
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find user by ID
  const userIndex = usersDB.findIndex((user) => user.id === id)

  if (userIndex === -1) {
    return NextResponse.json({ error: "User not found" }, { status: 404 })
  }

  // In a real application, you would:
  // 1. Delete the user from a database or mark as deleted
  // 2. Handle related data cleanup

  // For demo purposes, we'll just remove it from our in-memory array
  usersDB.splice(userIndex, 1)

  return NextResponse.json({ message: "User deleted successfully" })
}

