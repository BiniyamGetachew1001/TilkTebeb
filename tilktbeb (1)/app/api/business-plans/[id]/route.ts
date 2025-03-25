import { NextResponse } from "next/server"

// Define types for business plans
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

// Sample database of business plans (simplified version - in a real app, this would be in a shared data file)
const businessPlansDB: BusinessPlan[] = [
  {
    id: "small-1",
    title: "Local Coffee Shop",
    category: "Food & Beverage",
    size: "small",
    description: "A comprehensive business plan for starting and operating a successful local coffee shop.",
    overview: `
      <h3>Executive Summary</h3>
      <p>This business plan outlines the establishment of a cozy, community-focused coffee shop that serves premium coffee and light food items. The shop will be located in a high-traffic area with significant foot traffic and limited direct competition.</p>
      
      <h3>Business Concept</h3>
      <ul>
        <li>Premium coffee and espresso drinks</li>
        <li>Fresh pastries and light meals</li>
        <li>Comfortable seating and free Wi-Fi</li>
        <li>Focus on sustainable practices</li>
      </ul>
      
      <h3>Target Market</h3>
      <ul>
        <li>Young professionals (25-40)</li>
        <li>College students</li>
        <li>Remote workers</li>
        <li>Local residents</li>
      </ul>
    `,
    marketAnalysis: `
      <h3>Market Overview</h3>
      <p>The coffee shop industry continues to grow, with increasing demand for premium coffee experiences. Key market trends include:</p>
      <ul>
        <li>Growing preference for specialty coffee</li>
        <li>Increased focus on sustainability</li>
        <li>Rising demand for plant-based options</li>
        <li>Need for comfortable workspaces</li>
      </ul>
      
      <h3>Competitive Analysis</h3>
      <p>Local competition includes:</p>
      <ul>
        <li>Chain coffee shops (2 within 1km)</li>
        <li>Independent cafes (1 within 1km)</li>
        <li>Restaurants serving coffee</li>
      </ul>
      
      <h3>Competitive Advantage</h3>
      <ul>
        <li>Premium quality coffee</li>
        <li>Comfortable atmosphere</li>
        <li>Excellent customer service</li>
        <li>Strategic location</li>
      </ul>
    `,
    financials: `
      <h3>Startup Costs</h3>
      <ul>
        <li>Lease deposit and improvements: $25,000</li>
        <li>Equipment: $35,000</li>
        <li>Initial inventory: $5,000</li>
        <li>Licenses and permits: $2,000</li>
        <li>Working capital: $20,000</li>
      </ul>
      
      <h3>Financial Projections</h3>
      <p>Year 1:</p>
      <ul>
        <li>Revenue: $300,000</li>
        <li>Expenses: $270,000</li>
        <li>Net profit: $30,000</li>
      </ul>
      
      <p>Year 2:</p>
      <ul>
        <li>Revenue: $400,000</li>
        <li>Expenses: $340,000</li>
        <li>Net profit: $60,000</li>
      </ul>
    `,
    implementation: `
      <h3>Timeline</h3>
      <ul>
        <li>Month 1-2: Location selection and lease signing</li>
        <li>Month 2-3: Design and permits</li>
        <li>Month 3-4: Construction and equipment installation</li>
        <li>Month 4: Staff hiring and training</li>
        <li>Month 5: Soft opening and marketing</li>
        <li>Month 6: Grand opening</li>
      </ul>
      
      <h3>Marketing Strategy</h3>
      <ul>
        <li>Social media presence</li>
        <li>Local partnerships</li>
        <li>Loyalty program</li>
        <li>Community events</li>
      </ul>
      
      <h3>Risk Mitigation</h3>
      <ul>
        <li>Comprehensive insurance coverage</li>
        <li>Diverse supplier relationships</li>
        <li>Staff training programs</li>
        <li>Cash flow management</li>
      </ul>
    `,
    isPremium: false,
  },
  // Additional business plans would be here in a real implementation
]

// GET handler for retrieving a specific business plan by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  const id = params.id

  // Find the business plan with the matching ID
  const plan = businessPlansDB.find((plan) => plan.id === id)

  // If plan not found, return 404
  if (!plan) {
    return NextResponse.json({ error: "Business plan not found" }, { status: 404 })
  }

  return NextResponse.json(plan)
}

