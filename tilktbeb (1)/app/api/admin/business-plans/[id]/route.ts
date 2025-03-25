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

// Sample database of business plans (simplified version for the example)
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

// GET handler for retrieving a specific business plan
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find business plan by ID
  const plan = businessPlansDB.find((plan) => plan.id === id)

  if (!plan) {
    return NextResponse.json({ error: "Business plan not found" }, { status: 404 })
  }

  return NextResponse.json(plan)
}

// PUT handler for updating a business plan
export async function PUT(request: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id
    const body = await request.json()

    // Find business plan by ID
    const planIndex = businessPlansDB.findIndex((plan) => plan.id === id)

    if (planIndex === -1) {
      return NextResponse.json({ error: "Business plan not found" }, { status: 404 })
    }

    // Update business plan with new data, keeping the original ID
    const updatedPlan: BusinessPlan = {
      ...businessPlansDB[planIndex],
      title: body.title || businessPlansDB[planIndex].title,
      category: body.category || businessPlansDB[planIndex].category,
      size: body.size || businessPlansDB[planIndex].size,
      description: body.description || businessPlansDB[planIndex].description,
      overview: body.overview || businessPlansDB[planIndex].overview,
      marketAnalysis: body.marketAnalysis || businessPlansDB[planIndex].marketAnalysis,
      financials: body.financials || businessPlansDB[planIndex].financials,
      implementation: body.implementation || businessPlansDB[planIndex].implementation,
      isPremium: body.isPremium !== undefined ? body.isPremium : businessPlansDB[planIndex].isPremium,
    }

    // In a real application, you would:
    // 1. Update the business plan in a database

    // For demo purposes, we'll just update our in-memory array
    businessPlansDB[planIndex] = updatedPlan

    return NextResponse.json(updatedPlan)
  } catch (error) {
    console.error("Error updating business plan:", error)
    return NextResponse.json({ error: "Failed to update business plan" }, { status: 500 })
  }
}

// DELETE handler for deleting a business plan
export async function DELETE(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find business plan by ID
  const planIndex = businessPlansDB.findIndex((plan) => plan.id === id)

  if (planIndex === -1) {
    return NextResponse.json({ error: "Business plan not found" }, { status: 404 })
  }

  // In a real application, you would:
  // 1. Delete the business plan from a database

  // For demo purposes, we'll just remove it from our in-memory array
  businessPlansDB.splice(planIndex, 1)

  return NextResponse.json({ message: "Business plan deleted successfully" })
}

