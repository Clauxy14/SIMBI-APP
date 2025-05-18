import React from "react";
import Stats from "./Stats";
import TabNavigation from "./TabNavigation";
import GoalsList from "./GoalsList";
import AccountabilityPartnersList from "./AccountabilityPartnersList";
import AddGoalModal from "./AddGoalModal";
import AddPartnerModal from "./AddPartnerModal";
import { useAccountability } from "../contexts/AccountabilityContexts";
import MessageIcon from "../../../../public/assets/icons/text.svg";
import NotificationIcon from "../../../../public/assets/icons/bell.svg";
import rewardIcon from "../../../../public/assets/icons/reward.jpg";

const Dashboard: React.FC = () => {
  const { activeTab } = useAccountability();

  const tabs: { id: "goals" | "partners"; label: string }[] = [
    { id: "goals", label: "My Goals" },
    { id: "partners", label: "Accountability Partner" },
  ];

  return (
    <div className="min-h-screen mt-[8px] p-[32px] bg-[#F8F8f8] ml-[280px]">
      <div className="max-w-9xl mx-auto px-8 py-8">
        {/* Header */}
        <header className="bg-white rounded-[45px] px-6 mx-[10px] flex justify-between items-center mx-4 mb-[20px] shadow-[0_0_20px_rgba(0,0,0,0.1)]">
          <div className="flex items-center">
            <span className="mr-2">
              <img src={rewardIcon} alt="message" className="h-[30px] w-[30px]" />
            </span>
            <h1 className="text-[20px] text-gray-500">
              Learn Together
            </h1>
          </div>
          <div className="flex gap-6 pr-[10px]">
            <img src={NotificationIcon} alt="Notifications" className="h-3 w-3" />
            <img src={MessageIcon} alt="message" />
          </div>
        </header>

        {/* Stats */}
        <div className="my-8">
          <Stats />
        </div>

        {/* Tabs */}
        <div className="mb-6">
          <TabNavigation tabs={tabs} />
        </div>

        {/* Main Content */}
        <div>
          {activeTab === "goals" ? (
            <GoalsList />
          ) : (
            <AccountabilityPartnersList />
          )}
        </div>

        {/* Modals */}
        <AddGoalModal />
        <AddPartnerModal />
      </div>
    </div>
  );
};

export default Dashboard;
