export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  partners: string[]; // IDs of accountability partners
  status: 'on track' | 'needs attention' | 'ahead of schedule';
  completed: boolean;
}

export interface Partner {
  id: string;
  name: string;
  avatar: string;
  activeGoals: number;
  sharedGoals: number;
  activeDate: Date;
}

export interface Stats {
  activeGoals: {
    count: number;
    change: number;
  };
  accountabilityPartners: {
    count: number;
    change: number;
  };
  goalsCompleted: {
    count: number;
    change: number;
  };
  upcomingMilestones: {
    count: number;
    next?: {
      type: string;
      daysRemaining: number;
    };
  };
}