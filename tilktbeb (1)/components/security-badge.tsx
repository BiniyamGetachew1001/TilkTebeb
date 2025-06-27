import { Shield, Lock, Check, Star } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface SecurityBadgeProps {
  type: 'ssl' | 'secure' | 'verified' | 'trusted' | 'guarantee'
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function SecurityBadge({ type, size = 'md', className = '' }: SecurityBadgeProps) {
  const badges = {
    ssl: {
      icon: Lock,
      text: 'SSL Secured',
      color: 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100'
    },
    secure: {
      icon: Shield,
      text: '100% Secure',
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-100'
    },
    verified: {
      icon: Check,
      text: 'Verified Platform',
      color: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900 dark:text-emerald-100'
    },
    trusted: {
      icon: Star,
      text: 'Trusted by 10k+ Users',
      color: 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-100'
    },
    guarantee: {
      icon: Check,
      text: '30-Day Guarantee',
      color: 'bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-100'
    }
  }

  const badge = badges[type]
  const Icon = badge.icon

  const sizeClasses = {
    sm: 'text-xs px-2 py-1',
    md: 'text-sm px-3 py-1',
    lg: 'text-base px-4 py-2'
  }

  const iconSizes = {
    sm: 'h-3 w-3',
    md: 'h-4 w-4',
    lg: 'h-5 w-5'
  }

  return (
    <Badge 
      className={`inline-flex items-center gap-1 ${badge.color} ${sizeClasses[size]} ${className}`}
      variant="secondary"
    >
      <Icon className={iconSizes[size]} />
      <span>{badge.text}</span>
    </Badge>
  )
}
