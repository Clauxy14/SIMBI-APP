import React from 'react';
import { Goal as GoalType } from '../types';

interface GoalProps {
  goal: GoalType;
  onUpdateProgress: (id: string, progress: number) => void;
}

const Goal: React.FC<GoalProps> = ({ goal, onUpdateProgress }) => {
  const getStatusColor = (status: string): string => {
    switch (status) {
      case 'on track':
        return 'text-green-600';
      case 'needs attention':
        return 'text-red-500';
      case 'ahead of schedule':
        return 'text-blue-600';
      default:
        return 'text-gray-600';
    }
  };

  const statusColor = getStatusColor(goal.status);

  const formatDeadline = (date: Date): string => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sm:p-5 mb-4">
      <h3 className="text-base sm:text-lg font-semibold">{goal.title}</h3>
      <p className="text-xs sm:text-sm text-gray-600">
        {goal.description} by {formatDeadline(goal.deadline)}
      </p>

      <div className="mt-3 sm:mt-4">
        <div className="flex justify-between mb-1">
          <span className="text-xs sm:text-sm text-gray-600">Progress: {goal.progress}%</span>
          <span className={`text-xs sm:text-sm ${statusColor}`}>{goal.status}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className={`h-2 rounded-full ${
              goal.status === 'needs attention' ? 'bg-red-500' : 'bg-green-500'
            }`}
            style={{ width: `${goal.progress}%` }}
          ></div>
        </div>
      </div>

      <div className="mt-2 sm:mt-3 text-xs sm:text-sm text-gray-600 flex items-center">
        <span className="mr-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 inline" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292m0 0l3 3m-3-3l-3 3m3 3v3m-3-6h.01" />
          </svg>
        </span>
        <span>{goal.partners.length} accountability partners</span>
      </div>

      <div className="mt-3 sm:mt-4 flex flex-col sm:flex-row sm:justify-between gap-2 sm:gap-0">
        <button
          className="inline-flex items-center justify-center px-3 py-1 border border-gray-300 text-xs font-medium rounded-[7px] text-gray-700 bg-white hover:bg-gray-50"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 sm:h-4 sm:w-4 mr-1" fill="none"  stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.48-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
          </svg>
          Share Update
        </button>
        <button
          className="inline-flex items-center justify-center px-3 py-1 border border-transparent text-xs leading-4 font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
        >
          Update Progress
        </button>
      </div>
    </div>
  );
};

export default Goal;