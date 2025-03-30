"use client"
import React, { useState } from "react"
import { Document, Page, pdfjs } from "react-pdf"

// Set the PDF.js worker source
pdfjs.GlobalWorkerOptions.workerSrc = "/pdf.worker.min.mjs"

export default function Syllabus() {
  const [numPages, setNumPages] = useState(null)

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages)
  }

  return (
    <div className="w-full h-full bg-[#141333] text-white overflow-auto">
      {/* Container below navbar */}
      <div className="p-8">
        {/* Large Syllabus heading */}
        <h1 className="text-4xl font-bold mb-8">Syllabus</h1>
        
        {/* PDF Viewer that renders all pages */}
        <Document
          file="/syllabus/syllabus.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          className="flex flex-col items-center"
        >
          {numPages &&
            Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                className="mb-4 shadow-lg"
                renderTextLayer={false}
                    renderAnnotationLayer={false}
              />
            ))}
        </Document>
      </div>
    </div>
  )
}
