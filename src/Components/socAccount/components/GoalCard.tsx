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

  return (
    <div className="goal-card">
      <div className="goal-header">
        <h3>{goal.title}</h3>
        <p>{goal.description}</p>
      </div>

      <div className="goal-progress">
        <div className="progress-info">
          <span>Progress: {goal.progress}%</span>
          <span className={`status-badge ${goal.status.replace(/\s+/g, '-')}`}>
            {goal.status}
          </span>
        </div>
        <div className="progress-bar-container">
          <div 
            className="progress-bar" 
            style={{ width: `${goal.progress}%` }}
          />
        </div>
        <div className="goal-partners">
          <span>👥 {goalPartners.length} accountability partners</span>
        </div>
      </div>

      <div className="goal-actions">
        <button className="secondary-button">
          <i className="share-icon">🔄</i> Share Update
        </button>
        {isUpdating ? (
          <div className="update-progress-controls">
            <input 
              type="range" 
              min="0" 
              max="100" 
              value={progress} 
              onChange={handleProgressChange} 
            />
            <button 
              className="primary-button"
              onClick={handleUpdateProgress}
            >
              Save
            </button>
            <button 
              className="secondary-button"
              onClick={() => setIsUpdating(false)}
            >
              Cancel
            </button>
          </div>
        ) : (
          <button 
            className="primary-button"
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