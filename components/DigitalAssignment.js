"use client"

import React, { useState, useEffect } from "react"
import * as XLSX from "xlsx"

export default function DigitalAssignment() {
  const [data, setData] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/da/da.xlsx")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error: ${response.status} ${response.statusText}`)
        }
        return response.arrayBuffer()
      })
      .then((arrayBuffer) => {
        const workbook = XLSX.read(arrayBuffer, { type: "array" })
        // Use the first sheet in the workbook
        const sheetName = workbook.SheetNames[0]
        const worksheet = workbook.Sheets[sheetName]
        const jsonData = XLSX.utils.sheet_to_json(worksheet, { defval: "" })
        setData(jsonData)
        setLoading(false)
      })
      .catch((err) => {
        console.error("Error fetching or parsing XLSX:", err)
        setError("Failed to load or parse XLSX file")
        setLoading(false)
      })
  }, [])

  return (
    <div className="min-h-screen bg-[#141333] text-white p-4 sm:p-8">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 text-center">Digital Assignment</h1>

      {loading && (
        <div className="text-center text-lg">Loading digital assignment data...</div>
      )}

      {error && (
        <div className="text-center text-red-500 text-lg">{error}</div>
      )}

      {!loading && !error && data.length > 0 && (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-gray-800 rounded-lg shadow overflow-hidden">
            <thead>
              <tr>
                {Object.keys(data[0]).map((header, idx) => (
                  <th
                    key={idx}
                    className="px-4 py-2 bg-gray-700 text-left text-sm font-medium uppercase tracking-wider"
                  >
                    {header}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {data.map((row, rowIndex) => (
                <tr
                  key={rowIndex}
                  className={rowIndex % 2 === 0 ? "bg-gray-700" : "bg-gray-600"}
                >
                  {Object.values(row).map((value, colIndex) => (
                    <td key={colIndex} className="px-4 py-2 text-sm">
                      {value}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {!loading && !error && data.length === 0 && (
        <div className="text-center text-lg">No digital assignment data available.</div>
      )}
    </div>
  )
}
