'use client';

import { useState, useEffect } from 'react';
import { Achievement } from '@/types';
import { achievementsAPI } from '@/services/api';
import { LockClosedIcon, TrophyIcon, SparklesIcon } from '@heroicons/react/24/outline';
import { format } from 'date-fns';

export default function AchievementsGrid() {
  const [achievements, setAchievements] = useState<Achievement[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'all' | 'unlocked' | 'locked'>('all');

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
  const completionPercentage = totalCount > 0 ? Math.round((unlockedCount / totalCount) * 100) : 0;

  const filteredAchievements = achievements.filter((achievement) => {
    if (filter === 'unlocked') return achievement.unlocked;
    if (filter === 'locked') return !achievement.unlocked;
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header Premium */}
      <div className="glass-strong rounded-3xl p-10 relative overflow-hidden corner-decoration border-2 border-white/10">
        {/* Background Effects */}
        <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
          {/* Animated shine */}
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/15 to-transparent animate-[shine_4s_infinite]" />
          {/* Radial glow */}
          <div className="absolute -top-20 -right-20 w-64 h-64 bg-[#ffd700]/20 rounded-full blur-3xl animate-pulse" />
          <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
        </div>

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#ffd700] to-[#ff8c00] flex items-center justify-center shadow-2xl shadow-[#ffd700]/30 animate-float">
              <TrophyIcon className="w-9 h-9 text-white" />
            </div>
            <div>
              <h2 className="text-5xl lg:text-6xl font-black text-gradient tracking-tight">
                Achievements
              </h2>
              <p className="text-gray-400 text-sm mt-1 flex items-center gap-2">
                <SparklesIcon className="w-4 h-4 text-[#ffd700]" />
                Track your legendary milestones
              </p>
            </div>
          </div>

          {/* Stats Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
            {/* Total Progress */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Total Progress</p>
              <div className="flex items-baseline gap-2">
                <span className="text-4xl font-black text-[#ffd700] glow-gold">{unlockedCount}</span>
                <span className="text-2xl text-gray-500 font-bold">/</span>
                <span className="text-3xl font-bold text-white">{totalCount}</span>
              </div>
            </div>

            {/* Completion Rate */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Completion Rate</p>
              <div className="flex items-center gap-3">
                <div className="text-4xl font-black text-gradient">{completionPercentage}%</div>
                {completionPercentage === 100 && (
                  <div className="text-2xl animate-bounce">🎉</div>
                )}
              </div>
            </div>

            {/* Locked Remaining */}
            <div className="bg-white/5 backdrop-blur-sm rounded-2xl p-5 border border-white/10">
              <p className="text-gray-400 text-sm font-medium mb-2">Remaining</p>
              <div className="flex items-center gap-2">
                <LockClosedIcon className="w-6 h-6 text-gray-500" />
                <span className="text-4xl font-black text-gray-300">{totalCount - unlockedCount}</span>
              </div>
            </div>
          </div>

          {/* Progress Bar Enhanced */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-sm">
              <span className="text-gray-400 font-medium">Overall Achievement Progress</span>
              <span className="text-[#ffd700] font-bold">{completionPercentage}% Complete</span>
            </div>
            <div className="progress-bar h-8 relative overflow-hidden shadow-inner">
              <div
                className="h-full rounded-full bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ff8c00] transition-all duration-700 ease-out relative overflow-hidden shadow-lg shadow-[#ffd700]/50"
                style={{ width: `${completionPercentage}%` }}
              >
                {/* Animated shine on progress */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent animate-[shine_2s_infinite]" />
                {/* Pulse effect */}
                <div className="absolute inset-0 bg-white/20 animate-pulse" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 items-center justify-between">
        <div className="flex gap-2">
          <button
            onClick={() => setFilter('all')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
              filter === 'all'
                ? 'bg-gradient-to-r from-[#ffd700] to-[#ff8c00] text-gray-900 shadow-lg shadow-[#ffd700]/30 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            All ({totalCount})
          </button>
          <button
            onClick={() => setFilter('unlocked')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              filter === 'unlocked'
                ? 'bg-gradient-to-r from-[#ffd700] to-[#ff8c00] text-gray-900 shadow-lg shadow-[#ffd700]/30 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            <SparklesIcon className="w-5 h-5" />
            Unlocked ({unlockedCount})
          </button>
          <button
            onClick={() => setFilter('locked')}
            className={`px-6 py-3 rounded-xl font-semibold transition-all duration-300 flex items-center gap-2 ${
              filter === 'locked'
                ? 'bg-gradient-to-r from-[#ffd700] to-[#ff8c00] text-gray-900 shadow-lg shadow-[#ffd700]/30 scale-105'
                : 'bg-white/5 text-gray-400 hover:bg-white/10 border border-white/10'
            }`}
          >
            <LockClosedIcon className="w-5 h-5" />
            Locked ({totalCount - unlockedCount})
          </button>
        </div>
      </div>

      {/* Achievements Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-40 glass-strong rounded-3xl">
          <div className="relative">
            <div className="w-24 h-24 border-8 border-[#ffd700]/20 border-t-[#ffd700] rounded-full animate-spin" />
            <TrophyIcon className="w-10 h-10 text-[#ffd700] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
          <p className="text-gray-400 text-xl font-bold uppercase tracking-widest animate-pulse mt-8">
            Loading Achievements...
          </p>
          <div className="flex gap-1 mt-4">
            <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '0s' }} />
            <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            <div className="w-2 h-2 bg-[#ffd700] rounded-full animate-bounce" style={{ animationDelay: '0.4s' }} />
          </div>
        </div>
      ) : filteredAchievements.length === 0 ? (
        <div className="glass-strong rounded-3xl p-20 text-center relative overflow-hidden border-2 border-dashed border-gray-600">
          <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/10 to-transparent animate-[shine_3s_infinite]" />
          </div>
          <div className="text-8xl mb-8 animate-float">
            {filter === 'unlocked' ? '🔒' : filter === 'locked' ? '✨' : '🎯'}
          </div>
          <p className="text-gray-300 text-3xl font-bold mb-4 relative z-10">
            {filter === 'unlocked' && 'No achievements unlocked yet'}
            {filter === 'locked' && 'All achievements unlocked! 🎉'}
            {filter === 'all' && 'No achievements available yet'}
          </p>
          <p className="text-gray-400 text-lg relative z-10">
            {filter === 'unlocked' && 'Complete quests to unlock your first achievement!'}
            {filter === 'locked' && "You're a legend! You've completed everything!"}
            {filter === 'all' && 'Complete quests to unlock achievements!'}
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-6">
          {filteredAchievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`group card glass rounded-3xl p-8 text-center hover:scale-105 transition-all duration-300 relative overflow-hidden ${
                achievement.unlocked
                  ? 'border-3 border-[#ffd700] shadow-2xl shadow-[#ffd700]/30 glow-gold-strong'
                  : 'opacity-60 grayscale hover:grayscale-0 hover:opacity-90 border-2 border-gray-600/50 hover:border-gray-500'
              }`}
            >
              {/* Background Effects */}
              <div className="absolute inset-0 overflow-hidden rounded-3xl pointer-events-none">
                {achievement.unlocked && (
                  <>
                    {/* Shine effect */}
                    <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#ffd700]/25 to-transparent animate-[shine_4s_infinite]" />
                    {/* Radial glow */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#ffd700]/30 rounded-full blur-3xl" />
                    {/* Particle effect */}
                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full">
                      <div className="absolute top-0 left-1/4 w-1 h-1 bg-[#ffd700] rounded-full animate-ping" style={{ animationDelay: '0s' }} />
                      <div className="absolute top-1/4 right-1/4 w-1 h-1 bg-[#ffd700] rounded-full animate-ping" style={{ animationDelay: '1s' }} />
                      <div className="absolute bottom-1/4 left-1/3 w-1 h-1 bg-[#ffd700] rounded-full animate-ping" style={{ animationDelay: '2s' }} />
                    </div>
                  </>
                )}
              </div>

              {/* Icon */}
              <div className="relative z-10 mb-6">
                {achievement.unlocked ? (
                  <div className="relative inline-block">
                    <div className="text-7xl animate-float filter drop-shadow-2xl">
                      {achievement.icon}
                    </div>
                    {/* Glow ring */}
                    <div className="absolute inset-0 bg-[#ffd700]/20 rounded-full blur-xl scale-150" />
                  </div>
                ) : (
                  <div className="relative inline-block">
                    <div className="w-20 h-20 rounded-2xl bg-gray-800/50 flex items-center justify-center border-2 border-gray-600 group-hover:border-gray-500 transition-colors">
                      <LockClosedIcon className="w-10 h-10 text-gray-500 group-hover:text-gray-400 transition-colors" />
                    </div>
                  </div>
                )}
              </div>

              {/* Name */}
              <h3 className="font-black text-white text-xl mb-3 tracking-tight relative z-10 leading-tight">
                {achievement.name}
              </h3>

              {/* Description */}
              <p className="text-sm text-gray-300 mb-5 leading-relaxed min-h-[3.5rem] relative z-10 font-medium">
                {achievement.description}
              </p>

              {/* Status Badge */}
              {achievement.unlocked ? (
                <div className="relative z-10">
                  <div className="bg-gradient-to-r from-[#ffd700] to-[#ff8c00] text-gray-900 font-bold px-5 py-3 rounded-xl shadow-lg shadow-[#ffd700]/30 flex items-center justify-center gap-2">
                    <SparklesIcon className="w-5 h-5" />
                    <span className="text-sm">
                      {achievement.unlockedAt && format(new Date(achievement.unlockedAt), 'MMM d, yyyy')}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="relative z-10">
                  <div className="bg-gray-800/50 text-gray-500 font-semibold px-5 py-3 rounded-xl border-2 border-gray-600 group-hover:border-gray-500 flex items-center justify-center gap-2 transition-colors">
                    <LockClosedIcon className="w-4 h-4" />
                    <span className="text-sm">Locked</span>
                  </div>
                </div>
              )}

              {/* Achievement Ribbon (for unlocked) */}
              {achievement.unlocked && (
                <div className="absolute -top-3 -right-3 w-12 h-12 bg-gradient-to-br from-[#ffd700] to-[#ff8c00] rounded-full flex items-center justify-center shadow-xl shadow-[#ffd700]/50 z-20 animate-pulse">
                  <TrophyIcon className="w-6 h-6 text-white" />
                </div>
              )}

              {/* Decorative corner accent (for unlocked) */}
              {achievement.unlocked && (
                <>
                  <div className="absolute top-0 left-0 w-20 h-20 border-l-4 border-t-4 border-[#ffd700] rounded-tl-3xl opacity-50" />
                  <div className="absolute bottom-0 right-0 w-20 h-20 border-r-4 border-b-4 border-[#ffd700] rounded-br-3xl opacity-50" />
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}