import React, { createContext, useContext, useState, useEffect } from 'react';
import { Goal, Partner } from '../types';

interface AccountabilityContextType {
  goals: Goal[];
  partners: Partner[];
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  updateGoalProgress: (id: string, progress: number) => void;
  activeTab: 'goals' | 'partners';
  setActiveTab: (tab: 'goals' | 'partners') => void;
  stats: {
    activeGoals: { count: number; change: number };
    accountabilityPartners: { count: number; change: number };
    goalsCompleted: { count: number; change: number };
    upcomingMilestones: { count: number; next?: { type: string; daysRemaining: number } };
  };
}

const AccountabilityContext = createContext<AccountabilityContextType | undefined>(undefined);

export const AccountabilityProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [goals, setGoals] = useState<Goal[]>(() => {
    const savedGoals = localStorage.getItem('goals');
    return savedGoals ? JSON.parse(savedGoals) : [];
  });

  const [partners, setPartners] = useState<Partner[]>(() => {
    const savedPartners = localStorage.getItem('partners');
    return savedPartners ? JSON.parse(savedPartners) : [];
  });

  const [activeTab, setActiveTab] = useState<'goals' | 'partners'>('goals');

  const stats = {
    activeGoals: {
      count: goals.filter(g => !g.completed).length,
      change: 0
    },
    accountabilityPartners: {
      count: partners.length,
      change: 0
    },
    goalsCompleted: {
      count: goals.filter(g => g.completed).length,
      change: 0
    },
    upcomingMilestones: {
      count: goals.filter(g => !g.completed).length,
      next: goals.length > 0 ? {
        type: 'Goal Deadline',
        daysRemaining: Math.ceil((new Date(goals[0].deadline).getTime() - new Date().getTime()) / (1000 * 60 * 60 * 24))
      } : undefined
    }
  };

  useEffect(() => {
    localStorage.setItem('goals', JSON.stringify(goals));
  }, [goals]);

  useEffect(() => {
    localStorage.setItem('partners', JSON.stringify(partners));
  }, [partners]);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prev => [...prev, newGoal]);
  };

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
    };
    setPartners(prev => [...prev, newPartner]);
  };

  const updateGoalProgress = (id: string, progress: number) => {
    setGoals(prev => prev.map(goal => {
      if (goal.id === id) {
        const status = progress >= 100 ? 'completed' :
                      progress >= 75 ? 'ahead of schedule' :
                      progress >= 50 ? 'on track' :
                      'needs attention';
        return { ...goal, progress, status };
      }
      return goal;
    }));
  };

  return (
    <AccountabilityContext.Provider value={{
      goals,
      partners,
      addGoal,
      addPartner,
      updateGoalProgress,
      activeTab,
      setActiveTab,
      stats
    }}>
      {children}
    </AccountabilityContext.Provider>
  );
};

export const useAccountability = () => {
  const context = useContext(AccountabilityContext);
  if (context === undefined) {
    throw new Error('useAccountability must be used within an AccountabilityProvider');
  }
  return context;
};