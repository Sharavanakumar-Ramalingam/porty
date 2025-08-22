"use client"

import type React from "react"
import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink } from "lucide-react"

export function Projects() {
  const [isVisible, setIsVisible] = useState(false)
  const [hoveredProject, setHoveredProject] = useState<number | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const projects = [
    {
      title: "Farmers Buddy",
      description:
        "ML-powered crop recommendation system based on soil and weather data to help farmers maximize yield.",
      image: "/farmpulse.png",
      technologies: ["Django", "React", "MongoDB", "NLP"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sharavanakumar-Ramalingam/Farmpulse-ai",
    },
    {
      title: "Medical Chatbot",
      description:
        "NLP-powered chatbot for symptom analysis and disease prediction. Offers virtual health assistance using AI.",
      image: "/medchat.png",
      technologies: ["Python", "MongoDB", "Langchain", "Flask"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sharavanakumar-Ramalingam/MED_CHAT",
    },
    {
      title: "LinguaLearn",
      description:
        "An AI-powered language learning platform that helps users practice and master new languages through interactive lessons.",
      image: "/lingualearn.png",
      technologies: ["React", "NLP", "ML", "Flask"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sharavanakumar-Ramalingam/lingualearn",
    },
    {
      title: "Sibi",
      description:
        "An intelligent study assistant that provides personalized learning support, study plans, quizzes, and answer sheet analysis using AI.",
      image: "/sibi.png",
      technologies: ["React", "3D Modeling", "LLM", "Fastapi"],
      liveUrl: "#",
      githubUrl: "https://github.com/Sharavanakumar-Ramalingam/SIBI_AI",
    },
    {
      title: "AI Image Editor",
      description:
        "Smart image editor with background remover, style transfer, and real-time enhancements powered by AI.",
      image: "/textedit.png",
      technologies: ["Gradio", "OpenCV", "Transformers", "DL"],
      liveUrl: "#",
      githubUrl: "https://shorturl.at/KPLHY",
    },
    {
      title: "Text-to-Image Generator",
      description:
        "Generative AI model that creates images from textual descriptions, enabling users to visualize concepts effortlessly.",
      image: "/t2t.png",
      technologies: ["Gradio", "NLP", "ML", "Transformers"],
      liveUrl: "#",
      githubUrl: "https://shorturl.at/pl52f",
    },
    {
      title: "Text-to-Video Generator",
      description:
        "Generative AI model that creates videos from textual descriptions, enabling users to visualize concepts effortlessly.",
      image: "/t2v.png",
      technologies: ["Gradio", "NLP", "ML", "Transformers"],
      liveUrl: "#",
      githubUrl: "https://shorturl.at/5hIRI",
    },
  ]

  // 🔹 Animate when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true)
      },
      { threshold: 0.1 }
    )
    if (sectionRef.current) observer.observe(sectionRef.current)
    return () => observer.disconnect()
  }, [])

  // 🔹 Re-trigger animation when navigating via #projects
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#projects") {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  // Hover tilt effect
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>, index: number) => {
    if (hoveredProject !== index) return
    const card = e.currentTarget
    const rect = card.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 10
    const rotateY = (centerX - x) / 10
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateZ(20px)`
  }

  const handleMouseLeave = (e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget
    card.style.transform = "perspective(1000px) rotateX(0deg) rotateY(0deg) translateZ(0px)"
    setHoveredProject(null)
  }

  return (
    <section id="projects" ref={sectionRef} className="py-20 bg-muted/30 relative overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-10 right-20 w-48 h-48 bg-primary/10 rounded-full blur-3xl animate-float glow-primary"></div>
        <div
          className="absolute bottom-10 left-20 w-36 h-36 bg-accent/10 rounded-full blur-3xl animate-float glow-accent"
          style={{ animationDelay: "3s" }}
        ></div>

        <div className="absolute inset-0 opacity-10">
          <div className="grid grid-cols-12 gap-4 h-full">
            {Array.from({ length: 48 }).map((_, i) => (
              <div
                key={i}
                className="border border-primary/20 animate-pulse"
                style={{ animationDelay: `${i * 0.1}s` }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif hover-3d">Featured Projects</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto glass-strong p-4 rounded-lg">
            Here are some of my recent projects that showcase my skills and experience.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`group card-enhanced glass hover-lift overflow-hidden relative cursor-pointer ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{
                animationDelay: `${index * 0.2}s`,
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onMouseEnter={() => setHoveredProject(index)}
              onMouseMove={(e) => handleMouseMove(e, index)}
              onMouseLeave={handleMouseLeave}
            >
              {/* Project Image */}
              <div className="relative overflow-hidden group/image">
                <img
                  src={project.image || "/placeholder.svg"}
                  alt={project.title}
                  className="w-full h-48 object-cover transition-all duration-700 ease-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20 opacity-0 group-hover:opacity-100 transition-all duration-500"></div>
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-primary/30 transition-all duration-500 rounded-t-lg"></div>

                {/* Sparkle effect on hover */}
                {hoveredProject === index && (
                  <div className="absolute inset-0 pointer-events-none">
                    {Array.from({ length: 6 }).map((_, i) => (
                      <div
                        key={i}
                        className="absolute w-1 h-1 bg-primary rounded-full animate-float-sparkle opacity-70"
                        style={{
                          left: `${15 + i * 15}%`,
                          top: `${20 + (i % 2) * 40}%`,
                          animationDelay: `${i * 0.3}s`,
                          animationDuration: "2s",
                        }}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Project Info */}
              <div className="relative z-10 transform transition-all duration-500 group-hover:translate-y-[-2px]">
                <CardHeader>
                  <CardTitle className="text-foreground group-hover:text-primary transition-all duration-300 transform group-hover:scale-105 origin-left">
                    {project.title}
                  </CardTitle>
                </CardHeader>

                <CardContent className="space-y-4">
                  <p className="text-muted-foreground leading-relaxed transition-all duration-300 group-hover:text-foreground/80">
                    {project.description}
                  </p>

                  {/* Tech stack badges */}
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech, techIndex) => (
                      <Badge
                        key={tech}
                        variant="secondary"
                        className="text-xs glass hover-lift transition-all duration-300 transform group-hover:scale-105"
                        style={{
                          transitionDelay: `${techIndex * 50}ms`,
                          animationDelay: `${techIndex * 100}ms`,
                        }}
                      >
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  {/* View Project button */}
                  <div className="flex justify-center pt-2 transform transition-all duration-500 group-hover:translate-y-[-1px]">
                    <a href={project.githubUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                      <Button
                        size="sm"
                        className="view-project-btn w-full bg-gradient-to-r from-primary to-accent text-primary-foreground font-medium transition-all duration-300 hover:shadow-lg hover:shadow-primary/25"
                      >
                        <ExternalLink className="mr-2 h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
                        View Project
                      </Button>
                    </a>
                  </div>
                </CardContent>
              </div>

              {/* Decorative pulses */}
              <div className="absolute top-3 right-3 w-2 h-2 bg-primary rounded-full animate-pulse opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div
                className="absolute bottom-3 left-3 w-1.5 h-1.5 bg-accent rounded-full animate-pulse opacity-40 group-hover:opacity-80 transition-opacity duration-300"
                style={{ animationDelay: "0.5s" }}
              ></div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
