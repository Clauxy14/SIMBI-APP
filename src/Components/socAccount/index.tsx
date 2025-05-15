import React, { useState, useEffect } from 'react';
import Dashboard from './components/Dashboard';
import { AppState, Goal, Partner, Stats } from './types';
import './index.css';

const SocialAccountability: React.FC = () => {
  // Initial state
  const initialState: AppState = {
    goals: [],
    partners: [],
    stats: {
      activeGoals: 0,
      activeGoalsChange: 0,
      accountabilityPartners: 0,
      accountabilityPartnersChange: 0,
      goalsCompleted: 12,
      goalsCompletedChange: 3,
      upcomingMilestones: 0,
      upcomingMilestonesDetails: '',
    },
    currentTab: 'goals',
    isAddGoalModalOpen: false,
    isAddPartnerModalOpen: false,
  };

  const [state, setState] = useState<AppState>(initialState);

  // Update stats based on goals and partners
  useEffect(() => {
    const newStats: Stats = {
      activeGoals: state.goals.length,
      activeGoalsChange: state.goals.length > 0 ? 1 : 0,
      accountabilityPartners: state.partners.length,
      accountabilityPartnersChange: state.partners.length > 0 ? 2 : 0,
      goalsCompleted: 12, // This would be tracked in a real app
      goalsCompletedChange: 3, // This would be tracked in a real app
      upcomingMilestones: 3, // This would be calculated in a real app
      upcomingMilestonesDetails: 'Next: Course (2 days)', // This would be calculated
    };

    setState(prevState => ({
      ...prevState,
      stats: newStats
    }));
  }, [state.goals.length, state.partners.length]);

  // Handlers for modal toggle
  const handleToggleAddGoalModal = () => {
    setState(prevState => ({
      ...prevState,
      isAddGoalModalOpen: !prevState.isAddGoalModalOpen
    }));
  };

  const handleToggleAddPartnerModal = () => {
    setState(prevState => ({
      ...prevState,
      isAddPartnerModalOpen: !prevState.isAddPartnerModalOpen
    }));
  };

  // Handler for adding a new goal
  const handleAddGoal = (goal: Goal) => {
    setState(prevState => ({
      ...prevState,
      goals: [...prevState.goals, goal],
      isAddGoalModalOpen: false
    }));
  };

  // Handler for adding a new partner
  const handleAddPartner = (partner: Partner) => {
    setState(prevState => ({
      ...prevState,
      partners: [...prevState.partners, partner],
      isAddPartnerModalOpen: false
    }));
  };

  // Handler for tab switching
  const handleTabChange = (tab: 'goals' | 'partners') => {
    setState(prevState => ({
      ...prevState,
      currentTab: tab
    }));
  };

  // Handler for updating a goal's progress
  const handleUpdateGoal = (updatedGoal: Goal) => {
    setState(prevState => ({
      ...prevState,
      goals: prevState.goals.map(goal => 
        goal.id === updatedGoal.id ? updatedGoal : goal
      )
    }));
  };

  return (
    <div className="social-accountability-container">
      <Dashboard 
        state={state}
        onTabChange={handleTabChange}
        onAddGoal={handleAddGoal}
        onAddPartner={handleAddPartner}
        onToggleAddGoalModal={handleToggleAddGoalModal}
        onToggleAddPartnerModal={handleToggleAddPartnerModal}
        onUpdateGoal={handleUpdateGoal}
      />
    </div>
  );
};

export default SocialAccountability;