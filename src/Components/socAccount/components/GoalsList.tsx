import React from "react";
import Goal from "./Goal";
import { useAccountability } from "../contexts/AccountabilityContexts";
import { IoAdd } from "react-icons/io5";

const GoalsList: React.FC = () => {
  const { goals, updateGoalProgress } = useAccountability();
  const activeGoals = goals.filter((goal) => !goal.completed);

  const handleUpdateProgress = (id: string, progress: number) => {
    updateGoalProgress(id, progress);
  };

  const AddGoalButton = () => (
    <button
      className="flex items-center justify-center px-[70px] py-[8px] border border-transparent text-[18px] font-medium rounded-[7px] text-[#FFFFF] bg-[#3A86FF]"
      aria-label="Add Goals"
      onClick={() =>
        document
          .getElementById("add-goal-modal")
          ?.classList.remove("hidden")
      }
    >
      <div className="flex items-center justify-center flex-row gap-[4px] text-[#FFFF]">
        <IoAdd className="h-4 w-4 mr-1" />
        <p>Add</p> <p>Goals</p>
      </div>
    </button>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-medium">Current Learning Goals</h2>
        {activeGoals.length > 0 && <AddGoalButton />}
      </div>

      {activeGoals.length === 0 ? (
        <div className="text-center text-[18px] py-8 mt-[20px]">
          <p className="text-gray-500">You don't have any active goals yet.</p>
          <p className="text-gray-500 mt-1">
            Click "Add Goals" to create your first goal.
          </p>
          <div className="flex justify-center mt-4">
            <AddGoalButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4">
          {activeGoals.map((goal) => (
            <Goal
              key={goal.id}
              goal={goal}
              onUpdateProgress={handleUpdateProgress}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default GoalsList;
