"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Zap, Users, Shield, ArrowRight, Package, Server, Cloud, CheckCircle } from "lucide-react";
import Link from "next/link";
import { FloatingNav } from "@/components/ui/floating-navbar";
import Footer from "@/components/footer";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <Badge variant="outline" className="border-orange-500 text-orange-500 mb-4">
              ⚡ Now supporting C++, Java, and Python
            </Badge>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold text-gray-900 mb-6">
            Judge<span className="text-orange-500">Lib</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 font-light">Plug-n-Play Code Execution Engine</p>
          <p className="text-lg text-gray-500 mb-12 max-w-2xl mx-auto">
            Execute code safely and efficiently with built-in queue management and resource limits.
            Ideal for coding platforms, education tools, and automated test systems.
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
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Performance Overview</h2>
            <p className="text-lg text-gray-600">
              Self-hosted, Docker-isolated, and KEDA-powered — JudgeLib delivers reliable, scalable code execution across distributed workers.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">3</div>
              <div className="text-sm text-gray-600">Supported Languages (Python, C++, Java)</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">∞</div>
              <div className="text-sm text-gray-600">Scalable Executions (Limited by Cluster Resources)</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">~0.8s – 2.5s</div>
              <div className="text-sm text-gray-600">Avg Execution Time (varies by pods & language)</div>
            </div>

            <div>
              <div className="text-3xl font-bold text-orange-500 mb-2">99.9%</div>
              <div className="text-sm text-gray-600">Uptime (Self-Hosted with KEDA Auto-scaling)</div>
            </div>
          </div>

          <div className="mt-12 text-center text-gray-500 text-sm">
            <p>
              *Metrics are approximate and depend on active pods, system load, and test case complexity in the Kubernetes cluster.
            </p>
          </div>
        </div>
      </section>

      {/* Integration Options */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Integration</h2>
            <p className="text-lg text-gray-600">Pick the setup that fits your infrastructure best</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* NPM Library */}
            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-gray-900">NPM Library</CardTitle>
                <CardDescription className="text-gray-600">
                  Integrate JudgeLib directly into your Node.js app
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Divides testcases and dumps them into Redis queues
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Executes securely via Node.js child process isolation
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">Perfect for local or small-scale setups</span>
                  </li>
                </ul>
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

            {/* Microservice */}
            <Card className="border-2 hover:border-orange-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Server className="w-8 h-8 text-orange-500" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Microservice (Render)</CardTitle>
                <CardDescription className="text-gray-600">
                  Serverless worker-based setup with REST APIs
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">3 free Render workers for parallel execution</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Requires regular pinging to stay active
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Limited resources, slower response, moderate security
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Uses Node.js <code>spawn</code> for isolated runs
                    </span>
                  </li>
                </ul>
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

            {/* Self-Host */}
            <Card className="border-2 hover:border-blue-200 transition-all duration-300 hover:shadow-lg">
              <CardHeader className="text-center pb-4">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Cloud className="w-8 h-8 text-blue-600" />
                </div>
                <CardTitle className="text-2xl text-gray-900">Self-Host (Docker + KEDA)</CardTitle>
                <CardDescription className="text-gray-600">
                  Run JudgeLib in your own secure cloud environment
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <ul className="space-y-3">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Full Docker isolation for better security
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Uses KEDA + HPA for automatic pod scaling
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Production-grade performance and reliability
                    </span>
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    <span className="text-sm text-gray-600">
                      Ideal for enterprises and heavy workloads
                    </span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Link href="/selfhost">
                    <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white">
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
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Real-Time Execution</h3>
              <p className="text-gray-600">
                Execute and stream results instantly with built-in timeout and sandbox handling.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redis-Based Queueing</h3>
              <p className="text-gray-600">
                Efficient job management and worker load balancing for high concurrency.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Execution</h3>
              <p className="text-gray-600">
                Isolated environment ensures code safety and prevents system-level access.
              </p>
            </div>
          </div>
        </div>
      </section>

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
                className="border-white text-orange-500 hover:bg-white hover:bg-orange-50 px-8 py-3"
              >
                Try NPM Package
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Video Showcase Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">
            Here is a sneak peek of JudgeLib Usecase
          </h2>
          {/* Graph Embed */}
          <div className="relative rounded-2xl overflow-hidden shadow-lg border-2 border-orange-200">
            <video
              src="/JudgeLib-preview.mp4"
              title="lib-judge weekly downloads graph"
              className="w-full h-[500px]"
              autoPlay
              loop
              muted
              playsInline
            />
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}
