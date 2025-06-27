import Link from "next/link"
import { ChevronLeft, Shield, Lock, Server, Eye, CheckCircle, AlertTriangle } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default function SecurityPage() {
  return (
    <div className="container py-8 md:py-12">
      <Link href="/" className="inline-flex items-center gap-1 text-muted-foreground hover:text-foreground mb-6">
        <ChevronLeft className="h-4 w-4" />
        <span>Back to Home</span>
      </Link>

      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold mb-4">Security & Protection</h1>
          <p className="text-lg text-muted-foreground">
            Learn how we protect your data and ensure a secure reading experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          <Card className="text-center">
            <CardContent className="pt-6">
              <Shield className="h-8 w-8 text-green-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">SSL Encrypted</h3>
              <Badge variant="secondary" className="bg-green-100 text-green-800">256-bit</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Lock className="h-8 w-8 text-blue-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Secure Payments</h3>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">PCI DSS</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Server className="h-8 w-8 text-purple-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Secure Hosting</h3>
              <Badge variant="secondary" className="bg-purple-100 text-purple-800">ISO 27001</Badge>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="pt-6">
              <Eye className="h-8 w-8 text-orange-600 mx-auto mb-2" />
              <h3 className="font-semibold mb-1">Privacy First</h3>
              <Badge variant="secondary" className="bg-orange-100 text-orange-800">GDPR</Badge>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-primary" />
                Data Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">End-to-End Encryption</h4>
                    <p className="text-sm text-muted-foreground">
                      All data is encrypted in transit and at rest using industry-standard AES-256 encryption
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Secure Authentication</h4>
                    <p className="text-sm text-muted-foreground">
                      Multi-factor authentication and secure session management protect your account
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Regular Security Audits</h4>
                    <p className="text-sm text-muted-foreground">
                      Third-party security experts regularly audit our systems for vulnerabilities
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Minimal Data Collection</h4>
                    <p className="text-sm text-muted-foreground">
                      We only collect data necessary to provide and improve our services
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Lock className="h-5 w-5 text-primary" />
                Anti-Piracy Protection
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Our platform implements advanced anti-piracy measures to protect authors' intellectual property:
              </p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">No Download Option</h4>
                    <p className="text-sm text-muted-foreground">
                      Books can only be read online in our secure reader environment
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">User Watermarking</h4>
                    <p className="text-sm text-muted-foreground">
                      Each reading session includes invisible user-specific watermarks
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Session Monitoring</h4>
                    <p className="text-sm text-muted-foreground">
                      Real-time monitoring prevents unauthorized access and sharing
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-3">
                  <CheckCircle className="h-5 w-5 text-green-600 mt-0.5" />
                  <div>
                    <h4 className="font-medium">Content Protection</h4>
                    <p className="text-sm text-muted-foreground">
                      Advanced DRM and copy protection prevent unauthorized distribution
                    </p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Server className="h-5 w-5 text-primary" />
                Infrastructure Security
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium mb-2">Cloud Security</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• Enterprise-grade cloud infrastructure</li>
                    <li>• Automated security monitoring</li>
                    <li>• Regular security patches and updates</li>
                    <li>• Distributed denial-of-service (DDoS) protection</li>
                  </ul>
                </div>
                
                <div>
                  <h4 className="font-medium mb-2">Compliance</h4>
                  <ul className="text-sm text-muted-foreground space-y-1">
                    <li>• GDPR compliant data handling</li>
                    <li>• PCI DSS certified payment processing</li>
                    <li>• ISO 27001 security standards</li>
                    <li>• SOC 2 Type II compliance</li>
                  </ul>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-orange-200 bg-orange-50 dark:border-orange-800 dark:bg-orange-950">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-orange-800 dark:text-orange-200">
                <AlertTriangle className="h-5 w-5" />
                Report Security Issues
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-orange-700 dark:text-orange-300 mb-4">
                If you discover a security vulnerability, please report it to us immediately.
              </p>
              <div className="space-y-2 text-sm">
                <p><strong>Email:</strong> security@astewai.com</p>
                <p><strong>Response Time:</strong> Within 24 hours</p>
                <p><strong>Bug Bounty:</strong> We offer rewards for valid security reports</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
