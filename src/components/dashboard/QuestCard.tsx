'use client';

import { Quest } from '@/types';
import { CheckCircleIcon, TrashIcon, ExclamationTriangleIcon } from '@heroicons/react/24/outline';
import { questsAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { useState } from 'react';

interface QuestCardProps {
  quest: Quest;
  onUpdate: () => void;
}

const difficultyColors: Record<string, string> = {
  EASY: 'border-green-500 bg-green-500/10',
  MEDIUM: 'border-yellow-500 bg-yellow-500/10',
  HARD: 'border-red-500 bg-red-500/10',
};

const statusColors: Record<string, string> = {
  AVAILABLE: 'border-gray-500',
  IN_PROGRESS: 'border-blue-500',
  COMPLETED: 'border-green-500',
  FAILED: 'border-red-500',
};

const typeIcons: Record<string, string> = {
  POSITIVE: '⭐',
  NEGATIVE: '⚠️',
};

export default function QuestCard({ quest, onUpdate }: QuestCardProps) {
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(quest.currentProgress);

  const progressPercentage = (progress / quest.targetProgress) * 100;
  const canComplete = progress >= quest.targetProgress && quest.status !== 'COMPLETED';

  const handleUpdateProgress = async (newProgress: number) => {
    if (newProgress < 0 || newProgress > quest.targetProgress) return;

    setProgress(newProgress);

    try {
      await questsAPI.updateProgress(quest.id, newProgress);
      onUpdate();
    } catch (error) {
      console.error('Error updating progress:', error);
      toast.error('Failed to update progress');
      setProgress(quest.currentProgress);
    }
  };

  const handleComplete = async () => {
    setLoading(true);
    try {
      await questsAPI.complete(quest.id);
      toast.success(
        `Quest completed! +${quest.xpReward} XP, +${quest.goldReward} Gold`,
        { duration: 5000, icon: '🎉' }
      );
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to complete quest');
    } finally {
      setLoading(false);
    }
  };

  const handlePenalty = async () => {
    if (!confirm('Apply penalty? This will decrease your HP/stats!')) return;

    setLoading(true);
    try {
      await questsAPI.applyPenalty(quest.id);
      toast.error(`Penalty applied! -${quest.hpPenalty} HP`, { icon: '💔' });
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to apply penalty');
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Delete this quest?')) return;

    setLoading(true);
    try {
      await questsAPI.delete(quest.id);
      toast.success('Quest deleted');
      onUpdate();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to delete quest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className={`card glass rounded-xl p-5 border-2 ${statusColors[quest.status]} ${
        quest.status === 'COMPLETED' ? 'opacity-60' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <span className="text-xl">{typeIcons[quest.type]}</span>
            <h3 className="text-lg font-bold text-white">{quest.title}</h3>
          </div>
          {quest.description && (
            <p className="text-sm text-gray-400 mb-2">{quest.description}</p>
          )}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Difficulty Badge */}
            <span
              className={`text-xs px-2 py-1 rounded-full border ${
                difficultyColors[quest.difficulty]
              } font-semibold`}
            >
              {quest.difficulty}
            </span>

            {/* Daily Badge */}
            {quest.isDaily && (
              <span className="text-xs px-2 py-1 rounded-full border border-orange-500 bg-orange-500/10 font-semibold text-orange-300">
                DAILY
              </span>
            )}

            {/* Status Badge */}
            <span className="text-xs text-gray-400">{quest.status.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-gray-400 hover:text-red-400 transition-colors p-1"
          title="Delete quest"
        >
          <TrashIcon className="w-5 h-5" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-4">
        <div className="flex justify-between text-xs mb-1">
          <span className="text-gray-400">Progress</span>
          <span className="text-white font-semibold">
            {progress} / {quest.targetProgress} {quest.unit}
          </span>
        </div>
        <div className="progress-bar h-2">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00aaff] to-[#00ff88] transition-all duration-300"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          />
        </div>

        {/* Progress Controls */}
        {quest.status !== 'COMPLETED' && quest.status !== 'FAILED' && (
          <div className="flex items-center gap-2 mt-2">
            <button
              onClick={() => handleUpdateProgress(progress - 1)}
              disabled={progress <= 0}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-semibold"
            >
              -
            </button>
            <input
              type="number"
              value={progress}
              onChange={(e) => {
                const val = parseInt(e.target.value) || 0;
                handleUpdateProgress(val);
              }}
              className="flex-1 px-2 py-1 bg-black/50 border border-gray-700 rounded text-center text-sm"
              min="0"
              max={quest.targetProgress}
            />
            <button
              onClick={() => handleUpdateProgress(progress + 1)}
              disabled={progress >= quest.targetProgress}
              className="px-3 py-1 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded text-sm font-semibold"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Rewards */}
      <div className="flex items-center gap-3 mb-4 text-sm">
        <div className="flex items-center gap-1">
          <span className="text-[#ffd700]">💰</span>
          <span className="text-gray-300">{quest.goldReward}</span>
        </div>
        <div className="flex items-center gap-1">
          <span className="text-[#00aaff]">⭐</span>
          <span className="text-gray-300">{quest.xpReward} XP</span>
        </div>
        {quest.statReward && (
          <div className="flex items-center gap-1">
            <span className="text-[#ff3333]">💪</span>
            <span className="text-gray-300">{quest.statReward}</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-2">
        {canComplete && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="flex-1 py-2 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <CheckCircleIcon className="w-5 h-5" />
            Complete
          </button>
        )}

        {quest.type === 'NEGATIVE' && quest.status !== 'FAILED' && quest.status !== 'COMPLETED' && (
          <button
            onClick={handlePenalty}
            disabled={loading}
            className="flex-1 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-lg font-semibold flex items-center justify-center gap-2 disabled:opacity-50"
          >
            <ExclamationTriangleIcon className="w-5 h-5" />
            Apply Penalty
          </button>
        )}
      </div>
    </div>
  );
}
