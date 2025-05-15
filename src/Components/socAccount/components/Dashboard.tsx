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
    <div className="bg-gray-50 rounded-xl overflow-hidden shadow-md">
      <div className="flex justify-between items-center p-5 bg-white border-b border-gray-200 mb-2">
        <div className="flex items-center font-semibold text-lg text-indigo-600">
          <i className="mr-2">📚</i>
          <span>LearnTogether</span>
        </div>
        <div className="flex gap-2">
          <button className="bg-transparent border-none cursor-pointer text-xl p-1 rounded-full flex items-center justify-center transition hover:bg-gray-100">
            <i>🔔</i>
          </button>
          <button className="bg-transparent border-none cursor-pointer text-xl p-1 rounded-full flex items-center justify-center transition hover:bg-gray-100">
            <i>💬</i>
          </button>
        </div>
      </div>

      <StatsPanel stats={state.stats} />

      <TabNavigation 
        currentTab={state.currentTab}
        onTabChange={onTabChange}
      />

      {state.currentTab === 'goals' ? (
        <div>
          <div className="flex justify-between items-center p-5">
            <h2 className="m-0 text-lg font-semibold">Current Learning Goals</h2>
            <button 
              className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700"
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
        <div>
          <div className="flex justify-between items-center p-5">
            <h2 className="m-0 text-lg font-semibold">Your Accountability Network</h2>
            <button 
              className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700"
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