"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { Menu, X, Bell, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/contexts/auth-context"

type GamifiedNavbarProps = {
  theme: any
  isWaitlistMode?: boolean
  onOpenAuth?: () => void
}

export function GamifiedNavbar({ theme, isWaitlistMode = false, onOpenAuth }: GamifiedNavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const { isAuthenticated, user, logout } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? "bg-dark/90 backdrop-blur-md py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <div className="relative">
              <div className="absolute -inset-1 bg-gradient-to-r from-primary to-[#8667ff] rounded-full opacity-70 blur-sm"></div>
              <div className="relative bg-black rounded-full px-3 py-1.5">
                <span className="text-lg font-bold tracking-tight text-white">
                  SPORTYFY<span className="text-primary">.LIVE</span>
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#challenges" className="text-white/80 hover:text-white transition-colors">
              Challenges
            </a>
            <a href="#leaderboard" className="text-white/80 hover:text-white transition-colors">
              Leaderboard
            </a>
            <a href="#sports" className="text-white/80 hover:text-white transition-colors">
              Sports
            </a>
            <a href="#community" className="text-white/80 hover:text-white transition-colors">
              Community
            </a>
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {!isWaitlistMode && isAuthenticated && (
              <>
                <button className="text-white/80 hover:text-white transition-colors">
                  <Bell className="h-5 w-5" />
                </button>
                <button className="text-white/80 hover:text-white transition-colors">
                  <Search className="h-5 w-5" />
                </button>
              </>
            )}
            {isAuthenticated ? (
              <div className="flex items-center space-x-3">
                <span className="text-white/80 text-sm">Hi, {user?.name}</span>
                <Button
                  onClick={logout}
                  className="bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                  size="sm"
                >
                  Logout
                </Button>
              </div>
            ) : (
              <Button
                onClick={onOpenAuth}
                className="bg-primary text-white hover:opacity-90 transition-opacity"
                size="sm"
              >
                Sign Up
              </Button>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden text-white" onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-dark border-t border-gray-800"
          >
            <div className="container mx-auto px-4 py-4">
              <nav className="flex flex-col space-y-4">
                <a
                  href="#challenges"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Challenges
                </a>
                <a
                  href="#leaderboard"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Leaderboard
                </a>
                <a
                  href="#sports"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Sports
                </a>
                <a
                  href="#community"
                  className="text-white/80 hover:text-white transition-colors py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Community
                </a>
                <div className="pt-2 flex items-center justify-between">
                  {isAuthenticated ? (
                    <div className="flex items-center justify-between w-full">
                      <span className="text-white/80 text-sm">Hi, {user?.name}</span>
                      <Button
                        onClick={logout}
                        className="bg-gray-700 text-white hover:bg-gray-600 transition-colors"
                        size="sm"
                      >
                        Logout
                      </Button>
                    </div>
                  ) : (
                    <Button
                      onClick={onOpenAuth}
                      className="bg-primary text-white hover:opacity-90 transition-opacity"
                      size="sm"
                    >
                      Sign Up
                    </Button>
                  )}
                  {!isWaitlistMode && isAuthenticated && (
                    <div className="flex space-x-4 ml-4">
                      <button className="text-white/80 hover:text-white transition-colors">
                        <Bell className="h-5 w-5" />
                      </button>
                      <button className="text-white/80 hover:text-white transition-colors">
                        <Search className="h-5 w-5" />
                      </button>
                    </div>
                  )}
                </div>
              </nav>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}

function AnimatePresence({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
