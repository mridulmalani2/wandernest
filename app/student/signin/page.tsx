'use client';

import { useEffect } from 'react';
import { signIn, useSession } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function StudentSignIn() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  useEffect(() => {
    if (status === 'authenticated' && session?.user) {
      // Check if user has completed onboarding
      if (session.user.hasCompletedOnboarding) {
        // Redirect to dashboard
        router.push('/student/dashboard');
      } else {
        // Redirect to onboarding
        router.push('/student/onboarding');
      }
    }
  }, [status, session, router]);

  const handleGoogleSignIn = async () => {
    await signIn('google', {
      callbackUrl: '/student/onboarding',
    });
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link href="/" className="flex items-center space-x-2">
            <span className="text-2xl">🌍</span>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              WanderNest
            </h1>
          </Link>
          <nav className="flex items-center space-x-4">
            <Link href="/student">
              <Button variant="ghost">Back to Student Page</Button>
            </Link>
          </nav>
        </div>
      </header>

      {/* Sign In Form */}
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full space-y-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold">Sign in as a Student Guide</h2>
            <p className="mt-2 text-gray-600">
              Use your student email to get started
            </p>
          </div>

          {/* Error Message */}
          {error === 'invalid_email' && (
            <div className="bg-red-50 border-2 border-red-400 rounded-xl p-4">
              <div className="flex items-start space-x-3">
                <div className="text-xl">❌</div>
                <div>
                  <h3 className="font-bold text-red-900 mb-1">Invalid Email Domain</h3>
                  <p className="text-sm text-red-800">
                    Please sign in with a valid student email address ending in .edu, .edu.in, .ac.uk, or other institutional domains.
                  </p>
                  <p className="text-sm text-red-800 mt-2">
                    If you have a valid student email but it's not recognized, please contact support.
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Sign In Box */}
          <div className="bg-white rounded-2xl border-2 p-8 shadow-lg space-y-6">
            <div className="space-y-4">
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900 font-medium">
                  ℹ️ Student Email Required
                </p>
                <p className="text-xs text-blue-800 mt-1">
                  Only student email domains are allowed (.edu, .edu.in, .ac.uk, etc.)
                </p>
              </div>

              <Button
                onClick={handleGoogleSignIn}
                className="w-full h-12 text-base"
                size="lg"
              >
                <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24">
                  <path
                    fill="currentColor"
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  />
                  <path
                    fill="currentColor"
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  />
                  <path
                    fill="currentColor"
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  />
                </svg>
                Continue with Google
              </Button>

              <p className="text-xs text-gray-500 text-center">
                By signing in, you agree to our Terms of Service and Privacy Policy
              </p>
            </div>

            <div className="border-t pt-6">
              <h3 className="font-bold text-sm mb-2">What happens next?</h3>
              <ul className="text-sm text-gray-600 space-y-2">
                <li className="flex items-start">
                  <span className="mr-2">1.</span>
                  <span>Sign in with your student email</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">2.</span>
                  <span>Complete your profile and verification</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">3.</span>
                  <span>Set your availability</span>
                </li>
                <li className="flex items-start">
                  <span className="mr-2">4.</span>
                  <span>Start receiving booking requests</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-8 text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} WanderNest. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
