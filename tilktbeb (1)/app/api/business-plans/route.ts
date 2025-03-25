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

// Sample database of business plans
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
  {
    id: "small-2",
    title: "Freelance Web Development",
    category: "Technology",
    size: "small",
    description: "A detailed business plan for starting and growing a freelance web development business.",
    overview: `
      <h3>Executive Summary</h3>
      <p>This business plan outlines the establishment of a freelance web development business focused on creating custom websites and web applications for small to medium-sized businesses. The business will operate remotely with minimal overhead costs.</p>
      
      <h3>Business Concept</h3>
      <ul>
        <li>Custom website development</li>
        <li>Web application development</li>
        <li>Website maintenance and support</li>
        <li>SEO and digital marketing services</li>
      </ul>
      
      <h3>Target Market</h3>
      <ul>
        <li>Small businesses needing online presence</li>
        <li>Medium-sized companies requiring web applications</li>
        <li>Startups with limited budgets</li>
        <li>Non-profit organizations</li>
      </ul>
    `,
    marketAnalysis: `
      <h3>Market Overview</h3>
      <p>The web development industry continues to grow as businesses increasingly recognize the importance of online presence. Key market trends include:</p>
      <ul>
        <li>Increasing demand for mobile-responsive websites</li>
        <li>Growing need for e-commerce functionality</li>
        <li>Rising importance of user experience (UX) design</li>
        <li>Shift toward progressive web applications</li>
      </ul>
      
      <h3>Competitive Analysis</h3>
      <p>Competition includes:</p>
      <ul>
        <li>Other freelance developers</li>
        <li>Web development agencies</li>
        <li>DIY website builders (Wix, Squarespace)</li>
      </ul>
      
      <h3>Competitive Advantage</h3>
      <ul>
        <li>Personalized service and direct client communication</li>
        <li>Lower overhead costs than agencies</li>
        <li>Specialized expertise in modern frameworks</li>
        <li>Flexible pricing models</li>
      </ul>
    `,
    financials: `
      <h3>Startup Costs</h3>
      <ul>
        <li>Computer equipment: $3,000</li>
        <li>Software subscriptions: $1,200/year</li>
        <li>Website and hosting: $500</li>
        <li>Business registration: $300</li>
        <li>Initial marketing: $1,000</li>
      </ul>
      
      <h3>Financial Projections</h3>
      <p>Year 1:</p>
      <ul>
        <li>Revenue: $60,000</li>
        <li>Expenses: $15,000</li>
        <li>Net profit: $45,000</li>
      </ul>
      
      <p>Year 2:</p>
      <ul>
        <li>Revenue: $90,000</li>
        <li>Expenses: $20,000</li>
        <li>Net profit: $70,000</li>
      </ul>
    `,
    implementation: `
      <h3>Timeline</h3>
      <ul>
        <li>Month 1: Business registration and website setup</li>
        <li>Month 2: Portfolio development</li>
        <li>Month 3: Initial marketing and networking</li>
        <li>Month 4-6: Secure first clients and build reputation</li>
      </ul>
      
      <h3>Marketing Strategy</h3>
      <ul>
        <li>Portfolio website showcasing work</li>
        <li>Social media presence on LinkedIn and Twitter</li>
        <li>Content marketing through blog posts</li>
        <li>Networking at local business events</li>
        <li>Referral program for existing clients</li>
      </ul>
      
      <h3>Risk Mitigation</h3>
      <ul>
        <li>Diversify client base to avoid dependency</li>
        <li>Maintain emergency fund for slow periods</li>
        <li>Continuous skill development</li>
        <li>Clear contracts and scope definitions</li>
      </ul>
    `,
    isPremium: false,
  },
  {
    id: "small-3",
    title: "Mobile Food Truck",
    category: "Food & Beverage",
    size: "small",
    description: "A comprehensive business plan for launching and operating a successful mobile food truck business.",
    overview: `
      <h3>Executive Summary</h3>
      <p>This business plan outlines the establishment of a mobile food truck business serving specialty cuisine with a focus on fresh, locally-sourced ingredients. The food truck will operate in high-traffic urban areas, business districts, and special events.</p>
      
      <h3>Business Concept</h3>
      <ul>
        <li>Specialty cuisine with unique menu offerings</li>
        <li>Focus on fresh, locally-sourced ingredients</li>
        <li>Mobile operation with multiple locations</li>
        <li>Social media-driven marketing and location updates</li>
      </ul>
      
      <h3>Target Market</h3>
      <ul>
        <li>Urban professionals (25-45)</li>
        <li>Lunch crowds in business districts</li>
        <li>Event attendees (festivals, concerts, etc.)</li>
        <li>Food enthusiasts seeking unique dining experiences</li>
      </ul>
    `,
    marketAnalysis: `
      <h3>Market Overview</h3>
      <p>The food truck industry has experienced significant growth in recent years. Key market trends include:</p>
      <ul>
        <li>Increasing consumer interest in diverse, ethnic cuisines</li>
        <li>Growing preference for quick, affordable dining options</li>
        <li>Rising demand for sustainable and locally-sourced food</li>
        <li>Popularity of unique dining experiences</li>
      </ul>
      
      <h3>Competitive Analysis</h3>
      <p>Competition includes:</p>
      <ul>
        <li>Other food trucks (varying cuisines)</li>
        <li>Quick-service restaurants</li>
        <li>Fast-casual dining establishments</li>
        <li>Cafes and delis</li>
      </ul>
      
      <h3>Competitive Advantage</h3>
      <ul>
        <li>Unique menu offerings not available elsewhere</li>
        <li>Mobility to follow customer demand</li>
        <li>Lower overhead costs than traditional restaurants</li>
        <li>Strong social media presence and following</li>
      </ul>
    `,
    financials: `
      <h3>Startup Costs</h3>
      <ul>
        <li>Food truck purchase/renovation: $50,000</li>
        <li>Kitchen equipment: $15,000</li>
        <li>Initial inventory: $3,000</li>
        <li>Permits and licenses: $2,000</li>
        <li>Insurance: $2,500</li>
        <li>Marketing and branding: $3,000</li>
      </ul>
      
      <h3>Financial Projections</h3>
      <p>Year 1:</p>
      <ul>
        <li>Revenue: $180,000</li>
        <li>Expenses: $150,000</li>
        <li>Net profit: $30,000</li>
      </ul>
      
      <p>Year 2:</p>
      <ul>
        <li>Revenue: $250,000</li>
        <li>Expenses: $190,000</li>
        <li>Net profit: $60,000</li>
      </ul>
    `,
    implementation: `
      <h3>Timeline</h3>
      <ul>
        <li>Month 1-2: Food truck acquisition and renovation</li>
        <li>Month 2-3: Menu development and testing</li>
        <li>Month 3: Permits and licenses acquisition</li>
        <li>Month 4: Staff hiring and training</li>
        <li>Month 5: Soft launch and marketing</li>
        <li>Month 6: Full operation</li>
      </ul>
      
      <h3>Marketing Strategy</h3>
      <ul>
        <li>Strong social media presence with location updates</li>
        <li>Distinctive branding and truck design</li>
        <li>Participation in food truck festivals and events</li>
        <li>Loyalty program for repeat customers</li>
        <li>Partnerships with local businesses and offices</li>
      </ul>
      
      <h3>Risk Mitigation</h3>
      <ul>
        <li>Weather contingency plans</li>
        <li>Diversified location strategy</li>
        <li>Comprehensive insurance coverage</li>
        <li>Flexible menu to adapt to ingredient availability and costs</li>
        <li>Maintenance fund for vehicle repairs</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "medium-1",
    title: "Boutique Digital Agency",
    category: "Marketing",
    size: "medium",
    description: "A comprehensive business plan for establishing and growing a boutique digital marketing agency.",
    overview: `
      <h3>Executive Summary</h3>
      <p>This business plan outlines the establishment of a boutique digital agency specializing in comprehensive digital marketing services for small to medium-sized businesses. The agency will focus on delivering personalized, results-driven strategies across multiple digital channels.</p>
      
      <h3>Business Concept</h3>
      <ul>
        <li>Full-service digital marketing solutions</li>
        <li>Data-driven strategy development</li>
        <li>Creative content production</li>
        <li>Performance-based pricing options</li>
      </ul>
      
      <h3>Target Market</h3>
      <ul>
        <li>Small to medium-sized businesses</li>
        <li>E-commerce companies</li>
        <li>Professional service providers</li>
        <li>Local businesses seeking growth</li>
      </ul>
    `,
    marketAnalysis: `
      <h3>Market Overview</h3>
      <p>The digital marketing industry continues to grow as businesses increasingly shift advertising budgets to digital channels. Key market trends include:</p>
      <ul>
        <li>Increasing focus on ROI and measurable results</li>
        <li>Growing importance of content marketing</li>
        <li>Rising demand for video and interactive content</li>
        <li>Shift toward personalized marketing experiences</li>
      </ul>
      
      <h3>Competitive Analysis</h3>
      <p>Competition includes:</p>
      <ul>
        <li>Large full-service agencies</li>
        <li>Specialized boutique agencies</li>
        <li>Freelancers and consultants</li>
        <li>In-house marketing departments</li>
      </ul>
      
      <h3>Competitive Advantage</h3>
      <ul>
        <li>Personalized service with dedicated account managers</li>
        <li>Flexible engagement models</li>
        <li>Specialized expertise in emerging platforms</li>
        <li>Data-driven approach with transparent reporting</li>
      </ul>
    `,
    financials: `
      <h3>Startup Costs</h3>
      <ul>
        <li>Office space and setup: $30,000</li>
        <li>Technology and software: $20,000</li>
        <li>Initial staffing: $150,000</li>
        <li>Legal and administrative: $5,000</li>
        <li>Marketing and branding: $15,000</li>
        <li>Working capital: $80,000</li>
      </ul>
      
      <h3>Financial Projections</h3>
      <p>Year 1:</p>
      <ul>
        <li>Revenue: $500,000</li>
        <li>Expenses: $450,000</li>
        <li>Net profit: $50,000</li>
      </ul>
      
      <p>Year 2:</p>
      <ul>
        <li>Revenue: $900,000</li>
        <li>Expenses: $750,000</li>
        <li>Net profit: $150,000</li>
      </ul>
      
      <p>Year 3:</p>
      <ul>
        <li>Revenue: $1,500,000</li>
        <li>Expenses: $1,200,000</li>
        <li>Net profit: $300,000</li>
      </ul>
    `,
    implementation: `
      <h3>Timeline</h3>
      <ul>
        <li>Month 1-2: Business setup and registration</li>
        <li>Month 2-3: Office setup and initial hiring</li>
        <li>Month 3-4: Service development and pricing strategy</li>
        <li>Month 4-5: Marketing and initial client acquisition</li>
        <li>Month 6: Full operation with initial clients</li>
      </ul>
      
      <h3>Marketing Strategy</h3>
      <ul>
        <li>Showcase website with case studies and results</li>
        <li>Content marketing demonstrating expertise</li>
        <li>Strategic partnerships with complementary service providers</li>
        <li>Networking at industry events</li>
        <li>Referral program for existing clients</li>
      </ul>
      
      <h3>Organizational Structure</h3>
      <ul>
        <li>Founder/CEO: Strategic direction and business development</li>
        <li>Creative Director: Oversees content and design</li>
        <li>Digital Marketing Strategist: Campaign planning and execution</li>
        <li>Account Managers: Client relationship management</li>
        <li>Specialists: SEO, PPC, Social Media, Content Creation</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "large-1",
    title: "Enterprise SaaS Platform",
    category: "Technology",
    size: "large",
    description: "A comprehensive business plan for developing and scaling an enterprise SaaS platform.",
    overview: `
      <h3>Executive Summary</h3>
      <p>This business plan outlines the development and scaling of an enterprise Software-as-a-Service (SaaS) platform designed to solve specific industry challenges. The platform will be built on a subscription model with tiered pricing based on features and user counts.</p>
      
      <h3>Business Concept</h3>
      <ul>
        <li>Cloud-based enterprise software solution</li>
        <li>Subscription-based revenue model</li>
        <li>Modular architecture for customization</li>
        <li>API-first approach for integration</li>
      </ul>
      
      <h3>Target Market</h3>
      <ul>
        <li>Mid-market enterprises (100-1000 employees)</li>
        <li>Large corporations (1000+ employees)</li>
        <li>Specific industry verticals with unique challenges</li>
        <li>Organizations undergoing digital transformation</li>
      </ul>
    `,
    marketAnalysis: `
      <h3>Market Overview</h3>
      <p>The enterprise SaaS market continues to grow as organizations increasingly adopt cloud-based solutions. Key market trends include:</p>
      <ul>
        <li>Shift from on-premise to cloud-based solutions</li>
        <li>Growing demand for integrated platforms</li>
        <li>Increasing focus on data security and compliance</li>
        <li>Rising importance of AI and automation</li>
      </ul>
      
      <h3>Competitive Analysis</h3>
      <p>Competition includes:</p>
      <ul>
        <li>Established enterprise software vendors</li>
        <li>Specialized SaaS providers</li>
        <li>Legacy systems with cloud offerings</li>
        <li>In-house developed solutions</li>
      </ul>
      
      <h3>Competitive Advantage</h3>
      <ul>
        <li>Modern, user-friendly interface</li>
        <li>Flexible integration capabilities</li>
        <li>Industry-specific features and workflows</li>
        <li>Advanced analytics and reporting</li>
        <li>Responsive customer support and implementation services</li>
      </ul>
    `,
    financials: `
      <h3>Startup Costs</h3>
      <ul>
        <li>Product development: $1,500,000</li>
        <li>Infrastructure and hosting: $200,000</li>
        <li>Initial team: $1,000,000</li>
        <li>Sales and marketing: $500,000</li>
        <li>Legal and compliance: $150,000</li>
        <li>Office and operations: $250,000</li>
        <li>Working capital: $1,400,000</li>
      </ul>
      
      <h3>Financial Projections</h3>
      <p>Year 1:</p>
      <ul>
        <li>Revenue: $1,000,000</li>
        <li>Expenses: $3,000,000</li>
        <li>Net loss: $2,000,000</li>
      </ul>
      
      <p>Year 2:</p>
      <ul>
        <li>Revenue: $3,500,000</li>
        <li>Expenses: $4,500,000</li>
        <li>Net loss: $1,000,000</li>
      </ul>
      
      <p>Year 3:</p>
      <ul>
        <li>Revenue: $8,000,000</li>
        <li>Expenses: $6,000,000</li>
        <li>Net profit: $2,000,000</li>
      </ul>
      
      <p>Year 5:</p>
      <ul>
        <li>Revenue: $25,000,000</li>
        <li>Expenses: $15,000,000</li>
        <li>Net profit: $10,000,000</li>
      </ul>
    `,
    implementation: `
      <h3>Development Timeline</h3>
      <ul>
        <li>Months 1-6: MVP development</li>
        <li>Months 7-9: Beta testing with select customers</li>
        <li>Month 10: Initial public release</li>
        <li>Months 11-18: Feature expansion and platform maturation</li>
        <li>Months 19-24: Enterprise feature set and scaling</li>
      </ul>
      
      <h3>Go-to-Market Strategy</h3>
      <ul>
        <li>Initial focus on specific industry vertical</li>
        <li>Content marketing establishing thought leadership</li>
        <li>Direct sales team for enterprise clients</li>
        <li>Strategic partnerships with consultancies and integrators</li>
        <li>Industry conferences and events</li>
      </ul>
      
      <h3>Organizational Structure</h3>
      <ul>
        <li>Executive team: CEO, CTO, CFO, CMO</li>
        <li>Product development: Engineering, Product Management, Design</li>
        <li>Customer success: Implementation, Support, Training</li>
        <li>Sales and marketing: Direct Sales, Marketing, Partnerships</li>
        <li>Operations: Finance, HR, Legal, IT</li>
      </ul>
      
      <h3>Funding Strategy</h3>
      <ul>
        <li>Seed round: $2M for MVP development</li>
        <li>Series A: $5M for initial market entry</li>
        <li>Series B: $15M for scaling and expansion</li>
        <li>Potential Series C or strategic acquisition in year 4-5</li>
      </ul>
    `,
    isPremium: true,
  },
]

