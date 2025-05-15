import React from 'react';

interface TabNavigationProps {
  currentTab: 'goals' | 'partners';
  onTabChange: (tab: 'goals' | 'partners') => void;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ currentTab, onTabChange }) => {
  return (
    <div className="flex px-5 border-b border-gray-200 bg-white">
      <button
        className={`px-5 py-3 text-sm font-semibold focus:outline-none transition border-b-2 ${currentTab === 'goals' ? 'text-indigo-600 border-indigo-600 bg-gray-50' : 'text-gray-600 border-transparent hover:bg-gray-100'}`}
        onClick={() => onTabChange('goals')}
      >
        My Goals
      </button>
      <button
        className={`px-5 py-3 text-sm font-semibold focus:outline-none transition border-b-2 ${currentTab === 'partners' ? 'text-indigo-600 border-indigo-600 bg-gray-50' : 'text-gray-600 border-transparent hover:bg-gray-100'}`}
        onClick={() => onTabChange('partners')}
      >
        Accountability Partner
      </button>
    </div>
  );
};

export default TabNavigation;