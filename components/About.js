"use client";

export default function About() {
  return (
    <div className="bg-[#1E1D2D] text-white px-6 py-10 md:px-16 md:py-14 h-full">
      <h2 className="text-5xl font-semibold mb-4">About</h2>
      <br></br>
      <div className="mb-6 space-y-1 text-lg text-gray-200">
        <p><span className="font-semibold">Professor Name:</span> Vijayakumar Peromal</p>
        <p><span className="font-semibold">Cabin:</span> AB-1 511, 5th Floor, Communication Lab</p>
        <p><span className="font-semibold">School:</span> SENSE</p>
      </div>

      
      <p className="text-xl text-gray-300 leading-relaxed">
        This course offers a comprehensive introduction to the design and development of embedded systems—specialized computing units that operate within larger electronic or mechanical systems. You’ll learn the fundamentals of microcontrollers, sensor and actuator interfacing, and real-time operating systems, all while gaining practical experience with hardware-software integration. By combining theoretical knowledge with hands-on projects, this course prepares you to build reliable, efficient, and scalable embedded solutions used in fields like IoT, robotics, consumer electronics, and automotive systems. Whether you’re a beginner looking to explore embedded technology or an experienced developer aiming to sharpen your skills, this course provides the essential tools and insights needed to excel in the world of embedded systems.
      </p>
    </div>
  );
}
