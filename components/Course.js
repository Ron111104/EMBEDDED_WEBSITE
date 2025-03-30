"use client"

import { useEffect, useState, useRef, useCallback } from "react"
import { FiX, FiZoomIn, FiZoomOut, FiDownload } from "react-icons/fi"
import { Document, Page } from "react-pdf"

export default function Course({ pdfs = [] }) {
  // State for managing the selected PDF and modal
  const [selectedPdf, setSelectedPdf] = useState(null)
  const [pdfName, setPdfName] = useState("")
  const [numPages, setNumPages] = useState(null)
  const [loadError, setLoadError] = useState(null)
  const [zoomFactor, setZoomFactor] = useState(1.0) // Zoom level (1.0 = 100%)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Reference to the container
  const containerRef = useRef(null)

  // Handle clicking a PDF card to open it in the modal
  const handleCardClick = (pdfFile) => {
    setSelectedPdf(`/material/${pdfFile}`)
    setPdfName(pdfFile.replace(".pdf", "").replace(/_/g, " "))
    setIsFullscreen(true)
    setLoadError(null)
    setZoomFactor(1.0)
  }

  // Close the modal
  const handleCloseModal = () => {
    setSelectedPdf(null)
    setIsFullscreen(false)
    setLoadError(null)
  }

  // Handle keyboard shortcuts for zoom and closing
  const handleKeyDown = useCallback(
    (e) => {
      if (!selectedPdf) return
      switch (e.key) {
        case "+":
          setZoomFactor((prev) => Math.min(prev + 0.1, 3)) // Max zoom: 300%
          break
        case "-":
          setZoomFactor((prev) => Math.max(prev - 0.1, 0.5)) // Min zoom: 50%
          break
        case "Escape":
          handleCloseModal()
          break
        default:
          break
      }
    },
    [selectedPdf]
  )

  // Add and remove keyboard event listeners when the modal is open/closed
  useEffect(() => {
    if (selectedPdf) {
      document.addEventListener("keydown", handleKeyDown)
    } else {
      document.removeEventListener("keydown", handleKeyDown)
    }
    return () => document.removeEventListener("keydown", handleKeyDown)
  }, [selectedPdf, handleKeyDown])

  // Handle PDF loading errors
  const handleDocumentLoadError = (error) => {
    console.error("PDF Load Error:", error)
    setLoadError(error.message)
  }

  // Inject custom styles to ensure PDFs render at their natural size
  useEffect(() => {
    const style = document.createElement("style")
    style.innerHTML = `
      .react-pdf__Page {
        margin: 0 !important;
        padding: 0 !important;
      }
      .react-pdf__Page__canvas {
        display: block !important;
        margin: 0 auto !important;
      }
      .pdf-thumbnail,
      .pdf-thumbnail > canvas {
        width: auto !important;
        height: auto !important;
        object-fit: contain !important;
      }
    `
    document.head.appendChild(style)
    return () => {
      document.head.removeChild(style)
    }
  }, [])

  return (
    <div className="h-full overflow-auto p-4">
      <h2 className="text-xl font-semibold mb-4">Choose your course</h2>

      {/* Grid of PDF Thumbnails */}
      <div className="px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
        {pdfs.map((pdfFile, idx) => {
          const displayName = pdfFile.replace(".pdf", "").replace(/_/g, " ")
          return (
            <button
              key={idx}
              onClick={() => handleCardClick(pdfFile)}
              className="w-full text-left block bg-[#1E1D2D] rounded-lg p-4 hover:bg-[#2a2940] transition focus:outline-none"
            >
              <div className="w-full h-auto bg-[#252438]  rounded mb-4 flex items-center justify-center overflow-hidden">
                <Document
                  file={`/material/${pdfFile}`}
                  onLoadError={(error) =>
                    console.error(`Error loading thumbnail for ${pdfFile}:`, error)
                  }
                  loading={
                    <div className="text-gray-300 flex items-center justify-center h-full w-full">
                      Loading...
                    </div>
                  }
                  error={
                    <div className="text-gray-300 flex items-center justify-center h-full w-full">
                      Preview unavailable
                    </div>
                  }
                >
                  <Page
                    pageNumber={1}
                    className="pdf-thumbnail"
                    width={260}
                    renderTextLayer={false}
                    renderAnnotationLayer={false}
                  />
                </Document>
              </div>
              <h3 className="font-semibold text-lg truncate">{displayName}</h3>
              <p className="text-sm text-gray-400">Open to view</p>
            </button>
          )
        })}
      </div>

      {/* Fullscreen PDF Modal */}
      {isFullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-90">
          <div className="relative w-full h-full flex flex-col">
            {/* Toolbar */}
            <div className="flex items-center justify-between p-2 sm:p-4 bg-[#1f1f1f]">
              <div className="flex items-center space-x-2 sm:space-x-4">
                <button
                  className="text-white p-2 sm:p-3 rounded-full hover:bg-[#333333]"
                  onClick={handleCloseModal}
                  aria-label="Close PDF viewer"
                >
                  <FiX className="text-xl" />
                </button>
                <div className="text-white font-semibold text-base sm:text-lg">
                  {pdfName || "Viewing PDF"}
                </div>
              </div>
              {!loadError && (
                <div className="flex items-center space-x-2 sm:space-x-4">
                  {/* Download button */}
                  <a
                    href={selectedPdf}
                    download
                    className="text-white bg-gray-600 p-2 sm:p-3 rounded-full flex items-center justify-center hover:bg-gray-700"
                    aria-label="Download PDF"
                  >
                    <FiDownload />
                  </a>
                  <button
                    onClick={() =>
                      setZoomFactor((prev) => Math.min(prev + 0.1, 3))
                    }
                    className="text-white bg-gray-600 p-2 sm:p-3 rounded-full"
                    aria-label="Zoom in"
                  >
                    <FiZoomIn />
                  </button>
                  <button
                    onClick={() =>
                      setZoomFactor((prev) => Math.max(prev - 0.1, 0.5))
                    }
                    className="text-white bg-gray-600 p-2 sm:p-3 rounded-full"
                    aria-label="Zoom out"
                  >
                    <FiZoomOut />
                  </button>
                </div>
              )}
            </div>

            {/* PDF Content Area */}
            <div ref={containerRef} className="flex-1 overflow-auto bg-black">
              {loadError ? (
                <div className="text-center text-red-500 mt-20 p-4">
                  <h3 className="text-xl sm:text-2xl mb-4">Failed to Load PDF</h3>
                  <p className="text-lg sm:text-xl">Error: {loadError}</p>
                  <p className="text-sm text-gray-300 mt-2">
                    Possible reasons:
                    <br />- File may be corrupted
                    <br />- Incompatible PDF format
                    <br />- Network or access issues
                  </p>
                </div>
              ) : (
                <div className="flex flex-col items-center">
                  <Document
                    file={selectedPdf}
                    onLoadError={handleDocumentLoadError}
                    onLoadSuccess={({ numPages }) => {
                      setNumPages(numPages)
                      setLoadError(null)
                    }}
                    loading={
                      <div className="flex items-center justify-center h-full text-white">
                        Loading PDF...
                      </div>
                    }
                    options={{
                      cMapUrl: "cmaps/",
                      cMapPacked: true,
                    }}
                  >
                    {numPages &&
                      Array.from({ length: numPages }, (_, idx) => (
                        <div
                          key={`page_wrapper_${idx + 1}`}
                          className="flex justify-center mb-2 text-black"
                        >
                          <Page
                            pageNumber={idx + 1}
                            scale={zoomFactor}
                            renderTextLayer={false}
                            renderAnnotationLayer={false}
                          />
                        </div>
                      ))}
                  </Document>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}
