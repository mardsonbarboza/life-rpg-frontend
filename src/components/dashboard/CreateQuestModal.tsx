'use client';

import { useState } from 'react';
import { questsAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { XMarkIcon } from '@heroicons/react/24/outline';

interface CreateQuestModalProps {
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateQuestModal({ onClose, onSuccess }: CreateQuestModalProps) {
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    difficulty: 'MEDIUM' as 'EASY' | 'MEDIUM' | 'HARD',
    type: 'POSITIVE' as 'POSITIVE' | 'NEGATIVE',
    targetProgress: 1,
    unit: 'times',
    goldReward: 50,
    xpReward: 100,
    statReward: '',
    hpPenalty: 10,
    isDaily: false,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await questsAPI.create({
        ...formData,
        targetProgress: Number(formData.targetProgress),
        goldReward: Number(formData.goldReward),
        xpReward: Number(formData.xpReward),
        hpPenalty: Number(formData.hpPenalty),
      });
      toast.success('Quest created successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create quest');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="glass-strong rounded-2xl p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto animate-slide-in-top">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-gradient">Create New Quest</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500"
              placeholder="e.g., Exercise for 30 minutes"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 resize-none"
              rows={3}
              placeholder="Optional details about the quest"
            />
          </div>

          {/* Type & Difficulty */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Type *
              </label>
              <select
                value={formData.type}
                onChange={(e) =>
                  setFormData({ ...formData, type: e.target.value as 'POSITIVE' | 'NEGATIVE' })
                }
                className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
              >
                <option value="POSITIVE">Positive (Rewards)</option>
                <option value="NEGATIVE">Negative (Penalties)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Difficulty *
              </label>
              <select
                value={formData.difficulty}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    difficulty: e.target.value as 'EASY' | 'MEDIUM' | 'HARD',
                  })
                }
                className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
              >
                <option value="EASY">Easy</option>
                <option value="MEDIUM">Medium</option>
                <option value="HARD">Hard</option>
              </select>
            </div>
          </div>

          {/* Target Progress & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Target Progress *
              </label>
              <input
                type="number"
                value={formData.targetProgress}
                onChange={(e) =>
                  setFormData({ ...formData, targetProgress: parseInt(e.target.value) || 1 })
                }
                required
                min="1"
                className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                Unit *
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
                placeholder="e.g., times, minutes, pages"
              />
            </div>
          </div>

          {/* Rewards (for Positive quests) */}
          {formData.type === 'POSITIVE' && (
            <div className="grid grid-cols-3 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Gold Reward
                </label>
                <input
                  type="number"
                  value={formData.goldReward}
                  onChange={(e) =>
                    setFormData({ ...formData, goldReward: parseInt(e.target.value) || 0 })
                  }
                  min="0"
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  XP Reward
                </label>
                <input
                  type="number"
                  value={formData.xpReward}
                  onChange={(e) =>
                    setFormData({ ...formData, xpReward: parseInt(e.target.value) || 0 })
                  }
                  min="0"
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Stat Reward
                </label>
                <input
                  type="text"
                  value={formData.statReward}
                  onChange={(e) => setFormData({ ...formData, statReward: e.target.value })}
                  className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
                  placeholder="STR:2"
                />
              </div>
            </div>
          )}

          {/* Penalty (for Negative quests) */}
          {formData.type === 'NEGATIVE' && (
            <div>
              <label className="block text-sm font-medium text-gray-300 mb-2">
                HP Penalty
              </label>
              <input
                type="number"
                value={formData.hpPenalty}
                onChange={(e) =>
                  setFormData({ ...formData, hpPenalty: parseInt(e.target.value) || 0 })
                }
                min="0"
                className="w-full px-4 py-2 bg-black/50 border border-gray-700 rounded-lg text-white"
              />
            </div>
          )}

          {/* Daily Quest */}
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              id="isDaily"
              checked={formData.isDaily}
              onChange={(e) => setFormData({ ...formData, isDaily: e.target.checked })}
              className="w-4 h-4 bg-black/50 border-gray-700 rounded"
            />
            <label htmlFor="isDaily" className="text-sm text-gray-300">
              Daily Quest (resets every day)
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-3 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 py-3 bg-gradient-to-r from-[#00aaff] to-[#00ff88] hover:from-[#00ccff] hover:to-[#00ffaa] text-white rounded-lg font-semibold transition-all disabled:opacity-50 glow-primary"
            >
              {loading ? 'Creating...' : 'Create Quest'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
