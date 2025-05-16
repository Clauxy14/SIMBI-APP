import React, { useState, ReactNode } from "react";
import TabButton from "./tabbutton";

type Tab = {
  label: string;
  content: ReactNode;
};

interface TabsProps {
  tabs: Tab[];
}

const Tabs: React.FC<TabsProps> = ({ tabs }) => {
  const [activeTab, setActiveTab] = useState(tabs[0].label);

  return (
    <div className="tabs-container">
      <div className="tab-buttons">
        {tabs.map((tab) => (
          <TabButton
            key={tab.label}
            label={tab.label}
            active={tab.label === activeTab}
            onClick={() => setActiveTab(tab.label)}
          />
        ))}
      </div>
      <div className="tab-content">
        {tabs.find((tab) => tab.label === activeTab)?.content}
      </div>
    </div>
  );
};

export default Tabs;
