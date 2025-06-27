import Link from "next/link"
import { ChevronLeft, FileText, Scale, Shield } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function TermsPage() {
  return (
    <div className="container py-8 md:py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Terms of Service</h1>
          <p className="text-lg text-muted-foreground">
            Please read these terms carefully before using our platform
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <FileText className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Clear Terms</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                Our terms are written in plain language for easy understanding
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Scale className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Fair Usage</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                We believe in fair terms that protect both users and content creators
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Your Rights</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                We respect your rights and clearly outline what you can expect from us
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>1. Acceptance of Terms</h2>
          <p>
            By accessing and using Astewai, you accept and agree to be bound by the terms and 
            provision of this agreement. If you do not agree to abide by the above, please do 
            not use this service.
          </p>

          <h2>2. Description of Service</h2>
          <p>
            Astewai is a secure digital book platform that allows users to purchase and read 
            books online without the ability to download them. Our service includes:
          </p>
          <ul>
            <li>Access to a curated library of digital books</li>
            <li>Secure online reading environment</li>
            <li>Personalized reading experience with customizable settings</li>
            <li>Progress tracking and bookmarking features</li>
            <li>Customer support and assistance</li>
          </ul>

          <h2>3. User Accounts</h2>
          <h3>Account Creation</h3>
          <ul>
            <li>You must provide accurate and complete information when creating an account</li>
            <li>You are responsible for maintaining the confidentiality of your account credentials</li>
            <li>You must be at least 13 years old to create an account</li>
            <li>One account per person; multiple accounts are not permitted</li>
          </ul>

          <h3>Account Security</h3>
          <ul>
            <li>You are responsible for all activities that occur under your account</li>
            <li>Notify us immediately of any unauthorized use of your account</li>
            <li>We reserve the right to suspend accounts that violate these terms</li>
          </ul>

          <h2>4. Purchases and Payments</h2>
          <h3>Book Purchases</h3>
          <ul>
            <li>All purchases are final and non-transferable</li>
            <li>You receive a license to read the book, not ownership of the content</li>
            <li>Books can only be accessed through your Astewai account</li>
            <li>Prices are subject to change without notice</li>
          </ul>

          <h3>Payment Terms</h3>
          <ul>
            <li>Payment is required at the time of purchase</li>
            <li>We accept various payment methods as displayed during checkout</li>
            <li>All payments are processed securely through our payment partners</li>
            <li>You authorize us to charge your payment method for all purchases</li>
          </ul>

          <h2>5. Refund Policy</h2>
          <p>
            We offer a 30-day money-back guarantee for all book purchases. To request a refund:
          </p>
          <ul>
            <li>Contact our support team within 30 days of purchase</li>
            <li>Provide your order number and reason for the refund request</li>
            <li>Refunds will be processed to your original payment method</li>
            <li>Access to the book will be revoked upon refund processing</li>
          </ul>

          <h2>6. Intellectual Property</h2>
          <h3>Content Ownership</h3>
          <ul>
            <li>All books and content remain the property of their respective authors and publishers</li>
            <li>You receive a limited, non-exclusive license to read purchased content</li>
            <li>You may not copy, distribute, or share purchased content</li>
            <li>The Astewai platform and technology are our intellectual property</li>
          </ul>

          <h3>Anti-Piracy</h3>
          <ul>
            <li>Attempting to circumvent our security measures is strictly prohibited</li>
            <li>Sharing account credentials or purchased content is not allowed</li>
            <li>We employ advanced anti-piracy technology to protect content</li>
            <li>Violations may result in account termination and legal action</li>
          </ul>

          <h2>7. Prohibited Uses</h2>
          <p>You may not use our service to:</p>
          <ul>
            <li>Violate any applicable laws or regulations</li>
            <li>Infringe on intellectual property rights</li>
            <li>Attempt to gain unauthorized access to our systems</li>
            <li>Distribute malware or engage in harmful activities</li>
            <li>Create multiple accounts or share account access</li>
            <li>Use automated tools to access our service</li>
          </ul>

          <h2>8. Service Availability</h2>
          <ul>
            <li>We strive to maintain 99.9% uptime but cannot guarantee uninterrupted service</li>
            <li>Scheduled maintenance will be announced in advance when possible</li>
            <li>We reserve the right to modify or discontinue features with notice</li>
            <li>Your purchased books will remain accessible even if features change</li>
          </ul>

          <h2>9. Privacy and Data Protection</h2>
          <p>
            Your privacy is important to us. Please review our Privacy Policy to understand 
            how we collect, use, and protect your information.
          </p>

          <h2>10. Limitation of Liability</h2>
          <p>
            To the maximum extent permitted by law, Astewai shall not be liable for any 
            indirect, incidental, special, consequential, or punitive damages resulting 
            from your use of our service.
          </p>

          <h2>11. Changes to Terms</h2>
          <p>
            We may update these terms from time to time. We will notify users of significant 
            changes via email or platform notification. Continued use of the service after 
            changes constitutes acceptance of the new terms.
          </p>

          <h2>12. Contact Information</h2>
          <p>
            If you have questions about these terms, please contact us:
          </p>
          <ul>
            <li>Email: legal@astewai.com</li>
            <li>Support: support@astewai.com</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
