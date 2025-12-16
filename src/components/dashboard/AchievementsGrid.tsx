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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Achievements</h2>
        <div className="flex items-center gap-4">
          <p className="text-gray-400 text-sm">
            {unlockedCount} / {totalCount} unlocked
          </p>
          <div className="flex-1 progress-bar h-2 max-w-xs">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] transition-all duration-500"
              style={{ width: `${totalCount > 0 ? (unlockedCount / totalCount) * 100 : 0}%` }}
            />
          </div>
        </div>
      </div>

      {/* Achievements Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#00aaff] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : achievements.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No achievements available yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {achievements.map((achievement) => (
            <div
              key={achievement.id}
              className={`card glass rounded-xl p-5 text-center ${
                achievement.unlocked
                  ? 'border-2 border-[#ffd700] glow-gold'
                  : 'opacity-60 grayscale'
              }`}
            >
              {/* Icon */}
              <div className="text-5xl mb-3">
                {achievement.unlocked ? achievement.icon : <LockClosedIcon className="w-12 h-12 mx-auto text-gray-500" />}
              </div>

              {/* Name */}
              <h3 className="font-bold text-white mb-2">{achievement.name}</h3>

              {/* Description */}
              <p className="text-xs text-gray-400 mb-3">{achievement.description}</p>

              {/* Status */}
              {achievement.unlocked ? (
                <div className="text-xs text-[#ffd700]">
                  ✨ Unlocked {achievement.unlockedAt && format(new Date(achievement.unlockedAt), 'MMM d, yyyy')}
                </div>
              ) : (
                <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                  <LockClosedIcon className="w-3 h-3" />
                  Locked
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