// GET handler for retrieving all business plans or filtered plans
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extract query parameters
  const size = searchParams.get("size")
  const category = searchParams.get("category")
  const query = searchParams.get("query")
  const premium = searchParams.get("premium")

  // Filter business plans based on query parameters
  let filteredPlans = [...businessPlansDB]

  if (size && size !== "all") {
    filteredPlans = filteredPlans.filter((plan) => plan.size === size)
  }

  if (category && category !== "all") {
    filteredPlans = filteredPlans.filter((plan) => plan.category.toLowerCase() === category.toLowerCase())
  }

  if (query) {
    const searchQuery = query.toLowerCase()
    filteredPlans = filteredPlans.filter(
      (plan) => plan.title.toLowerCase().includes(searchQuery) || plan.category.toLowerCase().includes(searchQuery),
    )
  }

  if (premium !== null) {
    const isPremium = premium === "true"
    filteredPlans = filteredPlans.filter((plan) => plan.isPremium === isPremium)
  }

  // Return only the necessary information for listing
  const planPreviews = filteredPlans.map((plan) => ({
    id: plan.id,
    title: plan.title,
    category: plan.category,
    size: plan.size,
    description: plan.description,
    isPremium: plan.isPremium,
  }))

  return NextResponse.json(planPreviews)
}

