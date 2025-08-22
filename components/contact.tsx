"use client"

import { useEffect, useRef, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Mail, Phone, MapPin, Send } from "lucide-react"

export function Contact() {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef<HTMLElement>(null)

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sharavanakumar3006@gmail.com",
      href: "mailto:sharavanakumar3006@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+91 7418926476",
      href: "tel:+917418926476",
    },
    {
      icon: MapPin,
      label: "Location",
      value: "Mayiladuthurai, India",
      href: "#",
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

  // 🔹 Re-trigger animation when navigating via #contact
  useEffect(() => {
    const handleHashChange = () => {
      if (window.location.hash === "#contact") {
        setIsVisible(false)
        setTimeout(() => setIsVisible(true), 100)
      }
    }
    window.addEventListener("hashchange", handleHashChange)
    return () => window.removeEventListener("hashchange", handleHashChange)
  }, [])

  return (
    <section id="contact" ref={sectionRef} className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className={`text-center mb-16 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <h2 className="text-4xl font-bold text-foreground mb-4 font-serif">Get In Touch</h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Have a project in mind? Let's discuss how we can work together to bring your ideas to life.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className={`space-y-8 ${isVisible ? "animate-slide-in-left" : "opacity-0"}`}>
            <div>
              <h3 className="text-2xl font-semibold text-foreground mb-6">Let's Connect</h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always interested in hearing about new opportunities and exciting projects. Whether you have a
                question or just want to say hi, feel free to reach out!
              </p>
            </div>

            <div className="space-y-6">
              {contactInfo.map((info, index) => (
                <div
                  key={info.label}
                  className="flex items-center space-x-4 group cursor-pointer"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="p-3 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300">
                    <info.icon className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">{info.label}</p>
                    <a
                      href={info.href}
                      className="text-muted-foreground hover:text-primary transition-colors duration-200"
                    >
                      {info.value}
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Contact Form */}
          <Card className={`${isVisible ? "animate-slide-in-right" : "opacity-0"}`}>
            <CardHeader>
              <CardTitle>Send a Message</CardTitle>
            </CardHeader>
            <CardContent>
              <form
                action="https://formspree.io/f/xwpeboya"
                method="POST"
                className="space-y-6"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Input name="name" placeholder="Your Name" required />
                  </div>
                  <div>
                    <Input type="email" name="email" placeholder="Your Email" required />
                  </div>
                </div>
                <div>
                  <Input name="mobile" placeholder="Your Mobile" />
                </div>
                <div>
                  <Input name="subject" placeholder="Subject" required />
                </div>
                <div>
                  <Textarea name="message" placeholder="Your Message" rows={5} required />
                </div>
                <Button type="submit" className="w-full">
                  <Send className="mr-2 h-4 w-4" />
                  Send Message
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-12 pt-4 border-t border-border text-center">
        <p className="text-sm text-muted-foreground">
          © 2024 Sharavana Kumar R G.
        </p>
      </div>
    </section>
  )
}
