import { NextResponse } from "next/server"

// Define business plan type
interface BusinessPlan {
  id: string
  title: string
  category: string
  size: "small" | "medium" | "large"
  description: string
  overview: string
  marketAnalysis: string
  financials: string
  implementation: string
  isPremium: boolean
}

// Sample database of business plans
const businessPlansDB: BusinessPlan[] = [
  {
    id: "small-1",
    title: "Local Coffee Shop",
    category: "Food & Beverage",
    size: "small",
    description: "A comprehensive business plan for starting and operating a successful local coffee shop.",
    overview:
      "<h3>Executive Summary</h3><p>This business plan outlines the establishment of a cozy, community-focused coffee shop that serves premium coffee and light food items.</p>",
    marketAnalysis:
      "<h3>Market Overview</h3><p>The coffee shop industry continues to grow, with increasing demand for premium coffee experiences.</p>",
    financials:
      "<h3>Startup Costs</h3><ul><li>Lease deposit and improvements: $25,000</li><li>Equipment: $35,000</li></ul>",
    implementation:
      "<h3>Timeline</h3><ul><li>Month 1-2: Location selection and lease signing</li><li>Month 2-3: Design and permits</li></ul>",
    isPremium: false,
  },
  {
    id: "small-2",
    title: "Freelance Web Development",
    category: "Technology",
    size: "small",
    description: "A detailed business plan for starting and growing a freelance web development business.",
    overview:
      "<h3>Executive Summary</h3><p>This business plan outlines the establishment of a freelance web development business focused on creating custom websites and web applications.</p>",
    marketAnalysis:
      "<h3>Market Overview</h3><p>The web development industry continues to grow as businesses increasingly recognize the importance of online presence.</p>",
    financials:
      "<h3>Startup Costs</h3><ul><li>Computer equipment: $3,000</li><li>Software subscriptions: $1,200/year</li></ul>",
    implementation:
      "<h3>Timeline</h3><ul><li>Month 1: Business registration and website setup</li><li>Month 2: Portfolio development</li></ul>",
    isPremium: false,
  },
]

// GET handler for retrieving all business plans (admin view)
export async function GET() {
  // In a real application, you would:
  // 1. Authenticate the admin user
  // 2. Retrieve business plans from a database

  return NextResponse.json(businessPlansDB)
}

// POST handler for creating a new business plan
export async function POST(request: Request) {
  try {
    const body = await request.json()

    // Validate required fields
    if (!body.title || !body.category || !body.size) {
      return NextResponse.json({ error: "Missing required fields (title, category, size)" }, { status: 400 })
    }

    // Generate ID from size and title (in a real app, you'd use a UUID or similar)
    const id = `${body.size}-${businessPlansDB.filter((plan) => plan.size === body.size).length + 1}`

    // Create new business plan
    const newPlan: BusinessPlan = {
      id,
      title: body.title,
      category: body.category,
      size: body.size,
      description: body.description || "",
      overview: body.overview || "",
      marketAnalysis: body.marketAnalysis || "",
      financials: body.financials || "",
      implementation: body.implementation || "",
      isPremium: body.isPremium || false,
    }

    // In a real application, you would:
    // 1. Save the business plan to a database

    // For demo purposes, we'll just add it to our in-memory array
    businessPlansDB.push(newPlan)

    return NextResponse.json(newPlan, { status: 201 })
  } catch (error) {
    console.error("Error creating business plan:", error)
    return NextResponse.json({ error: "Failed to create business plan" }, { status: 500 })
  }
}

