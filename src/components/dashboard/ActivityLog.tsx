'use client';

import { useState, useEffect } from 'react';
import { ActivityLog as ActivityLogType } from '@/types';
import { activityLogAPI } from '@/services/api';
import { formatDistanceToNow } from 'date-fns';

const activityIcons: Record<string, string> = {
  QUEST_COMPLETED: '✅',
  QUEST_FAILED: '❌',
  LEVEL_UP: '⬆️',
  ACHIEVEMENT_UNLOCKED: '🏆',
  PENALTY_APPLIED: '💔',
  STAT_INCREASED: '💪',
};

const activityColors: Record<string, string> = {
  QUEST_COMPLETED: 'border-green-500 bg-green-500/20 hover:bg-green-500/30',
  QUEST_FAILED: 'border-red-500 bg-red-500/20 hover:bg-red-500/30',
  LEVEL_UP: 'border-yellow-500 bg-yellow-500/20 hover:bg-yellow-500/30 glow-gold',
  ACHIEVEMENT_UNLOCKED: 'border-purple-500 bg-purple-500/20 hover:bg-purple-500/30',
  PENALTY_APPLIED: 'border-red-500 bg-red-500/20 hover:bg-red-500/30',
  STAT_INCREASED: 'border-blue-500 bg-blue-500/20 hover:bg-blue-500/30 glow-primary',
};

export default function ActivityLog() {
  const [activities, setActivities] = useState<ActivityLogType[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const response = await activityLogAPI.getAll(20);
      setActivities(response.data);
    } catch (error) {
      console.error('Error fetching activities:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      {/* Header - MUITO maior e premium */}
      <div className="glass-strong rounded-2xl p-8 relative overflow-hidden corner-decoration">
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
        </div>

        <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-3 tracking-wide relative z-10">📝 Activity Log</h2>
        <p className="text-gray-300 text-base font-semibold relative z-10">Recent activities and events</p>

        {/* Decorative glow spots */}
        <div className="absolute -top-2 -right-2 w-32 h-32 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      </div>

      {/* Activities List */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-20 h-20 border-6 border-[#00d9ff] border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-gray-400 text-lg font-semibold uppercase tracking-wider animate-pulse">Loading Activities...</p>
        </div>
      ) : activities.length === 0 ? (
        <div className="glass-strong rounded-2xl p-16 text-center relative overflow-hidden corner-decoration">
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
          </div>

          <div className="text-7xl mb-6 animate-float">📊</div>
          <p className="text-gray-300 text-2xl font-bold mb-3 relative z-10">No activities yet</p>
          <p className="text-gray-400 text-base relative z-10">Complete quests to see your activity log</p>
        </div>
      ) : (
        <div className="glass-strong rounded-2xl p-8 space-y-5 max-h-[700px] overflow-y-auto relative">
          {activities.map((activity, index) => (
            <div
              key={activity.id}
              className={`flex items-start gap-5 p-6 rounded-xl border-2 ${
                activityColors[activity.type] || 'border-gray-700 bg-gray-700/20 hover:bg-gray-700/30'
              } animate-slide-in-left transition-all duration-300 hover:scale-[1.02] relative overflow-hidden`}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              {/* Subtle shine effect */}
              <div className="absolute inset-0 overflow-hidden rounded-xl pointer-events-none">
                <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shine_4s_infinite]" />
              </div>

              {/* Icon - MUITO maior */}
              <div className="text-4xl flex-shrink-0 relative z-10">
                {activity.icon || activityIcons[activity.type] || '📝'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0 relative z-10">
                <p className="text-white text-base leading-relaxed font-medium">{activity.message}</p>
                <p className="text-gray-400 text-sm mt-2 font-semibold">
                  {formatDistanceToNow(new Date(activity.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
