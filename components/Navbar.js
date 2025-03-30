"use client"
import React, { useState } from "react"
import { AiOutlineHome, AiOutlineSearch, AiOutlineUser } from "react-icons/ai"
import { MdOutlineMenuBook } from "react-icons/md"
import { FiMenu, FiChevronDown } from "react-icons/fi"

export default function NavBar({ activeTab, setActiveTab }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [softwareOpen, setSoftwareOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen((prev) => !prev)
  const toggleSoftware = () => setSoftwareOpen((prev) => !prev)
  const closeMenu = () => {
    setIsMenuOpen(false)
    setSoftwareOpen(false)
  }

  // Function to handle tab changes
  const handleTabChange = (tab) => {
    setActiveTab(tab)
    // Close menu when a tab is selected for better mobile experience
    if (isMenuOpen) {
      closeMenu()
    }
  }

  return (
    <div className="relative">
      {/* TOP BAR */}
      <header className="bg-blue-600 text-white flex items-center justify-between px-4 py-3">
        {/* Left side: Greeting */}
        <div>
          <h1 className="text-2xl font-semibold">Hi, Kristin</h1>
          <p className="text-sm">Let&apos;s start learning</p>
        </div>

        {/* Right side: Nav Icons */}
        <nav className="flex items-center space-x-6">
          <button
            className={`flex flex-col items-center hover:opacity-80 focus:outline-none ${
              activeTab === "home" ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => handleTabChange("home")}
            aria-label="Home"
          >
            <AiOutlineHome size={24} />
            <span className="text-xs">Home</span>
          </button>

          <button
            className={`flex flex-col items-center hover:opacity-80 focus:outline-none ${
              activeTab === "course" ? "opacity-100" : "opacity-60"
            }`}
            onClick={() => handleTabChange("course")}
            aria-label="Course"
          >
            <MdOutlineMenuBook size={24} />
            <span className="text-xs">Course</span>
          </button>

          <button 
            className="flex flex-col items-center hover:opacity-80 focus:outline-none opacity-60"
            aria-label="Search"
          >
            <AiOutlineSearch size={24} />
            <span className="text-xs">Search</span>
          </button>

          <button 
            className="flex flex-col items-center hover:opacity-80 focus:outline-none opacity-60"
            aria-label="Account"
          >
            <AiOutlineUser size={24} />
            <span className="text-xs">Account</span>
          </button>

          {/* Hamburger Menu Button */}
          <button
            className="flex flex-col items-center hover:opacity-80 focus:outline-none"
            onClick={toggleMenu}
            aria-label="Menu"
            aria-expanded={isMenuOpen}
          >
            <FiMenu size={24} />
            <span className="text-xs">Menu</span>
          </button>
        </nav>
      </header>

      {/* SIDE MENU - Position absolute but with full remaining height */}
      {isMenuOpen && (
        <div className="absolute top-full right-0 w-64 bg-[#1E1D2D] text-white z-30 h-screen">
          <nav>
            <div className="px-4 py-3 hover:bg-[#2a2940] border-b border-gray-700">
            <button 
  className="w-full text-left block text-sm font-medium" 
  onClick={() => handleTabChange("about")}
>
  About
</button>

            </div>
            {/* Syllabus Button in Side Menu */}
<div className="px-4 py-3 hover:bg-[#2a2940] border-b border-gray-700">
  <button
    className="w-full text-left block text-sm font-medium"
    onClick={() => handleTabChange("syllabus")}  // <-- Add this onClick
  >
    Syllabus
  </button>
</div>

            <div className="px-4 py-3 hover:bg-[#2a2940] border-b border-gray-700">
              <button className="w-full text-left block text-sm font-medium"
              onClick={() => handleTabChange("lessonplan")}>
                Lesson Plan
              </button>
            </div>
            <div className="px-4 py-3 hover:bg-[#2a2940] border-b border-gray-700">
              <button className="w-full text-left block text-sm font-medium"
              onClick={() => handleTabChange("digitalassignment")}>
                Digital Assignment
              </button>
            </div>
            <div className="px-4 py-3 hover:bg-[#2a2940] border-b border-gray-700">
              <button 
              className="w-full text-left block text-sm font-medium"
              onClick={() => handleTabChange("resources")}  >
                Resources
              </button>
            </div>

            {/* Software with a dropdown arrow */}
            <div className="border-b border-gray-700">
              <button
                className="w-full text-left flex items-center justify-between px-4 py-3 hover:bg-[#2a2940]"
                onClick={toggleSoftware}
                aria-expanded={softwareOpen}
              >
                <span className="text-sm font-medium">Software</span>
                <FiChevronDown className={`transform transition-transform ${softwareOpen ? "rotate-180" : ""}`} />
              </button>
              {softwareOpen && (
                <div className="bg-[#252438]">
                  <button className="w-full text-left block py-3 px-8 hover:bg-[#33324a] text-sm">
                    Software 1
                  </button>
                  <button className="w-full text-left block py-3 px-8 hover:bg-[#33324a] text-sm">
                    Software 2
                  </button>
                </div>
              )}
            </div>
          </nav>
        </div>
      )}
    </div>
  )
}