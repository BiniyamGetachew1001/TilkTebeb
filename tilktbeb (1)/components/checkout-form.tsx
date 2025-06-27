"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { CreditCard, Landmark, CheckCircle, AlertCircle } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { api, handleApiError, userSessionManager } from "@/lib/api"

interface CheckoutFormProps {
  plan: "base" | "small" | "medium" | "large"
  amount: number
  onSuccess?: (transactionId: string) => void
  onCancel?: () => void
}

const planNames = {
  base: "Base Access",
  small: "Small Business",
  medium: "Medium Business",
  large: "Large Business",
}

export function CheckoutForm({ plan, amount, onSuccess, onCancel }: CheckoutFormProps) {
  const [paymentMethod, setPaymentMethod] = useState<"telebirr" | "cbe">("telebirr")
  const [phoneNumber, setPhoneNumber] = useState("")
  const [accountNumber, setAccountNumber] = useState("")
  const [isProcessing, setIsProcessing] = useState(false)
  const [isVerifying, setIsVerifying] = useState(false)
  const [transactionId, setTransactionId] = useState("")
  const [paymentStatus, setPaymentStatus] = useState<"idle" | "processing" | "success" | "error">("idle")
  const router = useRouter()
  const { toast } = useToast()

  const handlePayment = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate form
    if (paymentMethod === "telebirr" && !phoneNumber) {
      toast({
        title: "Error",
        description: "Please enter your Telebirr phone number",
        variant: "destructive",
      })
      return
    }

    if (paymentMethod === "cbe" && !accountNumber) {
      toast({
        title: "Error",
        description: "Please enter your CBE account number",
        variant: "destructive",
      })
      return
    }

    try {
      setIsProcessing(true)
      setPaymentStatus("processing")

      // Get the current user from session
      const currentUser = userSessionManager.getCurrentUser()
      const userId = currentUser?.id || "user-1" // Fallback for demo

      const data = await api.processPayment({
        userId,
        amount,
        plan,
        paymentMethod,
        paymentDetails: {
          phoneNumber: paymentMethod === "telebirr" ? phoneNumber : undefined,
          accountNumber: paymentMethod === "cbe" ? accountNumber : undefined,
        },
      })

      // Store transaction ID for verification
      setTransactionId(data.transactionId)

      toast({
        title: "Payment Initiated",
        description: `Your payment for ${planNames[plan]} is being processed.`,
      })

      // In a real application, this would be where the user is redirected to the payment gateway
      // For demo purposes, we'll simulate a successful payment after a short delay
      setTimeout(() => {
        setPaymentStatus("success")
        setIsProcessing(false)

        toast({
          title: "Payment Successful",
          description: `Your payment for ${planNames[plan]} has been processed successfully.`,
        })

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(data.transactionId)
        }
      }, 2000)
    } catch (error) {
      console.error("Payment error:", error)
      setPaymentStatus("error")

      toast({
        title: "Payment Failed",
        description: "There was an error processing your payment. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsProcessing(false)
    }
  }

  const handleVerification = async () => {
    if (!transactionId) {
      toast({
        title: "Error",
        description: "No transaction ID to verify",
        variant: "destructive",
      })
      return
    }

    try {
      setIsVerifying(true)

      const data = await api.verifyPayment(transactionId)

      if (data.success) {
        setPaymentStatus("success")

        toast({
          title: "Payment Verified",
          description: "Your payment has been verified successfully.",
        })

        // Call onSuccess callback if provided
        if (onSuccess) {
          onSuccess(transactionId)
        }
      } else {
        setPaymentStatus("error")

        toast({
          title: "Verification Failed",
          description: "Your payment could not be verified. Please contact support.",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Verification error:", error)
      setPaymentStatus("error")

      toast({
        title: "Verification Failed",
        description: handleApiError(error),
        variant: "destructive",
      })
    } finally {
      setIsVerifying(false)
    }
  }

  if (paymentStatus === "success") {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="text-center text-green-600 dark:text-green-400 flex items-center justify-center gap-2">
            <CheckCircle className="h-6 w-6" />
            Payment Successful
          </CardTitle>
          <CardDescription className="text-center">
            Your payment for {planNames[plan]} has been processed successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="rounded-lg bg-green-50 dark:bg-green-900/20 p-4 border border-green-200 dark:border-green-800">
            <p className="text-center text-sm">
              Transaction ID: <span className="font-mono font-medium">{transactionId}</span>
            </p>
            <p className="text-center text-sm mt-2">Please save this transaction ID for your records.</p>
          </div>
        </CardContent>
        <CardFooter className="flex justify-center">
          <Button onClick={() => router.push("/account")}>Go to My Account</Button>
        </CardFooter>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Payment Details</CardTitle>
        <CardDescription>Complete your payment for {planNames[plan]}</CardDescription>
      </CardHeader>
      <form onSubmit={handlePayment}>
        <CardContent className="space-y-4">
          <div className="flex justify-between items-center p-4 bg-primary/5 rounded-lg">
            <div>
              <p className="font-medium">{planNames[plan]}</p>
              <p className="text-sm text-muted-foreground">One-time payment</p>
            </div>
            <p className="text-2xl font-bold">${amount}</p>
          </div>

          <div className="space-y-2">
            <Label>Select Payment Method</Label>
            <Tabs defaultValue="telebirr" onValueChange={(value) => setPaymentMethod(value as "telebirr" | "cbe")}>
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="telebirr">Telebirr</TabsTrigger>
                <TabsTrigger value="cbe">CBE</TabsTrigger>
              </TabsList>
              <TabsContent value="telebirr" className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <CreditCard className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pay with Telebirr</p>
                    <p className="text-sm text-muted-foreground">Fast and secure mobile payment</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="telebirr-number">Telebirr Number</Label>
                  <Input
                    id="telebirr-number"
                    placeholder="09xxxxxxxx"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
              </TabsContent>
              <TabsContent value="cbe" className="space-y-4 pt-4">
                <div className="flex items-center gap-4 p-4 border rounded-md">
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Landmark className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium">Pay with CBE</p>
                    <p className="text-sm text-muted-foreground">Commercial Bank of Ethiopia</p>
                  </div>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="account-number">Account Number</Label>
                  <Input
                    id="account-number"
                    placeholder="Enter your account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                    disabled={isProcessing}
                  />
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {paymentStatus === "error" && (
            <div className="rounded-lg bg-destructive/10 p-4 border border-destructive/20 flex items-center gap-2">
              <AlertCircle className="h-5 w-5 text-destructive" />
              <p className="text-sm text-destructive">
                There was an error processing your payment. Please try again or contact support.
              </p>
            </div>
          )}

          {transactionId && paymentStatus === "error" && (
            <div className="space-y-2">
              <Label htmlFor="transaction-id">Transaction ID</Label>
              <div className="flex gap-2">
                <Input id="transaction-id" value={transactionId} readOnly className="font-mono" />
                <Button type="button" variant="outline" onClick={handleVerification} disabled={isVerifying}>
                  {isVerifying ? "Verifying..." : "Verify"}
                </Button>
              </div>
            </div>
          )}
        </CardContent>
        <CardFooter className="flex flex-col gap-4">
          <Button type="submit" className="w-full" disabled={isProcessing || paymentStatus === "success"}>
            {isProcessing ? "Processing..." : "Complete Payment"}
          </Button>

          {onCancel && (
            <Button
              type="button"
              variant="outline"
              className="w-full"
              onClick={onCancel}
              disabled={isProcessing || paymentStatus === "success"}
            >
              Cancel
            </Button>
          )}

          <p className="text-xs text-muted-foreground text-center">
            By completing this payment, you agree to our Terms of Service and Privacy Policy.
          </p>
        </CardFooter>
      </form>
    </Card>
  )
}

