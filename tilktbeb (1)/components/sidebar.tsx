"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  BookOpen,
  Package,
  Home,
  Settings,
  User,
  Bookmark,
  Download,
  CreditCard,
  ChevronRight,
  ChevronLeft,
  Menu,
  FileText,
  Gift,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeSelector } from "@/components/theme-selector"

interface SidebarProps {
  className?: string
}

export function Sidebar({ className }: SidebarProps) {
  const pathname = usePathname()
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isMobileOpen, setIsMobileOpen] = useState(false)

  // Check if screen is mobile on initial render
  useEffect(() => {
    const checkIfMobile = () => {
      setIsCollapsed(window.innerWidth < 1024)
    }

    // Set initial state
    checkIfMobile()

    // Add event listener for window resize
    window.addEventListener("resize", checkIfMobile)

    // Cleanup
    return () => window.removeEventListener("resize", checkIfMobile)
  }, [])

  const toggleSidebar = () => {
    setIsCollapsed(!isCollapsed)
  }

  const mainNavItems = [
    {
      title: "Home",
      href: "/",
      icon: Home,
    },
    {
      title: "Books",
      href: "/books",
      icon: BookOpen,
    },
    {
      title: "Free Books",
      href: "/free-books",
      icon: Gift,
    },
    {
      title: "Book Bundles",
      href: "/bundles",
      icon: Package,
    },
    {
      title: "Blog",
      href: "/blog",
      icon: FileText,
    },
    {
      title: "My Library",
      href: "/library",
      icon: Download,
    },
  ]

  const accountNavItems = [
    {
      title: "Account",
      href: "/account",
      icon: User,
    },
    {
      title: "Pricing",
      href: "/pricing",
      icon: CreditCard,
    },
    {
      title: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  return (
    <>
      {/* Mobile sidebar trigger */}
      <Button
        variant="ghost"
        size="icon"
        className="fixed bottom-4 right-4 z-40 lg:hidden rounded-full glass dark:glass-dark shadow-lg"
        onClick={() => setIsMobileOpen(true)}
      >
        <Menu className="h-5 w-5" />
      </Button>

      {/* Mobile sidebar overlay */}
      {isMobileOpen && (
        <div className="fixed inset-0 bg-black/50 z-40 lg:hidden" onClick={() => setIsMobileOpen(false)} />
      )}

      {/* Sidebar */}
      <aside
        id="main-navigation"
        role="navigation"
        aria-label="Main navigation"
        className={cn(
          "fixed top-0 left-0 z-40 h-full glass dark:glass-dark border-r border-white/10 transition-all duration-300 ease-in-out",
          isCollapsed ? "w-[70px]" : "w-[250px]",
          isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0",
          className,
        )}
      >
        <div className="flex flex-col h-full">
          {/* Sidebar header */}
          <div className="flex items-center justify-between p-4 border-b border-white/10">
            <Link href="/" className="flex items-center gap-2">
              <BookOpen className="h-6 w-6 gold-icon" />
              {!isCollapsed && <span className="font-bold text-xl">TelkTibeb</span>}
            </Link>
            <Button variant="ghost" size="icon" className="rounded-full lg:flex hidden" onClick={toggleSidebar}>
              {isCollapsed ? <ChevronRight className="h-4 w-4" /> : <ChevronLeft className="h-4 w-4" />}
            </Button>
            <Button
              variant="ghost"
              size="icon"
              className="rounded-full lg:hidden"
              onClick={() => setIsMobileOpen(false)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
          </div>

          {/* Sidebar content */}
          <div className="flex-1 overflow-y-auto py-4">
            <nav className="px-2 space-y-6">
              <div className="space-y-1">
                <h3
                  className={cn(
                    "px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    isCollapsed && "sr-only",
                  )}
                >
                  Main
                </h3>
                {mainNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", pathname === item.href && "text-primary")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                ))}
              </div>

              <div className="space-y-1">
                <h3
                  className={cn(
                    "px-3 text-xs font-semibold text-muted-foreground uppercase tracking-wider",
                    isCollapsed && "sr-only",
                  )}
                >
                  Account
                </h3>
                {accountNavItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
                      pathname === item.href
                        ? "bg-primary/10 text-primary"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent/50",
                      isCollapsed && "justify-center",
                    )}
                  >
                    <item.icon className={cn("h-5 w-5", pathname === item.href && "text-primary")} />
                    {!isCollapsed && <span>{item.title}</span>}
                  </Link>
                ))}
              </div>
            </nav>
          </div>

          {/* Sidebar footer */}
          <div className="p-4 border-t border-white/10">
            <div className={cn("flex items-center", isCollapsed ? "justify-center" : "justify-between")}>
              <ThemeToggle />
              {!isCollapsed && <ThemeSelector />}
            </div>

            {!isCollapsed && (
              <div className="mt-4">
                <div className="flex gap-2">
                  <Link href="/login" className="w-full">
                    <Button variant="outline" size="sm" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link href="/signup" className="w-full">
                    <Button size="sm" className="w-full">
                      Sign up
                    </Button>
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </aside>
    </>
  )
}

