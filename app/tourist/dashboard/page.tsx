'use client'

import { useState, useEffect } from 'react'

interface TouristRequest {
  id: string
  city: string
  dates: any
  preferredTime: string
  numberOfGuests: number
  groupType: string
  serviceType: string
  status: string
  createdAt: string
  selections: Array<{
    student: {
      id: string
      name: string
      averageRating?: number
    }
  }>
  review?: {
    rating: number
    comment: string
  }
}

export default function TouristDashboard() {
  const [step, setStep] = useState<'email' | 'verify' | 'dashboard'>('email')
  const [email, setEmail] = useState('')
  const [code, setCode] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [requests, setRequests] = useState<TouristRequest[]>([])

  useEffect(() => {
    // Check if already authenticated
    const token = localStorage.getItem('touristToken')
    if (token) {
      setStep('dashboard')
      fetchRequests(token)
    }
  }, [])

  const handleSendCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tourist/dashboard/access', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Failed to send verification code')
      }

      setStep('verify')
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const handleVerifyCode = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/tourist/dashboard/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, code }),
      })

      if (!response.ok) {
        const data = await response.json()
        throw new Error(data.error || 'Invalid verification code')
      }

      const data = await response.json()
      localStorage.setItem('touristToken', data.token)
      setStep('dashboard')
      await fetchRequests(data.token)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred')
    } finally {
      setLoading(false)
    }
  }

  const fetchRequests = async (token: string) => {
    try {
      const response = await fetch('/api/tourist/dashboard/requests', {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch requests')
      }

      const data = await response.json()
      setRequests(data.requests)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load your requests')
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('touristToken')
    setStep('email')
    setEmail('')
    setCode('')
    setRequests([])
  }

  const getStatusBadge = (status: string) => {
    const styles = {
      PENDING: 'bg-yellow-100 text-yellow-800',
      MATCHED: 'bg-blue-100 text-blue-800',
      ACCEPTED: 'bg-green-100 text-green-800',
      EXPIRED: 'bg-gray-100 text-gray-800',
      CANCELLED: 'bg-red-100 text-red-800',
    }
    return styles[status as keyof typeof styles] || 'bg-gray-100 text-gray-800'
  }

  if (step === 'email') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Tourist Dashboard</h1>
            <p className="text-gray-600">View your past requests and bookings</p>
          </div>

          <form onSubmit={handleSendCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter your email"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Sending...' : 'Send Verification Code'}
            </button>
          </form>
        </div>
      </div>
    )
  }

  if (step === 'verify') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50 flex items-center justify-center px-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Enter Verification Code</h1>
            <p className="text-gray-600">
              We sent a 6-digit code to <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerifyCode} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Verification Code
              </label>
              <input
                type="text"
                value={code}
                onChange={(e) => setCode(e.target.value.replace(/\D/g, '').slice(0, 6))}
                required
                maxLength={6}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent text-center text-2xl tracking-widest font-bold"
                placeholder="000000"
              />
            </div>

            {error && (
              <div className="bg-red-50 border border-red-200 rounded-lg p-3">
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            <button
              type="submit"
              disabled={loading || code.length !== 6}
              className="w-full bg-gradient-to-r from-blue-600 to-purple-600 text-white py-3 rounded-lg font-medium hover:from-blue-700 hover:to-purple-700 disabled:opacity-50 transition-all"
            >
              {loading ? 'Verifying...' : 'Verify & Access Dashboard'}
            </button>

            <button
              type="button"
              onClick={() => setStep('email')}
              className="w-full text-gray-600 hover:text-gray-900 text-sm"
            >
              Use a different email
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Your Dashboard</h1>
            <p className="mt-2 text-gray-600">Logged in as {email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="px-4 py-2 text-gray-600 hover:text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Logout
          </button>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-600">{error}</p>
          </div>
        )}

        {requests.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center">
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <h3 className="mt-2 text-sm font-medium text-gray-900">No requests yet</h3>
            <p className="mt-1 text-sm text-gray-500">You haven't made any tour requests.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {requests.map((request) => (
              <div key={request.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">{request.city}</h3>
                      <p className="text-sm text-gray-500">
                        {request.serviceType.replace('_', ' ').charAt(0).toUpperCase() +
                         request.serviceType.replace('_', ' ').slice(1)}
                      </p>
                    </div>
                    <span className={`px-3 py-1 text-sm font-semibold rounded-full ${getStatusBadge(request.status)}`}>
                      {request.status}
                    </span>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4 text-sm">
                    <div>
                      <p className="text-gray-500">Time</p>
                      <p className="font-medium text-gray-900">{request.preferredTime}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Guests</p>
                      <p className="font-medium text-gray-900">{request.numberOfGuests}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Group Type</p>
                      <p className="font-medium text-gray-900 capitalize">{request.groupType}</p>
                    </div>
                    <div>
                      <p className="text-gray-500">Requested</p>
                      <p className="font-medium text-gray-900">
                        {new Date(request.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                  </div>

                  {request.selections.length > 0 && (
                    <div className="border-t border-gray-200 pt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Matched with:</p>
                      {request.selections.map((selection, idx) => (
                        <div key={idx} className="flex items-center justify-between bg-gray-50 rounded-lg p-3">
                          <div>
                            <p className="font-medium text-gray-900">{selection.student.name}</p>
                            {selection.student.averageRating && (
                              <div className="flex items-center mt-1">
                                <span className="text-yellow-500 text-sm">★</span>
                                <span className="text-sm text-gray-600 ml-1">
                                  {selection.student.averageRating.toFixed(1)}
                                </span>
                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                  {request.review && (
                    <div className="border-t border-gray-200 pt-4 mt-4">
                      <p className="text-sm font-medium text-gray-700 mb-2">Your Review:</p>
                      <div className="bg-blue-50 rounded-lg p-3">
                        <div className="flex items-center mb-2">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <span
                              key={i}
                              className={`text-lg ${
                                i < request.review!.rating ? 'text-yellow-500' : 'text-gray-300'
                              }`}
                            >
                              ★
                            </span>
                          ))}
                        </div>
                        {request.review.comment && (
                          <p className="text-sm text-gray-700">{request.review.comment}</p>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
