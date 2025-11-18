'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { useSession, signIn } from 'next-auth/react'
import { Globe, GraduationCap, MessageCircle, Star, AlertTriangle, ChevronLeft } from 'lucide-react'

export default function TouristLanding() {
  const { data: session, status } = useSession()
  const isTourist = session?.user?.userType === 'tourist'

  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Background */}
      <div className="absolute inset-0 gradient-mesh-vibrant" />
      <div className="absolute inset-0 bg-dots opacity-10" />

      {/* Animated Floating Orbs */}
      <div className="absolute top-20 left-10 w-64 h-64 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-60 right-20 w-64 h-64 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-300" />
      <div className="absolute bottom-40 left-1/4 w-64 h-64 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-700" />

      {/* Content */}
      <div className="relative z-10">
        {/* Header */}
        <header className="border-b border-white/20 backdrop-blur-md bg-white/50 sticky top-0 z-50 shadow-soft animate-fade-in-down">
          <div className="container mx-auto px-4 py-4 flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-1.5 rounded-lg gradient-vibrant text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-premium">
                <Globe className="w-6 h-6" />
              </div>
              <h1 className="text-2xl font-bold text-gradient-vibrant">
                WanderNest
              </h1>
            </Link>
            <nav className="flex items-center space-x-3">
              <Link href="/">
                <Button variant="ghost" className="hover-lift hover:bg-purple-50">
                  <ChevronLeft className="w-4 h-4 mr-1" /> Back to Home
                </Button>
              </Link>
              <Link href="/booking">
                <Button className="gradient-ocean hover:shadow-glow-blue transition-all shadow-premium text-white">Book a Guide</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 container mx-auto px-4 py-16">
          <div className="max-w-5xl mx-auto space-y-12">
            <div className="text-center space-y-8 animate-slide-up-fade">
              <h2 className="text-5xl md:text-6xl font-bold leading-tight tracking-tight">
                Experience{' '}
                <span className="text-gradient-vibrant animate-gradient-shift inline-block">
                  Authentic Travel
                </span>
                <br />
                with Local Student Guides
              </h2>

              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium">
                Connect with verified university students who will show you their city
                through a local&apos;s eyes. Get personalized recommendations and authentic
                experiences.
              </p>

              <div className="flex justify-center gap-4 pt-4 animate-fade-in-up delay-300">
                <Link href="/booking">
                  <Button size="lg" className="text-lg px-10 py-7 gradient-ocean hover:shadow-glow-blue shadow-premium text-white font-semibold group hover-lift">
                    Start Your Adventure
                    <span className="ml-2 group-hover:translate-x-1 transition-transform inline-block">→</span>
                  </Button>
                </Link>
              </div>
            </div>

            {/* Marketplace Disclaimer */}
            <div className="bg-gradient-to-br from-amber-50 to-yellow-100/50 border-2 border-amber-300/60 rounded-3xl p-6 md:p-8 max-w-4xl mx-auto shadow-premium hover-lift animate-fade-in-up delay-400">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0">
                  <div className="p-3 rounded-xl bg-gradient-to-br from-amber-500 to-orange-600 text-white shadow-soft">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                </div>
                <div className="flex-1">
                  <h3 className="font-bold text-amber-900 mb-3 text-lg">Important Notice</h3>
                  <p className="text-sm text-amber-900 mb-3 leading-relaxed">
                    <strong>WanderNest is a marketplace connector only.</strong> We facilitate connections between tourists and local student guides but do not:
                  </p>
                  <ul className="space-y-2 text-sm text-amber-900">
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Handle any payments or financial transactions</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Guarantee the quality of services provided</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Act as an employer or agency for guides</span>
                    </li>
                    <li className="flex items-start">
                      <span className="mr-2 mt-0.5">•</span>
                      <span>Assume liability for guide-tourist interactions</span>
                    </li>
                  </ul>
                  <p className="text-sm text-amber-900 mt-3 leading-relaxed">
                    All arrangements, payments, and services are agreed upon directly between you and your guide.
                  </p>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="grid md:grid-cols-3 gap-8 pt-8">
              <div className="glass-card rounded-2xl p-8 shadow-premium hover:shadow-elevated border-2 border-white/40 hover:border-blue-300/60 hover-lift-lg group animate-fade-in-up delay-500 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-400/5 via-cyan-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl gradient-ocean text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow-blue">
                    <GraduationCap className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-blue-700 transition-colors">Verified Students</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    All guides are verified university students with local knowledge
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 shadow-premium hover:shadow-elevated border-2 border-white/40 hover:border-purple-300/60 hover-lift-lg group animate-fade-in-up delay-700 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-400/5 via-pink-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl gradient-vibrant text-white mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-glow-purple">
                    <MessageCircle className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-purple-700 transition-colors">Personalized Experience</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Get custom itineraries based on your interests and preferences
                  </p>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 shadow-premium hover:shadow-elevated border-2 border-white/40 hover:border-pink-300/60 hover-lift-lg group animate-fade-in-up delay-1000 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-pink-400/5 via-rose-400/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="relative z-10">
                  <div className="inline-flex p-4 rounded-2xl gradient-sunset text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-soft">
                    <Star className="w-8 h-8" />
                  </div>
                  <h3 className="text-xl font-bold mb-3 group-hover:text-pink-700 transition-colors">Authentic Adventures</h3>
                  <p className="text-gray-700 leading-relaxed font-medium">
                    Discover hidden gems and local favorites off the beaten path
                  </p>
                </div>
              </div>
            </div>
          </div>
        </main>

        {/* Footer */}
        <footer className="border-t bg-white/80 backdrop-blur-sm mt-16">
          <div className="container mx-auto px-4 py-8 text-center text-gray-600">
            <p>&copy; {new Date().getFullYear()} WanderNest. All rights reserved.</p>
          </div>
        </footer>
      </div>
    </div>
  )
}
