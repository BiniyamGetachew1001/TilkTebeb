import Link from "next/link"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Star } from "lucide-react"

interface BookCardProps {
  id: string
  title: string
  author: string
  coverUrl: string
  category: string
  rating: number
}

export function BookCard({ id, title, author, coverUrl, category, rating }: BookCardProps) {
  return (
    <Link href={`/books/${id}`}>
      <Card className="book-card overflow-hidden h-full transition-all duration-300 hover:shadow-xl">
        <div className="aspect-[3/4] relative overflow-hidden rounded-t-xl">
          <img
            src={coverUrl || "/placeholder.svg"}
            alt={`${title} book cover`}
            className="object-cover w-full h-full transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 glass dark:glass-dark text-secondary text-xs px-2 py-1 rounded-full">
            {category}
          </div>
        </div>
        <CardContent className="p-4 glass dark:glass-dark">
          <h3 className="font-semibold text-lg line-clamp-1">{title}</h3>
          <p className="text-muted-foreground text-sm">{author}</p>
        </CardContent>
        <CardFooter className="p-4 pt-0 flex items-center gap-1 glass dark:glass-dark">
          <Star className="h-4 w-4 fill-secondary text-secondary" />
          <span className="text-sm font-medium">{rating.toFixed(1)}</span>
        </CardFooter>
      </Card>
    </Link>
  )
}

