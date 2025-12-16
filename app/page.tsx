'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';
import BackgroundEffects from '@/components/ui/BackgroundEffects';

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.push('/dashboard');
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <BackgroundEffects />
      <div className="relative z-10 text-center">
        <div className="w-16 h-16 border-4 border-[#00aaff] border-t-transparent rounded-full animate-spin mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gradient mb-2">LIFE RPG</h1>
        <p className="text-gray-400">Loading your adventure...</p>
      </div>
    </div>
  );
}
