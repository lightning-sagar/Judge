import Link from "next/link"
import React from 'react'

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">
                Judge<span className="text-orange-500">Lib</span>
              </h3>
              <p className="text-gray-400 text-sm">Code evaluation made simple.</p>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Product</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                 <li>
                  <Link href="/selfhost" className="hover:text-orange-500 transition-colors">
                    Self-Host
                  </Link>
                </li>
                <li>
                  <Link href="/npm" className="hover:text-orange-500 transition-colors">
                    NPM Library
                  </Link>
                </li>
                <li>
                  <Link href="/microservice" className="hover:text-orange-500 transition-colors">
                    Microservice
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Resources</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li>
                  <Link href="/docs" className="hover:text-orange-500 transition-colors">
                    Documentation
                  </Link>
                </li>
                <li>
                  <Link href="https://github.com/lightning-sagar/Judge" className="hover:text-orange-500 transition-colors">
                    GitHub
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4">Support</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                
                <li>
                  <Link href="https://github.com/lightning-sagar/Judge/issues" className="hover:text-orange-500 transition-colors">
                    Issues
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
  )
}

export default Footer