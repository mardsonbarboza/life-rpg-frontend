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
  EASY: 'border-green-500 bg-green-500/20 text-green-300',
  MEDIUM: 'border-yellow-500 bg-yellow-500/20 text-yellow-300',
  HARD: 'border-red-500 bg-red-500/20 text-red-300',
};

const statusColors: Record<string, string> = {
  AVAILABLE: 'border-gray-500 bg-gray-500/5',
  IN_PROGRESS: 'border-blue-500 bg-blue-500/10 glow-primary',
  COMPLETED: 'border-green-500 bg-green-500/10 glow-secondary',
  FAILED: 'border-red-500 bg-red-500/10',
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
      className={`card glass rounded-2xl p-7 border-3 ${statusColors[quest.status]} ${
        quest.status === 'COMPLETED' ? 'opacity-60' : ''
      } hover:scale-[1.02] transition-all duration-300 relative overflow-hidden group`}
    >
      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shine_4s_infinite]" />
      </div>

      {/* Header */}
      <div className="flex items-start justify-between mb-5 relative z-10">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-3xl">{typeIcons[quest.type]}</span>
            <h3 className="text-xl font-bold text-white tracking-wide">{quest.title}</h3>
          </div>
          {quest.description && (
            <p className="text-sm text-gray-300 mb-4 leading-relaxed">{quest.description}</p>
          )}
          <div className="flex items-center gap-3 flex-wrap">
            {/* Difficulty Badge */}
            <span
              className={`text-xs px-4 py-2 rounded-full border-2 ${
                difficultyColors[quest.difficulty]
              } font-bold uppercase tracking-wider`}
            >
              {quest.difficulty}
            </span>

            {/* Daily Badge */}
            {quest.isDaily && (
              <span className="text-xs px-4 py-2 rounded-full border-2 border-orange-500 bg-orange-500/20 font-bold text-orange-300 uppercase tracking-wider animate-pulse">
                🔥 DAILY
              </span>
            )}

            {/* Status Badge */}
            <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider">{quest.status.replace('_', ' ')}</span>
          </div>
        </div>

        {/* Delete Button */}
        <button
          onClick={handleDelete}
          disabled={loading}
          className="text-gray-400 hover:text-red-400 transition-all p-2 hover:scale-110 hover:bg-red-500/10 rounded-lg"
          title="Delete quest"
        >
          <TrashIcon className="w-6 h-6" />
        </button>
      </div>

      {/* Progress Bar */}
      <div className="mb-6 relative z-10">
        <div className="flex justify-between text-sm mb-3">
          <span className="text-gray-400 font-bold uppercase tracking-wider">Progress</span>
          <span className="text-white font-bold text-base">
            {progress} / {quest.targetProgress} {quest.unit}
          </span>
        </div>
        <div className="progress-bar h-6 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#00aaff] via-[#00ccff] to-[#00ff88] transition-all duration-500 relative overflow-hidden"
            style={{ width: `${Math.min(progressPercentage, 100)}%` }}
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-[shine_2s_infinite]" />
          </div>
        </div>

        {/* Progress Controls */}
        {quest.status !== 'COMPLETED' && quest.status !== 'FAILED' && (
          <div className="flex items-center gap-3 mt-4">
            <button
              onClick={() => handleUpdateProgress(progress - 1)}
              disabled={progress <= 0}
              className="px-5 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-base font-bold transition-all hover:scale-105"
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
              className="flex-1 px-4 py-3 bg-black/50 border-2 border-gray-700 rounded-lg text-center text-base font-bold hover:border-[#00d9ff] transition-colors"
              min="0"
              max={quest.targetProgress}
            />
            <button
              onClick={() => handleUpdateProgress(progress + 1)}
              disabled={progress >= quest.targetProgress}
              className="px-5 py-3 bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg text-base font-bold transition-all hover:scale-105"
            >
              +
            </button>
          </div>
        )}
      </div>

      {/* Rewards - MUITO maiores */}
      <div className="flex items-center gap-5 mb-6 text-base relative z-10">
        <div className="flex items-center gap-2 px-4 py-2 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-lg hover:scale-105 transition-transform">
          <span className="text-2xl">💰</span>
          <span className="text-[#ffd700] font-bold">{quest.goldReward}</span>
        </div>
        <div className="flex items-center gap-2 px-4 py-2 bg-[#00d9ff]/10 border border-[#00d9ff]/30 rounded-lg hover:scale-105 transition-transform">
          <span className="text-2xl">⚡</span>
          <span className="text-[#00d9ff] font-bold">{quest.xpReward} XP</span>
        </div>
        {quest.statReward && (
          <div className="flex items-center gap-2 px-4 py-2 bg-[#ff3333]/10 border border-[#ff3333]/30 rounded-lg hover:scale-105 transition-transform">
            <span className="text-2xl">💪</span>
            <span className="text-[#ff3333] font-bold">{quest.statReward}</span>
          </div>
        )}
      </div>

      {/* Actions - MUITO maiores com ripple effect */}
      <div className="flex gap-4 relative z-10">
        {canComplete && (
          <button
            onClick={handleComplete}
            disabled={loading}
            className="flex-1 py-4 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white rounded-xl font-bold text-base uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <CheckCircleIcon className="w-6 h-6" />
              Complete
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
          </button>
        )}

        {quest.type === 'NEGATIVE' && quest.status !== 'FAILED' && quest.status !== 'COMPLETED' && (
          <button
            onClick={handlePenalty}
            disabled={loading}
            className="flex-1 py-4 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white rounded-xl font-bold text-base uppercase tracking-wider flex items-center justify-center gap-3 disabled:opacity-50 transition-all hover:scale-105 relative overflow-hidden group"
          >
            <span className="relative z-10 flex items-center gap-3">
              <ExclamationTriangleIcon className="w-6 h-6" />
              Apply Penalty
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
          </button>
        )}
      </div>
    </div>
  );
}
