"use client"
import React, { useState, useEffect } from "react"
import { Document, Page, pdfjs } from "react-pdf"

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

export default function Syllabus() {
  const [numPages, setNumPages] = useState(null)
  const [windowWidth, setWindowWidth] = useState(0)
  const [scale, setScale] = useState(1)

  // Handle window resize
  useEffect(() => {
    // Set initial width
    setWindowWidth(window.innerWidth)
    
    // Update width on resize
    const handleResize = () => {
      setWindowWidth(window.innerWidth)
    }
    
    window.addEventListener('resize', handleResize)
    
    // Clean up
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  // Calculate scale based on window width
  useEffect(() => {
    if (windowWidth === 0) return
    
    // Adjust these breakpoints as needed
    if (windowWidth < 640) { // Small screens
      setScale(0.6)
    } else if (windowWidth < 768) { // Medium screens
      setScale(0.7)
    } else if (windowWidth < 1024) { // Large screens
      setScale(0.8)
    } else { // Extra large screens
      setScale(1)
    }
  }, [windowWidth])

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="w-full h-full bg-[#141333] text-white overflow-auto">
      {/* Container below navbar */}
      <div className="p-4 md:p-8">
        {/* Responsive Syllabus heading */}
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-4 md:mb-8">Syllabus</h1>
        
        {/* PDF Viewer that renders all pages with responsive width */}
        <div className="flex justify-center">
          <Document
            file="/syllabus/syllabus.pdf"
            onLoadSuccess={onDocumentLoadSuccess}
            className="flex flex-col items-center"
            loading={<p>Loading document...</p>}
            error={<p>Error loading document. Please try again later.</p>}
          >
            {numPages &&
              Array.from(new Array(numPages), (el, index) => (
                <Page
                  key={`page_${index + 1}`}
                  pageNumber={index + 1}
                  className="mb-4 shadow-lg max-w-full"
                  renderTextLayer={false}
                  renderAnnotationLayer={false}
                  scale={scale}
                  width={Math.min(windowWidth - 40, 800)} // Responsive width with max-width
                />
              ))}
          </Document>
        </div>
      </div>
    </div>
  )
}