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
        <div className="relative z-10">
          <div className="w-16 h-16 border-4 border-[#00aaff] border-t-transparent rounded-full animate-spin mb-4" />
          <p className="text-gray-400 text-lg">Loading your adventure...</p>
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

      <div className="relative z-10 flex flex-col lg:flex-row gap-6 p-6">
        {/* Left Sidebar - Player HUD */}
        <aside className="w-full lg:w-80 flex-shrink-0">
          <div className="lg:sticky lg:top-6">
            <PlayerHUD user={user} />
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 space-y-8">
          {/* Welcome Header */}
          <div className="glass-strong rounded-2xl p-6 animate-slide-in-top">
            <h1 className="text-4xl font-bold text-gradient mb-2">
              Welcome back, {user.username}! 👋
            </h1>
            <p className="text-gray-400">
              Ready to continue your epic journey? Complete quests and level up!
            </p>
          </div>

          {/* Quest Board */}
          <section className="animate-fade-in">
            <QuestBoard />
          </section>

          {/* Achievements & Activity Log */}
          <div className="grid grid-cols-1 xl:grid-cols-2 gap-8">
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
