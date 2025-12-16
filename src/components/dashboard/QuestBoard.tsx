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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold text-gradient">Quest Board</h2>
          <p className="text-gray-400 text-sm mt-1">
            {filteredQuests.length} quest{filteredQuests.length !== 1 ? 's' : ''} available
          </p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="px-4 py-2 bg-gradient-to-r from-[#00aaff] to-[#00ff88] text-white rounded-lg font-semibold flex items-center gap-2 hover:from-[#00ccff] hover:to-[#00ffaa] transition-all glow-primary"
        >
          <PlusIcon className="w-5 h-5" />
          New Quest
        </button>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap">
        {['ALL', 'DAILY', 'ACTIVE', 'COMPLETED'].map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f as any)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm transition-all ${
              filter === f
                ? 'bg-[#00aaff] text-white glow-primary'
                : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Quests Grid */}
      {loading ? (
        <div className="flex items-center justify-center py-20">
          <div className="w-12 h-12 border-4 border-[#00aaff] border-t-transparent rounded-full animate-spin" />
        </div>
      ) : filteredQuests.length === 0 ? (
        <div className="glass rounded-xl p-12 text-center">
          <p className="text-gray-400 text-lg mb-4">No quests found</p>
          <button
            onClick={() => setShowCreateModal(true)}
            className="px-6 py-3 bg-gradient-to-r from-[#00aaff] to-[#00ff88] text-white rounded-lg font-semibold hover:from-[#00ccff] hover:to-[#00ffaa] transition-all"
          >
            Create your first quest
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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
