export interface Goal {
  id: string;
  title: string;
  description: string;
  deadline: Date;
  progress: number;
  status: 'on track' | 'needs attention' | 'ahead of schedule' | 'completed';
  partners: string[];
  completed: boolean;
}

export interface Partner {
  id: string;
  name: string;
  email: string;
  avatar: string;
  activeGoals: number;
  sharedGoals: number;
  activeDate: Date;
} 