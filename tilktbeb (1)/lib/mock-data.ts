import type { Book, BookPreview } from "@/types/book"

// Mock data for books - this will be replaced by Django API calls
export const mockBooks: Book[] = [
  {
    id: "the-psychology-of-money",
    title: "The Psychology Of Money",
    author: "Morgan Housel",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Finance",
    rating: 4.4,
    pages: 242,
    language: "English",
    price: 12.99,
    summary: `
      <p>The Psychology of Money explores how money moves around in an economy and how people behave with it. The author, Morgan Housel, provides timeless lessons on wealth, greed, and happiness.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Financial success is not a hard science</strong></p>
      <p>It's a soft skill where how you behave is more important than what you know. Financial outcomes are driven by luck, independent of intelligence and effort.</p>
      
      <p><strong>2. No one is crazy with money</strong></p>
      <p>People make financial decisions based on their unique experiences, their own personal history, unique worldview, ego, pride, marketing, and odd incentives.</p>
      
      <p><strong>3. Luck and risk are siblings</strong></p>
      <p>They are both the reality that every outcome in life is guided by forces other than individual effort. They both happen because the world is too complex to allow 100% of your actions to dictate 100% of your outcomes.</p>
      
      <p><strong>4. Never enough</strong></p>
      <p>When rich people do crazy things, it's often a case of trying to feel valued after already having more money than they know what to do with.</p>
    `,
    keyInsights: `
      <p><strong>1. Financial success is not a hard science</strong></p>
      <p>It's a soft skill where how you behave is more important than what you know. Financial outcomes are driven by luck, independent of intelligence and effort.</p>
      
      <p><strong>2. No one is crazy with money</strong></p>
      <p>People make financial decisions based on their unique experiences, their own personal history, unique worldview, ego, pride, marketing, and odd incentives.</p>
      
      <p><strong>3. Luck and risk are siblings</strong></p>
      <p>They are both the reality that every outcome in life is guided by forces other than individual effort. They both happen because the world is too complex to allow 100% of your actions to dictate 100% of your outcomes.</p>
      
      <p><strong>4. Never enough</strong></p>
      <p>When rich people do crazy things, it's often a case of trying to feel valued after already having more money than they know what to do with.</p>
    `,
    applications: `
      <p><strong>For Personal Finance:</strong></p>
      <ul>
        <li>Save money without a specific goal in mind</li>
        <li>Gain control over your time</li>
        <li>Be reasonable rather than rational</li>
        <li>Aim for enough, not for maximum</li>
      </ul>
      
      <p><strong>For Investors:</strong></p>
      <ul>
        <li>Understand the role of luck and risk</li>
        <li>Know that getting wealthy and staying wealthy are different skills</li>
        <li>Long tails drive everything - a small number of events can account for the majority of outcomes</li>
        <li>Use room for error when investing - prepare for a range of outcomes</li>
      </ul>
    `,
    isPremium: false,
  },
  {
    id: "atomic-habits",
    title: "Atomic Habits",
    author: "James Clear",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Productivity",
    rating: 4.9,
    pages: 320,
    language: "English",
    price: 13.99,
    summary: `
      <p>Atomic Habits offers a proven framework for improving every day. James Clear reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Habits are the compound interest of self-improvement</strong></p>
      <p>Small changes often appear to make no difference until you cross a critical threshold. The effects of your habits multiply as you repeat them.</p>
      
      <p><strong>2. Focus on systems instead of goals</strong></p>
      <p>Goals are about the results you want to achieve. Systems are about the processes that lead to those results. Focus on the system, not the goal.</p>
      
      <p><strong>3. The Four Laws of Behavior Change</strong></p>
      <p>Make it obvious, make it attractive, make it easy, and make it satisfying. These are the fundamental principles behind habit formation.</p>
      
      <p><strong>4. Identity-based habits</strong></p>
      <p>The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.</p>
    `,
    keyInsights: `
      <p><strong>1. Habits are the compound interest of self-improvement</strong></p>
      <p>Small changes often appear to make no difference until you cross a critical threshold. The effects of your habits multiply as you repeat them.</p>
      
      <p><strong>2. Focus on systems instead of goals</strong></p>
      <p>Goals are about the results you want to achieve. Systems are about the processes that lead to those results. Focus on the system, not the goal.</p>
      
      <p><strong>3. The Four Laws of Behavior Change</strong></p>
      <p>Make it obvious, make it attractive, make it easy, and make it satisfying. These are the fundamental principles behind habit formation.</p>
      
      <p><strong>4. Identity-based habits</strong></p>
      <p>The most effective way to change your habits is to focus not on what you want to achieve, but on who you wish to become.</p>
    `,
    applications: `
      <p><strong>For Personal Development:</strong></p>
      <ul>
        <li>Start with an incredibly small habit</li>
        <li>Increase your habit in very small ways</li>
        <li>Break habits into chunks</li>
        <li>When you slip, get back on track quickly</li>
      </ul>
      
      <p><strong>For Business:</strong></p>
      <ul>
        <li>Create an environment where doing the right thing is as easy as possible</li>
        <li>Make good habits obvious in your environment</li>
        <li>Reduce friction for good habits</li>
        <li>Increase friction for bad habits</li>
      </ul>
    `,
    isPremium: false,
  },
  {
    id: "sapiens",
    title: "Sapiens",
    author: "Yuval Noah Harari",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "History",
    rating: 4.7,
    pages: 464,
    language: "English",
    price: 14.99,
    summary: `
      <p>Sapiens: A Brief History of Humankind is a book by Yuval Noah Harari that explores the history and impact of Homo sapiens on the world. It traces the evolution of our species from the emergence of Homo sapiens in Africa to our current status as the dominant force on Earth.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. The Cognitive Revolution</strong></p>
      <p>Around 70,000 years ago, Homo sapiens developed unique cognitive abilities, particularly the capacity for fiction and imagination, which allowed for unprecedented cooperation among large groups.</p>
      
      <p><strong>2. The Agricultural Revolution</strong></p>
      <p>Beginning about 12,000 years ago, humans transitioned from hunting and gathering to farming, which Harari describes as "history's biggest fraud" because it led to harder work, less leisure, and poorer health for most people.</p>
      
      <p><strong>3. The Unification of Humankind</strong></p>
      <p>Over time, humans have created increasingly larger networks of cooperation through shared myths, including money, empires, and religions.</p>
      
      <p><strong>4. The Scientific Revolution</strong></p>
      <p>The last 500 years have seen an explosion of human power through the willingness to admit ignorance and the development of the scientific method.</p>
    `,
    keyInsights: `
      <p><strong>1. The Cognitive Revolution</strong></p>
      <p>Around 70,000 years ago, Homo sapiens developed unique cognitive abilities, particularly the capacity for fiction and imagination, which allowed for unprecedented cooperation among large groups.</p>
      
      <p><strong>2. The Agricultural Revolution</strong></p>
      <p>Beginning about 12,000 years ago, humans transitioned from hunting and gathering to farming, which Harari describes as "history's biggest fraud" because it led to harder work, less leisure, and poorer health for most people.</p>
      
      <p><strong>3. The Unification of Humankind</strong></p>
      <p>Over time, humans have created increasingly larger networks of cooperation through shared myths, including money, empires, and religions.</p>
      
      <p><strong>4. The Scientific Revolution</strong></p>
      <p>The last 500 years have seen an explosion of human power through the willingness to admit ignorance and the development of the scientific method.</p>
    `,
    applications: `
      <p><strong>For Understanding Society:</strong></p>
      <ul>
        <li>Recognize how shared myths and stories shape our world</li>
        <li>Understand the historical context of current social structures</li>
        <li>Question whether "progress" always means improvement</li>
        <li>Consider the ethical implications of technological advancement</li>
      </ul>
      
      <p><strong>For Business and Leadership:</strong></p>
      <ul>
        <li>Appreciate how shared narratives create cohesion in organizations</li>
        <li>Understand how money and corporations are social constructs that depend on trust</li>
        <li>Consider the long-term implications of short-term decisions</li>
        <li>Recognize patterns of human behavior that persist across time</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "zero-to-one",
    title: "Zero to One",
    author: "Peter Thiel",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Entrepreneurship",
    rating: 4.8,
    pages: 224,
    language: "English",
    price: 12.99,
    summary: `
      <p>Zero to One presents at once an optimistic view of the future of progress in America and a new way of thinking about innovation: it starts by learning to ask the questions that lead you to find value in unexpected places.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Vertical vs. Horizontal Progress</strong></p>
      <p>Horizontal progress means copying things that work—going from 1 to n. Vertical progress means doing new things—going from 0 to 1. The focus should be on creating something new rather than copying existing models.</p>

      <p><strong>2. Monopolies vs. Competition</strong></p>
      <p>Competition is for losers. Under perfect competition, no company makes economic profit. The goal should be to create a monopoly through innovation.</p>

      <p><strong>3. The Power Law</strong></p>
      <p>A small number of companies radically outperform all others. This principle applies to venture capital investments, where a single investment may return more than all others combined.</p>

      <p><strong>4. Secrets</strong></p>
      <p>Every great business is built around a secret that's hidden from the outside. Great companies find value in unexpected places by thinking about business from first principles.</p>
    `,
    keyInsights: `
      <p><strong>1. Vertical vs. Horizontal Progress</strong></p>
      <p>Horizontal progress means copying things that work—going from 1 to n. Vertical progress means doing new things—going from 0 to 1. The focus should be on creating something new rather than copying existing models.</p>

      <p><strong>2. Monopolies vs. Competition</strong></p>
      <p>Competition is for losers. Under perfect competition, no company makes economic profit. The goal should be to create a monopoly through innovation.</p>

      <p><strong>3. The Power Law</strong></p>
      <p>A small number of companies radically outperform all others. This principle applies to venture capital investments, where a single investment may return more than all others combined.</p>

      <p><strong>4. Secrets</strong></p>
      <p>Every great business is built around a secret that's hidden from the outside. Great companies find value in unexpected places by thinking about business from first principles.</p>
    `,
    applications: `
      <p><strong>For Entrepreneurs:</strong></p>
      <ul>
        <li>Focus on creating something new rather than improving existing products</li>
        <li>Aim to create a monopoly through unique technology, network effects, economies of scale, and branding</li>
        <li>Start small and monopolize a niche market before expanding</li>
        <li>Build a great team with a strong, unified vision</li>
      </ul>

      <p><strong>For Investors:</strong></p>
      <ul>
        <li>Understand that returns follow a power law—a few investments will outperform all others</li>
        <li>Look for companies with proprietary technology, network effects, economies of scale, and strong branding</li>
        <li>Evaluate the founding team's dynamics and vision</li>
        <li>Consider whether the company has discovered a unique "secret" about the market</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "good-to-great",
    title: "Good to Great",
    author: "Jim Collins",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Leadership",
    rating: 4.7,
    pages: 320,
    language: "English",
    price: 11.99,
    summary: `
      <p>Good to Great presents the findings of a five-year study by Jim Collins and his research team. The team identified a set of companies that made the leap from good results to great results and sustained those results for at least fifteen years.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Level 5 Leadership</strong></p>
      <p>Leaders who have a unique blend of personal humility and professional will. They are ambitious for the company, not themselves.</p>

      <p><strong>2. First Who, Then What</strong></p>
      <p>Get the right people on the bus, the wrong people off the bus, and the right people in the right seats—then figure out where to drive it.</p>

      <p><strong>3. Confront the Brutal Facts</strong></p>
      <p>Create a culture where people have the opportunity to be heard and where the truth is heard. Maintain unwavering faith that you can and will prevail, regardless of difficulties.</p>

      <p><strong>4. The Hedgehog Concept</strong></p>
      <p>Focus on the intersection of three circles: what you can be the best in the world at, what drives your economic engine, and what you are deeply passionate about.</p>
    `,
    keyInsights: `
      <p><strong>1. Level 5 Leadership</strong></p>
      <p>Leaders who have a unique blend of personal humility and professional will. They are ambitious for the company, not themselves.</p>

      <p><strong>2. First Who, Then What</strong></p>
      <p>Get the right people on the bus, the wrong people off the bus, and the right people in the right seats—then figure out where to drive it.</p>

      <p><strong>3. Confront the Brutal Facts</strong></p>
      <p>Create a culture where people have the opportunity to be heard and where the truth is heard. Maintain unwavering faith that you can and will prevail, regardless of difficulties.</p>

      <p><strong>4. The Hedgehog Concept</strong></p>
      <p>Focus on the intersection of three circles: what you can be the best in the world at, what drives your economic engine, and what you are deeply passionate about.</p>
    `,
    applications: `
      <p><strong>For Business Leaders:</strong></p>
      <ul>
        <li>Develop Level 5 Leadership qualities: ambition for the company over self</li>
        <li>Focus on getting the right team in place before determining strategy</li>
        <li>Create a culture of disciplined people, thought, and action</li>
        <li>Apply the Hedgehog Concept to focus resources and efforts</li>
      </ul>

      <p><strong>For Organizations:</strong></p>
      <ul>
        <li>Use technology as an accelerator, not a creator of momentum</li>
        <li>Build momentum gradually until breakthrough occurs (the flywheel effect)</li>
        <li>Maintain discipline to stick with what you can be best at</li>
        <li>Confront reality while maintaining faith in ultimate success</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "the-lean-startup",
    title: "The Lean Startup",
    author: "Eric Ries",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Startup",
    rating: 4.6,
    pages: 336,
    language: "English",
    price: 10.99,
    summary: `
      <p>The Lean Startup introduces a methodology for developing businesses and products that aims to shorten product development cycles and rapidly discover if a proposed business model is viable.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Build-Measure-Learn</strong></p>
      <p>The fundamental activity of a startup is to turn ideas into products, measure how customers respond, and then learn whether to pivot or persevere.</p>

      <p><strong>2. Minimum Viable Product (MVP)</strong></p>
      <p>The version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort.</p>

      <p><strong>3. Validated Learning</strong></p>
      <p>The process of demonstrating empirically that a team has discovered valuable truths about a startup's present and future business prospects.</p>

      <p><strong>4. Innovation Accounting</strong></p>
      <p>A quantitative approach that allows startups to prove objectively that they are learning how to grow a sustainable business.</p>
    `,
    keyInsights: `
      <p><strong>1. Build-Measure-Learn</strong></p>
      <p>The fundamental activity of a startup is to turn ideas into products, measure how customers respond, and then learn whether to pivot or persevere.</p>

      <p><strong>2. Minimum Viable Product (MVP)</strong></p>
      <p>The version of a new product that allows a team to collect the maximum amount of validated learning about customers with the least effort.</p>

      <p><strong>3. Validated Learning</strong></p>
      <p>The process of demonstrating empirically that a team has discovered valuable truths about a startup's present and future business prospects.</p>

      <p><strong>4. Innovation Accounting</strong></p>
      <p>A quantitative approach that allows startups to prove objectively that they are learning how to grow a sustainable business.</p>
    `,
    applications: `
      <p><strong>For Entrepreneurs:</strong></p>
      <ul>
        <li>Start with a minimum viable product to test assumptions quickly</li>
        <li>Use actionable metrics that demonstrate clear cause and effect</li>
        <li>Practice continuous deployment and small batch sizes</li>
        <li>Be willing to pivot when necessary based on validated learning</li>
      </ul>

      <p><strong>For Established Companies:</strong></p>
      <ul>
        <li>Create innovation teams with appropriate structures and metrics</li>
        <li>Allocate resources using innovation accounting</li>
        <li>Develop internal entrepreneurship through dedicated teams</li>
        <li>Apply lean principles to accelerate product development cycles</li>
      </ul>
    `,
    isPremium: true,
  },
  // Free books
  {
    id: "public-domain-classic-1",
    title: "The Art of War",
    author: "Sun Tzu",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Strategy",
    rating: 4.8,
    pages: 96,
    language: "English",
    price: 0,
    summary: `
      <p>The Art of War is an ancient Chinese military treatise dating from the Late Spring and Autumn Period. The work, which is attributed to the ancient Chinese military strategist Sun Tzu, is composed of 13 chapters.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Know Yourself and Your Enemy</strong></p>
      <p>If you know the enemy and know yourself, you need not fear the result of a hundred battles.</p>

      <p><strong>2. Win Without Fighting</strong></p>
      <p>The supreme excellence is to subdue the enemy without fighting.</p>

      <p><strong>3. Speed and Timing</strong></p>
      <p>Rapidity is the essence of war: take advantage of the enemy's unreadiness, make your way by unexpected routes, and attack unguarded spots.</p>

      <p><strong>4. Adaptability</strong></p>
      <p>Water shapes its course according to the nature of the ground; the soldier works out his victory in relation to the foe he is facing.</p>
    `,
    isPremium: false,
    isFree: true,
  },
  {
    id: "public-domain-classic-2",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Self-Help",
    rating: 4.7,
    pages: 320,
    language: "English",
    price: 0,
    summary: `
      <p>Think and Grow Rich is a personal development and self-help book by Napoleon Hill. The book was inspired by a suggestion from Scottish-American businessman Andrew Carnegie.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Desire</strong></p>
      <p>The starting point of all achievement is desire. Keep this constantly in mind. Weak desire brings weak results.</p>

      <p><strong>2. Faith</strong></p>
      <p>Faith is the head chemist of the mind. When faith is blended with the vibration of thought, the subconscious mind instantly picks up the vibration.</p>

      <p><strong>3. Persistence</strong></p>
      <p>Persistence is to the character of man as carbon is to steel.</p>

      <p><strong>4. The Master Mind</strong></p>
      <p>The coordination of knowledge and effort of two or more people, who work toward a definite purpose, in the spirit of harmony.</p>
    `,
    isPremium: false,
    isFree: true,
  },
  {
    id: "free-business-guide",
    title: "Starting Your First Business",
    author: "Astewai Team",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Entrepreneurship",
    rating: 4.5,
    pages: 150,
    language: "English",
    price: 0,
    summary: `
      <p>A comprehensive guide for first-time entrepreneurs, covering everything from idea validation to launching your business.</p>

      <h3>Key Insights:</h3>

      <p><strong>1. Idea Validation</strong></p>
      <p>Before investing time and money, validate your business idea with potential customers.</p>

      <p><strong>2. Market Research</strong></p>
      <p>Understanding your target market is crucial for business success.</p>

      <p><strong>3. Financial Planning</strong></p>
      <p>Create realistic financial projections and understand your funding needs.</p>

      <p><strong>4. Legal Structure</strong></p>
      <p>Choose the right business structure for your specific situation.</p>
    `,
    isPremium: false,
    isFree: true,
  },
]

// Convert to BookPreview format for listing pages
export const mockBookPreviews: BookPreview[] = mockBooks.map(book => ({
  id: book.id,
  title: book.title,
  author: book.author,
  coverUrl: book.coverUrl,
  category: book.category,
  rating: book.rating,
}))

// Business Plan types and mock data
export interface BusinessPlan {
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

export interface BusinessPlanPreview {
  id: string
  title: string
  category: string
  size: "small" | "medium" | "large"
  description: string
  isPremium: boolean
}

export const mockBusinessPlans: BusinessPlan[] = [
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
]

export const mockBusinessPlanPreviews: BusinessPlanPreview[] = mockBusinessPlans.map(plan => ({
  id: plan.id,
  title: plan.title,
  category: plan.category,
  size: plan.size,
  description: plan.description,
  isPremium: plan.isPremium,
}))
