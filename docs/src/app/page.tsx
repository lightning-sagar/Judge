import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Zap, Users, Shield, ArrowRight, Package, Server, CheckCircle } from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-navbar"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="border-orange-500 text-orange-500 mb-4">
              ⚡ Now supporting cpp, java, py
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Judge<span className="text-orange-500">Lib</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">Plug-n-Play Code Execution Engine</p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Execute code safely and efficiently with built-in queue management, and resource limits. Perfect
            for coding platforms, educational tools, and automated testing.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs">
              <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                Get Started
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            </Link>
            <Link href="/docs">
              <Button
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
              >
                View Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">3+</div>
              <div className="text-sm text-gray-600">Languages Supported</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">98% </div>
              <div className="text-sm text-gray-600">Uptime (Render-managed services)</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">500–1000ms</div>
              <div className="text-sm text-gray-600">Avg Response Time</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">20K–40K</div>
              <div className="text-sm text-gray-600">Executions/Day (across 3 workers)</div>
            </div>

          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Integration</h2>
            <p className="text-lg text-gray-600">Pick the option that best fits your architecture</p>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            {/* Microservice Option */}
            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Microservice Setup</CardTitle>
                <CardDescription className="text-gray-600">
                  Deploy as a standalone service with REST API endpoints
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Scalable architecture</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Language agnostic</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Docker ready</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Load balancing</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/microservice">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>

            {/* NPM Library Option */}
            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-gray-900">NPM Library</CardTitle>
                <CardDescription className="text-gray-600">
                  Install directly into your Node.js application
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Easy integration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">TypeScript support</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Zero configuration</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Local execution</span>
                  </div>
                </div>
                <div className="pt-4">
                  <Link href="/npm">
                    <Button className="w-full bg-orange-500 hover:bg-orange-600 text-white">
                      Learn More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Powerful Features</h2>
            <p className="text-lg text-gray-600">Everything you need for safe and efficient code execution</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-time Code Execution</h3>
              <p className="text-gray-600">
                Execute code instantly with live output streaming and real-time feedback for interactive experiences.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redis Queue + Worker Load Balancing</h3>
              <p className="text-gray-600">
                Handle high loads efficiently with Redis-powered job queues and automatic worker scaling.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Timeout & Memory Limits</h3>
              <p className="text-gray-600">
                Protect your system with configurable execution timeouts and memory limits.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {/* <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Developers</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "JudgeLib made it incredibly easy to add code execution to our learning platform. The API is clean and
                  the performance is outstanding."
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Sarah Chen</div>
                  <div className="text-gray-500">CTO, CodeAcademy Pro</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "The NPM package integration was seamless. We had code execution running in our app within minutes."
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Mike Rodriguez</div>
                  <div className="text-gray-500">Lead Developer, TechStart</div>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-yellow-400 fill-current" />
                  ))}
                </div>
                <p className="text-gray-600 mb-4">
                  "Excellent documentation and support. The microservice approach scales perfectly with our
                  infrastructure."
                </p>
                <div className="text-sm">
                  <div className="font-semibold text-gray-900">Alex Thompson</div>
                  <div className="text-gray-500">DevOps Engineer, CloudTech</div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-orange-500">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Ready to Get Started?</h2>
          <p className="text-xl text-orange-100 mb-8">
            Join hundreds of developers using JudgeLib for safe code execution
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/docs">
              <Button size="lg" variant="secondary" className="px-8 py-3">
                Read Documentation
              </Button>
            </Link>
            <Link href="/npm">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-orange-500 px-8 py-3"
              >
                Try NPM Package
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Judge<span className="text-orange-500">Lib</span>
              </h3>
              <p className="text-gray-400 text-sm">The most reliable code execution engine for developers.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/microservice" className="hover:text-orange-500 transition-colors">
                    Microservice
                  </Link>
                </li>
                <li>
                  <Link href="/npm" className="hover:text-orange-500 transition-colors">
                    NPM Library
                  </Link>
                </li>
                <li>
                  <Link href="/docs" className="hover:text-orange-500 transition-colors">
                    Documentation
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Developers</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-orange-500 transition-colors">
                    API Reference
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    SDKs
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Examples
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Community
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    GitHub
                  </Link>
                </li>
                <li>
                  <Link href="#" className="hover:text-orange-500 transition-colors">
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
            <p>&copy; {new Date().getFullYear()} JudgeLib. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}
