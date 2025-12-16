'use client';

import { useState, useEffect } from 'react';
import { Quest } from '@/types';
import { questsAPI } from '@/services/api';
import QuestCard from './QuestCard';
import CreateQuestModal from './CreateQuestModal';
import { PlusIcon } from '@heroicons/react/24/outline';

export default function QuestBoard() {
  const [quests, setQuests] = useState<Quest[]>([]);
  const [loading, setLoading] = useState(true);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [filter, setFilter] = useState<'ALL' | 'DAILY' | 'ACTIVE' | 'COMPLETED'>('ALL');

  const fetchQuests = async () => {
    try {
      const response = await questsAPI.getAll();
      setQuests(response.data);
    } catch (error) {
      console.error('Error fetching quests:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuests();
  }, []);

  const filteredQuests = quests.filter((quest) => {
    if (filter === 'DAILY') return quest.isDaily;
    if (filter === 'ACTIVE') return quest.status === 'IN_PROGRESS' || quest.status === 'AVAILABLE';
    if (filter === 'COMPLETED') return quest.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="space-y-8">
      {/* Header - MUITO maior e premium */}
      <div className="glass-strong rounded-2xl p-8 flex items-center justify-between relative overflow-hidden corner-decoration">
        {/* Shine effect */}
        <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
          <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00ff88]/10 to-transparent animate-[shine_3s_infinite]" />
        </div>

        <div className="relative z-10">
          <h2 className="text-4xl lg:text-5xl font-bold text-gradient mb-3 tracking-wide">📜 Quest Board</h2>
          <p className="text-gray-300 text-base font-semibold">
            <span className="text-[#00ff88] text-xl">{filteredQuests.length}</span> quest{filteredQuests.length !== 1 ? 's' : ''} available
          </p>
        </div>

        <button
          onClick={() => setShowCreateModal(true)}
          className="relative px-8 py-4 bg-gradient-to-r from-[#00aaff] to-[#00ff88] text-white rounded-xl font-bold text-lg uppercase tracking-wider flex items-center gap-3 hover:from-[#00ccff] hover:to-[#00ffaa] transition-all glow-primary overflow-hidden group hover:scale-105 z-10"
        >
          <span className="relative z-10 flex items-center gap-3">
            <PlusIcon className="w-6 h-6" />
            New Quest
          </span>
          <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
        </button>

        {/* Decorative glow spots */}
        <div className="absolute -top-2 -right-2 w-32 h-32 bg-[#00ff88]/20 rounded-full blur-3xl animate-pulse pointer-events-none" />
      </div>

      {/* Filters - MUITO maiores */}
      <div className="flex gap-4 flex-wrap">
        {['ALL', 'DAILY', 'ACTIVE', 'COMPLETED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-8 py-4 rounded-xl font-bold text-base uppercase tracking-widest transition-all hover:scale-105 ${
              filter === f
                ? 'bg-gradient-to-r from-[#00aaff] to-[#00d9ff] text-white glow-primary border-2 border-[#00d9ff]'
                : 'bg-gray-700/50 text-gray-300 hover:bg-gray-600 border-2 border-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Quests Grid */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-32">
          <div className="w-20 h-20 border-6 border-[#00aaff] border-t-transparent rounded-full animate-spin mb-6" />
          <p className="text-gray-400 text-lg font-semibold uppercase tracking-wider animate-pulse">Loading Quests...</p>
        </div>
      ) : filteredQuests.length === 0 ? (
        <div className="glass-strong rounded-2xl p-16 text-center relative overflow-hidden corner-decoration">
          {/* Shine effect */}
          <div className="absolute inset-0 overflow-hidden rounded-2xl pointer-events-none">
            <div className="absolute top-0 -left-full w-full h-full bg-gradient-to-r from-transparent via-[#00d9ff]/10 to-transparent animate-[shine_3s_infinite]" />
          </div>

          <div className="text-7xl mb-6 animate-float">📭</div>
          <p className="text-gray-300 text-2xl font-bold mb-3 relative z-10">No quests found</p>
          <p className="text-gray-400 text-base mb-8 relative z-10">Start your adventure by creating your first quest!</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="relative px-10 py-5 bg-gradient-to-r from-[#00aaff] to-[#00ff88] text-white rounded-xl font-bold text-lg uppercase tracking-wider hover:from-[#00ccff] hover:to-[#00ffaa] transition-all overflow-hidden group hover:scale-105 inline-flex items-center gap-3 z-10"
          >
            <span className="relative z-10 flex items-center gap-3">
              <PlusIcon className="w-6 h-6" />
              Create your first quest
            </span>
            <div className="absolute inset-0 bg-white/20 transform scale-0 group-hover:scale-100 transition-transform duration-500 rounded-xl" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredQuests.map((quest) => (
            <QuestCard key={quest.id} quest={quest} onUpdate={fetchQuests} />
          ))}
        </div>
      )}

      {/* Create Modal */}
      {showCreateModal && (
        <CreateQuestModal
          onClose={() => setShowCreateModal(false)}
          onSuccess={fetchQuests}
        />
      )}
    </div>
  );
}
