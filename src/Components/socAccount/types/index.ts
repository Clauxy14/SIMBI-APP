export interface Goal {
    id: string;
    title: string;
    description: string;
    dueDate: string;
    progress: number;
    status: 'on track' | 'ahead of schedule' | 'needs attention';
    accountabilityPartners: string[]; // IDs of accountability partners
  }
  
  export interface Partner {
    id: string;
    name: string;
    avatar: string;
    activeGoals: number;
    sharedGoals: number;
    activeDate: string;
  }
  
  export interface Stats {
    activeGoals: number;
    activeGoalsChange: number;
    accountabilityPartners: number;
    accountabilityPartnersChange: number;
    goalsCompleted: number;
    goalsCompletedChange: number;
    upcomingMilestones: number;
    upcomingMilestonesDetails: string;
  }
  
  export interface AppState {
    goals: Goal[];
    partners: Partner[];
    stats: Stats;
    currentTab: 'goals' | 'partners';
    isAddGoalModalOpen: boolean;
    isAddPartnerModalOpen: boolean;
  }