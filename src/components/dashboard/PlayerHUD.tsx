'use client';

import { User } from '@/types';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';

interface PlayerHUDProps {
  user: User;
}

const rankColors: Record<string, string> = {
  E_RANK: 'text-gray-400 border-gray-500',
  D_RANK: 'text-green-400 border-green-500',
  C_RANK: 'text-blue-400 border-blue-500',
  B_RANK: 'text-purple-400 border-purple-500',
  A_RANK: 'text-yellow-400 border-yellow-500',
  S_RANK: 'text-red-400 border-red-500',
};

const rankNames: Record<string, string> = {
  E_RANK: 'E',
  D_RANK: 'D',
  C_RANK: 'C',
  B_RANK: 'B',
  A_RANK: 'A',
  S_RANK: 'S',
};

export default function PlayerHUD({ user }: PlayerHUDProps) {
  const { logout } = useAuth();

  const hpPercentage = (user.currentHp / user.maxHp) * 100;
  const mpPercentage = (user.currentMp / user.maxMp) * 100;
  const xpPercentage = (user.currentXp / user.xpToNextLevel) * 100;

  return (
    <div className="glass-strong rounded-2xl p-6 space-y-6 animate-slide-in-left">
      {/* Header com Avatar e Info */}
      <div className="text-center">
        {/* Avatar */}
        <div className="w-24 h-24 mx-auto mb-4 rounded-full bg-gradient-to-br from-[#00aaff] to-[#0088cc] flex items-center justify-center text-4xl font-bold glow-primary">
          {user.username.charAt(0).toUpperCase()}
        </div>

        {/* Username */}
        <h2 className="text-2xl font-bold text-white mb-1">{user.username}</h2>

        {/* Title */}
        <p className="text-gray-400 text-sm mb-2">{user.title}</p>

        {/* Rank Badge */}
        <div className="flex items-center justify-center gap-2">
          <span
            className={`inline-block px-3 py-1 rounded-full text-xs font-bold border-2 ${
              rankColors[user.rank]
            }`}
          >
            RANK {rankNames[user.rank]}
          </span>
          <span className="text-[#ffd700] font-bold text-lg">LV {user.level}</span>
        </div>
      </div>

      {/* Stats Bars */}
      <div className="space-y-4">
        {/* HP Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#ff3333] font-semibold">HP</span>
            <span className="text-gray-400">
              {user.currentHp} / {user.maxHp}
            </span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff3333] to-[#ff6666] transition-all duration-300"
              style={{ width: `${hpPercentage}%` }}
            />
          </div>
        </div>

        {/* MP Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#00aaff] font-semibold">MP</span>
            <span className="text-gray-400">
              {user.currentMp} / {user.maxMp}
            </span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00aaff] to-[#00ccff] transition-all duration-300"
              style={{ width: `${mpPercentage}%` }}
            />
          </div>
        </div>

        {/* XP Bar */}
        <div>
          <div className="flex justify-between text-xs mb-1">
            <span className="text-[#ffd700] font-semibold">XP</span>
            <span className="text-gray-400">
              {user.currentXp} / {user.xpToNextLevel}
            </span>
          </div>
          <div className="progress-bar h-3">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffd700] to-[#ffed4e] transition-all duration-300"
              style={{ width: `${xpPercentage}%` }}
            />
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      {user.stats && (
        <div className="grid grid-cols-2 gap-3">
          {/* STR */}
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[#ff3333] text-xs font-semibold mb-1">STR</div>
            <div className="text-white text-2xl font-bold">{user.stats.strength}</div>
          </div>

          {/* AGI */}
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[#00ff88] text-xs font-semibold mb-1">AGI</div>
            <div className="text-white text-2xl font-bold">{user.stats.agility}</div>
          </div>

          {/* INT */}
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[#00aaff] text-xs font-semibold mb-1">INT</div>
            <div className="text-white text-2xl font-bold">{user.stats.intelligence}</div>
          </div>

          {/* VIT */}
          <div className="glass rounded-lg p-3 text-center">
            <div className="text-[#ffd700] text-xs font-semibold mb-1">VIT</div>
            <div className="text-white text-2xl font-bold">{user.stats.vitality}</div>
          </div>
        </div>
      )}

      {/* Available Points */}
      {user.stats && user.stats.availablePoints > 0 && (
        <div className="glass rounded-lg p-3 text-center glow-gold">
          <p className="text-xs text-gray-400 mb-1">Available Points</p>
          <p className="text-2xl font-bold text-[#ffd700]">{user.stats.availablePoints}</p>
        </div>
      )}

      {/* Gold & Streak */}
      <div className="grid grid-cols-2 gap-3">
        <div className="glass rounded-lg p-3 text-center">
          <div className="text-[#ffd700] text-xs font-semibold mb-1">Gold</div>
          <div className="text-white text-lg font-bold">{user.gold}</div>
        </div>

        <div className="glass rounded-lg p-3 text-center">
          <div className="text-[#ff6600] text-xs font-semibold mb-1">Streak</div>
          <div className="text-white text-lg font-bold">{user.streakDays} days</div>
        </div>
      </div>

      {/* Logout Button */}
      <button
        onClick={logout}
        className="w-full py-3 bg-red-500/20 hover:bg-red-500/30 border border-red-500 text-red-300 rounded-lg font-semibold transition-all flex items-center justify-center gap-2"
      >
        <ArrowRightOnRectangleIcon className="w-5 h-5" />
        Logout
      </button>
    </div>
  );
}
