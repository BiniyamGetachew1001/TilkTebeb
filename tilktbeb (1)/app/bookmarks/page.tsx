import Link from "next/link"
import { ChevronLeft } from "lucide-react"
import { BookmarksList } from "@/components/bookmarks-list"

export default function BookmarksPage() {
  return (
    <div className="container py-8 md:py-12">
      <Link href="/books" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Books</span>
      </Link>

      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight mb-2">Your Bookmarks</h1>
          <p className="text-muted-foreground">Books you've bookmarked for later reading</p>
        </div>
      </div>

      <BookmarksList />
    </div>
  )
}

