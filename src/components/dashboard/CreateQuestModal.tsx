'use client';

import { useState } from 'react';
import { questsAPI } from '@/services/api';
import toast from 'react-hot-toast';
import { 
  XMarkIcon, 
  SparklesIcon, 
  TrophyIcon,
  BoltIcon,
  FireIcon,
  CheckCircleIcon,
  ExclamationTriangleIcon
} from '@heroicons/react/24/outline';

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
      toast.success('🎉 Quest created successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'Failed to create quest');
    } finally {
      setLoading(false);
    }
  };

  const difficultyConfig = {
    EASY: { icon: '⚡', color: 'from-green-500 to-emerald-600', label: 'Easy', glow: 'glow-success' },
    MEDIUM: { icon: '🔥', color: 'from-yellow-500 to-orange-600', label: 'Medium', glow: 'glow-gold' },
    HARD: { icon: '💀', color: 'from-red-500 to-purple-600', label: 'Hard', glow: 'glow-secondary' },
  };

  const currentDifficulty = difficultyConfig[formData.difficulty];

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 z-50 animate-fade-in">
      <div className="glass-strong rounded-3xl w-full max-w-3xl max-h-[90vh] overflow-hidden animate-scale-in border-2 border-white/20 shadow-2xl">
        {/* Header Premium com gradiente */}
        <div className="relative overflow-hidden bg-gradient-to-r from-[#00aaff]/20 via-purple-500/20 to-[#ffd700]/20 border-b border-white/10">
          {/* Animated background */}
          <div className="absolute inset-0 overflow-hidden pointer-events-none">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-white/10 to-transparent animate-[shine_3s_infinite]" />
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-[#00aaff]/20 rounded-full blur-3xl animate-pulse" />
            <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-purple-500/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
          </div>

          <div className="relative z-10 p-8 flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-[#00aaff] to-purple-500 flex items-center justify-center shadow-lg shadow-[#00aaff]/50 animate-float">
                <SparklesIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-3xl font-black text-gradient tracking-tight">Create New Quest</h2>
                <p className="text-gray-400 text-sm mt-1">Design your epic adventure</p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="w-10 h-10 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 flex items-center justify-center text-gray-400 hover:text-white transition-all duration-300 hover:scale-110 hover:rotate-90"
            >
              <XMarkIcon className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Form com scroll */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6 overflow-y-auto max-h-[calc(90vh-180px)]">
          {/* Title */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2">
              <TrophyIcon className="w-4 h-4 text-[#00aaff]" />
              Quest Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
              className="w-full px-5 py-4 bg-black/40 border-2 border-gray-700 hover:border-gray-600 focus:border-[#00aaff] rounded-2xl text-white placeholder-gray-500 transition-all duration-300 font-medium"
              placeholder="e.g., Exercise for 30 minutes"
            />
          </div>

          {/* Description */}
          <div className="space-y-2">
            <label className="block text-sm font-bold text-white uppercase tracking-wider">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full px-5 py-4 bg-black/40 border-2 border-gray-700 hover:border-gray-600 focus:border-[#00aaff] rounded-2xl text-white placeholder-gray-500 resize-none transition-all duration-300 font-medium"
              rows={3}
              placeholder="Optional details about your quest..."
            />
          </div>

          {/* Type & Difficulty */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Type */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white uppercase tracking-wider">
                Quest Type *
              </label>
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'POSITIVE' })}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    formData.type === 'POSITIVE'
                      ? 'bg-gradient-to-br from-[#00aaff]/20 to-[#00ff88]/20 border-[#00aaff] shadow-lg shadow-[#00aaff]/30 scale-105'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600 hover:scale-105'
                  }`}
                >
                  <CheckCircleIcon className={`w-8 h-8 ${formData.type === 'POSITIVE' ? 'text-[#00ff88]' : 'text-gray-500'}`} />
                  <span className={`font-bold text-sm ${formData.type === 'POSITIVE' ? 'text-white' : 'text-gray-400'}`}>
                    Positive
                  </span>
                  <span className="text-xs text-gray-500">Rewards</span>
                </button>

                <button
                  type="button"
                  onClick={() => setFormData({ ...formData, type: 'NEGATIVE' })}
                  className={`p-4 rounded-2xl border-2 transition-all duration-300 flex flex-col items-center gap-2 ${
                    formData.type === 'NEGATIVE'
                      ? 'bg-gradient-to-br from-red-500/20 to-purple-500/20 border-red-500 shadow-lg shadow-red-500/30 scale-105'
                      : 'bg-black/30 border-gray-700 hover:border-gray-600 hover:scale-105'
                  }`}
                >
                  <ExclamationTriangleIcon className={`w-8 h-8 ${formData.type === 'NEGATIVE' ? 'text-red-500' : 'text-gray-500'}`} />
                  <span className={`font-bold text-sm ${formData.type === 'NEGATIVE' ? 'text-white' : 'text-gray-400'}`}>
                    Negative
                  </span>
                  <span className="text-xs text-gray-500">Penalties</span>
                </button>
              </div>
            </div>

            {/* Difficulty */}
            <div className="space-y-3">
              <label className="block text-sm font-bold text-white uppercase tracking-wider">
                Difficulty *
              </label>
              <div className="grid grid-cols-3 gap-2">
                {Object.entries(difficultyConfig).map(([key, config]) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setFormData({ ...formData, difficulty: key as 'EASY' | 'MEDIUM' | 'HARD' })}
                    className={`p-3 rounded-xl border-2 transition-all duration-300 flex flex-col items-center gap-1 ${
                      formData.difficulty === key
                        ? `bg-gradient-to-br ${config.color} bg-opacity-20 border-current ${config.glow} scale-105`
                        : 'bg-black/30 border-gray-700 hover:border-gray-600 hover:scale-105'
                    }`}
                  >
                    <span className="text-2xl">{config.icon}</span>
                    <span className={`font-bold text-xs ${formData.difficulty === key ? 'text-white' : 'text-gray-400'}`}>
                      {config.label}
                    </span>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Target Progress & Unit */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="block text-sm font-bold text-white uppercase tracking-wider">
                Target Progress *
              </label>
              <input
                type="number"
                value={formData.targetProgress}
                onChange={(e) => setFormData({ ...formData, targetProgress: parseInt(e.target.value) || 1 })}
                required
                min="1"
                className="w-full px-5 py-4 bg-black/40 border-2 border-gray-700 hover:border-gray-600 focus:border-[#00aaff] rounded-2xl text-white transition-all duration-300 font-bold text-lg"
              />
            </div>

            <div className="space-y-2">
              <label className="block text-sm font-bold text-white uppercase tracking-wider">
                Unit *
              </label>
              <input
                type="text"
                value={formData.unit}
                onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                required
                className="w-full px-5 py-4 bg-black/40 border-2 border-gray-700 hover:border-gray-600 focus:border-[#00aaff] rounded-2xl text-white placeholder-gray-500 transition-all duration-300 font-medium"
                placeholder="times, minutes, pages"
              />
            </div>
          </div>

          {/* Rewards (for Positive quests) */}
          {formData.type === 'POSITIVE' && (
            <div className="glass-card rounded-2xl p-6 space-y-4 border-2 border-[#00ff88]/30">
              <div className="flex items-center gap-2 mb-2">
                <SparklesIcon className="w-5 h-5 text-[#00ff88]" />
                <h3 className="font-black text-white uppercase tracking-wider">Rewards</h3>
              </div>
              
              <div className="grid grid-cols-3 gap-4">
                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                    💰 Gold
                  </label>
                  <input
                    type="number"
                    value={formData.goldReward}
                    onChange={(e) => setFormData({ ...formData, goldReward: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-3 bg-black/40 border-2 border-[#ffd700]/30 hover:border-[#ffd700]/50 focus:border-[#ffd700] rounded-xl text-white font-bold transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                    ⚡ XP
                  </label>
                  <input
                    type="number"
                    value={formData.xpReward}
                    onChange={(e) => setFormData({ ...formData, xpReward: parseInt(e.target.value) || 0 })}
                    min="0"
                    className="w-full px-4 py-3 bg-black/40 border-2 border-[#00aaff]/30 hover:border-[#00aaff]/50 focus:border-[#00aaff] rounded-xl text-white font-bold transition-all duration-300"
                  />
                </div>

                <div className="space-y-2">
                  <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                    💪 Stat
                  </label>
                  <input
                    type="text"
                    value={formData.statReward}
                    onChange={(e) => setFormData({ ...formData, statReward: e.target.value })}
                    className="w-full px-4 py-3 bg-black/40 border-2 border-purple-500/30 hover:border-purple-500/50 focus:border-purple-500 rounded-xl text-white placeholder-gray-500 font-bold transition-all duration-300"
                    placeholder="STR:2"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Penalty (for Negative quests) */}
          {formData.type === 'NEGATIVE' && (
            <div className="glass-card rounded-2xl p-6 space-y-4 border-2 border-red-500/30">
              <div className="flex items-center gap-2 mb-2">
                <ExclamationTriangleIcon className="w-5 h-5 text-red-500" />
                <h3 className="font-black text-white uppercase tracking-wider">Penalty</h3>
              </div>
              
              <div className="space-y-2">
                <label className="block text-xs font-bold text-gray-300 uppercase tracking-wider">
                  ❤️ HP Loss
                </label>
                <input
                  type="number"
                  value={formData.hpPenalty}
                  onChange={(e) => setFormData({ ...formData, hpPenalty: parseInt(e.target.value) || 0 })}
                  min="0"
                  className="w-full px-5 py-4 bg-black/40 border-2 border-red-500/30 hover:border-red-500/50 focus:border-red-500 rounded-xl text-white font-bold text-lg transition-all duration-300"
                />
              </div>
            </div>
          )}

          {/* Daily Quest Toggle */}
          <div className="glass-card rounded-2xl p-5 border-2 border-gray-700">
            <label htmlFor="isDaily" className="flex items-center gap-4 cursor-pointer group">
              <div className="relative">
                <input
                  type="checkbox"
                  id="isDaily"
                  checked={formData.isDaily}
                  onChange={(e) => setFormData({ ...formData, isDaily: e.target.checked })}
                  className="sr-only peer"
                />
                <div className="w-14 h-8 bg-black/40 rounded-full border-2 border-gray-700 peer-checked:border-[#00aaff] transition-all duration-300 peer-checked:bg-gradient-to-r peer-checked:from-[#00aaff] peer-checked:to-purple-500"></div>
                <div className="absolute top-1 left-1 w-6 h-6 bg-gray-600 rounded-full transition-all duration-300 peer-checked:translate-x-6 peer-checked:bg-white"></div>
              </div>
              <div className="flex-1">
                <p className="font-bold text-white group-hover:text-[#00aaff] transition-colors">Daily Quest</p>
                <p className="text-xs text-gray-400">Resets automatically every day at midnight</p>
              </div>
              <span className="text-2xl">{formData.isDaily ? '🔄' : '📅'}</span>
            </label>
          </div>
        </form>

        {/* Footer Buttons */}
        <div className="p-8 pt-6 border-t border-white/10 bg-black/20">
          <div className="flex gap-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-4 bg-black/40 hover:bg-black/60 border-2 border-gray-700 hover:border-gray-600 text-white rounded-2xl font-bold transition-all duration-300 hover:scale-105 uppercase tracking-wider"
            >
              Cancel
            </button>
            <button
              type="submit"
              onClick={handleSubmit}
              disabled={loading}
              className="flex-1 py-4 bg-gradient-to-r from-[#00aaff] to-purple-500 hover:from-[#00ccff] hover:to-purple-400 text-white rounded-2xl font-black transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-[#00aaff]/30 hover:shadow-[#00aaff]/50 hover:scale-105 uppercase tracking-wider flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="w-5 h-5 border-3 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating...
                </>
              ) : (
                <>
                  <BoltIcon className="w-6 h-6" />
                  Create Quest
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}