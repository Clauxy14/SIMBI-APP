import React from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';

interface TabNavigationProps {
  tabs: Array<{
    id: 'goals' | 'partners';
    label: string;
  }>;
}

const TabNavigation: React.FC<TabNavigationProps> = ({ tabs }) => {
  const { activeTab, setActiveTab } = useAccountability();

  return (
    <div className="flex mb-4 sm:mb-[20px] gap-2 sm:gap-[6px] p-1 sm:p-[3px]">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          className={`py-[6px] sm:py-[8px] px-[8px] sm:px-[8px] font-[500] text-[18px] sm:text-[18px] rounded-[7px] border-none ${
            activeTab === tab.id
              ? 'bg-[#D9EAFF] text-gray-700'
              : 'bg-[#EFF6FF] text-gray-500'
          }`}
          onClick={() => setActiveTab(tab.id)}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default TabNavigation;