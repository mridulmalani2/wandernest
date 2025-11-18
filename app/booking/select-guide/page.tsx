'use client'

import { useEffect, useState, Suspense } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { StudentProfileCard, StudentMatch } from '@/components/tourist/StudentProfileCard'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Loader2, AlertCircle, Info } from 'lucide-react'

function SelectGuideContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const requestId = searchParams.get('requestId')

  const [matches, setMatches] = useState<StudentMatch[]>([])
  const [selectedStudents, setSelectedStudents] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [suggestedPrice, setSuggestedPrice] = useState<any>(null)

  useEffect(() => {
    if (!requestId) {
      setError('No request ID provided')
      setLoading(false)
      return
    }

    fetchMatches()
  }, [requestId])

  const fetchMatches = async () => {
    try {
      setLoading(true)
      const response = await fetch('/api/tourist/request/match', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ requestId }),
      })

      const data = await response.json()

      if (data.success) {
        setMatches(data.matches)
        setSuggestedPrice(data.suggestedPriceRange)
      } else {
        setError(data.error || 'Failed to find matching guides')
      }
    } catch (err) {
      console.error('Error fetching matches:', err)
      setError('Failed to load matching guides')
    } finally {
      setLoading(false)
    }
  }

  const handleToggleStudent = (studentId: string) => {
    setSelectedStudents((prev) =>
      prev.includes(studentId)
        ? prev.filter((id) => id !== studentId)
        : [...prev, studentId]
    )
  }

  const handleSubmitSelection = async () => {
    if (selectedStudents.length === 0) {
      alert('Please select at least one guide')
      return
    }

    setSubmitting(true)
    try {
      const response = await fetch('/api/tourist/request/select', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          requestId,
          selectedStudentIds: selectedStudents,
        }),
      })

      const data = await response.json()

      if (data.success) {
        // Redirect to confirmation page
        router.push(`/booking/pending?requestId=${requestId}`)
      } else {
        alert(data.error || 'Failed to submit selection')
      }
    } catch (err) {
      console.error('Error submitting selection:', err)
      alert('Failed to submit selection')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Finding the best guides for you...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Alert variant="destructive" className="max-w-md">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      </div>
    )
  }

  if (matches.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <div className="max-w-md text-center">
          <AlertCircle className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">
            No Guides Available
          </h2>
          <p className="text-gray-600 mb-6">
            We couldn't find any available guides matching your criteria at the moment.
            This could be due to limited availability in your selected city or dates.
          </p>
          <Button onClick={() => router.push('/booking')} variant="outline">
            Modify Your Request
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Choose Your Student Guide
          </h1>
          <p className="text-lg text-gray-600 mb-4">
            We've found {matches.length} guide{matches.length > 1 ? 's' : ''} that match
            your preferences
          </p>

          {/* Important Note */}
          <Alert className="max-w-3xl mx-auto mb-6 border-blue-200 bg-blue-50">
            <Info className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-sm text-blue-900">
              <strong>How it works:</strong> Select one or more guides you're comfortable
              with. We'll notify them about your request, and the first one to accept will
              be your guide. Student identities are partially hidden for privacy until they
              accept.
            </AlertDescription>
          </Alert>
        </div>

        {/* Suggested Price Range */}
        {suggestedPrice && (
          <div className="max-w-3xl mx-auto mb-8 p-4 bg-white rounded-lg border border-gray-200">
            <h3 className="font-semibold text-gray-800 mb-1">
              Suggested Price Range
            </h3>
            <p className="text-2xl font-bold text-blue-600 mb-1">
              {suggestedPrice.min}-{suggestedPrice.max} {suggestedPrice.currency}
              {suggestedPrice.type === 'hourly' && (
                <span className="text-sm font-normal text-gray-600">/hour</span>
              )}
            </p>
            <p className="text-sm text-gray-600">{suggestedPrice.note}</p>
            <p className="text-xs text-gray-500 mt-2">
              Note: Rates are suggested based on student job benchmarks and city pricing.
              You agree on the final price directly with the student.
            </p>
          </div>
        )}

        {/* Student Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {matches.map((student) => (
            <StudentProfileCard
              key={student.studentId}
              student={student}
              isSelected={selectedStudents.includes(student.studentId)}
              onToggleSelect={handleToggleStudent}
            />
          ))}
        </div>

        {/* Action Buttons */}
        <div className="max-w-3xl mx-auto flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            variant="outline"
            onClick={() => router.push('/booking')}
            disabled={submitting}
            className="w-full sm:w-auto"
          >
            Modify Request
          </Button>

          <Button
            onClick={handleSubmitSelection}
            disabled={selectedStudents.length === 0 || submitting}
            className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700"
          >
            {submitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Sending Requests...
              </>
            ) : (
              <>
                Confirm & Send Request
                {selectedStudents.length > 0 && ` (${selectedStudents.length})`}
              </>
            )}
          </Button>
        </div>

        {/* Selection Summary */}
        {selectedStudents.length > 0 && (
          <div className="max-w-3xl mx-auto mt-6 p-4 bg-green-50 border border-green-200 rounded-lg">
            <p className="text-sm text-green-800 text-center">
              You've selected <strong>{selectedStudents.length}</strong> guide
              {selectedStudents.length > 1 ? 's' : ''}. They will all receive your request,
              and the first to accept will become your guide.
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

export default function SelectGuidePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center">
          <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
        </div>
      }
    >
      <SelectGuideContent />
    </Suspense>
  )
}
