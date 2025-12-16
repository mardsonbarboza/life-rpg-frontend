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
    <div className="glass-strong rounded-2xl p-8 lg:p-10 space-y-8 animate-slide-in-left corner-decoration relative overflow-hidden">
      {/* Shine effect */}
      <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
        <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
      </div>

      {/* Header com Avatar e Info */}
      <div className="text-center relative z-10">
        {/* Avatar com glow intenso */}
        <div className="w-40 h-40 mx-auto mb-6 rounded-full bg-gradient-to-br from-[#00d9ff] via-[#00aaff] to-[#0088cc] flex items-center justify-center text-6xl font-bold glow-primary shadow-2xl relative animate-float">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-[#00ffff]/30 to-transparent animate-pulse" />
          <span className="relative z-10">{user.username.charAt(0).toUpperCase()}</span>
        </div>

        {/* Username com tracking */}
        <h2 className="text-3xl lg:text-4xl font-bold text-white mb-2 tracking-wide">{user.username}</h2>

        {/* Title com style premium */}
        <p className="text-gray-400 text-sm uppercase tracking-[0.2em] mb-4">{user.title}</p>

        {/* Rank Badge e Level - maiores e animados */}
        <div className="flex items-center justify-center gap-4">
          <span
            className={`inline-block px-5 py-2 rounded-full text-base font-bold border-3 ${
              rankColors[user.rank]
            } relative overflow-hidden group hover:scale-110 transition-transform`}
          >
            <span className="relative z-10 uppercase tracking-widest">RANK {rankNames[user.rank]}</span>
            <div className="absolute inset-0 bg-white/10 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
          </span>
          <span className="text-[#ffd700] font-bold text-2xl tracking-wider glow-gold">LV {user.level}</span>
        </div>
      </div>

      {/* Stats Bars - MUITO maiores e com emojis */}
      <div className="space-y-6 relative z-10">
        {/* HP Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#ff3333] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-2xl">❤️</span>
              HP
            </span>
            <span className="text-white font-semibold text-base">
              {user.currentHp} / {user.maxHp}
            </span>
          </div>
          <div className="progress-bar h-7 relative overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ff3333] via-[#ff5555] to-[#ff6666] transition-all duration-500 relative overflow-hidden"
              style={{ width: `${hpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_infinite]" />
            </div>
          </div>
        </div>

        {/* MP Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#00d9ff] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-2xl">💧</span>
              MP
            </span>
            <span className="text-white font-semibold text-base">
              {user.currentMp} / {user.maxMp}
            </span>
          </div>
          <div className="progress-bar h-7 relative overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#00aaff] via-[#00ccff] to-[#00d9ff] transition-all duration-500 relative overflow-hidden"
              style={{ width: `${mpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_infinite]" style={{ animationDelay: '0.5s' }} />
            </div>
          </div>
        </div>

        {/* XP Bar */}
        <div className="space-y-2">
          <div className="flex justify-between items-center text-sm">
            <span className="text-[#ffd700] font-bold uppercase tracking-wider flex items-center gap-2">
              <span className="text-2xl">⚡</span>
              XP
            </span>
            <span className="text-white font-semibold text-base">
              {user.currentXp} / {user.xpToNextLevel}
            </span>
          </div>
          <div className="progress-bar h-7 relative overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-[#ffd700] via-[#ffed4e] to-[#ffff00] transition-all duration-500 relative overflow-hidden"
              style={{ width: `${xpPercentage}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent animate-[shine_2s_infinite]" style={{ animationDelay: '1s' }} />
            </div>
          </div>
        </div>
      </div>

      {/* Stats Grid - MUITO maiores com emojis e hover effects */}
      {user.stats && (
        <div className="grid grid-cols-2 gap-5 relative z-10">
          {/* STR */}
          <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ff3333]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-3xl mb-2">💪</div>
            <div className="text-[#ff3333] text-xs font-bold uppercase tracking-widest mb-2">STR</div>
            <div className="text-white text-3xl font-bold relative z-10">{user.stats.strength}</div>
          </div>

          {/* AGI */}
          <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00ff88]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-3xl mb-2">🏃</div>
            <div className="text-[#00ff88] text-xs font-bold uppercase tracking-widest mb-2">AGI</div>
            <div className="text-white text-3xl font-bold relative z-10">{user.stats.agility}</div>
          </div>

          {/* INT */}
          <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#00d9ff]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-3xl mb-2">🧠</div>
            <div className="text-[#00d9ff] text-xs font-bold uppercase tracking-widest mb-2">INT</div>
            <div className="text-white text-3xl font-bold relative z-10">{user.stats.intelligence}</div>
          </div>

          {/* VIT */}
          <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <div className="text-3xl mb-2">🛡️</div>
            <div className="text-[#ffd700] text-xs font-bold uppercase tracking-widest mb-2">VIT</div>
            <div className="text-white text-3xl font-bold relative z-10">{user.stats.vitality}</div>
          </div>
        </div>
      )}

      {/* Available Points - premium */}
      {user.stats && user.stats.availablePoints > 0 && (
        <div className="glass rounded-xl p-6 text-center glow-gold relative z-10 hover:scale-105 transition-transform cursor-pointer animate-pulse">
          <div className="text-3xl mb-2">✨</div>
          <p className="text-xs text-gray-400 uppercase tracking-widest mb-2">Available Points</p>
          <p className="text-4xl font-bold text-[#ffd700]">{user.stats.availablePoints}</p>
        </div>
      )}

      {/* Gold & Streak - MUITO maiores com emojis */}
      <div className="grid grid-cols-2 gap-5 relative z-10">
        <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="text-3xl mb-2">💰</div>
          <div className="text-[#ffd700] text-xs font-bold uppercase tracking-widest mb-2">Gold</div>
          <div className="text-white text-2xl font-bold relative z-10">{user.gold}</div>
        </div>

        <div className="glass rounded-xl p-6 text-center hover:scale-105 transition-transform duration-300 cursor-pointer group relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-[#ff6600]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          <div className="text-3xl mb-2">🔥</div>
          <div className="text-[#ff6600] text-xs font-bold uppercase tracking-widest mb-2">Streak</div>
          <div className="text-white text-2xl font-bold relative z-10">{user.streakDays} days</div>
        </div>
      </div>

      {/* Logout Button - premium */}
      <button
        onClick={logout}
        className="relative w-full py-5 bg-red-500/20 hover:bg-red-500/30 border-2 border-red-500 text-red-300 rounded-xl font-bold transition-all flex items-center justify-center gap-3 text-base uppercase tracking-wider overflow-hidden group z-10"
      >
        <span className="relative z-10 flex items-center gap-3">
          <ArrowRightOnRectangleIcon className="w-6 h-6" />
          Logout
        </span>
        <div className="absolute inset-0 bg-red-500/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
      </button>

      {/* Decorative glow spots */}
      <div className="absolute -top-2 -right-2 w-32 h-32 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-[#b200ff]/20 rounded-full blur-3xl animate-pulse pointer-events-none" style={{ animationDelay: '1s' }} />
    </div>
  );
}
