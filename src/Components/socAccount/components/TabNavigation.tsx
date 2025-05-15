import React from 'react';

interface TabNavigationProps {
  currentTab: 'goals' | 'partners';
  onTabChange: (tab: 'goals' | 'partners') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="tab-navigation">
      <button
        className={`tab-button ${currentTab === 'goals' ? 'active' : ''}`}
        onClick={() => onTabChange('goals')}
      >
        My Goals
      </button>
      <button
        className={`tab-button ${currentTab === 'partners' ? 'active' : ''}`}
        onClick={() => onTabChange('partners')}
      >
        Accountability Partner
      </button>
    </div>
  );
};

export default TabNavigation;