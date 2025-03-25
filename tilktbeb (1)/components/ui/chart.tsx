"use client"

import type * as React from "react"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ChartContainerProps {
  children: React.ReactNode
}

export function ChartContainer({ children }: ChartContainerProps) {
  return <div className="rounded-md border">{children}</div>
}

interface ChartTitleProps {
  children: React.ReactNode
}

export function ChartTitle({ children }: ChartTitleProps) {
  return <h3 className="text-lg font-semibold">{children}</h3>
}

interface ChartProps {
  children: React.ReactNode
}

export function Chart({ children }: ChartProps) {
  return <div>{children}</div>
}

interface ChartTooltipProps {
  children: React.ReactNode
}

export function ChartTooltip({ children }: ChartTooltipProps) {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>{children}</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}

