"use client"
import { useState, useEffect } from "react"
import NavBar from "@/components/Navbar"
import Course from "@/components/Course"
import Home from "@/components/Home"
import { pdfjs } from "react-pdf"
import fs from "fs"
import path from "path"
import About from "@/components/About"

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

export default function Landing({ pdfs = [] }) {
  const [activeTab, setActiveTab] = useState("home") // Track active tab

  // Debugging state changes
  useEffect(() => {
    console.log("Current active tab:", activeTab)
  }, [activeTab])

  // Wrapper function to update activeTab
  const handleTabChange = (tab) => {
    console.log("Setting active tab to:", tab)
    setActiveTab(tab)
  }

  return (
    <div className="min-h-screen h-screen bg-[#141333] text-white flex flex-col overflow-hidden">
      <NavBar activeTab={activeTab} setActiveTab={setActiveTab} />
      
      <div className="flex-1 overflow-hidden">
        {activeTab === "home" && <Home />}
        {activeTab === "course" && <Course pdfs={pdfs} />}
        {activeTab === "about" && <About />}
      </div>
    </div>
  )
}

// Static props to fetch PDF files from /public/material
export async function getStaticProps() {
  const materialDir = path.join(process.cwd(), "public", "material")
  let files = []

  try {
    files = fs.readdirSync(materialDir)
    console.log("PDF Files found:", files)
  } catch (error) {
    console.error("Error reading material directory:", error)
  }

  const pdfs = files.filter((file) => file.endsWith(".pdf"))

  return {
    props: { pdfs },
  }
}
