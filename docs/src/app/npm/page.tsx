"use client"
import { FloatingNav } from "@/components/ui/floating-navbar"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Package, Download, Zap, Shield, ExternalLink, CheckCircle, Users } from "lucide-react"
import Link from "next/link"
import { PingWorker } from "@/components/ui/ping-worker"

export default function NPMPage() {
  return (
    <div className="min-h-screen bg-white">
      <FloatingNav />

      {/* Hero Section */}
      <section className="py-32 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <div className="w-20 h-20 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Package className="w-10 h-10 text-orange-500" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">NPM Library</h1>
            <p className="text-xl text-gray-600 mb-8">
              Install JudgeLib directly into your Node.js application for seamless code execution capabilities.
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
                <ExternalLink className="w-4 h-4 mr-2" />
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
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Why Choose NPM Library?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Zero Configuration</h3>
              <p className="text-gray-600">
                Install and start executing code immediately with sensible defaults and automatic setup.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Horizontal Scaling</h3>
              <p className="text-gray-600">
                Scale your code execution capacity by deploying multiple instances behind a load balancer.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-orange-500" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Local Execution</h3>
              <p className="text-gray-600">
                Execute code locally within your application without external dependencies or network calls.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Installation Guide */}
      <section id="installation" className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Installation Guide</h2>

          <div className="space-y-8">
            {/* Step 1 */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Badge className="bg-orange-500 text-white">1</Badge>
                  Install Package
                </CardTitle>
                <CardDescription>Add lib-judge to your Node.js project</CardDescription>
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
                  Basic Usage
                </CardTitle>
                <CardDescription>Start executing code in your application</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">JavaScript (ES Modules)</h4>
                  <div className="bg-gray-900 rounded-lg p-4 text-sm overflow-x-auto">
                    <pre className="text-blue-400">
                      {`import fs from 'fs';
import path from 'path';
import { judge } from 'lib-judge';

// Assuming code is a string of C++ source code
const code = \`
#include<iostream>
#include<vector>
using namespace std;
int main(){
    int n;
    cin>>n;
    vector<int> v(n);
    for(int i = 0;i<n;i++){
        cin>>v[i];
    }
    int c = 0;
    for(auto it:v){
        c+=it;
    }
    cout<<c;
    return 0;
}\`;

// Save to a temporary file
const tmpDir = './tmp';
if (!fs.existsSync(tmpDir)) fs.mkdirSync(tmpDir);
const tmpPath = path.join(tmpDir, \`code_\${Date.now()}.cpp\`);
fs.writeFileSync(tmpPath, code, 'utf-8');

// Call judge with the correct file path
const result = await judge({
  codePath: tmpPath,//path of the file
  ques_name: 'sum of array',
  input: '5 1 2 3 4 5 ### 3 1 2 3 ### 2 1 2',
  output: '15 ### 6 ### 3',
  language:'cpp',
  timeout: '2',
  sizeout: '64',
});

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
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Supported Languages</h2>

          <div className="grid md:grid-cols-2 gap-6">
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
