import { NextResponse } from "next/server"
import type { Book, BookPreview } from "@/types/book"

// Sample database of books
const booksDB: Book[] = [
  {
    id: "the-psychology-of-money",
    title: "The Psychology Of Money",
    author: "Morgan Housel",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Finance",
    rating: 4.4,
    pages: 242,
    language: "English",
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
  {
    id: "think-and-grow-rich",
    title: "Think and Grow Rich",
    author: "Napoleon Hill",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Wealth",
    rating: 4.7,
    pages: 238,
    language: "English",
    summary: `
      <p>Think and Grow Rich is a personal development and self-improvement book. While the title implies that this book deals only with how to achieve monetary wealth, the author explains that the philosophy taught in the book can be used to help people succeed in all lines of work and to do or be almost anything they want.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Desire</strong></p>
      <p>The starting point of all achievement. Not a hope, not a wish, but a keen pulsating desire which transcends everything.</p>
      
      <p><strong>2. Faith</strong></p>
      <p>Visualization of, and belief in, the attainment of desire. The emotion of faith, love, and sex are the most powerful of all the major positive emotions.</p>
      
      <p><strong>3. Autosuggestion</strong></p>
      <p>The medium for influencing the subconscious mind. Self-suggestion is the agency of control through which an individual may voluntarily feed his subconscious mind on thoughts of a creative nature.</p>
      
      <p><strong>4. Specialized Knowledge</strong></p>
      <p>Personal experiences or observations. Knowledge will not attract money, unless it is organized, and intelligently directed, through practical plans of action.</p>
    `,
    keyInsights: `
      <p><strong>1. Desire</strong></p>
      <p>The starting point of all achievement. Not a hope, not a wish, but a keen pulsating desire which transcends everything.</p>
      
      <p><strong>2. Faith</strong></p>
      <p>Visualization of, and belief in, the attainment of desire. The emotion of faith, love, and sex are the most powerful of all the major positive emotions.</p>
      
      <p><strong>3. Autosuggestion</strong></p>
      <p>The medium for influencing the subconscious mind. Self-suggestion is the agency of control through which an individual may voluntarily feed his subconscious mind on thoughts of a creative nature.</p>
      
      <p><strong>4. Specialized Knowledge</strong></p>
      <p>Personal experiences or observations. Knowledge will not attract money, unless it is organized, and intelligently directed, through practical plans of action.</p>
    `,
    applications: `
      <p><strong>For Personal Development:</strong></p>
      <ul>
        <li>Set clear, specific goals with deadlines</li>
        <li>Develop a burning desire to achieve your goals</li>
        <li>Create a definite plan and take immediate action</li>
        <li>Use autosuggestion to influence your subconscious mind</li>
      </ul>
      
      <p><strong>For Business Success:</strong></p>
      <ul>
        <li>Join or create a mastermind group for collective intelligence</li>
        <li>Transform setbacks into stepping stones through persistence</li>
        <li>Harness specialized knowledge through continuous learning</li>
        <li>Make decisions quickly and change them slowly, if at all</li>
      </ul>
    `,
    isPremium: true,
  },
  {
    id: "the-7-habits-of-highly-effective-people",
    title: "The 7 Habits of Highly Effective People",
    author: "Stephen Covey",
    coverUrl: "/placeholder.svg?height=240&width=180",
    category: "Self-Development",
    rating: 4.8,
    pages: 432,
    language: "English",
    summary: `
      <p>The 7 Habits of Highly Effective People presents an approach to being effective in attaining goals by aligning oneself to what Covey calls "true north" principles based on a character ethic that he presents as universal and timeless.</p>
      
      <h3>Key Insights:</h3>
      
      <p><strong>1. Be Proactive</strong></p>
      <p>Take responsibility for your life. Proactive people focus on what they can control rather than what they cannot.</p>
      
      <p><strong>2. Begin with the End in Mind</strong></p>
      <p>Define clear measures of success and a plan to achieve them. Start with a clear destination to understand where you are now, where you're going, and what you value most.</p>
      
      <p><strong>3. Put First Things First</strong></p>
      <p>Prioritize and execute your most important tasks based on importance rather than urgency. What matters most should never be at the mercy of what matters least.</p>
      
      <p><strong>4. Think Win-Win</strong></p>
      <p>Seek mutual benefit in all human interactions. Win-win is a frame of mind that constantly seeks mutual benefit in all interactions.</p>
    `,
    keyInsights: `
      <p><strong>1. Be Proactive</strong></p>
      <p>Take responsibility for your life. Proactive people focus on what they can control rather than what they cannot.</p>
      
      <p><strong>2. Begin with the End in Mind</strong></p>
      <p>Define clear measures of success and a plan to achieve them. Start with a clear destination to understand where you are now, where you're going, and what you value most.</p>
      
      <p><strong>3. Put First Things First</strong></p>
      <p>Prioritize and execute your most important tasks based on importance rather than urgency. What matters most should never be at the mercy of what matters least.</p>
      
      <p><strong>4. Think Win-Win</strong></p>
      <p>Seek mutual benefit in all human interactions. Win-win is a frame of mind that constantly seeks mutual benefit in all interactions.</p>
    `,
    applications: `
      <p><strong>For Personal Effectiveness:</strong></p>
      <ul>
        <li>Focus on your Circle of Influence rather than your Circle of Concern</li>
        <li>Create a personal mission statement to guide your decisions</li>
        <li>Use time management matrix to prioritize important but not urgent tasks</li>
        <li>Seek first to understand, then to be understood in communications</li>
      </ul>
      
      <p><strong>For Leadership:</strong></p>
      <ul>
        <li>Build trust through character and competence</li>
        <li>Create win-win performance agreements</li>
        <li>Practice empathic listening to understand others' perspectives</li>
        <li>Value differences and create synergy through creative cooperation</li>
      </ul>
    `,
    isPremium: true,
  },
]

// GET handler for retrieving all books or filtered books
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)

  // Extract query parameters
  const category = searchParams.get("category")
  const query = searchParams.get("query")
  const premium = searchParams.get("premium")
  const limit = Number.parseInt(searchParams.get("limit") || "100")

  // Filter books based on query parameters
  let filteredBooks = [...booksDB]

  if (category && category !== "all") {
    filteredBooks = filteredBooks.filter((book) => book.category.toLowerCase() === category.toLowerCase())
  }

  if (query) {
    const searchQuery = query.toLowerCase()
    filteredBooks = filteredBooks.filter(
      (book) => book.title.toLowerCase().includes(searchQuery) || book.author.toLowerCase().includes(searchQuery),
    )
  }

  if (premium !== null) {
    const isPremium = premium === "true"
    filteredBooks = filteredBooks.filter((book) => book.isPremium === isPremium)
  }

  // Limit the number of results
  filteredBooks = filteredBooks.slice(0, limit)

  // Convert to BookPreview type to reduce payload size
  const bookPreviews: BookPreview[] = filteredBooks.map((book) => ({
    id: book.id,
    title: book.title,
    author: book.author,
    coverUrl: book.coverUrl,
    category: book.category,
    rating: book.rating,
  }))

  return NextResponse.json(bookPreviews)
}

