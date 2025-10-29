/* eslint-disable */
"use client";
import { Button } from "@/components/ui/button"
import { Cloud, Play, Download, Terminal, GitBranch, CheckCircle, Copy, BookOpen, Code2, Zap } from "lucide-react"
import Link from "next/link"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { useEffect, useState } from "react"
import Footer from "@/components/footer"

export default function SelfHostPage() {
  const [currentStep, setCurrentStep] = useState(0)

  const workflowSteps = [
    { id: 0, label: "Why Self-Host?", section: "why-self-host" },
    { id: 1, label: "Architecture Overview", section: "watch-video" },
    { id: 2, label: "Prerequisite Requirements", section: "prerequisites" },
    { id: 3, label: "Get Started", section: "get-started" },
    { id: 4, label: "Deploy to Kubernetes", section: "deploy-k8s" },
    { id: 5, label: "Using lib-judge in Your Code", section: "using-lib-judge" },
  ]

  const handleCopyCode = (code: string) => {
    navigator.clipboard.writeText(code)
  }

  const handleExplore = (path: string) => {
    if (path === "video") {
      document.getElementById("watch-video")?.scrollIntoView({ behavior: "smooth" })
    } else if (path === "docs") {
      document.getElementById("prerequisites")?.scrollIntoView({ behavior: "smooth" })
    } else if (path === "code") {
      document.getElementById("using-lib-judge")?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleStepClick = (stepId: number, section: string) => {
    setCurrentStep(stepId)
    const element = document.getElementById(section)
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }

  const handleGetStarted = () => {
    const element = document.getElementById("get-started")
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" })
    }
  }
  useEffect(() => {
    const handleScroll = () => {
      const sections = workflowSteps.map((step) => ({
        id: step.id,
        element: document.getElementById(step.section),
      }))
      let currentSectionId = 0
      const viewportCenter = window.innerHeight / 3

      for (const section of sections) {
        if (section.element) {
          const rect = section.element.getBoundingClientRect()
          if (rect.top <= viewportCenter && rect.bottom >= viewportCenter) {
            currentSectionId = section.id
            break
          }
          if (rect.top > viewportCenter && currentSectionId < section.id) {
            break
          }
          if (rect.top <= viewportCenter) {
            currentSectionId = section.id
          }
        }
      }
      setCurrentStep(currentSectionId)
    }
    handleScroll()
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      <div className="fixed bottom-8 right-5 z-40 hidden lg:block">
        <div className="relative w-64">
          {/* SVG Curved Line - Smaller */}
          <svg className="absolute left-0 top-0 w-full h-full pointer-events-none" style={{ height: "1500px" }}>
            <defs>
              <linearGradient id="workflowGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316" stopOpacity="0.5" />
                <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
              </linearGradient>
            </defs>
            <path
              d="M 15 20 
     Q 30 50 15 80 
     Q 0 110 15 140 
     Q 30 170 15 200 
     Q 0 230 15 260 
     Q 30 290 15 320
     Q 0 350 15 380 
     Q 30 410 15 440 
     "
              stroke="url(#workflowGradient)"
              strokeWidth="3"
              fill="none"
              strokeDasharray="5,5"
            />
          </svg>


          {/* Workflow Steps - Compact */}
          <div className="relative space-y-14">
            {workflowSteps.map((step, index) => (
              <div key={step.id} className="flex items-center gap-3 cursor-pointer group">
                <div
                  onClick={() => handleStepClick(step.id, step.section)}
                  className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 transition-all ${currentStep === step.id
                    ? "bg-orange-600 text-white ring-3 ring-orange-200 scale-110"
                    : "bg-gray-200 text-gray-600 group-hover:bg-orange-200"
                    }`}
                >
                  <span className="text-xs font-bold">{index + 1}</span>
                </div>

                <div
                  onClick={() => handleStepClick(step.id, step.section)}
                  className={`text-xs font-medium transition-all whitespace-nowrap ${currentStep === step.id ? "text-orange-600 font-bold" : "text-gray-600 group-hover:text-orange-500"
                    }`}
                >
                  {step.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Cloud className="w-10 h-10 text-orange-600" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold  mb-6">Self-Host  Judge<span className="text-orange-600">Lib</span></h1>
            <p className="text-xl text-gray-500 mb-8">
              Deploy JudgeLib on your own infrastructure with Docker and Kubernetes for maximum control, reliability,
              and performance.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-3"
                onClick={handleGetStarted}
              >
                <Download className="w-4 h-4 mr-2" />
                Get Started
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="border-gray-300 text-gray-700 hover:bg-gray-50 px-8 py-3 bg-transparent"
                onClick={() => window.open("https://github.com", "_blank")}
              >
                <GitBranch className="w-4 h-4 mr-2" />
                View on GitHub
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Why Self-Host */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="why-self-host">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-orange-600 mb-12">Why Self-Host?</h2>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Cloud className="w-6 h-6 text-orange-600" />
                Full Control
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Deploy on any cloud provider
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Customize resource limits
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Configure security policies
                </li>
              </ul>
            </div>
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <h3 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-3">
                <Terminal className="w-6 h-6 text-orange-600" />
                Better Performance
              </h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  No free tier limitations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Horizontal auto-scaling
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                  Dedicated resources
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Path Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Choose Your Learning Path</h2>
            <p className="text-lg text-gray-600">Select how you want to get started with JudgeLib self-hosting</p>
          </div>
          <div className="relative">
            <svg className="absolute inset-0 w-full h-full pointer-events-none" style={{ height: "300px" }}>
              <defs>
                <linearGradient id="curveGradient2" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#f97316" stopOpacity="0.2" />
                  <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
                </linearGradient>
              </defs>
              <path
                d="M 120 80 Q 280 40 440 80"
                stroke="url(#curveGradient2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
              <path
                d="M 560 80 Q 720 40 880 80"
                stroke="url(#curveGradient2)"
                strokeWidth="2"
                fill="none"
                strokeDasharray="5,5"
              />
            </svg>
            <div className="grid md:grid-cols-3 gap-8 relative z-10">
              {/* Path 1: Architecture Overviews */}
              <div className="flex flex-col items-center" id="watch-video">
                <div className="w-24 h-24 bg-orange-600 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Play className="w-12 h-12 text-white" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Architecture Overview</h3>
                <p className="text-gray-600 text-center text-sm mb-4">Workflow overview and architecture</p>
                <Button
                  className="bg-orange-600 hover:bg-orange-700 text-white w-full"
                  onClick={() => handleExplore("video")}
                >
                  Explore
                </Button>
              </div>
              {/* Path 2: Read Documentation */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-muted rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <BookOpen className="w-12 h-12 text-muted-foreground" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Read Documentation</h3>
                <p className="text-gray-600 text-center text-sm mb-4">Detailed step-by-step written guide</p>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full"
                  onClick={() => handleExplore("docs")}
                >
                  Explore
                </Button>
              </div>
              {/* Path 3: Sample Code */}
              <div className="flex flex-col items-center">
                <div className="w-24 h-24 bg-blue-500 rounded-full flex items-center justify-center mb-6 shadow-lg hover:shadow-xl transition-shadow">
                  <Code2 className="w-12 h-12 text-white  " />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2 text-center">Sample Code</h3>
                <p className="text-gray-600 text-center text-sm mb-4">Ready-to-use code examples and snippets</p>
                <Button
                  className="bg-blue-500 hover:bg-blue-700 text-white w-full"
                  onClick={() => handleExplore("code")}
                >
                  Explore
                </Button>
              </div>
            </div>
          </div>
          {/* Quick Start CTA */}
          <div className="mt-16 text-center">
            <div className="inline-flex items-center gap-2 bg-orange-50 border border-orange-200 rounded-full px-6 py-3">
              <Zap className="w-5 h-5 text-orange-600" />
              <span className="text-orange-900 font-medium">Want to jump right in?</span>
              <Button
                variant="ghost"
                className="text-orange-600 hover:text-orange-700 font-semibold"
                onClick={handleGetStarted}
              >
                Quick Start →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Architecture Overview */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Architecture Overview</h2>
            <p className="text-lg text-gray-600">
              Understand the self-hosting architecture and deployment process.
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-gray-200 bg-white">
            <img 
              src="/arch.png" 
              alt="JudgeLib Self-Hosting Architecture" 
              className="w-full h-auto"
              onError={(e) => {
                e.currentTarget.src = "/arch.png"
              }}
            />
          </div>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Download className="w-6 h-6 text-orange-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Install NPM Package</h4>
              <p className="text-sm text-gray-600">Install lib-judge in your application</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center mx-auto mb-3">
                <Cloud className="w-6 h-6 text-gray-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Deploy Worker</h4>
              <p className="text-sm text-gray-600">Run the worker container with Redis</p>
            </div>
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <Terminal className="w-6 h-6 text-blue-600" />
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Scale with K8s</h4>
              <p className="text-sm text-gray-600">Auto-scale with Kubernetes</p>
            </div>
          </div>
        </div>
      </section>

      {/* Prerequisite Requirements */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="prerequisites">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-600 mb-8">Prerequisite Requirements</h2>
          <div className="space-y-10">
            {/* Step 1 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h4 className="font-semibold text-gray-900">Chocolatey Package Manager</h4>
              </div>
              <p className="text-gray-700 ml-11">
                Chocolatey is a package manager for Windows that simplifies the installation of software and
                dependencies. It is required for managing packages in your self-hosted environment.
              </p>
              <div className="ml-11">
                <Link href="https://chocolatey.org/install" target="_blank" rel="noopener noreferrer">
                  <Button className="bg-orange-400 hover:bg-orange-700 text-white">
                    <Download className="w-4 h-4 mr-2" />
                    Install Chocolatey
                  </Button>
                </Link>
              </div>
              <div className="ml-11 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Note:</strong> Follow the official Chocolatey installation guide to ensure proper setup. You
                    may need administrator privileges to install Chocolatey on your system.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 2 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h4 className="font-semibold text-gray-900">Install Kubernetes CLI (kubectl)</h4>
              </div>
              <p className="text-gray-700 ml-11">
                The Kubernetes CLI (kubectl) is required to interact with your Kubernetes cluster. You can install it
                using Chocolatey after the package manager is set up.
              </p>
              <div className="ml-11 bg-gray-900 border border-gray-700 rounded-md p-3 text-sm font-mono text-gray-100 overflow-x-auto">
                choco install kubernetes-cli
              </div>
              <div className="ml-11 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> After installation, verify by running{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded text-gray-900">kubectl version --client</code> in
                    your terminal.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h4 className="font-semibold text-gray-900">Install Kind (Kubernetes IN Docker)</h4>
              </div>
              <p className="text-gray-700 ml-11">
                Kind is a tool for running local Kubernetes clusters using Docker containers as nodes. It's especially
                useful for testing and development environments.
              </p>
              <div className="ml-11 bg-gray-900 border border-gray-700 rounded-md p-3 text-sm font-mono text-gray-100 overflow-x-auto">
                choco install kind
              </div>
              <div className="ml-11 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> After installation, verify Kind is installed by running{" "}
                    <code className="bg-gray-200 px-2 py-1 rounded text-gray-900">kind version</code> in your terminal.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 4 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <h4 className="font-semibold text-gray-900">Setup Helm</h4>
              </div>
              <p className="text-gray-700 ml-11">
                Helm is a package manager for Kubernetes that helps you define, install, and upgrade Kubernetes
                applications. Use it to deploy monitoring and other services to your cluster.
              </p>
              <div className="ml-11 bg-gray-900 border border-gray-700 rounded-md p-3 text-sm font-mono text-gray-100 overflow-x-auto">
                <div>helm repo add prometheus-community https://prometheus-community.github.io/helm-charts</div>
                <div>helm repo update</div>
                <div>
                  helm install prometheus prometheus-community/kube-prometheus-stack --namespace monitoring
                  --create-namespace
                </div>
              </div>
              <div className="ml-11 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> Helm makes it easy to manage complex Kubernetes deployments with
                    pre-configured charts.
                  </p>
                </div>
              </div>
            </div>
            {/* Step 5 */}
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  5
                </div>
                <h4 className="font-semibold text-gray-900">Port Forward to Redis (OPTIONAL) </h4>
              </div>
              <p className="text-gray-700 ml-11">
                Port forwarding allows you to access Redis running inside your Kubernetes cluster from your local
                machine. This is useful for development and debugging purposes.
              </p>
              <div className="ml-11 bg-gray-900 border border-gray-700 rounded-md p-3 text-sm font-mono text-gray-100 overflow-x-auto">
                kubectl port-forward -n judge-namespace redis-0 6379:6379
              </div>
              <div className="ml-11 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-gray-700">
                    <strong>Tip:</strong> This command forwards port 6379 from your Redis pod to your local machine.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Get Started Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="get-started">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-600 mb-8">Get Started</h2>
          <div className="space-y-8">
            {/* Step 1 */}
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  1
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Install NPM Package</h3>
              </div>
              <p className="text-gray-700 mb-4">First, install the lib-judge package in your Node.js application:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400"># Install the package</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleCopyCode("npm install lib-judge")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code>npm install lib-judge</code>
              </div>
            </div>
            {/* Step 2 */}
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  2
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Environment Configuration</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Create a <code className="bg-gray-200 px-2 py-1 rounded text-gray-900">.env</code> file and add the
                Redis configuration variables:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400"># .env file</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() =>
                      handleCopyCode(
                        "password_redis=your_redis_password\nhost_redis=redis-service.judge-namespace.svc.cluster.local\nredis_port=6379",
                      )
                    }
                  >
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
                    <span className="text-green-400">redis-service.judge-namespace.svc.cluster.local</span>
                  </div>
                  <div>
                    <span className="text-blue-400">redis_port</span>=<span className="text-green-400">6379</span>
                  </div>
                </div>
              </div>
            </div>
            {/* Step 3 */}
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  3
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Deploy Worker Container (OPTIONAL)</h3>
              </div>
              <p className="text-gray-700 mb-4">Pull the worker image and run it with your Redis configuration:</p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400"># Pull the worker image</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() =>
                      handleCopyCode(" docker pull lightningsagar/worker:210b8cfd943b24e7381c4c8f1f3114c2d1fd3d81 ")
                    }
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code>  docker pull lightningsagar/worker:210b8cfd943b24e7381c4c8f1f3114c2d1fd3d81
                  </code>
              </div>
            </div>
            {/* Step 4 */}
            <div className="border-l-4 border-orange-600 pl-6 py-4">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center text-sm font-bold">
                  4
                </div>
                <h3 className="text-xl font-semibold text-gray-900">Setup Kubernetes Operations</h3>
              </div>
              <p className="text-gray-700 mb-4">
                Clone the operations repository that contains Kubernetes configurations with horizontal pod autoscaling:
              </p>
              <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-gray-400"># Clone the ops repository</span>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="text-gray-400 hover:text-white"
                    onClick={() => handleCopyCode("git clone https://github.com/lightning-sagar/worker-ops")}
                  >
                    <Copy className="w-4 h-4" />
                  </Button>
                </div>
                <code>git clone https://github.com/lightning-sagar/worker-ops</code>
              </div>
              <div className="mt-4 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                <div className="flex items-start">
                  <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <div>
                    <p className="text-sm text-gray-700">
                      <strong>Customizable:</strong> You can modify the code in the ops repository to suit your specific
                      deployment requirements and infrastructure needs.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Deploy to Kubernetes - GREEN SECTION */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50" id="deploy-k8s">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-600 mb-8">Deploy to Kubernetes</h2>
          <div className="bg-white rounded-lg p-8 shadow-lg">
            <div className="border-l-4 border-orange-500 pl-6 py-4 space-y-6">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <Terminal className="w-6 h-6 text-orange-500" />
                  <h3 className="text-xl font-semibold text-gray-900">Apply Kubernetes Configurations</h3>
                </div>
                <p className="text-gray-700 mb-4">
                  Deploy your JudgeLib worker with horizontal pod autoscaling enabled
                </p>
              </div>
              <div className="space-y-4">
                <div>
                  <p className="text-gray-700 mb-3 font-semibold">Create Cluster:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Creating Cluster</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() =>
                          handleCopyCode("kind create cluster --config .\\cluster.yml -n workers-clusters")
                        }
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>kind create cluster --config .\cluster.yml -n workers-clusters</code>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 mb-3 font-semibold">Create namespace:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Creating namespace</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleCopyCode("kubectl create namespace judge-namespace")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>kubectl create namespace judge-namespace</code>
                  </div>
                </div>
                <div>
                  <p className="text-gray-700 mb-3 font-semibold">Apply the deployment configuration:</p>
                  <div className="bg-gray-900 text-gray-100 p-4 rounded-lg font-mono text-sm overflow-x-auto">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-gray-400"># Deploy the application</span>
                      <Button
                        size="sm"
                        variant="ghost"
                        className="text-gray-400 hover:text-white"
                        onClick={() => handleCopyCode("kubectl apply -f judge-workers")}
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                    </div>
                    <code>kubectl apply -f judge-workers</code>
                  </div>
                </div>
                <div className="mt-6 p-4 bg-blue-50 border-l-4 border-blue-600 rounded">
                  <div className="flex items-start">
                    <CheckCircle className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-blue-900 mb-1">Auto-scaling Benefits</h4>
                      <p className="text-sm text-gray-700">
                        The HPA configuration automatically scales your worker pods based on CPU usage and request load,
                        ensuring optimal performance and cost efficiency.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Using lib-judge */}
      <section className="py-16 px-4 sm:px-6 lg:px-8" id="using-lib-judge">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-orange-600 mb-8">Using lib-judge in Your Code</h2>
          <div className="border-l-4 border-orange-600 pl-6 py-4 space-y-6">
            <div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Sample Implementation</h3>
              <p className="text-gray-700 mb-4">Here's how to use the lib-judge package in your Node.js application</p>
            </div>
            <div className="bg-gray-900 text-gray-100 p-6 rounded-lg font-mono text-sm overflow-x-auto">
              <div className="flex items-center justify-between mb-4">
                <span className="text-gray-400"># Sample usage</span>
                <Button
                  size="sm"
                  variant="ghost"
                  className="text-gray-400 hover:text-white"
                  onClick={() =>
                    handleCopyCode(`const result = await judge({
  codePath: tmpPath,
  ques_name: \`question_\${Date.now()}\`,
  input,
  output,
  timeout: timeout,
  sizeout: sizeout,
  language: langCode,
});`)
                  }
                >
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
              <p className="text-gray-400 mt-4">
                // or checkout the full code example here{" "}
                <Link href="https://github.com/lightning-sagar/Judge/" className="text-blue-400 hover:text-blue-300">
                  https://github.com/lightning-sagar/Judge/
                </Link>
              </p>
            </div>
            <div className="bg-green-50 rounded p-6">
              <h4 className="font-semibold text-green-700 mb-4 text-lg">Parameters:</h4>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      codePath
                    </code>
                    <p className="text-green-600 text-sm mt-1">Path to the code file to execute</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      ques_name
                    </code>
                    <p className="text-green-600 text-sm mt-1">Unique identifier for the question/execution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      input
                    </code>
                    <p className="text-green-600 text-sm mt-1">Input data for the code execution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      output
                    </code>
                    <p className="text-green-600 text-sm mt-1">Expected output for validation</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      timeout
                    </code>
                    <p className="text-green-600 text-sm mt-1">Execution timeout in seconds</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      sizeout
                    </code>
                    <p className="text-green-600 text-sm mt-1">Memory limit for execution</p>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <CheckCircle className="w-4 h-4 text-green-600 mt-1 flex-shrink-0" />
                  <div>
                    <code className="bg-white px-2 py-1 rounded text-sm font-mono text-gray-900 font-semibold">
                      language
                    </code>
                    <p className="text-green-600 text-sm mt-1">Programming language (py, cpp, java)</p>
                  </div>
                </div>
              </div>
            </div>
            <Link href="/docs">
              <Button className="bg-orange-600 hover:bg-orange-700 text-white">
                <Terminal className="w-4 h-4 mr-2" />
                View Full Documentation
              </Button>
            </Link>
          </div>
        </div>
      </section >

      {/* Footer */}
      <Footer />
    </div >
  )
}