"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Award, Trophy, BookOpen, Star, ExternalLink } from "lucide-react"
import Image from "next/image"

export function Achievements() {
  const [isVisible, setIsVisible] = useState(false)
  const [selectedCertificate, setSelectedCertificate] = useState<string | null>(null)
  const sectionRef = useRef<HTMLElement>(null)

  const certificates = [
    {
      title: "Tezario Hackathon 2025 - Third Prize",
      issuer: "Kongunadu College of Engineering and Technology",
      date: "2025",
      image: "/certificates/it.png",
      description: "Awarded third prize in the 24-hour Tezario Hackathon 2025.",
    },
    {
      title: "OpenHack 2025 - Ideation Round",
      issuer: "Indian Institute of Science (IISc), Bangalore",
      date: "2025",
      image: "/certificates/openhackideation.jpg",
      description: "Participated in the Ideation Round of OpenHack 2025 as part of Team Hackaholics.",
    },
    {
      title: "OpenHack 2025 Participant",
      issuer: "Indian Institute of Science (IISc), Bangalore",
      date: "2025",
      image: "/certificates/openhackparticipant.jpg",
      description: "Participated in OpenHack 2025, organized by IISc Bangalore, as part of Team Hackaholics.",
    },
    {
      title: "HackZ'24 Participant",
      issuer: "College of Engineering (CEG), Guindy",
      date: "2024",
      image: "/certificates/hackz'24.jpg",
      description: "Participated in HackZ'24 as part of Team Hackaholics, organised by CEG, Guindy.",
    },
    {
      title: "Ideathon Participant",
      issuer: "GUVI, Naan Mudhalvan & Anna University",
      date: "2024",
      image: "/certificates/guviidea.png",
      description: "Participated in the NM-AU-TNcpl Ideathon conducted on March 15, 2024.",
    },
    {
      title: "Learnathon Participant",
      issuer: "GUVI, Naan Mudhalvan & Anna University",
      date: "2024",
      image: "/certificates/guvilearn.png",
      description: "Participated in the NM-AU-TNcpl Learnathon conducted on February 16, 2024.",
    },
    {
      title: "Introduction to Generative AI",
      issuer: "AWS Educate",
      date: "2024",
      image: "/certificates/awsgen.png",
      description: "Earned the AWS Educate badge for completing the introductory course on Generative AI.",
    },
    {
      title: "48 HR HACK $DAY EDITION 1",
      issuer: "Sri Manakula Vinayagar Engineering College",
      date: "2024",
      image: "/certificates/Hack.png",
      description: "Certificate of Appreciation for participating in a 48-hour hackathon in Puducherry.",
    },
    {
      title: "ARTIVERSE HACKATHON-2K24",
      issuer: "Kongunadu College of Engineering and Technology",
      date: "2024",
      image: "/certificates/AD1.png",
      description: "Participated in a 24-hour hackathon by the Dept. of Artificial Intelligence and Data Science.",
    },
    {
      title: "GENESIS'24 - 30 Hours Hackathon",
      issuer: "Kongunadu College of Engineering and Technology",
      date: "2024",
      image: "/certificates/cse.png",
      description: "Participated in a 30-hour hackathon organized by the Dept. of Computer Science and Engineering.",
    },
    {
      title: "Machine Learning Foundations",
      issuer: "AWS Educate",
      date: "2024",
      image: "/certificates/awsml.png",
      description: "Earned the AWS Educate badge for completing the foundational course in Machine Learning.",
    },
    {
      title: "Data Visualization Using Python",
      issuer: "GUVI HCL",
      date: "2023",
      image: "/certificates/guvidata.png",
      description: "Certificate of Completion for the Data Visualization Using Python course, issued Nov 4, 2023.",
    },
    {
      title: "Machine Learning 101",
      issuer: "GUVI HCL",
      date: "2023",
      image: "/certificates/guviml.png",
      description: "Successfully completed the Machine Learning 101 course, issued Nov 3, 2023.",
    },
    {
      title: "Deep learning using Pytorch",
      issuer: "GUVI HCL",
      date: "2023",
      image: "/certificates/guvidl.png",
      description: "Awarded for the successful completion of the Deep learning using Pytorch course, issued Nov 3, 2023.",
    },
  ]

  const stats = [
    { icon: Award, label: "Certificates", value: certificates.length, suffix: "", key: "certs" },
    { icon: Trophy, label: "Hackathons", value: 8, suffix: "+", key: "hackathons" },
    { icon: BookOpen, label: "CGPA", value: 8.1, suffix: "/10", key: "cgpa" },
    { icon: Star, label: "Projects", value: 15, suffix: "+", key: "projects" },
  ]

  const [counters, setCounters] = useState({
    certs: 0,
    hackathons: 0,
    cgpa: 0,
    projects: 0,
  })

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
          stats.forEach((stat, index) => {
            setTimeout(() => {
              const increment = stat.value / 50
              let current = 0
              const timer = setInterval(() => {
                current += increment
                if (current >= stat.value) {
                  current = stat.value
                  clearInterval(timer)
                }
                setCounters((prev) => ({
                  ...prev,
                  [stat.key]: current,
                }))
              }, 30)
            }, index * 200)
          })
        }
      },
      { threshold: 0.1 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section id="achievements" ref={sectionRef} className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Academic Achievements</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            My journey of continuous learning and academic excellence as a computer science student.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {stats.map((stat, index) => (
            <Card
              key={stat.label}
              className={`text-center group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8">
                <div className="mb-4 flex justify-center">
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <stat.icon className="h-8 w-8 text-primary" />
                  </div>
                </div>
                <div className="text-3xl font-bold text-foreground mb-2">
                  {stat.key === "cgpa" ? (counters[stat.key] || 0).toFixed(1) : Math.floor(counters[stat.key] || 0)}
                  {stat.suffix}
                </div>
                <p className="text-sm text-muted-foreground font-medium">{stat.label}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Certificates */}
        <div className={`${isVisible ? "animate-fade-in-up" : "opacity-0"}`} style={{ animationDelay: "0.4s" }}>
          <h3 className="text-2xl font-bold text-foreground mb-8 text-center">Certificates & Awards</h3>

          {/* Horizontal Scroll */}
          <div className="overflow-x-auto py-8">
            <div className="flex animate-scroll-right space-x-6">
              {certificates.map((cert, index) => (
                <Card
                  key={`${cert.title}-${index}`}
                  className="flex-shrink-0 w-64 group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden"
                  onClick={() => setSelectedCertificate(cert.image)}
                >
                  <div className="relative h-36 overflow-hidden">
                    <Image
                      src={cert.image || "/placeholder.svg"}
                      alt={cert.title}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    <div className="absolute bottom-4 left-4 right-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <ExternalLink className="h-5 w-5 ml-auto" />
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h4 className="text-base font-semibold text-foreground mb-2">{cert.title}</h4>
                    <p className="text-sm text-primary font-medium mb-2">
                      {cert.issuer} • {cert.date}
                    </p>
                    <p className="text-xs text-muted-foreground line-clamp-2">{cert.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Selected Certificate Modal */}
        {selectedCertificate && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            onClick={() => setSelectedCertificate(null)}
          >
            <div className="relative max-w-4xl max-h-[90vh] w-full">
              <Image
                src={selectedCertificate || "/placeholder.svg"}
                alt="Certificate"
                width={800}
                height={600}
                className="w-full h-auto object-contain rounded-lg"
              />
              <button
                onClick={() => setSelectedCertificate(null)}
                className="absolute top-4 right-4 text-white bg-black/50 rounded-full p-2 hover:bg-black/70 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        )}
      </div>
    </section>
  )
}
