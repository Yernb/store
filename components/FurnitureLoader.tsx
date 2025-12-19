'use client'

import { useState, useEffect } from 'react'

interface FurnitureLoaderProps {
  message?: string
}

const funnyMessages = [
  "Assembling the perfect furniture...",
  "Polishing the wood (and our reputation)...",
  "Measuring twice, cutting once...",
  "Finding furniture that won't kvetch...",
  "Loading pieces that are actually comfortable...",
  "Checking if it's shabbos-ready...",
  "Making sure everything's kosher...",
  "Dusting off the good stuff...",
  "Counting the legs (they should all match)...",
  "Testing for squeaks (we hate squeaks)..."
]

export default function FurnitureLoader({ message }: FurnitureLoaderProps) {
  const [currentMessage, setCurrentMessage] = useState(0)
  const [clickedFurniture, setClickedFurniture] = useState<number | null>(null)

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentMessage((prev) => (prev + 1) % funnyMessages.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [])

  const handleFurnitureClick = (index: number) => {
    setClickedFurniture(index)
    setTimeout(() => setClickedFurniture(null), 600)
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] py-20 px-4">
      {/* Animated Furniture Pieces */}
      <div className="relative w-full max-w-2xl h-64 mb-8 flex items-center justify-center">
        {/* Chair */}
        <button
          onClick={() => handleFurnitureClick(0)}
          className={`absolute left-1/4 transform -translate-x-1/2 transition-all duration-300 ${
            clickedFurniture === 0 ? 'scale-150 rotate-12' : 'hover:scale-110'
          }`}
          aria-label="Interactive chair"
        >
          <div className="relative">
            {/* Chair back */}
            <div className="w-12 h-16 bg-gradient-to-br from-amber-700 to-amber-900 rounded-t-lg shadow-lg border-2 border-amber-800">
              <div className="absolute top-2 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-600 rounded"></div>
              <div className="absolute top-6 left-1/2 transform -translate-x-1/2 w-8 h-1 bg-amber-600 rounded"></div>
            </div>
            {/* Chair seat */}
            <div className="w-14 h-4 bg-gradient-to-br from-amber-600 to-amber-800 rounded shadow-md -mt-1"></div>
            {/* Chair legs */}
            <div className="flex justify-between px-1 -mt-1">
              <div className="w-2 h-8 bg-amber-800 rounded-t"></div>
              <div className="w-2 h-8 bg-amber-800 rounded-t"></div>
            </div>
          </div>
        </button>

        {/* Table */}
        <button
          onClick={() => handleFurnitureClick(1)}
          className={`absolute left-1/2 transform -translate-x-1/2 transition-all duration-300 ${
            clickedFurniture === 1 ? 'scale-150 rotate-12' : 'hover:scale-110'
          }`}
          aria-label="Interactive table"
        >
          <div className="relative">
            {/* Table top */}
            <div className="w-24 h-6 bg-gradient-to-br from-amber-800 to-amber-900 rounded-lg shadow-xl border-2 border-amber-900">
              <div className="absolute inset-2 border border-amber-700 rounded"></div>
            </div>
            {/* Table legs */}
            <div className="flex justify-between px-2 -mt-1">
              <div className="w-3 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t"></div>
              <div className="w-3 h-12 bg-gradient-to-b from-amber-700 to-amber-900 rounded-t"></div>
            </div>
          </div>
        </button>

        {/* Sofa */}
        <button
          onClick={() => handleFurnitureClick(2)}
          className={`absolute right-1/4 transform translate-x-1/2 transition-all duration-300 ${
            clickedFurniture === 2 ? 'scale-150 rotate-12' : 'hover:scale-110'
          }`}
          aria-label="Interactive sofa"
        >
          <div className="relative">
            {/* Sofa back */}
            <div className="w-20 h-14 bg-gradient-to-br from-indigo-600 to-indigo-800 rounded-t-lg shadow-lg border-2 border-indigo-700">
              <div className="absolute top-2 left-2 right-2 h-1 bg-indigo-400 rounded"></div>
              <div className="absolute top-5 left-2 right-2 h-1 bg-indigo-400 rounded"></div>
            </div>
            {/* Sofa seat */}
            <div className="w-20 h-5 bg-gradient-to-br from-indigo-500 to-indigo-700 rounded shadow-md -mt-1"></div>
            {/* Sofa arms */}
            <div className="flex justify-between -mt-1">
              <div className="w-3 h-8 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-tl rounded-bl"></div>
              <div className="w-3 h-8 bg-gradient-to-b from-indigo-600 to-indigo-800 rounded-tr rounded-br"></div>
            </div>
          </div>
        </button>

        {/* Floating particles */}
        <div className="absolute inset-0 pointer-events-none">
          {[...Array(6)].map((_, i) => (
            <div
              key={i}
              className="absolute w-2 h-2 bg-amber-400 rounded-full opacity-60 animate-float"
              style={{
                left: `${20 + i * 15}%`,
                top: `${30 + (i % 2) * 40}%`,
                animationDuration: `${2 + i * 0.3}s`,
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Loading Message */}
      <div className="text-center">
        <div className="h-8 mb-4">
          <p className="text-xl md:text-2xl font-semibold text-gray-800 transition-all duration-500 animate-pulse">
            {message || funnyMessages[currentMessage]}
          </p>
        </div>

        {/* Animated dots */}
        <div className="flex justify-center gap-2">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-3 h-3 bg-blue-600 rounded-full animate-bounce-dot"
              style={{
                animationDelay: `${i * 0.2}s`,
              }}
            />
          ))}
        </div>
      </div>

      {/* Click hint */}
      <p className="mt-6 text-sm text-gray-500 animate-pulse">
        💡 Click the furniture pieces for a surprise!
      </p>
    </div>
  )
}

