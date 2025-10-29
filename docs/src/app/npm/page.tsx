"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Zap, Shield, Server, CheckCircle, Cpu } from "lucide-react"
import { PingWorker } from "@/components/ui/ping-worker"
import Footer from "@/components/footer"

export default function NPMPage() {
  return (
    <div className="min-h-screen bg-white relative">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Judge<span className="text-orange-600">Lib</span> NPM Library</h1>
            <p className="text-xl text-gray-600 mb-8">
              A distributed code-execution library that divides large test cases into batches, stores them in Redis,
              and executes them efficiently using background workers.
            </p>
            <div className="bg-gray-900 rounded-lg p-4 text-green-400 font-mono text-lg mb-8 max-w-md mx-auto">
              npm install lib-judge
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3"
                onClick={() => {
                  const el = document.getElementById("installation")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Download className="w-4 h-4 mr-2" />
                Quick Start
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-orange-500 text-orange-500 hover:bg-orange-50 px-8 py-3"
                onClick={() => window.open("https://www.npmjs.com/package/lib-judge", "_blank")}
              >
                <Server className="w-4 h-4 mr-2" />
                View on NPM
              </Button>
              <PingWorker />
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Use JudgeLib?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Batch Processing</h3>
              <p className="text-gray-600">
                JudgeLib divides large sets of test cases into smaller, manageable batches for faster and more efficient execution.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Cpu className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Redis Integration</h3>
              <p className="text-gray-600">
                Test cases and execution data are stored and managed in Redis for fast retrieval and distributed coordination.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Worker System</h3>
              <p className="text-gray-600">
                Background workers fetch batched test cases from Redis and execute them in isolated environments for maximum reliability.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="installation" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Installation & Setup</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white">1</Badge>
                  Install Package
                </CardTitle>
                <CardDescription>Add JudgeLib to your Node.js project</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Using npm</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm">
                    <pre className="text-green-400">npm install lib-judge</pre>
                  </div>
                </div>
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Using yarn</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm">
                    <pre className="text-green-400">yarn add lib-judge</pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Step 2 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white">2</Badge>
                  How It Works
                </CardTitle>
                <CardDescription>JudgeLib automatically batches and processes your test cases</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Example Usage</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                    <pre className="text-blue-400">
                      {`import { judge } from 'lib-judge';

// Sample testcases input
const input = '5 1 2 3 4 5 ### 3 10 20 30 ### 4 2 2 2 2';
const output = '15 ### 60 ### 8';

const result = await judge({
  codePath: tmpPath, //path of the file
  ques_name: 'sum of array',
  input,
  output,
  language: 'cpp',
  timeout: '2',
  sizeout: '64'
});

// Internally:
// 1️⃣ Input is divided into batches
// 2️⃣ Stored in Redis
// 3️⃣ Workers pull batches and execute them asynchronously
console.log(result);`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Supported Languages */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Supported Languages</h2>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              { name: "Python", version: "3.11", extension: ".py" },
              { name: "Java", version: "17", extension: ".java" },
              { name: "C++", version: "GCC 11", extension: ".cpp" },
            ].map((lang) => (
              <Card key={lang.name} className="border-l-4 border-l-orange-500">
                <CardContent className="pt-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-semibold text-gray-900">{lang.name}</h3>
                      <p className="text-sm text-gray-600">{lang.version}</p>
                    </div>
                    <div className="text-right">
                      <Badge variant="secondary">{lang.extension}</Badge>
                      <div className="mt-1">
                        <CheckCircle className="w-4 h-4 text-green-500" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  )
}
