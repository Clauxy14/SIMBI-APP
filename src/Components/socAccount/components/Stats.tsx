import React from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';
import goodIcon from "../../../../public/assets/icons/goody.svg";
import rewardIcon from "../../../../public/assets/icons/reward.jpg";
import userIcon from "../../../../public/assets/icons/user.jpg";
import calendarIcon from "../../../../public/assets/icons/calendar.jpg";

const StatBox: React.FC<{
  icon: React.ReactNode;
  title: string;
  count: number;
  subtext?: string;
}> = ({ icon, title, count, subtext }) => {
  return (
    <div className="bg-[#FFFFF] rounded-[12px] shadow-[0_0_20px_rgba(0,0,0,0.1)] px-[16px]  py-[24px] min-w-[385px] min-h-[100px] flex flex-col justify-between">
      <div className="flex items-center justify-between mb-2">
        <div className="text-gray-700 text-[20px] font-[700]">{title}</div>
        <div className="text-2xl">{icon}</div>
      </div>
      <div className="text-[32px] font-[700]">{count}</div>
      {subtext && <div className="text-xs text-gray-500 mt-1 font-bold">{subtext}</div>}
    </div>
  );
};

const Stats: React.FC = () => {
  const { stats } = useAccountability();

  return (
    <div className="flex flex-row flex-wrap gap-[24px] mb-[42px] sm:p-[10px] justify-center">
      <StatBox
        icon={<span className="text-blue-500 font-bold "><img src={rewardIcon} alt="Notifications" className="h-[30px] w-[30px]"/></span>}
        title="Active Goals"
        count={stats.activeGoals.count}
        subtext={stats.activeGoals.change ? `+${stats.activeGoals.change} from last month` : undefined}
      />
      <StatBox
        icon={<span className="text-purple-500"><img src={userIcon} alt="Notifications" className="h-[30px] w-[30px]"/></span>}
        title="Accountability Partners"
        count={stats.accountabilityPartners.count}
        subtext={stats.accountabilityPartners.change ? `+${stats.accountabilityPartners.change} from last month` : undefined}
      />
      <StatBox
        icon={<span className="text-green-500">  <img src={goodIcon} alt="Notifications" className="h-3 w-3" /></span>}
        title="Goals Completed"
        count={stats.goalsCompleted.count}
        subtext={stats.goalsCompleted.change ? `+${stats.goalsCompleted.change} from last month` : undefined}
      />
      <StatBox
        icon={<span className="text-orange-500"> <img src={calendarIcon} alt="Notifications" className="h-[30px] w-[30px]"/></span>}
        title="Upcoming Milestones"
        count={stats.upcomingMilestones.count}
        subtext={
          stats.upcomingMilestones.next
            ? `Next: ${stats.upcomingMilestones.next.type} (${stats.upcomingMilestones.next.daysRemaining} days)`
            : undefined
        }
      />
    </div>
  );
};

export default Stats;

