import React from 'react';
import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-5 p-5 bg-white">
      <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="text-2xl mr-4 text-indigo-600">📋</div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-gray-600">Active Goals</h3>
          <div className="text-2xl font-bold my-1">{stats.activeGoals}</div>
          {stats.activeGoalsChange !== 0 && (
            <div className="text-xs text-gray-500">
              +{stats.activeGoalsChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="text-2xl mr-4 text-indigo-600">👥</div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-gray-600">Accountability Partners</h3>
          <div className="text-2xl font-bold my-1">{stats.accountabilityPartners}</div>
          {stats.accountabilityPartnersChange !== 0 && (
            <div className="text-xs text-gray-500">
              +{stats.accountabilityPartnersChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="text-2xl mr-4 text-indigo-600">✅</div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-gray-600">Goals Completed</h3>
          <div className="text-2xl font-bold my-1">{stats.goalsCompleted}</div>
          {stats.goalsCompletedChange !== 0 && (
            <div className="text-xs text-gray-500">
              +{stats.goalsCompletedChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="flex items-center p-4 bg-gray-50 rounded-lg shadow-sm">
        <div className="text-2xl mr-4 text-indigo-600">📅</div>
        <div>
          <h3 className="m-0 text-sm font-semibold text-gray-600">Upcoming Milestones</h3>
          <div className="text-2xl font-bold my-1">{stats.upcomingMilestones}</div>
          {stats.upcomingMilestonesDetails && (
            <div className="text-xs text-gray-500">
              {stats.upcomingMilestonesDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;