export interface User {
  id: string;
  username: string;
  title: string;
  rank: 'E_RANK' | 'D_RANK' | 'C_RANK' | 'B_RANK' | 'A_RANK' | 'S_RANK';
  level: number;
  maxHp: number;
  currentHp: number;
  maxMp: number;
  currentMp: number;
  currentXp: number;
  xpToNextLevel: number;
  gold: number;
  streakDays: number;
  stats?: Stats;
}

export interface Stats {
  id: string;
  userId: string;
  strength: number;
  agility: number;
  intelligence: number;
  vitality: number;
  availablePoints: number;
}

export interface Quest {
  id: string;
  userId: string;
  title: string;
  description?: string;
  difficulty: 'EASY' | 'MEDIUM' | 'HARD';
  status: 'AVAILABLE' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  type: 'POSITIVE' | 'NEGATIVE';
  currentProgress: number;
  targetProgress: number;
  unit: string;
  goldReward: number;
  xpReward: number;
  statReward?: string;
  hpPenalty: number;
  isDaily: boolean;
  deadline?: string;
  createdAt: string;
}

export interface Achievement {
  id: string;
  userId: string;
  name: string;
  description: string;
  icon: string;
  unlocked: boolean;
  unlockedAt?: string;
}

export interface ActivityLog {
  id: string;
  userId: string;
  type: 'QUEST_COMPLETED' | 'QUEST_FAILED' | 'LEVEL_UP' | 'ACHIEVEMENT_UNLOCKED' | 'PENALTY_APPLIED' | 'STAT_INCREASED';
  message: string;
  icon?: string;
  createdAt: string;
}

export interface AuthResponse {
  access_token: string;
  user: User;
}

export interface RegisterData {
  username: string;
  password: string;
}

export interface LoginData {
  username: string;
  password: string;
}