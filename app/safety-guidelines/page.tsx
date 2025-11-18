'use client'

import SafetyAccordion from '@/components/SafetyAccordion'
import EmergencyContactsTable from '@/components/EmergencyContactsTable'
import { useState } from 'react'
import { useRouter } from 'next/navigation'

export default function SafetyGuidelinesPage() {
  const [acknowledged, setAcknowledged] = useState(false)
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const safetyGuidelines = [
    {
      title: '🛡️ Before Your Trip',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Always verify your student host's profile and read reviews from previous tourists</li>
          <li>Share your itinerary and host details with family or friends</li>
          <li>Keep copies of important documents (passport, visa, travel insurance) in multiple locations</li>
          <li>Research local customs, laws, and cultural norms of your destination</li>
          <li>Ensure you have comprehensive travel insurance that covers medical emergencies</li>
        </ul>
      ),
    },
    {
      title: '🤝 Meeting Your Student Host',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Always meet in a public place for the first time (hotel lobby, café, popular landmark)</li>
          <li>Inform someone you trust about your meeting location and expected return time</li>
          <li>Trust your instincts - if something feels wrong, it's okay to cancel or reschedule</li>
          <li>Verify the host's identity through video call before meeting in person</li>
          <li>Keep your phone charged and accessible at all times</li>
        </ul>
      ),
    },
    {
      title: '💰 Financial Safety',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>All payments should be made through the WanderNest platform when available</li>
          <li>Never share your credit card details, PIN, or banking passwords</li>
          <li>Be cautious of requests for cash advances or payments outside the platform</li>
          <li>Keep most of your money in a secure location; carry only what you need</li>
          <li>Report any suspicious payment requests immediately</li>
        </ul>
      ),
    },
    {
      title: '📱 Stay Connected',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Keep your phone charged and ensure you have a local SIM card or international roaming</li>
          <li>Save emergency numbers in your phone before your trip</li>
          <li>Enable location sharing with trusted contacts during your activities</li>
          <li>Check in regularly with family or friends throughout your trip</li>
          <li>Have a backup communication plan if your phone is lost or stolen</li>
        </ul>
      ),
    },
    {
      title: '🚨 Personal Safety',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Stay aware of your surroundings at all times</li>
          <li>Avoid isolated or poorly lit areas, especially at night</li>
          <li>Don't accept food or drinks from strangers</li>
          <li>Keep your belongings secure and within sight</li>
          <li>If you feel unsafe, go to a public place and contact local authorities</li>
          <li>Trust your instincts - your safety is the top priority</li>
        </ul>
      ),
    },
    {
      title: '⚠️ When to Report',
      content: (
        <div className="space-y-3">
          <p className="font-semibold">Report immediately if you experience:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Any form of harassment (verbal, physical, or sexual)</li>
            <li>Safety concerns or threatening behavior</li>
            <li>Requests for inappropriate activities or illegal services</li>
            <li>Pressure to pay cash or transfer money outside the platform</li>
            <li>Identity fraud or misrepresentation</li>
            <li>Any situation that makes you feel uncomfortable or unsafe</li>
          </ul>
          <p className="font-semibold mt-3 text-red-600">
            Your safety is our priority. All reports are taken seriously and reviewed promptly.
          </p>
        </div>
      ),
    },
    {
      title: '🏥 Health & Medical',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Carry any necessary medications in original packaging with prescriptions</li>
          <li>Know the location of the nearest hospital or clinic to your accommodation</li>
          <li>Inform your host about any serious allergies or medical conditions</li>
          <li>Stay hydrated and be cautious with street food if you have a sensitive stomach</li>
          <li>Keep your travel insurance information easily accessible</li>
        </ul>
      ),
    },
    {
      title: '🏛️ Cultural Respect',
      content: (
        <ul className="list-disc pl-5 space-y-2">
          <li>Dress appropriately according to local customs and religious sites</li>
          <li>Ask permission before taking photos of people or sensitive locations</li>
          <li>Be respectful of local traditions and social norms</li>
          <li>Learn basic phrases in the local language</li>
          <li>Follow your host's guidance on appropriate behavior in different settings</li>
        </ul>
      ),
    },
  ]

  const handleAcknowledge = async () => {
    if (!acknowledged) {
      alert('Please check the box to confirm you have read and understood the safety guidelines.')
      return
    }

    setLoading(true)

    // In a real implementation, this would use the actual student ID from authentication
    // For now, this demonstrates the functionality
    try {
      // Example: await acknowledgeGuidelines(studentId)
      alert('Safety guidelines acknowledged! You can now proceed with booking.')
      // router.push('/dashboard') // Redirect to dashboard or booking page
    } catch (error) {
      alert('Failed to save acknowledgment. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Safety Guidelines
          </h1>
          <p className="text-lg text-gray-600">
            Your safety is our top priority. Please read these guidelines carefully before your first booking.
          </p>
        </div>

        {/* Safety Accordion */}
        <div className="mb-12 flex justify-center">
          <SafetyAccordion items={safetyGuidelines} />
        </div>

        {/* Emergency Contacts Section */}
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">
            Emergency Contacts by City
          </h2>
          <p className="text-center text-gray-600 mb-6">
            Save these numbers before your trip. In case of emergency, contact local authorities immediately.
          </p>
          <div className="flex justify-center">
            <EmergencyContactsTable />
          </div>
        </div>

        {/* Additional Resources */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-3">
            📞 WanderNest Support
          </h3>
          <p className="text-gray-700 mb-2">
            If you need to report an issue or have safety concerns:
          </p>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            <li>Email: <a href="mailto:safety@wandernest.com" className="text-blue-600 hover:underline">safety@wandernest.com</a></li>
            <li>Emergency Hotline: <span className="font-semibold">+1-800-WANDER-HELP</span></li>
            <li>Available 24/7 for urgent safety concerns</li>
          </ul>
        </div>

        {/* Acknowledgment Checkbox */}
        <div className="bg-white border-2 border-gray-300 rounded-lg p-8 shadow-lg">
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              id="acknowledge"
              checked={acknowledged}
              onChange={(e) => setAcknowledged(e.target.checked)}
              className="mt-1 h-5 w-5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded cursor-pointer"
            />
            <label htmlFor="acknowledge" className="text-gray-900 cursor-pointer">
              <span className="font-semibold text-lg">I understand and acknowledge</span>
              <p className="mt-2 text-gray-600">
                I have read and understood all the safety guidelines above. I agree to follow these
                recommendations and understand that my safety is my responsibility. I will report any
                safety concerns or inappropriate behavior immediately to WanderNest.
              </p>
            </label>
          </div>
          <button
            onClick={handleAcknowledge}
            disabled={!acknowledged || loading}
            className={`mt-6 w-full py-3 px-6 rounded-lg font-semibold text-white transition-colors ${
              acknowledged && !loading
                ? 'bg-blue-600 hover:bg-blue-700 cursor-pointer'
                : 'bg-gray-400 cursor-not-allowed'
            }`}
          >
            {loading ? 'Saving...' : 'Continue to Booking'}
          </button>
        </div>

        {/* Back Button */}
        <div className="mt-8 text-center">
          <button
            onClick={() => router.push('/')}
            className="text-blue-600 hover:text-blue-800 font-medium"
          >
            ← Back to Home
          </button>
        </div>
      </div>
    </div>
  )
}
