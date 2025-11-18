'use client';

import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { OnboardingWizard } from '@/components/student/OnboardingWizard';

export default function StudentOnboarding() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    // Redirect if not authenticated
    if (status === 'unauthenticated') {
      router.push('/student/signin');
    }

    // Redirect if already onboarded
    if (status === 'authenticated' && session?.user?.hasCompletedOnboarding) {
      router.push('/student/dashboard');
    }
  }, [status, session, router]);

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

  if (!session) {
    return null;
  }

  return <OnboardingWizard session={session} />;
}
