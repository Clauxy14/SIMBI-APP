import React, { useState } from 'react';
import { Goal, Partner } from '../types';

interface GoalCardProps {
  goal: Goal;
  partners: Partner[];
  onUpdateGoal: (goal: Goal) => void;
}

const GoalCard: React.FC<GoalCardProps> = ({ goal, partners, onUpdateGoal }) => {
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(goal.progress);
  
  // Get the partner objects that are linked to this goal
  const goalPartners = partners.filter(partner => 
    goal.accountabilityPartners.includes(partner.id)
  );

  const handleProgressChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setProgress(parseInt(e.target.value));
  };

  const handleUpdateProgress = () => {
    const updatedGoal = {
      ...goal,
      progress,
      status: determineStatus(progress, goal)
    };
    onUpdateGoal(updatedGoal);
    setIsUpdating(false);
  };

  // Determine status based on progress and due date
  const determineStatus = (newProgress: number, currentGoal: Goal): 'on track' | 'ahead of schedule' | 'needs attention' => {
    const dueDate = new Date(currentGoal.dueDate);
    const today = new Date();
    const daysUntilDue = Math.ceil((dueDate.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
    
    if (newProgress >= 75) return 'ahead of schedule';
    if (newProgress >= 30 && daysUntilDue > 10) return 'on track';
    return 'needs attention';
  };

  // Badge color
  const badgeColor =
    goal.status === 'on track'
      ? 'bg-green-100 text-green-700'
      : goal.status === 'ahead of schedule'
      ? 'bg-blue-100 text-blue-700'
      : 'bg-yellow-100 text-yellow-700';

  return (
    <div className="bg-white rounded-lg shadow p-5 overflow-hidden">
      <div className="mb-4">
        <h3 className="text-lg font-semibold mb-1">{goal.title}</h3>
        <p className="text-gray-500 text-sm mb-2">{goal.description}</p>
      </div>

      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm">Progress: {goal.progress}%</span>
          <span className={`px-2 py-1 rounded text-xs font-semibold ${badgeColor}`}>{goal.status}</span>
        </div>
        <div className="w-full h-2 bg-gray-200 rounded">
          <div 
            className="h-2 bg-indigo-500 rounded transition-all duration-300"
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        <div className="mt-2 text-xs text-gray-600">
          <span>👥 {goalPartners.length} accountability partners</span>
        </div>
      </div>

      <div className="flex flex-wrap gap-2 mt-4">
        <button className="bg-gray-100 text-gray-700 rounded px-3 py-1 text-sm font-medium flex items-center gap-1 hover:bg-gray-200 transition">
          <i>🔄</i> Share Update
        </button>
        {isUpdating ? (
          <div className="flex flex-col md:flex-row gap-2 items-center w-full md:w-auto">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={handleProgressChange} 
              className="w-full md:w-32 accent-indigo-500"
            />
            <button 
              className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700"
              onClick={handleUpdateProgress}
            >
              Save
            </button>
            <button 
              className="bg-gray-100 text-gray-700 rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-gray-200"
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700"
            onClick={() => setIsUpdating(true)}
          >
            Update Progress
          </button>
        )}
      </div>
    </div>
  );
};

export default GoalCard;