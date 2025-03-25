import { NextResponse } from "next/server"

// Define payment types
interface PaymentRequest {
  userId: string
  amount: number
  plan: "base" | "small" | "medium" | "large"
  paymentMethod: "telebirr" | "cbe"
  paymentDetails: {
    phoneNumber?: string // For Telebirr
    accountNumber?: string // For CBE
    transactionId?: string
  }
}

interface PaymentResponse {
  success: boolean
  transactionId: string
  message: string
  timestamp: string
  plan: string
}

// Sample payment database
const paymentsDB: PaymentResponse[] = []

// POST handler for processing payments
export async function POST(request: Request) {
  try {
    const body: PaymentRequest = await request.json()

    // Validate request
    if (!body.userId || !body.amount || !body.plan || !body.paymentMethod) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate payment details based on method
    if (body.paymentMethod === "telebirr" && !body.paymentDetails.phoneNumber) {
      return NextResponse.json({ error: "Phone number is required for Telebirr payments" }, { status: 400 })
    }

    if (body.paymentMethod === "cbe" && !body.paymentDetails.accountNumber) {
      return NextResponse.json({ error: "Account number is required for CBE payments" }, { status: 400 })
    }

    // In a real application, you would:
    // 1. Connect to the payment gateway API (Telebirr or CBE)
    // 2. Process the payment
    // 3. Handle success/failure responses
    // 4. Update user subscription status

    // For demo purposes, we'll simulate a successful payment
    const transactionId = `TRX-${Date.now()}-${Math.floor(Math.random() * 1000)}`

    const paymentResponse: PaymentResponse = {
      success: true,
      transactionId,
      message: "Payment processed successfully",
      timestamp: new Date().toISOString(),
      plan: body.plan,
    }

    // Store the payment in our database
    paymentsDB.push(paymentResponse)

    // Return success response
    return NextResponse.json(paymentResponse)
  } catch (error) {
    console.error("Payment processing error:", error)
    return NextResponse.json({ error: "Payment processing failed" }, { status: 500 })
  }
}

// GET handler for retrieving payment history
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const userId = searchParams.get("userId")

  if (!userId) {
    return NextResponse.json({ error: "User ID is required" }, { status: 400 })
  }

  // In a real application, you would filter payments by userId
  // For demo purposes, we'll return all payments

  return NextResponse.json(paymentsDB)
}

