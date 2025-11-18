'use client'

import { useState } from 'react'
import { ReportType } from '@prisma/client'

interface ReportFormProps {
  reportedUserId: string
  reportedBy: string
  onSuccess?: () => void
  onCancel?: () => void
}

export default function ReportForm({
  reportedUserId,
  reportedBy,
  onSuccess,
  onCancel,
}: ReportFormProps) {
  const [type, setType] = useState<ReportType | ''>('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const reportTypes = [
    { value: ReportType.SAFETY_CONCERN, label: '🚨 Safety Concern', urgent: true },
    { value: ReportType.HARASSMENT, label: '⚠️ Harassment', urgent: true },
    { value: ReportType.INAPPROPRIATE_BEHAVIOR, label: '❌ Inappropriate Behavior', urgent: false },
    { value: ReportType.PAYMENT_DISPUTE, label: '💰 Payment Dispute', urgent: false },
    { value: ReportType.NO_SHOW, label: '👻 No Show', urgent: false },
    { value: ReportType.OTHER, label: '📝 Other', urgent: false },
  ]

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!type || !description.trim()) {
      setError('Please select a report type and provide a description')
      return
    }

    setLoading(true)

    try {
      const response = await fetch('/api/reports', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type,
          reportedUserId,
          reportedBy,
          description: description.trim(),
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to submit report')
      }

      setSuccess(true)

      // Show appropriate message based on severity
      if (data.immediateAction) {
        alert(
          '🚨 Your report has been submitted and flagged as urgent. ' +
          'Our team has been notified immediately and will take appropriate action. ' +
          'If you are in immediate danger, please contact local emergency services.'
        )
      } else {
        alert(
          '✅ Your report has been submitted successfully. ' +
          'Our team will review it and take appropriate action. ' +
          'Report ID: ' + data.reportId
        )
      }

      // Reset form
      setType('')
      setDescription('')

      if (onSuccess) {
        onSuccess()
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit report')
    } finally {
      setLoading(false)
    }
  }

  const selectedType = reportTypes.find((rt) => rt.value === type)

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Submit a Report</h2>

      <div className="mb-4 bg-yellow-50 border border-yellow-200 rounded-lg p-4">
        <p className="text-sm text-gray-700">
          <strong>⚠️ Important:</strong> If you are in immediate danger, please contact local emergency services first.
          This form is for reporting issues to the WanderNest team for review and action.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Report Type */}
        <div>
          <label htmlFor="reportType" className="block text-sm font-medium text-gray-700 mb-2">
            Report Type <span className="text-red-500">*</span>
          </label>
          <select
            id="reportType"
            value={type}
            onChange={(e) => setType(e.target.value as ReportType)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          >
            <option value="">Select a report type...</option>
            {reportTypes.map((rt) => (
              <option key={rt.value} value={rt.value}>
                {rt.label}
              </option>
            ))}
          </select>
          {selectedType?.urgent && (
            <p className="mt-2 text-sm text-red-600 font-medium">
              🚨 This report type will be escalated immediately to our safety team.
            </p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Description <span className="text-red-500">*</span>
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            rows={6}
            placeholder="Please provide as much detail as possible about the incident, including date, time, location, and what happened..."
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
          <p className="mt-1 text-sm text-gray-500">
            {description.length} / 2000 characters
          </p>
        </div>

        {/* Error Message */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">{error}</p>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <p className="text-green-800">Report submitted successfully!</p>
          </div>
        )}

        {/* Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={loading}
            className={`flex-1 py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              loading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            {loading ? 'Submitting...' : 'Submit Report'}
          </button>
          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              disabled={loading}
              className="px-6 py-3 border border-gray-300 rounded-lg font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
          )}
        </div>
      </form>
    </div>
  )
}
