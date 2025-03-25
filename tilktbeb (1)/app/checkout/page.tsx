"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, ShieldCheck } from "lucide-react"
import { CheckoutForm } from "@/components/checkout-form"

export default function CheckoutPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [plan, setPlan] = useState<"base" | "small" | "medium" | "large">("base")
  const [amount, setAmount] = useState(99)

  useEffect(() => {
    // Get plan from URL query parameters
    const planParam = searchParams.get("plan")
    if (planParam && ["base", "small", "medium", "large"].includes(planParam)) {
      setPlan(planParam as "base" | "small" | "medium" | "large")

      // Set amount based on plan
      switch (planParam) {
        case "base":
          setAmount(99)
          break
        case "small":
          setAmount(149)
          break
        case "medium":
          setAmount(249)
          break
        case "large":
          setAmount(399)
          break
      }
    }
  }, [searchParams])

  const handlePaymentSuccess = (transactionId: string) => {
    // In a real application, you would:
    // 1. Update user subscription status
    // 2. Store payment information
    // 3. Redirect to a success page or account page

    // For demo purposes, we'll just log the transaction ID
    console.log("Payment successful:", transactionId)

    // Redirect to account page after a short delay
    setTimeout(() => {
      router.push("/account")
    }, 3000)
  }

  return (
    <div className="container py-8 md:py-12 max-w-3xl">
      <Link
        href="/pricing"
        className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Pricing
      </Link>

      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-tight mb-2">Checkout</h1>
        <p className="text-muted-foreground">Complete your purchase to get lifetime access</p>
      </div>

      <div className="grid gap-8">
        <CheckoutForm
          plan={plan}
          amount={amount}
          onSuccess={handlePaymentSuccess}
          onCancel={() => router.push("/pricing")}
        />

        <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
          <ShieldCheck className="h-4 w-4" />
          <span>Secure payment processing</span>
        </div>
      </div>
    </div>
  )
}

