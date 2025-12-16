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
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      <BackgroundEffects />

      <div className="glass-strong rounded-2xl p-8 md:p-12 w-full max-w-md relative z-10 animate-slide-in-top">
        {/* Logo/Title */}
        <div className="text-center mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient mb-2">
            LIFE RPG
          </h1>
          <p className="text-gray-400 text-sm">Transform your life into an epic adventure</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Username */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-300 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00aaff] transition-all"
              placeholder="Enter your username"
              disabled={loading}
            />
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-3 bg-black/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:border-[#00aaff] transition-all"
              placeholder="Enter your password"
              disabled={loading}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-gradient-to-r from-[#00aaff] to-[#0088cc] text-white font-semibold rounded-lg hover:from-[#00ccff] hover:to-[#00aaff] disabled:opacity-50 disabled:cursor-not-allowed transition-all glow-primary"
          >
            {loading ? (
              <span className="flex items-center justify-center gap-2">
                <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                Logging in...
              </span>
            ) : (
              'Login'
            )}
          </button>
        </form>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400 text-sm">
            Don't have an account?{' '}
            <Link
              href="/register"
              className="text-[#00aaff] hover:text-[#00ccff] font-medium transition-colors"
            >
              Register now
            </Link>
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-1 -right-1 w-20 h-20 bg-[#00aaff]/20 rounded-full blur-3xl" />
        <div className="absolute -bottom-1 -left-1 w-20 h-20 bg-[#ff3333]/20 rounded-full blur-3xl" />
      </div>
    </div>
  );
}
