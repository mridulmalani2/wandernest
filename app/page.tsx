import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Globe, Plane, GraduationCap } from 'lucide-react'

export default function MainLanding() {
  return (
    <div className="min-h-screen flex flex-col relative overflow-hidden">
      {/* Enhanced Gradient Mesh Background */}
      <div className="absolute inset-0 gradient-mesh-vibrant" />
      <div className="absolute inset-0 bg-dots opacity-20" />

      {/* Animated Floating Orbs */}
      <div className="absolute top-20 left-10 w-72 h-72 bg-blue-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float" />
      <div className="absolute top-40 right-10 w-72 h-72 bg-purple-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-200" />
      <div className="absolute bottom-20 left-1/3 w-72 h-72 bg-pink-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-float delay-500" />

      {/* Content */}
      <div className="relative z-10 flex flex-col min-h-screen">
        {/* Header */}
        <header className="w-full py-6 px-4 backdrop-blur-md bg-white/30 border-b border-white/20 animate-fade-in-down">
          <div className="max-w-7xl mx-auto flex justify-between items-center">
            <Link href="/" className="flex items-center space-x-2 group">
              <div className="p-2 rounded-xl gradient-vibrant text-white group-hover:scale-110 group-hover:rotate-6 transition-all duration-300 shadow-glow-blue">
                <Globe className="w-8 h-8" />
              </div>
              <h1 className="text-3xl font-bold text-gradient-vibrant">
                WanderNest
              </h1>
            </Link>
            <nav className="flex items-center space-x-3">
              <Link href="/student">
                <Button variant="outline" className="hover-lift border-2 hover:border-purple-400 hover:text-purple-600 transition-all">I&apos;m a Student</Button>
              </Link>
              <Link href="/booking">
                <Button className="gradient-vibrant hover:shadow-glow-purple transition-all shadow-premium text-white">Book a Guide</Button>
              </Link>
            </nav>
          </div>
        </header>

        {/* Hero Section */}
        <main className="flex-1 container mx-auto px-4 py-12 flex flex-col items-center justify-center">
          <div className="max-w-5xl mx-auto text-center space-y-12">
            {/* Hero Title */}
            <div className="space-y-6 animate-slide-up-fade">
              <h2 className="text-5xl md:text-7xl font-bold leading-tight tracking-tight">
                Experience{' '}
                <span className="text-gradient-vibrant animate-gradient-shift inline-block">
                  Authentic Travel
                </span>
                <br />
                <span className="relative inline-block">
                  with Local Student Guides
                  <div className="absolute -bottom-2 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 rounded-full transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </span>
              </h2>

              <p className="text-xl md:text-2xl text-gray-700 max-w-3xl mx-auto leading-relaxed font-medium animate-fade-in-up delay-200">
                Connect with verified university students who will show you their city
                through a local&apos;s eyes. Get personalized recommendations and authentic
                experiences.
              </p>
            </div>

            {/* Two Large CTAs */}
            <div className="grid md:grid-cols-2 gap-8 pt-8 max-w-5xl mx-auto">
              {/* Tourist CTA */}
              <Link href="/tourist" className="animate-fade-in-up delay-300">
                <div className="group cursor-pointer glass-card rounded-3xl p-10 shadow-premium hover:shadow-elevated border-2 border-white/40 hover:border-blue-300/60 transition-all duration-500 hover-lift-lg relative overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-400/10 via-cyan-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out]" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex p-5 rounded-2xl gradient-ocean text-white mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-glow-blue">
                      <Plane className="w-12 h-12" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-blue-700 transition-colors">
                      I&apos;m a Tourist
                    </h2>

                    <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                      Find local student guides to show you authentic experiences in your destination city
                    </p>

                    <Button size="lg" className="w-full text-lg py-7 gradient-ocean hover:shadow-glow-blue shadow-premium text-white font-semibold group/btn">
                      Explore as Tourist
                      <span className="ml-2 group-hover/btn:translate-x-2 transition-transform inline-block">→</span>
                    </Button>
                  </div>
                </div>
              </Link>

              {/* Student CTA */}
              <Link href="/student" className="animate-fade-in-up delay-500">
                <div className="group cursor-pointer glass-card rounded-3xl p-10 shadow-premium hover:shadow-elevated border-2 border-white/40 hover:border-purple-300/60 transition-all duration-500 hover-lift-lg relative overflow-hidden">
                  {/* Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-400/10 via-pink-400/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Shine Effect */}
                  <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700">
                    <div className="absolute top-0 -left-full h-full w-1/2 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12 group-hover:animate-[shimmer_1.5s_ease-in-out]" />
                  </div>

                  <div className="relative z-10">
                    <div className="inline-flex p-5 rounded-2xl gradient-vibrant text-white mb-6 group-hover:scale-110 group-hover:-rotate-3 transition-all duration-300 shadow-glow-purple">
                      <GraduationCap className="w-12 h-12" />
                    </div>

                    <h2 className="text-3xl font-bold text-gray-900 mb-4 group-hover:text-purple-700 transition-colors">
                      I&apos;m a Student
                    </h2>

                    <p className="text-gray-700 mb-8 text-lg leading-relaxed font-medium">
                      Become a guide and earn money by showing travelers around your city
                    </p>

                    <Button size="lg" className="w-full text-lg py-7 gradient-vibrant hover:shadow-glow-purple shadow-premium text-white font-semibold group/btn">
                      Start Guiding
                      <span className="ml-2 group-hover/btn:translate-x-2 transition-transform inline-block">→</span>
                    </Button>
                  </div>
                </div>
              </Link>
            </div>

            {/* Footer Note */}
            <p className="text-sm text-gray-500 pt-12 animate-fade-in">
              © {new Date().getFullYear()} WanderNest. Connecting cultures, one guide at a time.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
