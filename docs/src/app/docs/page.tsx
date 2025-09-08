import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Code, Terminal, Package, Cloud } from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-navbar"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Documentation</h1>
            <p className="text-xl text-gray-600 mb-8">
              Complete guides and API references for integrating JudgeLib into your applications.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="#getting-started">
                <Button size="lg" className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3">
                  <Code className="w-4 h-4 mr-2" />
                  Getting Started
                </Button>
              </Link>
              <Link href="#api-reference">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3 bg-transparent"
                >
                  <Terminal className="w-4 h-4 mr-2" />
                  API Reference
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Navigation */}
      <section className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-center text-gray-900 mb-8">Quick Navigation</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link href="/microservice">
              <Card className="hover:border-orange-200 transition-colors cursor-pointer">
                <CardHeader className="text-center">
                  <Terminal className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <CardTitle>Microservice Guide</CardTitle>
                  <CardDescription>Deploy as a standalone service</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/npm">
              <Card className="hover:border-orange-200 transition-colors cursor-pointer">
                <CardHeader className="text-center">
                  <Package className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <CardTitle>NPM Library Guide</CardTitle>
                  <CardDescription>Install directly in Node.js</CardDescription>
                </CardHeader>
              </Card>
            </Link>

            <Link href="/selfhost">
              <Card className="hover:border-orange-200 transition-colors cursor-pointer">
                <CardHeader className="text-center">
                  <Cloud className="w-8 h-8 text-orange-500 mx-auto mb-2" />
                  <CardTitle>Self-Host Guide</CardTitle>
                  <CardDescription>Docker + Kubernetes deployment</CardDescription>
                </CardHeader>
              </Card>
            </Link>
          </div>

          {/* Recommendation Banner */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <Cloud className="h-6 w-6 text-blue-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-lg font-medium text-blue-900">Recommended: Self-Host Deployment</h3>
                <p className="mt-2 text-sm text-blue-700">
                  For production use, we recommend self-hosting JudgeLib using our Docker image and Kubernetes
                  configurations. This approach provides better reliability, performance, and cost-effectiveness
                  compared to our free Render-based microservice.
                </p>
                <div className="mt-4">
                  <Link href="/selfhost">
                    <Button size="sm" className="bg-blue-500 hover:bg-blue-600 text-white">
                      <Cloud className="w-4 h-4 mr-2" />
                      View Self-Host Guide
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Getting Started */}
      <section id="getting-started" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Getting Started</h2>
          <div className="space-y-8">
            <Card>
              <CardHeader>
                <CardTitle>What is JudgeLib?</CardTitle>
              </CardHeader>
              <CardContent className="prose max-w-none">
                <p className="text-gray-600 mb-4">
                  JudgeLib is a lightweight code execution engine built with Node.js and the `child_process` module. It
                  enables you to execute user-submitted code in a controlled environment for educational, testing, or
                  evaluation purposes.
                </p>
                <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-yellow-400" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-yellow-700">
                        <strong>Note:</strong> While it isolates processes, it{" "}
                        <strong>does not run inside a secure container if you are using MicroServices</strong> (like Docker). For production-grade
                        isolation, containerization is recommended. So, <strong>I would recommend using the self-hosted version</strong>, we provide the Docker image and Kubernetes configurations for that.
                      </p>
                    </div>
                  </div>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Key Features:</h4>
                <ul className="list-disc list-inside text-gray-600 space-y-1">
                  <li>Execute code in multiple languages (like Python, C++, Java)</li>
                  <li>Customizable timeouts and memory limits</li>
                  <li>Queue-based execution support (optional via Redis)</li>
                  <li>Real-time output streaming</li>
                  <li>Supports both NPM module usage and HTTP-based microservice mode</li>
                </ul>
              </CardContent>
            </Card>
            {/* Supported Languages */}
            <section className="py-16 px-4 sm:px-6 lg:px-8">
              <div className="max-w-4xl mx-auto">
                <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Supported Languages</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {["Python", "C++", "Java"].map((language) => (
                    <div
                      key={language}
                      className="text-center p-4 border rounded-lg hover:border-orange-200 transition-colors"
                    >
                      <Badge variant="secondary" className="w-full">
                        {language}
                      </Badge>
                    </div>
                  ))}
                </div>
              </div>
            </section>
            <Card>
              <CardHeader>
                <CardTitle>Deployment Options</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-3 gap-4">
                  <div className="p-4 border rounded-lg">
                    <Package className="w-6 h-6 text-orange-500 mb-2" />
                    <h4 className="font-semibold mb-2">NPM Library</h4>
                    <p className="text-sm text-gray-600">Direct integration in your Node.js application</p>
                  </div>
                  <div className="p-4 border rounded-lg">
                    <Terminal className="w-6 h-6 text-orange-500 mb-2" />
                    <h4 className="font-semibold mb-2">Microservice</h4>
                    <p className="text-sm text-gray-600">HTTP API service (free tier on Render)</p>
                  </div>
                  <div className="p-4 border rounded-lg border-blue-200 bg-blue-50">
                    <Cloud className="w-6 h-6 text-blue-500 mb-2" />
                    <h4 className="font-semibold mb-2 text-blue-900">Self-Host</h4>
                    <p className="text-sm text-blue-700">Docker + Kubernetes on any cloud</p>
                    <Badge className="mt-2 bg-blue-500">Recommended</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <Link href="/selfhost" className="hover:text-orange-500 transition-colors">
                    Self-Host
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
