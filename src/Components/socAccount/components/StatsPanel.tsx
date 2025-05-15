import React from 'react';
import { Stats } from '../types';

interface StatsPanelProps {
  stats: Stats;
}

const StatsPanel: React.FC<StatsPanelProps> = ({ stats }) => {
  return (
    <div className="stats-panel">
      <div className="stat-card">
        <div className="stat-icon">📋</div>
        <div className="stat-content">
          <h3>Active Goals</h3>
          <div className="stat-value">{stats.activeGoals}</div>
          {stats.activeGoalsChange !== 0 && (
            <div className="stat-change">
              +{stats.activeGoalsChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">👥</div>
        <div className="stat-content">
          <h3>Accountability Partners</h3>
          <div className="stat-value">{stats.accountabilityPartners}</div>
          {stats.accountabilityPartnersChange !== 0 && (
            <div className="stat-change">
              +{stats.accountabilityPartnersChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">✅</div>
        <div className="stat-content">
          <h3>Goals Completed</h3>
          <div className="stat-value">{stats.goalsCompleted}</div>
          {stats.goalsCompletedChange !== 0 && (
            <div className="stat-change">
              +{stats.goalsCompletedChange} from last month
            </div>
          )}
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-icon">📅</div>
        <div className="stat-content">
          <h3>Upcoming Milestones</h3>
          <div className="stat-value">{stats.upcomingMilestones}</div>
          {stats.upcomingMilestonesDetails && (
            <div className="stat-change">
              {stats.upcomingMilestonesDetails}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default StatsPanel;