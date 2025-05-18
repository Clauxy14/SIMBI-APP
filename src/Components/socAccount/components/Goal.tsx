import React, { useState } from 'react';
import { Goal as GoalType } from '../types';
import shareIcon from "../../../../public/assets/icons/send.svg";

interface GoalProps {
  goal: GoalType;
  onUpdateProgress: (id: string, progress: number) => void;
}

const Goal = ({ goal, onUpdateProgress }: GoalProps): React.ReactElement => {
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const [progress, setProgress] = useState(goal.progress);

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

  const handleProgressUpdate = () => {
    onUpdateProgress(goal.id, progress);
    setShowUpdateModal(false);
  };

  return (
    <>
      <div className="bg-white rounded-2xl shadow-[0_0_20px_rgba(0,0,0,0.1)] hover:shadow-xl transition-all duration-300 p-[8px] flex flex-col w-[320px] h-[280px]">
        <div className="p-3 pb-2">
          <h3 className="text-base font-semibold text-gray-800 truncate">{goal.title}</h3>
          <p className="text-xs text-gray-500 mt-1 line-clamp-2">
            {goal.description}
          </p>
          <p className="text-xs text-gray-400 mt-1">
            Due: {formatDeadline(goal.deadline)}
          </p>
        </div>

        <div className="px-3 py-2">
          <div className="flex justify-between items-center mb-1">
            <span className="text-xs text-gray-600">Progress</span>
            <span className={`text-xs font-medium ${statusColor}`}>{goal.status}</span>
          </div>
          <div className="w-full bg-gray-100 rounded-full h-1.5">
            <div
              className={`h-1.5 rounded-full transition-all duration-300 ${
                goal.status === 'needs attention' ? 'bg-red-500' : 'bg-green-500'
              }`}
              style={{ width: `${goal.progress}%` }}
            ></div>
          </div>
          <span className="text-xs text-gray-500 mt-1 block">{goal.progress}%</span>
        </div>

        <div className="px-3 py-2 flex items-center text-xs text-gray-500">
          <span>{goal.partners.length} accountability partners</span>
        </div>

        <div className="p-3 pt-2 flex gap-[4px] mt-auto">
          <button
            className="flex-1 flex items-center justify-center px-2 py-[6px] shadow-[0_0_20px_rgba(0,0,0,0.1)] text-xs font-medium rounded-[7px] text-gray-600 bg-white hover:bg-gray-50 transition-colors duration-200"
          >
            <img src={shareIcon} alt="Share" className="h-3 w-3 color-[#00000] mr-1" />
            Share
          </button>
          <button
            onClick={() => setShowUpdateModal(true)}
            className="flex-1 flex items-center justify-center px-2 py-[6px] text-xs font-medium rounded-[7px] text-white bg-[#3A86FF] hover:bg-blue-700 transition-colors duration-200"
          >
            Update
          </button>
        </div>
      </div>

      {/* Progress Update Modal */}
      {showUpdateModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-2xl p-6 w-[320px]">
            <h3 className="text-lg font-semibold mb-4">Update Progress</h3>
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Progress: {progress}%
              </label>
              <input
                type="range"
                min="0"
                max="100"
                value={progress}
                onChange={(e) => setProgress(Number(e.target.value))}
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowUpdateModal(false)}
                className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleProgressUpdate}
                className="px-4 py-2 text-sm font-medium text-white bg-[#3A86FF] rounded-lg hover:bg-blue-700"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Goal;