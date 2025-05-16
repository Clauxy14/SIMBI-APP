import React from "react";
import Tabs from "./tab";
import "./tabheader.css";

const TabHeader: React.FC = () => {
  const tabData = [
    { label: "Notes", content: <p>These are your notes.</p> },
    { label: "Materials", content: <p>Materials go here.</p> },
    { label: "Resources", content: <p>Here are some resources.</p> },
  ];

  return (
    <div className="tab-header">
      <div className="header-title">
        <h4 className="">Lexis and Structure</h4>
        <button className="studysession-btn">Save Progress</button>
      </div>
      <div className="border-line"></div>
      <Tabs tabs={tabData} />
    </div>
  );
};

export default TabHeader;
