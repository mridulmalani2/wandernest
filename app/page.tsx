import Image from 'next/image'
import Navigation from '@/components/Navigation'
import TouristCTA from '@/components/cta/TouristCTA'
import StudentCTA from '@/components/cta/StudentCTA'
import { getWebsiteStructuredData, getOrganizationStructuredData } from '@/lib/structuredData'

export default function MainLanding() {
  const structuredData = getWebsiteStructuredData()
  const organizationData = getOrganizationStructuredData()

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Schema.org structured data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationData) }}
      />
      {/* Full-bleed Background Image with Overlay - Optimized with Next.js Image */}
      <div className="absolute inset-0">
        <Image
          src="https://images.unsplash.com/photo-1502602898657-3e91760cbb34?w=1920&q=80"
          alt="Beautiful Paris cityscape with Eiffel Tower"
          fill
          priority
          quality={80}
          sizes="100vw"
          className="object-cover"
        />
        {/* Dark overlay for text contrast */}
        <div className="absolute inset-0 bg-black/25 backdrop-blur-[4px]" />
        {/* Gradient overlay for visual depth */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-purple-600/15 to-pink-600/20" />
      </div>
      <div className="absolute inset-0 pattern-dots opacity-20" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <Navigation variant="default" />

        {/* Hero Section */}
        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Hero Title */}
            <div className="space-y-6 animate-slide-up-fade">
              <h1 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight text-white text-shadow-lg">
                Experience{' '}
                <span className="text-gradient-vibrant animate-gradient-shift inline-block bg-white/10 px-4 py-2 rounded-2xl">
                  Authentic Travel
                </span>
                <br />
                <span className="relative inline-block">
                  with Local Student Guides
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </span>
              </h1>

              <p className="text-xl md:text-2xl text-white max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200 text-shadow">
                Connect with verified university students who will show you their city
                through a local&apos;s eyes. Get personalized recommendations and authentic
                experiences.
              </p>
            </div>

            {/* Two Large CTAs - Redesigned with image-based tiles matching Experience India style */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 max-w-5xl mx-auto">
              {/* Tourist CTA - Routes to /tourist */}
              <div className="animate-fade-in-up">
                <TouristCTA />
              </div>

              {/* Student CTA - Temporarily routes to Google Form (see StudentCTA component for details) */}
              <div className="animate-fade-in-up delay-100">
                <StudentCTA />
              </div>
            </div>

            {/* Visual Features Section with Images */}
            <div className="pt-16 space-y-12 animate-fade-in-up delay-300">
              <h2 className="text-4xl md:text-5xl font-bold text-center text-white text-shadow-lg">
                Why Choose WanderNest?
              </h2>

              {/* Feature 1 - Authentic Local Experiences */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 order-2 md:order-1 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900">Authentic Local Experiences</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Skip the tourist traps and discover the real city. Our student guides know the
                    best local cafes, hidden viewpoints, and authentic experiences that guidebooks
                    miss. Connect with the culture through someone who lives it every day.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Hidden local spots and neighborhood favorites</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Cultural insights from a local perspective</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-blue-600 font-bold">✓</span>
                      <span className="text-gray-700">Personalized recommendations for your interests</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group order-1 md:order-2">
                  <Image
                    src="https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800&q=80"
                    alt="Local cafe experience with authentic ambiance"
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>

              {/* Feature 2 - Verified Student Guides */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group">
                  <Image
                    src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800&q=80"
                    alt="Young university students collaborating and sharing knowledge"
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
                <div className="space-y-4 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900">Verified University Students</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    All our guides are verified university students with proven local knowledge.
                    They are passionate about sharing their city and creating meaningful connections
                    with travelers from around the world.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600 font-bold">✓</span>
                      <span className="text-gray-700">Background-verified student credentials</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600 font-bold">✓</span>
                      <span className="text-gray-700">Multilingual guides for better communication</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-purple-600 font-bold">✓</span>
                      <span className="text-gray-700">Rated and reviewed by past travelers</span>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Feature 3 - Flexible & Personal */}
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div className="space-y-4 order-2 md:order-1 bg-white/90 backdrop-blur-md rounded-2xl p-8 shadow-xl">
                  <h3 className="text-3xl font-bold text-gray-900">Flexible and Personalized</h3>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    Every traveler is unique. Whether you want to explore historic landmarks, find
                    the best street food, or discover nightlife hotspots, your guide will customize
                    the experience to match your interests and pace.
                  </p>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Customized itineraries based on your preferences</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Flexible scheduling around your travel plans</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 text-green-600 font-bold">✓</span>
                      <span className="text-gray-700">Small group or one-on-one experiences</span>
                    </li>
                  </ul>
                </div>
                <div className="relative h-96 rounded-2xl overflow-hidden shadow-2xl group order-1 md:order-2">
                  <Image
                    src="https://images.unsplash.com/photo-1488646953014-85cb44e25828?w=800&q=80"
                    alt="Group of young travelers exploring a European city together"
                    fill
                    loading="lazy"
                    quality={75}
                    sizes="(max-width: 768px) 100vw, 50vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                </div>
              </div>
            </div>

            {/* Footer Note */}
            <p className="text-sm text-white/80 pt-16 animate-fade-in text-shadow">
              © {new Date().getFullYear()} WanderNest. Connecting cultures, one guide at a time.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
