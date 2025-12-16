'use client';

import { useState, useEffect } from 'react';
import { Achievement } from '@/types';
import { achievementsAPI } from '@/services/api';
import { LockClosedIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function AchievementsGrid() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    try {
      const response = await achievementsAPI.getAll();
      setAchievements(response.data);
    } catch (error) {
      console.error('Error fetching achievements:', error);
    } finally {
      setLoading(false);
    }
  };

  const unlockedCount = achievements.filter((a) => a.unlocked).length;
  const totalCount = achievements.length;

  return (
    <div className="space-y-8">
      {/* Header - MUITO maior e premium */}
      <div className="glass-strong rounded-2xl p-8 relative overflow-hidden corner-decoration">
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent animate-[shine_3s_infinite]" />
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-5 tracking-wide relative z-10">🏆 Achievements</h2>
        <div className="flex items-center gap-6 relative z-10">
          <p className="text-gray-300 text-xl font-bold">
            <span className="text-[#ffd700] text-2xl glow-gold">{unlockedCount}</span>
            <span className="text-gray-500 mx-2">/</span>
            <span className="text-white">{totalCount}</span>
            <span className="text-gray-400 text-base ml-2">unlocked</span>
          </p>
          <div className="flex-1 progress-bar h-6 max-w-md relative overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffd700] transition-all duration-500 relative overflow-hidden"
              style={{ width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_infinite]" />
            </div>
          </div>
          <span className="text-[#ffd700] text-xl font-bold">
            {totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0}%
          </span>
        </div>

        {/* Decorative glow spots */}
        <div className="absolute -top-2 -right-2 w-32 h-32 bg-[#ffd700]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      </div>

      {/* Achievements Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-20 h-20 border-6 border-[#ffd700] border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-gray-400 text-lg font-semibold uppercase tracking-wider animate-pulse">Loading Achievements...</p>
        </div>
      ) : achievements.length === 0 ? (
        <div className="glass-strong rounded-2xl p-16 text-center relative overflow-hidden corner-decoration">
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent animate-[shine_3s_infinite]" />
          </div>

          <div className="text-7xl mb-6 animate-float">🎯</div>
          <p className="text-gray-300 text-2xl font-bold mb-3 relative z-10">No achievements available yet</p>
          <p className="text-gray-400 text-base relative z-10">Complete quests to unlock achievements!</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card glass rounded-2xl p-7 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                achievement.unlocked
                  ? 'border-3 border-[#ffd700] glow-gold'
                  : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-80 border-2 border-gray-600'
              }`}
            >
              {/* Shine effect para unlocked */}
              {achievement.unlocked && (
                <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
                  <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/20 to-transparent animate-[shine_3s_infinite]" />
                </div>
              )}

              {/* Icon */}
              <div className="text-6xl mb-5 relative z-10">
                {achievement.unlocked ? (
                  <div className="animate-float">{achievement.icon}</div>
                ) : (
                  <div className="relative">
                    <LockClosedIcon className="w-16 h-16 mx-auto text-gray-500" />
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-bold text-white text-lg mb-3 tracking-wide relative z-10">{achievement.name}</h3>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-4 leading-relaxed min-h-[3rem] relative z-10">{achievement.description}</p>

              {/* Status */}
              {achievement.unlocked ? (
                <div className="text-sm text-[#ffd700] font-semibold px-4 py-2 bg-[#ffd700]/10 rounded-lg border border-[#ffd700]/30 relative z-10">
                  ✨ {achievement.unlockedAt && format(new Date(achievement.unlockedAt), 'MMM d, yyyy')}
                </div>
              ) : (
                <div className="text-sm text-gray-500 font-semibold flex items-center justify-center gap-2 px-4 py-2 bg-gray-700/30 rounded-lg border border-gray-600 relative z-10">
                  <LockClosedIcon className="w-4 h-4" />
                  Locked
                </div>
              )}

              {/* Decorative glow for unlocked */}
              {achievement.unlocked && (
                <div className="absolute -bottom-2 -right-2 w-24 h-24 bg-[#ffd700]/20 rounded-full blur-2xl pointer-events-none" />
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
