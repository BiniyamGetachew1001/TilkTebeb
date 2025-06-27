import Link from "next/link"
import { ChevronLeft, Shield, Lock, Eye, Database } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function PrivacyPage() {
  return (
    <div className="container py-8 md:py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Privacy Policy</h1>
          <p className="text-lg text-muted-foreground">
            Your privacy is important to us. This policy explains how we collect, use, and protect your information.
          </p>
          <p className="text-sm text-muted-foreground mt-2">
            Last updated: {new Date().toLocaleDateString()}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <Shield className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Data Protection</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                We use industry-standard encryption to protect your personal information
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Eye className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Transparency</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                We're transparent about what data we collect and how we use it
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="text-center">
              <Database className="h-8 w-8 text-primary mx-auto mb-2" />
              <CardTitle className="text-lg">Your Control</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground text-center">
                You have full control over your data and can request deletion anytime
              </p>
            </CardContent>
          </Card>
        </div>

        <div className="prose prose-lg max-w-none dark:prose-invert">
          <h2>Information We Collect</h2>
          <p>
            We collect information you provide directly to us, such as when you create an account, 
            make a purchase, or contact us for support.
          </p>
          
          <h3>Personal Information</h3>
          <ul>
            <li>Name and email address</li>
            <li>Payment information (processed securely by our payment partners)</li>
            <li>Reading preferences and progress</li>
            <li>Communication preferences</li>
          </ul>

          <h3>Usage Information</h3>
          <ul>
            <li>Pages visited and time spent reading</li>
            <li>Device and browser information</li>
            <li>IP address and location data</li>
            <li>Reading analytics and preferences</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <p>We use the information we collect to:</p>
          <ul>
            <li>Provide and improve our services</li>
            <li>Process payments and deliver purchased content</li>
            <li>Send important updates about your account</li>
            <li>Provide customer support</li>
            <li>Personalize your reading experience</li>
            <li>Prevent fraud and ensure security</li>
          </ul>

          <h2>Information Sharing</h2>
          <p>
            We do not sell, trade, or otherwise transfer your personal information to third parties 
            except as described in this policy:
          </p>
          <ul>
            <li>With your consent</li>
            <li>To comply with legal obligations</li>
            <li>To protect our rights and prevent fraud</li>
            <li>With service providers who help us operate our platform</li>
          </ul>

          <h2>Data Security</h2>
          <p>
            We implement appropriate security measures to protect your personal information against 
            unauthorized access, alteration, disclosure, or destruction. This includes:
          </p>
          <ul>
            <li>SSL encryption for all data transmission</li>
            <li>Secure servers and databases</li>
            <li>Regular security audits and updates</li>
            <li>Limited access to personal information</li>
          </ul>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access your personal information</li>
            <li>Correct inaccurate information</li>
            <li>Delete your account and data</li>
            <li>Export your data</li>
            <li>Opt out of marketing communications</li>
          </ul>

          <h2>Cookies and Tracking</h2>
          <p>
            We use cookies and similar technologies to enhance your experience, analyze usage, 
            and provide personalized content. You can control cookie settings through your browser.
          </p>

          <h2>Children's Privacy</h2>
          <p>
            Our service is not intended for children under 13. We do not knowingly collect 
            personal information from children under 13.
          </p>

          <h2>Changes to This Policy</h2>
          <p>
            We may update this privacy policy from time to time. We will notify you of any 
            significant changes by email or through our platform.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have any questions about this privacy policy, please contact us at:
          </p>
          <ul>
            <li>Email: privacy@astewai.com</li>
            <li>Address: [Your Business Address]</li>
          </ul>
        </div>
      </div>
    </div>
  )
}
