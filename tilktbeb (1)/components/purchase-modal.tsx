"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle,
  DialogDescription 
} from "@/components/ui/dialog"
import { 
  CreditCard, 
  Shield, 
  Lock, 
  CheckCircle, 
  X,
  Smartphone,
  Building
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import type { Book } from "@/types/book"

interface PurchaseModalProps {
  book: Book | null
  isOpen: boolean
  onClose: () => void
  onPurchaseComplete: () => void
}

type PaymentMethod = 'telebirr' | 'cbe' | 'card'

export function PurchaseModal({ book, isOpen, onClose, onPurchaseComplete }: PurchaseModalProps) {
  const [step, setStep] = useState<'details' | 'payment' | 'processing' | 'success'>('details')
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>('telebirr')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [accountNumber, setAccountNumber] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)
  const { toast } = useToast()

  const handlePurchase = async () => {
    if (!book) return

    setStep('processing')
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false)
      setStep('success')
      
      // Auto-close after 3 seconds and trigger completion
      setTimeout(() => {
        onPurchaseComplete()
        onClose()
        resetModal()
      }, 3000)
    }, 2000)
  }

  const resetModal = () => {
    setStep('details')
    setPaymentMethod('telebirr')
    setPhoneNumber('')
    setAccountNumber('')
    setIsProcessing(false)
  }

  const handleClose = () => {
    if (step !== 'processing') {
      onClose()
      resetModal()
    }
  }

  if (!book) return null

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-md">
        {step === 'details' && (
          <>
            <DialogHeader>
              <DialogTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Secure Purchase
              </DialogTitle>
              <DialogDescription>
                Complete your purchase to get instant access to this book
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              {/* Book Details */}
              <div className="flex gap-4 p-4 bg-muted/50 rounded-lg">
                <img
                  src={book.coverUrl}
                  alt={book.title}
                  className="w-16 h-20 object-cover rounded"
                />
                <div className="flex-1">
                  <h3 className="font-semibold line-clamp-1">{book.title}</h3>
                  <p className="text-sm text-muted-foreground">{book.author}</p>
                  <div className="flex items-center justify-between mt-2">
                    <Badge variant="secondary">{book.category}</Badge>
                    <span className="text-lg font-bold text-primary">
                      ${book.price?.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Security Features */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Lock className="h-4 w-4" />
                  <span>Secure, encrypted transaction</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Shield className="h-4 w-4" />
                  <span>Instant access after purchase</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <CheckCircle className="h-4 w-4" />
                  <span>30-day money-back guarantee</span>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" onClick={handleClose} className="flex-1">
                  Cancel
                </Button>
                <Button onClick={() => setStep('payment')} className="flex-1">
                  Continue to Payment
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'payment' && (
          <>
            <DialogHeader>
              <DialogTitle>Payment Method</DialogTitle>
              <DialogDescription>
                Choose your preferred payment method
              </DialogDescription>
            </DialogHeader>
            
            <div className="space-y-4">
              <RadioGroup value={paymentMethod} onValueChange={(value) => setPaymentMethod(value as PaymentMethod)}>
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="telebirr" id="telebirr" />
                  <Label htmlFor="telebirr" className="flex items-center gap-2 flex-1 cursor-pointer">
                    <Smartphone className="h-4 w-4" />
                    <span>TeleBirr</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="cbe" id="cbe" />
                  <Label htmlFor="cbe" className="flex items-center gap-2 flex-1 cursor-pointer">
                    <Building className="h-4 w-4" />
                    <span>CBE Birr</span>
                  </Label>
                </div>
                
                <div className="flex items-center space-x-2 p-3 border rounded-lg">
                  <RadioGroupItem value="card" id="card" />
                  <Label htmlFor="card" className="flex items-center gap-2 flex-1 cursor-pointer">
                    <CreditCard className="h-4 w-4" />
                    <span>Credit/Debit Card</span>
                  </Label>
                </div>
              </RadioGroup>

              {paymentMethod === 'telebirr' && (
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    placeholder="+251 9XX XXX XXX"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === 'cbe' && (
                <div className="space-y-2">
                  <Label htmlFor="account">Account Number</Label>
                  <Input
                    id="account"
                    placeholder="Enter your CBE account number"
                    value={accountNumber}
                    onChange={(e) => setAccountNumber(e.target.value)}
                  />
                </div>
              )}

              {paymentMethod === 'card' && (
                <div className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="cardNumber">Card Number</Label>
                    <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="expiry">Expiry Date</Label>
                      <Input id="expiry" placeholder="MM/YY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="cvv">CVV</Label>
                      <Input id="cvv" placeholder="123" />
                    </div>
                  </div>
                </div>
              )}

              <div className="flex gap-2">
                <Button variant="outline" onClick={() => setStep('details')} className="flex-1">
                  Back
                </Button>
                <Button onClick={handlePurchase} className="flex-1">
                  Pay ${book.price?.toFixed(2)}
                </Button>
              </div>
            </div>
          </>
        )}

        {step === 'processing' && (
          <div className="text-center py-8">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
            <h3 className="text-lg font-semibold mb-2">Processing Payment</h3>
            <p className="text-muted-foreground">Please wait while we process your payment...</p>
          </div>
        )}

        {step === 'success' && (
          <div className="text-center py-8">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <CheckCircle className="h-8 w-8 text-green-600" />
            </div>
            <h3 className="text-lg font-semibold mb-2">Purchase Successful!</h3>
            <p className="text-muted-foreground mb-4">
              You now have access to "{book.title}". The book has been added to your library.
            </p>
            <p className="text-sm text-muted-foreground">
              Redirecting to your library...
            </p>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}
