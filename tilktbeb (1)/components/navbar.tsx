"use client"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { BookOpen, Search, Bell } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"

interface NavbarProps {
  showFullNav?: boolean
  className?: string
}

export function Navbar({ showFullNav = true, className }: NavbarProps) {
  return (
    <header
      className={cn(
        "sticky top-0 z-30 w-full glass dark:glass-dark backdrop-blur supports-[backdrop-filter]:bg-background/60",
        className,
      )}
    >
      <div className="container flex h-16 items-center justify-between">
        {showFullNav && (
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 gold-icon" />
              <span className="font-bold text-xl">TelkTibeb</span>
            </Link>
          </div>
        )}

        <div className="flex items-center gap-4 glass dark:glass-dark rounded-full px-4 py-2 flex-1 max-w-md mx-4">
          <Search className="h-4 w-4 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search for books"
            className="border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 p-0"
          />
        </div>

        {showFullNav && (
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/books" className="text-sm font-medium transition-colors hover:text-secondary">
              Book Summaries
            </Link>
            <Link href="/business-plans" className="text-sm font-medium transition-colors hover:text-secondary">
              Business Plans
            </Link>
            <Link href="/pricing" className="text-sm font-medium transition-colors hover:text-secondary">
              Pricing
            </Link>
            <Link href="/bookmarks" className="text-sm font-medium transition-colors hover:text-secondary">
              Bookmarks
            </Link>
            <Link href="/offline-library" className="text-sm font-medium transition-colors hover:text-secondary">
              Offline Library
            </Link>
          </nav>
        )}

        <div className="flex items-center gap-4">
          {!showFullNav && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative rounded-full">
                  <Bell className="h-5 w-5" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-primary"></span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-80">
                <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <div className="max-h-80 overflow-auto">
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">New book summary added</p>
                      <p className="text-sm text-muted-foreground">"The Lean Startup" summary is now available</p>
                      <p className="text-xs text-muted-foreground">2 hours ago</p>
                    </div>
                  </DropdownMenuItem>
                  <DropdownMenuItem className="cursor-pointer">
                    <div className="flex flex-col gap-1">
                      <p className="font-medium">Welcome to TelkTibeb!</p>
                      <p className="text-sm text-muted-foreground">
                        Thanks for joining. Explore our book summaries and business plans.
                      </p>
                      <p className="text-xs text-muted-foreground">1 day ago</p>
                    </div>
                  </DropdownMenuItem>
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
          )}

          {showFullNav && <ThemeToggle />}

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <Avatar className="h-8 w-8">
                  <AvatarFallback className="bg-primary/10 text-primary">U</AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/account">Profile</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/bookmarks">Bookmarks</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/offline-library">Offline Library</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/settings">Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Log out</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>

          {showFullNav && (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm" className="rounded-full btn-hover">
                  Log in
                </Button>
              </Link>
              <Link href="/signup">
                <Button size="sm" className="rounded-full btn-hover">
                  Sign up
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

