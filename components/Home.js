"use client";
import React from "react";

export default function Home() {
  return (
    <div className="p-6 text-white">
      <h1 className="text-2xl font-bold">📌 Course Objectives</h1>
      <div className="bg-white text-black p-4 rounded-lg mt-2">
        <ol className="list-decimal pl-5">
          <li>
            To expose students to various challenges and constraints of special
            purpose computing systems in terms of resources and functional
            requirements.
          </li>
          <li>
            To introduce students to various components of typical embedded
            systems viz., sensors and actuators, data converters, UART etc.,
            their interfacing, programming environment for developing any smart
            systems and various serial communication protocols for optimal
            components interfacing and communication.
          </li>
          <li>
            To make students understand the importance of program modeling,
            optimization techniques and debugging tools for product development
            and explore various solutions for real-time scheduling issues in
            terms of resources and deadlines.
          </li>
        </ol>
      </div>

      <h1 className="text-2xl font-bold mt-6">📖 Course Outcomes</h1>
      <div className="bg-white text-black p-4 rounded-lg mt-2">
        <ol className="list-decimal pl-5">
          <li>
            Identify the challenges in designing an embedded system using
            various microcontrollers and interfaces.
          </li>
          <li>
            To summarize the functionality of any special purpose computing
            system, and to propose smart solutions to engineering challenges at
            the prototype level.
          </li>
          <li>
            To examine the working principle and interface of typical embedded
            system components, create program models, apply various optimization
            approaches including simulation environment and demonstration using
            debugging tools.
          </li>
          <li>
            To evaluate the working principle of serial communication protocols
            and their proper use, as well as to analyze the benefits and
            drawbacks of real-time scheduling algorithms and to recommend
            acceptable solutions for specific challenges.
          </li>
        </ol>
      </div>
    </div>
  );
}
