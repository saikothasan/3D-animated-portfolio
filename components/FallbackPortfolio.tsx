import type React from "react"
import PortfolioContent from "./PortfolioContent"

const FallbackPortfolio: React.FC = () => {
  const sections = ["About", "Projects", "Skills", "Experience", "Education", "Contact", "Blog", "Testimonials"]

  return (
    <div className="bg-gray-900 text-white min-h-screen p-8">
      <h1 className="text-4xl font-bold mb-8 text-center">My Portfolio</h1>
      <div className="max-w-3xl mx-auto">
        {sections.map((section) => (
          <div key={section} className="mb-12">
            <h2 className="text-2xl font-bold mb-4">{section}</h2>
            <div className="bg-gray-800 p-6 rounded-lg">
              <PortfolioContent face={section} />
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default FallbackPortfolio

