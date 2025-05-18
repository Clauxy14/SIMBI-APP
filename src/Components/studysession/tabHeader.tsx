import React, { useEffect, useState } from "react";
import Tabs from "./tab";
import "./tabheader.css";
import Milestones from "./milestone";
import Resources from "./resources";

const TabHeader: React.FC = () => {
    const [subject, setSubject] = useState("");
    useEffect(() => {
    const storedSubject = localStorage.getItem("selectedSessionSubject");
    console.log(storedSubject)

    if (storedSubject) setSubject(storedSubject);
   
  }, []);

  const tabData = [
    { label: "Notes", content: <p>These are your notes.</p> },
    { label: "Milestones", content: <Milestones /> },
     { label: "Resources", content: <Resources /> },
  ];

  return (
    <div className="tab-header">
      <div className="header-title">
        <h4 className="">{subject}</h4>
        <button className="studysession-btn">Save Progress</button>
      </div>
      {/* <div className="border-line"></div> */}
      <hr className="border-line"/>
      <Tabs tabs={tabData} />
    </div>
  );
};

export default TabHeader;
