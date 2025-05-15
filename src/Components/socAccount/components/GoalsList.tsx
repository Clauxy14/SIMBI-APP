import React from 'react';
import GoalCard from './GoalCard';
import { Goal, Partner } from '../types';

interface GoalsListProps {
  goals: Goal[];
  partners: Partner[];
  onUpdateGoal: (goal: Goal) => void;
}

const GoalsList: React.FC<GoalsListProps> = ({ goals, partners, onUpdateGoal }) => {
  // Display placeholder when no goals are present
  if (goals.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-6 text-center text-gray-500 my-5">
        <p>You don't have any active goals yet. Click the "Add Goals" button to get started!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-5 px-5 pb-5">
      {goals.map(goal => (
        <GoalCard
          key={goal.id}
          goal={goal}
          partners={partners}
          onUpdateGoal={onUpdateGoal}
        />
      ))}
    </div>
  );
};

export default GoalsList;