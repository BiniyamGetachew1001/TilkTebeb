"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuLabel,
} from "@/components/ui/dropdown-menu"
import { Paintbrush } from "lucide-react"

type ThemeOption = {
  name: string
  value: string
  description: string
}

const themes: ThemeOption[] = [
  {
    name: "Default",
    value: "default",
    description: "Original beige/cream background",
  },
  {
    name: "Black & White",
    value: "theme-bw-gradient",
    description: "Modern monochrome gradient",
  },
  {
    name: "Parchment",
    value: "theme-parchment",
    description: "Classic paper-like texture",
  },
  {
    name: "Amber Glow",
    value: "theme-amber-glow",
    description: "Warm, inviting amber tones",
  },
  {
    name: "Serene Blue",
    value: "theme-serene-blue",
    description: "Calming blue gradient",
  },
  {
    name: "Subtle Cream",
    value: "theme-subtle-cream",
    description: "Gentle cream gradient",
  },
]

export function ThemeSelector() {
  const [currentTheme, setCurrentTheme] = useState<string>("default")

  useEffect(() => {
    // Load saved theme preference from localStorage
    const savedTheme = localStorage.getItem("astewai-theme") || "default"
    setCurrentTheme(savedTheme)
    applyTheme(savedTheme)
  }, [])

  const applyTheme = (theme: string) => {
    // Remove all theme classes
    document.body.classList.remove(
      "default",
      "theme-bw-gradient",
      "theme-parchment",
      "theme-amber-glow",
      "theme-serene-blue",
      "theme-subtle-cream",
    )

    // Add selected theme class
    if (theme !== "default") {
      document.body.classList.add(theme)
    }

    // Save preference
    localStorage.setItem("astewai-theme", theme)
  }

  const handleThemeChange = (theme: string) => {
    setCurrentTheme(theme)
    applyTheme(theme)
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="icon" className="rounded-full">
          <Paintbrush className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">Change background theme</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuLabel>Background Theme</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {themes.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            onClick={() => handleThemeChange(theme.value)}
            className={currentTheme === theme.value ? "bg-accent" : ""}
          >
            <div className="flex flex-col">
              <span>{theme.name}</span>
              <span className="text-xs text-muted-foreground">{theme.description}</span>
            </div>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}

