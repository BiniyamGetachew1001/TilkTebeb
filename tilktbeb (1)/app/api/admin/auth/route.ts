import { NextResponse } from "next/server"

// Define admin user types
interface AdminUser {
  id: string
  username: string
  email: string
  role: "admin" | "editor"
  createdAt: string
}

// Sample admin user database
const adminUsersDB: AdminUser[] = [
  {
    id: "admin-1",
    username: "admin",
    email: "admin@telktibeb.com",
    role: "admin",
    createdAt: "2023-01-01T00:00:00Z",
  },
  {
    id: "admin-2",
    username: "editor",
    email: "editor@telktibeb.com",
    role: "editor",
    createdAt: "2023-02-15T00:00:00Z",
  },
]

// POST handler for admin login
export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { email, password } = body

    // In a real application, you would:
    // 1. Validate the email and password
    // 2. Check against a secure database
    // 3. Use proper password hashing
    // 4. Generate a JWT or session token for admin access

    // For demo purposes, we'll just check if the email exists
    const admin = adminUsersDB.find((user) => user.email.toLowerCase() === email.toLowerCase())

    if (!admin) {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // In a real app, we would verify the password here
    // For demo, we'll assume the password is "admin123" for all admin users
    if (password !== "admin123") {
      return NextResponse.json({ error: "Invalid credentials" }, { status: 401 })
    }

    // Return admin user data (excluding sensitive information)
    return NextResponse.json({
      id: admin.id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
    })
  } catch (error) {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 })
  }
}

