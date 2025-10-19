"use client"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { Menu, X } from "lucide-react"

const navItems = [
  { name: "Home", link: "/" },
  { name: "Self-Host", link: "/selfhost", isNew: true },
  { name: "NPM Library", link: "/npm" },
  { name: "Microservice", link: "/microservice" },
  { name: "Docs", link: "/docs" },
]

export const FloatingNav = ({ className }: { className?: string }) => {
  const [visible, setVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const controlNavbar = () => {
      if (typeof window !== "undefined") {
        if (window.scrollY > lastScrollY && window.scrollY > 100) {
          setVisible(false)
          setMobileMenuOpen(false)
        } else {
          setVisible(true)
        }
        setLastScrollY(window.scrollY)
      }
    }

    if (typeof window !== "undefined") {
      window.addEventListener("scroll", controlNavbar)
      return () => {
        window.removeEventListener("scroll", controlNavbar)
      }
    }
  }, [lastScrollY])

  return (
    <>
      <AnimatePresence mode="wait">
        <motion.div
          initial={{
            opacity: 1,
            y: 0,
          }}
          animate={{
            y: visible ? 0 : -100,
            opacity: visible ? 1 : 0,
          }}
          transition={{
            duration: 0.2,
          }}
          className={cn(
            "flex max-w-fit fixed top-6 inset-x-0 mx-auto border border-gray-200 dark:border-white/[0.2] rounded-full bg-white/80 dark:bg-black/80 backdrop-blur-md shadow-lg z-[5000] px-4 sm:px-6 py-3 items-center justify-between",
            className,
          )}
        >
          <Link href="/" className="text-xl font-bold text-gray-900 mr-2 sm:mr-4">
            Judge<span className="text-orange-500">Lib</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1 sm:space-x-4">
            {navItems.map((navItem, idx) => (
              <Link
                key={`link-${idx}`}
                href={navItem.link}
                className={cn(
                  "relative dark:text-neutral-50 items-center flex space-x-1 text-neutral-600 dark:hover:text-neutral-300 hover:text-neutral-500 px-2 sm:px-3 py-2 rounded-full transition-colors text-sm",
                  pathname === navItem.link && "text-orange-500",
                )}
              >
                <span>{navItem.name}</span>
                {navItem.isNew && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="ml-1 px-1.5 py-0.5 text-xs font-semibold bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-full shadow-sm"
                  >
                    NEW
                  </motion.span>
                )}
                {pathname === navItem.link && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className={
                      "absolute inset-0 rounded-full -z-10 bg-orange-100"
                    }

                    transition={{
                      type: "spring",
                      bounce: 0.25,
                      stiffness: 130,
                      damping: 9,
                    }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-full hover:bg-gray-100 transition-colors"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5 text-gray-700" /> : <Menu className="w-5 h-5 text-gray-700" />}
          </button>
        </motion.div>
      </AnimatePresence>

      {/* Mobile Menu Dropdown */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed top-20 inset-x-4 md:hidden bg-white border border-gray-200 rounded-xl shadow-lg z-[4999] py-3 px-4"
          >
            <div className="flex flex-col space-y-1">
              {navItems.map((navItem, idx) => (
                <Link
                  key={`mobile-link-${idx}`}
                  href={navItem.link}
                  onClick={() => setMobileMenuOpen(false)}
                  className={cn(
                    "relative flex items-center justify-between px-4 py-3 rounded-lg transition-colors",
                    pathname === navItem.link
                      ? "bg-orange-100 text-orange-500 font-medium"
                      : "text-gray-700 hover:bg-gray-100",
                  )}
                >
                  <span>{navItem.name}</span>
                  {navItem.isNew && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="px-2 py-1 text-xs font-semibold bg-gradient-to-r from-orange-400 to-red-500 text-white rounded-full shadow-sm"
                    >
                      NEW
                    </motion.span>
                  )}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
