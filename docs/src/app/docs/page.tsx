import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { BookOpen, Terminal, Package, Cloud, Lightbulb, Award, LightbulbIcon } from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-navbar"
import Footer from "@/components/footer"

export default function DocsPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <BookOpen className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold  mb-6">Judge<span className="text-orange-600">Lib</span> Documentation</h1>
            <p className="text-xl text-gray-600 mb-8">Simple guides to get JudgeLib running in your application.</p>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-4">How JudgeLib Works</h2>
          <p className="text-center text-gray-600 mb-12 max-w-3xl mx-auto">
            JudgeLib processes code submissions through a simple pipeline: your code gets split into test cases, queued
            in Redis, and executed by workers.
          </p>

          <div className="grid md:grid-cols-3 gap-8 mb-12">
            {/* NPM Library Card */}
            <Card className="border-2 border-blue-200 bg-blue-50 hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                  <Package className="w-6 h-6 text-blue-600" />
                </div>
                <CardTitle className="text-xl text-blue-900">1. NPM Library</CardTitle>
                <Badge className="w-fit bg-blue-600 text-white hover:bg-blue-600 mt-2">Required</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-blue-900 mb-4 font-medium">
                  Install this library in your app to submit code for evaluation.
                </p>
                <ul className="space-y-2 text-sm text-blue-800">
                  <li className="flex items-start">
                    <Lightbulb className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Splits test cases into batches</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Sends to Redis queue</span>
                  </li>
                  <li className="flex items-start">
                    <Lightbulb className="w-4 h-4 text-blue-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Gets results back</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Microservice Card */}
            <Card className="border border-gray-200 bg-white hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
                  <Terminal className="w-6 h-6 text-gray-600" />
                </div>
                <CardTitle className="text-xl">2a. Free Microservice</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2">
                  Cloud Hosted
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 mb-4">Use our free hosted service on Render.</p>
                <ul className="space-y-2 text-sm text-gray-600">
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>3 worker instances</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>Slow cold starts</span>
                  </li>
                  <li className="flex items-start">
                    <span className="text-gray-400 mr-2">•</span>
                    <span>Good for testing</span>
                  </li>
                </ul>
              </CardContent>
            </Card>

            {/* Self-Host Card - Highlighted */}
            <Card className="border-2 border-orange-400 bg-orange-50 shadow-lg hover:shadow-lg transition-shadow">
              <CardHeader>
                <div className="w-12 h-12 bg-orange-200 rounded-lg flex items-center justify-center mb-4">
                  <Cloud className="w-6 h-6 text-orange-600" />
                </div>
                <CardTitle className="text-xl text-orange-900">2b. Self-Host</CardTitle>
                <Badge className="w-fit bg-orange-600 text-white hover:bg-orange-600 mt-2">Recommended</Badge>
              </CardHeader>
              <CardContent>
                <p className="text-orange-900 mb-4 font-medium">
                  Deploy on your infrastructure with Docker & Kubernetes.
                </p>
                <ul className="space-y-2 text-sm text-green-800">
                  <li className="flex items-start">
                    <Award className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Docker isolation</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Auto-scaling with KEDA</span>
                  </li>
                  <li className="flex items-start">
                    <Award className="w-4 h-4 text-green-600 mr-2 mt-0.5 flex-shrink-0" />
                    <span>Production ready</span>
                  </li>
                </ul>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-12">Quick Comparison</h2>

          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-orange-50 border-b-2 border-orange-200">
                  <th className="px-4 py-3 text-left font-semibold text-gray-900">Feature</th>
                  <th className="px-4 py-3 text-center font-semibold text-gray-900">Free Microservice</th>
                  <th className="px-4 py-3 text-center font-semibold text-orange-700 bg-orange-100">Self-Host</th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">Security</td>
                  <td className="px-4 py-3 text-center text-gray-600">Basic</td>
                  <td className="px-4 py-3 text-center bg-green-50 text-green-700 font-semibold">Docker Isolated</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">Performance</td>
                  <td className="px-4 py-3 text-center text-gray-600">Slow starts</td>
                  <td className="px-4 py-3 text-center bg-green-50 text-green-700 font-semibold">Fast</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">Auto-scaling</td>
                  <td className="px-4 py-3 text-center text-gray-600">Fixed</td>
                  <td className="px-4 py-3 text-center bg-green-50 text-green-700 font-semibold">✓ KEDA</td>
                </tr>
                <tr className="border-b border-gray-200">
                  <td className="px-4 py-3 font-medium text-gray-900">Best For</td>
                  <td className="px-4 py-3 text-center text-gray-600">Testing</td>
                  <td className="px-4 py-3 text-center bg-green-50 text-green-700 font-semibold">Production</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="mt-8 bg-orange-50 border-2 border-orange-300 rounded-lg p-6">
            <div className="flex items-start gap-4">
              <Cloud className="h-8 w-8 text-orange-600 flex-shrink-0 mt-1" />
              <div>
                <h3 className="text-xl font-bold text-orange-900 mb-2">For Production Apps</h3>
                <p className="text-orange-800 mb-4">
                  Self-hosting gives you better security, performance, and auto-scaling. Perfect for production
                  workloads.
                </p>
                <Link href="/selfhost">
                  <Button className="bg-orange-600 hover:bg-orange-700 text-white">View Self-Host Guide</Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Get Started in 2 Steps</h2>

          <div className="space-y-6">
            <Card className="border-l-4 border-l-blue-600">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-blue-900">
                  <span className="bg-blue-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                    1
                  </span>
                  Install NPM Library
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-900 text-blue-400 p-4 rounded-lg font-mono text-sm mb-3">
                  npm install judgelib
                </div>
                <div className="space-y-3">
                  <Link href="/npm" className="flex items-start group">
                    <LightbulbIcon className="h-5 w-5 text-blue-600 flex-shrink-0 mr-2 group-hover:text-blue-700" />
                    <span className="text-sm text-blue-800 group-hover:text-blue-900">
                      This library is required for all deployments.
                    </span>
                  </Link>
                  <Link href="/npm" className="inline-flex items-center px-4 py-2 text-sm font-medium text-blue-700 bg-blue-100 rounded-md hover:bg-blue-200 transition-colors">
                    View NPM Documentation
                    <Package className="ml-2 h-4 w-4" />
                  </Link>
                </div>

              </CardContent>
            </Card>

            <Card className="border-l-4 border-l-orange-600 bg-orange-50">
              <CardHeader>
                <CardTitle className="flex items-center text-lg text-orange-900">
                  <span className="bg-orange-600 text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm font-bold">
                    2
                  </span>
                  Choose Your Backend
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="border rounded-lg p-4 hover:border-gray-400 bg-white transition-colors">
                    <h4 className="font-semibold mb-2">Free Microservice</h4>
                    <p className="text-sm text-gray-600 mb-3">Use our hosted service</p>
                    <Link href="/microservice">
                      <Button variant="outline" size="sm" className="w-full bg-transparent">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                  <div className="border-2 border-green-400 bg-green-50 rounded-lg p-4">
                    <h4 className="font-semibold text-green-900 mb-2">Self-Host</h4>
                    <p className="text-sm text-green-800 mb-3">Deploy yourself - Recommended</p>
                    <Link href="/selfhost">
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700">
                        Learn More
                      </Button>
                    </Link>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
