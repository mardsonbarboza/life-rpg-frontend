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
  QUEST_COMPLETED: 'border-green-500 bg-green-500/10',
  QUEST_FAILED: 'border-red-500 bg-red-500/10',
  LEVEL_UP: 'border-yellow-500 bg-yellow-500/10',
  ACHIEVEMENT_UNLOCKED: 'border-purple-500 bg-purple-500/10',
  PENALTY_APPLIED: 'border-red-500 bg-red-500/10',
  STAT_INCREASED: 'border-blue-500 bg-blue-500/10',
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
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-bold text-gradient mb-2">Activity Log</h2>
        <p className="text-gray-400 text-sm">Recent activities and events</p>
      </div>

      {/* Activities List */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#00aaff] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : activities.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg">No activities yet</p>
          <p className="text-gray-500 text-sm mt-2">Complete quests to see your activity log</p>
        </div>
      ) : (
        <div className="glass rounded-xl p-6 space-y-4 max-h-[600px] overflow-y-auto">
          {activities.map((activity) => (
            <div
              key={activity.id}
              className={`flex items-start gap-4 p-4 rounded-lg border ${
                activityColors[activity.type] || 'border-gray-700 bg-gray-700/10'
              } animate-slide-in-left`}
            >
              {/* Icon */}
              <div className="text-2xl flex-shrink-0">
                {activity.icon || activityIcons[activity.type] || '📝'}
              </div>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm leading-relaxed">{activity.message}</p>
                <p className="text-gray-500 text-xs mt-1">
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
