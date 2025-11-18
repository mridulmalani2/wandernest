'use client'

import { useState } from 'react'

interface AccordionItem {
  title: string
  content: string | React.ReactNode
}

interface SafetyAccordionProps {
  items: AccordionItem[]
}

export default function SafetyAccordion({ items }: SafetyAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="w-full max-w-3xl space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded-lg overflow-hidden bg-white shadow-sm"
        >
          <button
            onClick={() => toggleAccordion(index)}
            className="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-50 transition-colors"
          >
            <span className="font-semibold text-gray-800">{item.title}</span>
            <svg
              className={`w-5 h-5 transform transition-transform ${
                openIndex === index ? 'rotate-180' : ''
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-6 py-4 bg-gray-50 border-t border-gray-200">
              <div className="text-gray-700 leading-relaxed">{item.content}</div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}
