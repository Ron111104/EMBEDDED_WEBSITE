"use client"
import { useState, useEffect } from "react"
import NavBar from "@/components/Navbar"
import Home from "@/components/Home"
import Course from "@/components/Course"
import Syllabus from "@/components/Syllabus"
import About from "@/components/About"
import Resources from "@/components/Resources"
import LessonPlan from "@/components/Lessonplan"
import DigitalAssignment from "@/components/DigitalAssignment"
import { pdfjs } from "react-pdf"
import fs from "fs"
import path from "path"

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

export default function Landing({ coursePdfs = [], resourcePdfs = [] }) {
  const [activeTab, setActiveTab] = useState("home")

  useEffect(() => {
    console.log("Current active tab:", activeTab)
  }, [activeTab])

  return (
    <div className="min-h-screen h-screen bg-[#141333] text-white flex flex-col overflow-hidden">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      {/* Main Content Area */}
      <div className="flex-1 overflow-auto">
        {activeTab === "home" && <Home />}
        {activeTab === "course" && <Course pdfs={coursePdfs} />}
        {activeTab === "about" && <About />}
        {activeTab === "syllabus" && <Syllabus />}
        {activeTab === "resources" && <Resources pdfs={resourcePdfs} />}
        {activeTab === "lessonplan" && <LessonPlan />}
        {activeTab === "digitalassignment" && <DigitalAssignment />}
      </div>
    </div>
  )
}

// Fetch PDFs from two directories: /public/material and /public/resources
export async function getStaticProps() {
  const materialDir = path.join(process.cwd(), "public", "material")
  const resourcesDir = path.join(process.cwd(), "public", "resources")

  let materialFiles = []
  let resourceFiles = []

  try {
    materialFiles = fs.readdirSync(materialDir)
  } catch (error) {
    console.error("Error reading material directory:", error)
  }

  try {
    resourceFiles = fs.readdirSync(resourcesDir)
  } catch (error) {
    console.error("Error reading resources directory:", error)
  }

  const coursePdfs = materialFiles.filter((file) => file.endsWith(".pdf"))
  const resourcePdfs = resourceFiles.filter((file) => file.endsWith(".pdf"))

  return {
    props: { coursePdfs, resourcePdfs },
  }
}
