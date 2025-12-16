'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import Link from 'next/link';
import BackgroundEffects from '@/components/ui/BackgroundEffects';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await login(username, password);
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-6 relative">
      <BackgroundEffects />

      <div className="glass-strong rounded-2xl p-12 md:p-16 w-full max-w-md relative z-10 animate-slide-in-top corner-decoration">
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
        </div>

        {/* Logo with pulse animation */}
        <div className="text-center mb-12">
          <div className="text-7xl mb-6 animate-float inline-block">
            ⚔️
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-3 neon-text tracking-[0.3em]">
            LIFE RPG
          </h1>
          <p className="text-gray-400 text-sm tracking-[0.2em] uppercase">
            System Access
          </p>
        </div>

        {/* Form with better spacing */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Username */}
          <div className="space-y-3">
            <label htmlFor="username" className="block text-xs font-bold text-[#00d9ff] uppercase tracking-widest">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-5 py-4 bg-black/50 border border-[#00d9ff]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-2 focus:ring-[#00d9ff]/20 transition-all text-lg"
              placeholder="Digite seu username"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div className="space-y-3">
            <label htmlFor="password" className="block text-xs font-bold text-[#00d9ff] uppercase tracking-widest">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-5 py-4 bg-black/50 border border-[#00d9ff]/30 rounded-lg text-white placeholder-gray-500 focus:border-[#00d9ff] focus:ring-2 focus:ring-[#00d9ff]/20 transition-all text-lg"
              placeholder="Digite sua senha"
              disabled={loading}
            />
          </div>

          {/* Submit Button with ripple effect */}
          <button
            type="submit"
            disabled={loading}
            className="relative w-full py-5 bg-gradient-to-r from-[#00d9ff] to-[#0088cc] text-white font-bold rounded-lg hover:from-[#00ffff] hover:to-[#00aaff] disabled:opacity-50 disabled:cursor-not-allowed transition-all text-lg uppercase tracking-widest overflow-hidden group mt-10"
          >
            <span className="relative z-10">
              {loading ? (
                <span className="flex items-center justify-center gap-3">
                  <div className="w-6 h-6 border-3 border-white border-t-transparent rounded-full animate-spin" />
                  Iniciando Sistema...
                </span>
              ) : (
                'Iniciar Sistema'
              )}
            </span>
            {/* Ripple effect */}
            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-full" />
          </button>
        </form>

        {/* Register Link with better spacing */}
        <div className="mt-10 text-center">
          <p className="text-gray-400 text-sm mb-3">
            Não tem uma conta?
          </p>
          <Link
            href="/register"
            className="text-[#00d9ff] hover:text-[#00ffff] font-semibold transition-colors text-base uppercase tracking-wider inline-block hover:scale-105 transition-transform"
          >
            Criar Nova Conta →
          </Link>
        </div>

        {/* Decorative glow spots */}
        <div className="absolute -top-2 -right-2 w-32 h-32 bg-[#00d9ff]/20 rounded-full blur-3xl animate-pulse" />
        <div className="absolute -bottom-2 -left-2 w-32 h-32 bg-[#b200ff]/20 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>
    </div>
  );
}
