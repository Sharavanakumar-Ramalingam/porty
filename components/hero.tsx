"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { ArrowDown, Github, Instagram, Linkedin } from "lucide-react"

export function Hero() {
  const [isVisible, setIsVisible] = useState(false)
  const [particles, setParticles] = useState<
    Array<{ id: number; x: number; y: number; delay: number }>
  >([])
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  const roles = ["AIML Developer", "Data Scientist"]

  // Particle background
  useEffect(() => {
    const particleArray = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      delay: Math.random() * 8,
    }))
    setParticles(particleArray)
  }, [])

  // Typing effect for roles
  useEffect(() => {
    const currentRole = roles[currentRoleIndex]
    const typingSpeed = isDeleting ? 50 : 100
    const pauseTime = isDeleting ? 500 : 2000

    const timeout = setTimeout(() => {
      if (!isDeleting && currentText === currentRole) {
        setTimeout(() => setIsDeleting(true), pauseTime)
      } else if (isDeleting && currentText === "") {
        setIsDeleting(false)
        setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
      } else if (isDeleting) {
        setCurrentText(currentRole.substring(0, currentText.length - 1))
      } else {
        setCurrentText(currentRole.substring(0, currentText.length + 1))
      }
    }, typingSpeed)

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentRoleIndex, roles])

  // 🔑 Re-trigger animation on nav click (#home)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#home" || window.location.hash === "" || window.location.hash === "/") {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 100) // restart animation
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Trigger on first load
  useEffect(() => setIsVisible(true), [])

  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden scroll-smooth"
    >
      {/* Background Particles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-primary/10 to-accent/10 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-accent/10 to-secondary/10 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>

        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle animate-particle-float"
            style={{
              left: `${particle.x}%`,
              top: `${particle.y}%`,
              animationDelay: `${particle.delay}s`,
            }}
          />
        ))}
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Text Section */}
          <div
            className={`space-y-8 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <div className="space-y-4">
              <p className="text-primary font-medium text-lg">Hello, I am</p>
              <h1 className="text-5xl lg:text-6xl font-bold text-foreground font-serif leading-tight hover-3d">
                Sharavana Kumar R G
              </h1>
              <p className="text-xl text-muted-foreground font-medium glass px-4 py-2 rounded-lg inline-block">
                <span className="typewriter-text text-orange-500">
                  {currentText}
                </span>
              </p>
            </div>

            {/* Buttons */}
            <div className="flex flex-wrap gap-4">
              <Button size="lg" className="glow-button hover-3d">
                <a
                  href="mailto:sharavanakumar3006@gmail.com?subject=Hello Sharavana&body=I wanted to get in touch with you."
                >
                  Get In Touch
                </a>
              </Button>
              <Button
                variant="outline"
                size="lg"
                className="glass hover-3d bg-transparent"
              >
                <a href="#projects">View My Work</a>
              </Button>
            </div>

            {/* Social Links */}
            <div className="flex space-x-4 pt-4">
              <Button variant="ghost" size="sm" className="hover-3d glow-button-subtle">
                <a
                  href="https://www.instagram.com/just_sharavana/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Instagram className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover-3d glow-button-subtle">
                <a
                  href="https://www.linkedin.com/in/sharavanakumar06"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-5 w-5" />
                </a>
              </Button>
              <Button variant="ghost" size="sm" className="hover-3d glow-button-subtle">
                <a
                  href="https://github.com/Sharavanakumar-Ramalingam"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-5 w-5" />
                </a>
              </Button>
            </div>
          </div>

          {/* Right Image Section */}
          <div
            className={`flex justify-center lg:justify-end ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <div className="relative">
              <div className="w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 border-primary/30 shadow-2xl hover-3d">
                <img
                  src="/saro1.jpg"
                  alt="Sharavana Kumar R G"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Floating Shapes */}
              <div className="absolute -top-8 -right-8 w-16 h-16 floating-cube">
                <div className="cube-container">
                  <div className="cube">
                    <div className="cube-face cube-front"></div>
                    <div className="cube-face cube-back"></div>
                    <div className="cube-face cube-right"></div>
                    <div className="cube-face cube-left"></div>
                    <div className="cube-face cube-top"></div>
                    <div className="cube-face cube-bottom"></div>
                  </div>
                </div>
              </div>

              <div className="absolute -bottom-12 -left-12 w-20 h-20 floating-sphere">
                <div className="wireframe-sphere"></div>
              </div>

              <div className="absolute top-1/4 -right-12 w-12 h-12 floating-pyramid">
                <div className="pyramid"></div>
              </div>
            </div>
          </div>
        </div>

        {/* Scroll Down Arrow */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <div className="p-3 rounded-full glass">
            <ArrowDown className="h-6 w-6 text-primary" />
          </div>
        </div>
      </div>
    </section>
  )
}
