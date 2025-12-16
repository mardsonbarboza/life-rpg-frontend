'use client';

import { useEffect } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import BackgroundEffects from '@/components/ui/BackgroundEffects';
import PlayerHUD from '@/components/dashboard/PlayerHUD';
import QuestBoard from '@/components/dashboard/QuestBoard';
import AchievementsGrid from '@/components/dashboard/AchievementsGrid';
import ActivityLog from '@/components/dashboard/ActivityLog';

export default function DashboardPage() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <BackgroundEffects />
        <div className="relative z-10 flex flex-col items-center">
          <div className="w-24 h-24 border-6 border-[#00d9ff] border-t-transparent rounded-full animate-spin mb-8" />
          <p className="text-gray-300 text-2xl font-bold mb-2 animate-pulse">Loading your adventure...</p>
          <p className="text-gray-500 text-base">Preparing your epic journey</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen relative">
      <BackgroundEffects />

      <div className="relative z-10 flex flex-col lg:flex-row gap-8 p-8 max-w-[2000px] mx-auto">
        {/* Left Sidebar - Player HUD */}
        <aside className="w-full lg:w-96 flex-shrink-0">
          <div className="lg:sticky lg:top-8">
            <PlayerHUD user={user} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-10">
          {/* Welcome Header - MUITO maior e premium */}
          <div className="glass-strong rounded-2xl p-10 lg:p-12 animate-slide-in-top relative overflow-hidden corner-decoration">
            {/* Shine effect */}
            <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
              <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
            </div>

            <div className="relative z-10">
              <h1 className="text-5xl lg:text-6xl font-bold text-gradient mb-4 tracking-wide">
                Welcome back, {user.username}! 👋
              </h1>
              <p className="text-gray-300 text-xl font-medium leading-relaxed">
                Ready to continue your epic journey? Complete quests and level up!
              </p>
            </div>

            {/* Decorative glow spots */}
            <div className="absolute -top-2 -right-2 w-40 h-40 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
            <div className="absolute -bottom-2 -left-2 w-40 h-40 bg-[#00ff88]/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
          </div>

          {/* Quest Board */}
          <section className="animate-fade-in">
            <QuestBoard />
          </section>

          {/* Achievements & Activity Log */}
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-10">
            {/* Achievements */}
            <section className="animate-fade-in">
              <AchievementsGrid />
            </section>

            {/* Activity Log */}
            <section className="animate-fade-in">
              <ActivityLog />
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
