import type React from "react"
import { useState, useEffect } from "react"
import { ProgressBar } from "./ProgressBar"
import ContactForm from "./ContactForm"

type ContentProps = {
  face: string
}

type Repository = {
  id: number
  name: string
  description: string
  html_url: string
  topics: string[]
  language: string
}

const PortfolioContent: React.FC<ContentProps> = ({ face }) => {
  const [projects, setProjects] = useState<Repository[]>([])

  useEffect(() => {
    if (face === "Projects") {
      fetchGitHubProjects()
    }
  }, [face])

  const fetchGitHubProjects = async () => {
    try {
      const response = await fetch("https://api.github.com/users/yourusername/repos")
      const data = await response.json()
      setProjects(data.slice(0, 5))
    } catch (error) {
      console.error("Error fetching GitHub projects:", error)
    }
  }

  switch (face) {
    case "About":
      return (
        <div className="space-y-4">
          <div className="flex items-center space-x-4">
            <img src="/placeholder.svg?height=100&width=100" alt="Profile" className="rounded-full w-24 h-24" />
            <div>
              <h3 className="text-xl font-bold">John Doe</h3>
              <p className="text-gray-400">Full Stack Developer</p>
            </div>
          </div>
          <p>
            I'm a passionate Full Stack Developer with 5+ years of experience in building web applications. I specialize
            in React, Next.js, and Three.js for frontend development, and Node.js with Express for backend solutions.
          </p>
          <div>
            <h4 className="font-semibold mb-2">Quick Facts:</h4>
            <ul className="list-disc list-inside space-y-1">
              <li>🌍 Based in New York, USA</li>
              <li>💼 Currently working at Tech Corp</li>
              <li>🎓 MSc in Computer Science</li>
              <li>🌱 Learning AI/ML</li>
            </ul>
          </div>
        </div>
      )
    case "Projects":
      return (
        <div className="space-y-4">
          {projects.length > 0 ? (
            projects.map((project) => (
              <div key={project.id} className="p-4 bg-gray-700 rounded-lg">
                <h3 className="text-lg font-semibold">{project.name}</h3>
                <p className="text-gray-300 text-sm mb-2">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-2">
                  {project.topics.map((topic) => (
                    <span key={topic} className="px-2 py-1 bg-blue-500 rounded-full text-xs">
                      {topic}
                    </span>
                  ))}
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm text-gray-400">{project.language}</span>
                  <a
                    href={project.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-blue-400 hover:underline text-sm"
                  >
                    View on GitHub →
                  </a>
                </div>
              </div>
            ))
          ) : (
            <p>Loading projects...</p>
          )}
        </div>
      )
    case "Skills":
      return (
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold mb-3">Frontend Development</h3>
            <div className="space-y-2">
              <ProgressBar skill="React/Next.js" percentage={90} />
              <ProgressBar skill="Three.js" percentage={85} />
              <ProgressBar skill="TypeScript" percentage={88} />
              <ProgressBar skill="CSS/Tailwind" percentage={92} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Backend Development</h3>
            <div className="space-y-2">
              <ProgressBar skill="Node.js" percentage={85} />
              <ProgressBar skill="Express" percentage={82} />
              <ProgressBar skill="PostgreSQL" percentage={78} />
              <ProgressBar skill="MongoDB" percentage={80} />
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-3">Other Skills</h3>
            <div className="space-y-2">
              <ProgressBar skill="Git" percentage={88} />
              <ProgressBar skill="Docker" percentage={75} />
              <ProgressBar skill="AWS" percentage={70} />
              <ProgressBar skill="Testing" percentage={85} />
            </div>
          </div>
        </div>
      )
    case "Contact":
      return <ContactForm />
    default:
      return null
  }
}

export default PortfolioContent

