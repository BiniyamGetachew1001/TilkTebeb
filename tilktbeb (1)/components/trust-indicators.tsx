import Link from "next/link"
import { Shield, Lock, Users, Award, FileText, HelpCircle } from "lucide-react"
import { SecurityBadge } from "@/components/security-badge"

export function TrustIndicators() {
  return (
    <div className="border-t bg-muted/30 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-6">
          <h3 className="text-lg font-semibold mb-2">Your Security & Privacy Matter</h3>
          <p className="text-sm text-muted-foreground">
            Astewai is committed to protecting your data and providing a secure reading experience
          </p>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
          <SecurityBadge type="ssl" size="sm" />
          <SecurityBadge type="secure" size="sm" />
          <SecurityBadge type="verified" size="sm" />
          <SecurityBadge type="guarantee" size="sm" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          <div className="flex flex-col items-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1">Bank-Level Security</h4>
            <p className="text-xs text-muted-foreground">
              256-bit SSL encryption protects all your transactions
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <Users className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1">Trusted by Thousands</h4>
            <p className="text-xs text-muted-foreground">
              Join 10,000+ satisfied readers worldwide
            </p>
          </div>
          
          <div className="flex flex-col items-center">
            <div className="p-3 bg-primary/10 rounded-full mb-3">
              <Award className="h-6 w-6 text-primary" />
            </div>
            <h4 className="font-medium mb-1">Money-Back Guarantee</h4>
            <p className="text-xs text-muted-foreground">
              30-day full refund if you're not satisfied
            </p>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-4 mt-6 text-xs text-muted-foreground">
          <Link href="/privacy" className="hover:text-foreground transition-colors flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Privacy Policy
          </Link>
          <Link href="/terms" className="hover:text-foreground transition-colors flex items-center gap-1">
            <FileText className="h-3 w-3" />
            Terms of Service
          </Link>
          <Link href="/security" className="hover:text-foreground transition-colors flex items-center gap-1">
            <Lock className="h-3 w-3" />
            Security
          </Link>
          <Link href="/support" className="hover:text-foreground transition-colors flex items-center gap-1">
            <HelpCircle className="h-3 w-3" />
            Support
          </Link>
        </div>
      </div>
    </div>
  )
}
