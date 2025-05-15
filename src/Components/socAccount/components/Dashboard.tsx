import React from 'react';
import StatsPanel from './StatsPanel';
import TabNavigation from './TabNavigation';
import GoalsList from './GoalsList';
import AccountabilityPartnersList from './AccountabilityPartnersList';
import AddGoalModal from './AddGoalModal';
import AddPartnerModal from './AddPartnerModal';
import { AppState, Goal, Partner } from '../types';

interface DashboardProps {
  state: AppState;
  onTabChange: (tab: 'goals' | 'partners') => void;
  onAddGoal: (goal: Goal) => void;
  onAddPartner: (partner: Partner) => void;
  onToggleAddGoalModal: () => void;
  onToggleAddPartnerModal: () => void;
  onUpdateGoal: (goal: Goal) => void;
}

const Dashboard: React.FC<DashboardProps> = ({
  state,
  onTabChange,
  onAddGoal,
  onAddPartner,
  onToggleAddGoalModal,
  onToggleAddPartnerModal,
  onUpdateGoal
}) => {
  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <div className="dashboard-logo">
          <i className="learn-icon">📚</i>
          <span>LearnTogether</span>
        </div>
        <div className="dashboard-actions">
          <button className="icon-button">
            <i className="notification-icon">🔔</i>
          </button>
          <button className="icon-button">
            <i className="message-icon">💬</i>
          </button>
        </div>
      </div>

      <StatsPanel stats={state.stats} />

      <TabNavigation 
        currentTab={state.currentTab}
        onTabChange={onTabChange}
      />

      {state.currentTab === 'goals' ? (
        <div className="goals-section">
          <div className="section-header">
            <h2>Current Learning Goals</h2>
            <button 
              className="primary-button"
              onClick={onToggleAddGoalModal}
            >
              + Add Goals
            </button>
          </div>
          <GoalsList 
            goals={state.goals} 
            partners={state.partners}
            onUpdateGoal={onUpdateGoal}
          />
        </div>
      ) : (
        <div className="partners-section">
          <div className="section-header">
            <h2>Your Accountability Network</h2>
            <button 
              className="primary-button"
              onClick={onToggleAddPartnerModal}
            >
              + Add Partner
            </button>
          </div>
          <AccountabilityPartnersList partners={state.partners} />
        </div>
      )}

      {state.isAddGoalModalOpen && (
        <AddGoalModal 
          onClose={onToggleAddGoalModal}
          onAddGoal={onAddGoal}
          partners={state.partners}
        />
      )}

      {state.isAddPartnerModalOpen && (
        <AddPartnerModal 
          onClose={onToggleAddPartnerModal}
          onAddPartner={onAddPartner}
        />
      )}
    </div>
  );
};

export default Dashboard;