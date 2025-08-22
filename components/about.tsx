"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Brain, Code, Database, Rocket } from "lucide-react"

export function About() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  // 🔑 Intersection Observer (scroll into view)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.2 }
    )

    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 🔑 Re-trigger animation when navigating with hash (#about)
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#about") {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  const features = [
    {
      icon: Brain,
      title: "AI & Machine Learning",
      description:
        "Building intelligent systems using ML, NLP, and computer vision. Experienced with TensorFlow, PyTorch, LangChain, and GANs.",
      animation: "animate-slide-in-left",
    },
    {
      icon: Database,
      title: "Data & Backend",
      description:
        "Strong in Python, Java, and backend frameworks like Django, Flask, and Node.js. Skilled with MySQL, MongoDB, and PostgreSQL.",
      animation: "animate-slide-in-up",
    },
    {
      icon: Code,
      title: "Full-Stack Development",
      description:
        "Experienced in creating responsive, user-focused web apps using React, Next.js, and modern web technologies.",
      animation: "animate-slide-in-down",
    },
    {
      icon: Rocket,
      title: "Innovation & Hackathons",
      description:
        "Multiple hackathon wins with projects like FarmPulse AI and LinguaLearn. Passionate about turning ideas into impactful solutions.",
      animation: "animate-slide-in-right",
    },
  ]

  return (
    <section id="about" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div
          className={`text-center mb-16 ${
            isVisible ? "animate-fade-in-up" : "opacity-0"
          }`}
        >
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">
            About Me
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            I’m Sharavana Kumar, a passionate AI/ML developer and full-stack
            engineer. With a strong foundation in Computer Science, I love
            solving real-world problems using machine learning, data analysis,
            and web technologies. I thrive on innovation and have proven my
            skills through hackathons, research projects, and industry
            internships.
          </p>
        </div>

        {/* Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card
              key={feature.title}
              className={`group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-border/50 ${
                isVisible ? feature.animation : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.2}s` }}
            >
              <CardContent className="p-8 text-center">
                <div className="mb-6 flex justify-center">
                  <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <feature.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-4">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
