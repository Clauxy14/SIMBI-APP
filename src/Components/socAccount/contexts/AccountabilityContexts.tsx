import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Goal, Partner, Stats } from '../types';

interface AccountabilityContextType {
  goals: Goal[];
  partners: Partner[];
  stats: Stats;
  addGoal: (goal: Omit<Goal, 'id'>) => void;
  updateGoal: (id: string, updates: Partial<Goal>) => void;
  addPartner: (partner: Omit<Partner, 'id'>) => void;
  activeTab: 'goals' | 'partners';
  setActiveTab: (tab: 'goals' | 'partners') => void;
}

const initialStats: Stats = {
  activeGoals: {
    count: 0,
    change: 0,
  },
  accountabilityPartners: {
    count: 0,
    change: 0,
  },
  goalsCompleted: {
    count: 0,
    change: 0,
  },
  upcomingMilestones: {
    count: 0,
    next: {
      type: 'Course',
      daysRemaining: 2,
    },
  },
};

const AccountabilityContext = createContext<AccountabilityContextType | undefined>(undefined);

export const useAccountability = () => {
  const context = useContext(AccountabilityContext);
  if (!context) {
    throw new Error('useAccountability must be used within an AccountabilityProvider');
  }
  return context;
};

interface AccountabilityProviderProps {
  children: ReactNode;
}

export const AccountabilityProvider = ({ children }: AccountabilityProviderProps) => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [stats, setStats] = useState<Stats>(initialStats);
  const [activeTab, setActiveTab] = useState<'goals' | 'partners'>('goals');

  // Update stats whenever goals or partners change
  useEffect(() => {
    const activeGoalsCount = goals.filter(goal => !goal.completed).length;
    const completedGoalsCount = goals.filter(goal => goal.completed).length;
    
    setStats({
      activeGoals: {
        count: activeGoalsCount,
        change: activeGoalsCount > 0 ? 1 : 0, // For demo purposes
      },
      accountabilityPartners: {
        count: partners.length,
        change: partners.length > 0 ? 2 : 0, // For demo purposes
      },
      goalsCompleted: {
        count: completedGoalsCount,
        change: completedGoalsCount > 0 ? 3 : 0, // For demo purposes
      },
      upcomingMilestones: {
        count: 3, // Hardcoded for demo
        next: {
          type: 'Course',
          daysRemaining: 2,
        },
      },
    });
  }, [goals, partners]);

  const addGoal = (goal: Omit<Goal, 'id'>) => {
    const newGoal: Goal = {
      ...goal,
      id: Date.now().toString(),
    };
    setGoals(prevGoals => [...prevGoals, newGoal]);
  };

  const updateGoal = (id: string, updates: Partial<Goal>) => {
    setGoals(prevGoals =>
      prevGoals.map(goal => (goal.id === id ? { ...goal, ...updates } : goal))
    );
  };

  const addPartner = (partner: Omit<Partner, 'id'>) => {
    const newPartner: Partner = {
      ...partner,
      id: Date.now().toString(),
    };
    setPartners(prevPartners => [...prevPartners, newPartner]);
  };

  return (
    <AccountabilityContext.Provider
      value={{
        goals,
        partners,
        stats,
        addGoal,
        updateGoal,
        addPartner,
        activeTab,
        setActiveTab,
      }}
    >
      {children}
    </AccountabilityContext.Provider>
  );
};