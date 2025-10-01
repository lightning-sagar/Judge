import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Cloud, Play, Download, Terminal, GitBranch, CheckCircle, Copy } from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-navbar"

export default function SelfHostPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cloud className="w-10 h-10 text-blue-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Self-Host JudgeLib</h1>
            <p className="text-xl text-gray-600 mb-8">
              Deploy JudgeLib on your own infrastructure with Docker and Kubernetes for maximum control, reliability,
              and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3">
                <Download className="w-4 h-4 mr-2" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-blue-500 text-blue-500 hover:bg-blue-50 px-8 py-3 bg-transparent"
              >
                <GitBranch className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Video Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">How Self-Hosting Works</h2>
            <p className="text-lg text-gray-600">
              Watch this overview to understand the self-hosting architecture and deployment process.
            </p>
          </div>

          <Card className="overflow-hidden">
            <CardContent className="p-0">
              <div className="relative bg-gray-900 aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Play className="w-16 h-16 mx-auto mb-4 text-blue-400" />
                  <h3 className="text-xl font-semibold mb-2">JudgeLib Self-Hosting Overview</h3>
                  <p className="text-gray-300">Learn how to deploy and scale JudgeLib on your infrastructure</p>
                  <Button className="mt-4 bg-blue-500 hover:bg-blue-600">
                    <Play className="w-4 h-4 mr-2" />
                    Watch Video
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold mb-2">Install NPM Package</h4>
              <p className="text-sm text-gray-600">Install lib-judge in your application</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cloud className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold mb-2">Deploy Worker</h4>
              <p className="text-sm text-gray-600">Run the worker container with Redis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Terminal className="w-6 h-6 text-blue-500" />
              </div>
              <h4 className="font-semibold mb-2">Scale with K8s</h4>
              <p className="text-sm text-gray-600">Auto-scale with Kubernetes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Get Started</h2>

          <div className="space-y-8">
            {/* Step 1: Install NPM Package */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    1
                  </div>
                  <CardTitle>Install NPM Package</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">First, install the lib-judge package in your Node.js application:</p>
                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400"># Install the package</span>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code>npm install lib-judge</code>
                </div>
              </CardContent>
            </Card>

            {/* Step 2: Environment Setup */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    2
                  </div>
                  <CardTitle>Environment Configuration</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Create a <code className="bg-gray-100 px-2 py-1 rounded">.env</code> file and add the Redis
                  configuration variables:
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400"># .env file</span>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="space-y-1">
                    <div>
                      <span className="text-blue-400">password_redis</span>=
                      <span className="text-green-400">your_redis_password</span>
                    </div>
                    <div>
                      <span className="text-blue-400">host_redis</span>=
                      <span className="text-green-400">your_redis_host</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 3: Pull and Run Worker */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    3
                  </div>
                  <CardTitle>Deploy Worker Container</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">Pull the worker image and run it with your Redis configuration:</p>
                <div className="space-y-4">
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Pull the worker image</span>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>
                      docker pull lightningsagar/worker:3c0e290cd5d910895e4c1f2ee266664653d67f6b
                    </code>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 4: Clone Ops Repository */}
            <Card>
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    4
                  </div>
                  <CardTitle>Setup Kubernetes Operations</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">
                  Clone the operations repository that contains Kubernetes configurations with horizontal pod
                  autoscaling:
                </p>
                <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-gray-400"># Clone the ops repository</span>
                    <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                      <Copy className="w-4 h-4" />
                    </Button>
                  </div>
                  <code>git clone https://github.com/lightning-sagar/worker-ops</code>
                </div>
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <p className="text-sm text-blue-800">
                        <strong>Customizable:</strong> You can modify the code in the ops repository to suit your
                        specific deployment requirements and infrastructure needs.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Run Operations Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Deploy to Kubernetes</h2>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-3">
                <Terminal className="w-6 h-6 text-blue-500" />
                Apply Kubernetes Configurations
              </CardTitle>
              <CardDescription>Deploy your JudgeLib worker with horizontal pod autoscaling enabled</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-600 mb-3">Apply the deployment configuration:</p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Deploy the application</span>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>kubectl apply -f deployment.yml</code>
                  </div>
                </div>

                <div>
                  <p className="text-gray-600 mb-3">Enable horizontal pod autoscaling:</p>
                  <div className="bg-gray-900 text-white p-4 rounded-lg font-mono text-sm">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Apply HPA configuration</span>
                      <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>kubectl apply -f hpa.yml</code>
                  </div>
                </div>

                <div className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-green-800 mb-1">Auto-scaling Benefits</h4>
                      <p className="text-sm text-green-700">
                        The HPA configuration automatically scales your worker pods based on CPU usage and request load,
                        ensuring optimal performance and cost efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Usage Documentation Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Using lib-judge in Your Code</h2>

          <Card>
            <CardHeader>
              <CardTitle>Sample Implementation</CardTitle>
              <CardDescription>Here's how to use the lib-judge package in your Node.js application</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-gray-900 text-white p-6 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-gray-400"># Sample usage</span>
                  <Button size="sm" variant="ghost" className="text-gray-400 hover:text-white">
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <pre className="text-sm leading-relaxed">
                  {`const result = await judge({
  codePath: tmpPath,
  ques_name: \`question_\${Date.now()}\`,
  input,
  output,
  timeout: timeout, // in seconds
  sizeout: sizeout,
  language: langCode, // py, cpp, java
});`}
                </pre>
              </div>

              <div className="mt-6">
                <h4 className="font-semibold text-gray-900 mb-3">Parameters:</h4>
                <div className="space-y-3">
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">codePath</code>
                    <span className="text-gray-600 text-sm">Path to the code file to execute</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">ques_name</code>
                    <span className="text-gray-600 text-sm">Unique identifier for the question/execution</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">input</code>
                    <span className="text-gray-600 text-sm">Input data for the code execution</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">output</code>
                    <span className="text-gray-600 text-sm">Expected output for validation</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">timeout</code>
                    <span className="text-gray-600 text-sm">Execution timeout in seconds</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">sizeout</code>
                    <span className="text-gray-600 text-sm">Memory limit for execution</span>
                  </div>
                  <div className="flex">
                    <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono mr-3 min-w-fit">language</code>
                    <span className="text-gray-600 text-sm">Programming language (py, cpp, java)</span>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <Link href="/docs">
                  <Button className="bg-blue-500 hover:bg-blue-600 text-white">
                    <Terminal className="w-4 h-4 mr-2" />
                    View Full Documentation
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Self-Host?</h2>

          <div className="grid md:grid-cols-2 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Cloud className="w-6 h-6 text-blue-500" />
                  Full Control
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Deploy on any cloud provider
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Customize resource limits
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Configure security policies
                  </li>
                </ul>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-blue-500" />
                  Better Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-gray-600">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    No free tier limitations
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Horizontal auto-scaling
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-500" />
                    Dedicated resources
                  </li>
                </ul>
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
