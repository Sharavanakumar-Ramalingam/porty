"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import {
  SiJavascript,
  SiTypescript,
  SiReact,
  SiHtml5,
  SiCss3,
  SiPython,
  SiMongodb,
  SiMysql,
  SiGit,
  SiDocker,
  SiKubernetes,
  SiNodedotjs,
  SiPhp,
  SiPostgresql,
} from "react-icons/si"
import { DiJava } from "react-icons/di"

export function Skills() {
  const [visibleCards, setVisibleCards] = useState<number[]>([])
  const sectionRef = useRef<HTMLElement>(null)

  const skills = [
    { name: "Python", icon: SiPython, color: "text-green-500" },
    { name: "Java", icon: DiJava, color: "text-red-500" },
    { name: "PHP", icon: SiPhp, color: "text-indigo-600" },
    { name: "Node.js", icon: SiNodedotjs, color: "text-green-600" },
    { name: "JavaScript", icon: SiJavascript, color: "text-yellow-500" },
    { name: "TypeScript", icon: SiTypescript, color: "text-blue-500" },
    { name: "React", icon: SiReact, color: "text-sky-500" },
    { name: "HTML5", icon: SiHtml5, color: "text-orange-600" },
    { name: "CSS3", icon: SiCss3, color: "text-blue-600" },
    { name: "MongoDB", icon: SiMongodb, color: "text-green-700" },
    { name: "MySQL", icon: SiMysql, color: "text-blue-700" },
    { name: "PostgreSQL", icon: SiPostgresql, color: "text-sky-700" },
    { name: "Git", icon: SiGit, color: "text-orange-500" },
    { name: "Docker", icon: SiDocker, color: "text-blue-500" },
    { name: "Kubernetes", icon: SiKubernetes, color: "text-sky-600" },
  ]

  useEffect(() => {
    const cards = sectionRef.current?.querySelectorAll(".skill-card")

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry, i) => {
          if (entry.isIntersecting) {
            setVisibleCards((prev) => [...new Set([...prev, i])])
          }
        })
      },
      { threshold: 0.2 }
    )

    cards?.forEach((card) => observer.observe(card))

    return () => observer.disconnect()
  }, [])

  // 🔑 Re-trigger animation on navigation click
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#skills") {
        setVisibleCards([]) // reset
        setTimeout(() => {
          const cards = sectionRef.current?.querySelectorAll(".skill-card")
          cards?.forEach((_, i) => {
            setVisibleCards((prev) => [...new Set([...prev, i])])
          })
        }, 100) // delay ensures smooth re-trigger
      }
    }

    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <section id="skills" ref={sectionRef} className="py-20 bg-background relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16 animate-fade-in-up">
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif hover-3d">Skills & Expertise</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto glass-strong p-4 rounded-lg">
            Technologies and tools I work with to bring ideas to life.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
          {skills.map((skill, index) => {
            const IconComponent = skill.icon
            const direction =
              index % 4 === 0
                ? "animate-slide-in-left"
                : index % 4 === 1
                ? "animate-slide-in-up"
                : index % 4 === 2
                ? "animate-slide-in-down"
                : "animate-slide-in-right"

            return (
              <Card
                key={skill.name}
                className={`skill-card glass hover-3d flex items-center justify-center p-6 transition-transform hover:scale-105 ${
                  visibleCards.includes(index) ? direction : "opacity-0"
                }`}
                style={{ animationDelay: `${index * 0.05}s` }}
              >
                <CardContent className="flex flex-col items-center space-y-2">
                  <IconComponent className={`h-12 w-12 ${skill.color}`} />
                  <span className="font-medium text-foreground text-center">{skill.name}</span>
                </CardContent>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
