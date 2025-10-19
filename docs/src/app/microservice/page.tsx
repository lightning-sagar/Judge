"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Terminal, Server, Zap, Shield, Users, AlertTriangle } from "lucide-react"
import { PingWorker } from "@/components/ui/ping-worker"
import Footer from "@/components/footer"

export default function MicroservicePage() {
  return (
    <div className="min-h-screen bg-white relative">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-16 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-16 h-16 sm:w-20 sm:h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Server className="w-8 h-8 sm:w-10 sm:h-10 text-orange-500" />
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-4 sm:mb-6 leading-tight">
              Microservice Setup
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed">
              Deploy JudgeLib as a standalone microservice with REST API endpoints.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
              <Button
                size="lg"
                className="bg-orange-500 hover:bg-orange-600 text-white px-6 sm:px-8 py-3 w-full sm:w-auto"
                onClick={() => {
                  const el = document.getElementById("api-documentation")
                  el?.scrollIntoView({ behavior: "smooth" })
                }}
              >
                <Terminal className="w-4 h-4 mr-2" />
                Quick Start
              </Button>
              <div className="w-full sm:w-auto">
                <PingWorker />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Live Demo Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Live Demo</h2>
            <p className="text-base sm:text-lg text-gray-600">Try our hosted microservice instance</p>
          </div>

          <Card className="max-w-4xl mx-auto">
            <CardHeader className="pb-4">
              <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                <Badge className="bg-yellow-500 text-white w-fit">DEMO</Badge>
                <span>Production Microservice</span>
              </CardTitle>
              <CardDescription className="text-sm sm:text-base">
                <span className="block sm:inline">Test the JudgeLib microservice at:</span>
                <code className="block sm:inline sm:ml-2 mt-2 sm:mt-0 px-2 py-1 bg-gray-100 rounded text-xs sm:text-sm break-all">
                  https://judge-microser.onrender.com/
                </code>
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <AlertTriangle className="h-5 w-5 text-yellow-400" />
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-yellow-700">
                      <strong>Note:</strong> This demo service runs on a free tier and may experience occasional downtime or restarts. If you encounter a 502 error, please try again in a few minutes or consider pinging the workers
                    </p>
                  </div>
                </div>
              </div>

              <div className="grid lg:grid-cols-2 gap-6">
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg">Service Response</h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm whitespace-pre-wrap break-words">
                      {`{
  "message": "All workers completed",
  "jobId": "sum of number",
  "results": [
    {
      "input": "5 1 2 3 4 5",
      "expected_output": "15",
      "result": "15",
      "correct": true,
      "timeout": "2"
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-900 text-base sm:text-lg">Quick Request</h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-green-400 text-xs sm:text-sm whitespace-pre-wrap break-words">
                      {`curl -X POST https://judge-microser.onrender.com/api/c/run \\
  -F "codePath=./code.cpp" \\
  -F "ques_name=sum of number" \\
  -F "timeout=2" \\
  -F "sizeout=1" \\
  -F "input=5 1 2 3 4 5 ### 3 1 2 3 ### 2 1 4..." \\
  -F "output=15 ### 6 ### 5 .." \\
  -F "language=cpp"`}
                    </pre>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">
            Why Choose Microservice?
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Language Agnostic</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Use JudgeLib from any programming language or framework via simple HTTP requests.
              </p>
            </div>
            <div className="text-center p-4">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Horizontal Scaling</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Scale your code execution capacity by deploying multiple instances behind a load balancer.
              </p>
            </div>
            <div className="text-center p-4 sm:col-span-2 lg:col-span-1">
              <div className="w-14 h-14 sm:w-16 sm:h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-7 h-7 sm:w-8 sm:h-8 text-orange-500" />
              </div>
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-2">Isolated Environment</h3>
              <p className="text-gray-600 text-sm sm:text-base leading-relaxed">
                Run code execution in a completely isolated environment, separate from your main application.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* API Documentation */}
      <section id="api-documentation" className="py-12 sm:py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center text-gray-900 mb-8 sm:mb-12">API Documentation</h2>

          <div className="space-y-6 sm:space-y-8">
            {/* Endpoint Info */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="flex flex-col sm:flex-row sm:items-center gap-2 text-lg sm:text-xl">
                  <Badge className="bg-orange-500 text-white w-fit">POST</Badge>
                  <span className="font-mono text-base sm:text-lg">/api/c/run</span>
                </CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Execute code using the JudgeLib microservice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Base URL</h4>
                  <div className="bg-gray-100 rounded-lg p-3 text-xs sm:text-sm font-mono break-all">
                    https://judge-microser.onrender.com/
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">Request Body</h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm whitespace-pre-wrap break-words">
                      {`{
  "ques_name":"dummy",          // required: should be unique for each job
  "language": "python",         // required: programming language
  "codePath": ./code.py,        // required: path of source code
  "output": "dummy_output"      // required: output for the program (cannot be empty) seperated by ###
  "input": "dummy_input",       // required: input for the program  (cannot be empty) seperated by ###
  "timeout": 2,                 // optional: timeout in seconds
  "sizeout":2
}`}
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Examples */}
            <Card>
              <CardHeader className="pb-4">
                <CardTitle className="text-lg sm:text-xl">Code Examples</CardTitle>
                <CardDescription className="text-sm sm:text-base">
                  Different ways to interact with the microservice
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">cURL Example</h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-green-400 text-xs sm:text-sm whitespace-pre-wrap break-words">
                      {`curl -X POST https://judge-microser.onrender.com/api/c/run \\
  -F "codePath=@code.cpp" \\
  -F "ques_name=sum of number" \\
  -F "timeout=2" \\
  -F "sizeout=1" \\
  -F "input=5 1 2 3 4 5" \\
  -F "output=15" \\
  -F "language=cpp"`}
                    </pre>
                  </div>
                </div>

                <div>
                  <h4 className="font-semibold text-gray-900 mb-2 text-sm sm:text-base">JavaScript/Node.js Example</h4>
                  <div className="bg-gray-900 rounded-lg p-3 sm:p-4 overflow-x-auto">
                    <pre className="text-blue-400 text-xs sm:text-sm whitespace-pre-wrap break-words">
                      {`const response = await fetch('https://judge-microser.onrender.com/api/c/run', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify({
    ques_name:"dummy_name",
    language: 'py',
    code: './code.py', //file path and key should be code
    input: 'dummy_input',  // Required - cannot be empty (seperated bt ###) 
    output: '1 ### 2 ',  // Required - cannot be empty (seperated bt ###) 
    timeout: 5,
    sizeout: 2
  })
});

const result = await response.json();
console.log(result);`}
                    </pre>
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
