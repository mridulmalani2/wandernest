'use client'

import ReportForm from '@/components/ReportForm'
import { useRouter, useSearchParams } from 'next/navigation'
import { Suspense } from 'react'

function ReportPageContent() {
  const router = useRouter()
  const searchParams = useSearchParams()

  // In a real app, these would come from authentication and URL params
  const reportedUserId = searchParams.get('userId') || ''
  const reportedBy = searchParams.get('reportedBy') || 'anonymous@wandernest.com'

  if (!reportedUserId) {
    return (
      <div className="min-h-screen bg-gray-50 py-12 px-4">
        <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Invalid Report</h1>
          <p className="text-gray-600 mb-6">
            Missing required information. Please use the report button from a user profile.
          </p>
          <button
            onClick={() => router.push('/')}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-6 rounded-lg"
          >
            Go Home
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="mb-8">
        <button
          onClick={() => router.back()}
          className="text-blue-600 hover:text-blue-800 font-medium"
        >
          ← Back
        </button>
      </div>

      <ReportForm
        reportedUserId={reportedUserId}
        reportedBy={reportedBy}
        onSuccess={() => {
          setTimeout(() => {
            router.push('/')
          }, 2000)
        }}
        onCancel={() => router.back()}
      />
    </div>
  )
}

export default function ReportPage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-gray-50 flex items-center justify-center">Loading...</div>}>
      <ReportPageContent />
    </Suspense>
  )
}
