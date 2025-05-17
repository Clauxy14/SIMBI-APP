import React from "react";
import Goal from "./Goal";
import { useAccountability } from "../contexts/AccountabilityContexts";

const GoalsList: React.FC = () => {
  const { goals, updateGoal } = useAccountability();
  const activeGoals = goals.filter((goal) => !goal.completed);

  const handleUpdateProgress = (id: string, progress: number) => {
    updateGoal(id, { progress });
  };

  return (
    <div>
      <div className="flex items-start mb-4">
        <h2 className="text-lg font-medium">Current Learning Goals</h2>
      </div>

      {activeGoals.length === 0 ? (
        <div className="text-center text-[18px] py-8 mt-[20px]">
          <p className="text-gray-500">You don't have any active goals yet.</p>
          <p className="text-gray-500 mt-1">
            Click "Add Goals" to create your first goal.
          </p>
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

      <div className="flex justify-center mt-[16px]">
        <button
          className="flex items-center justify-center px-[70px] py-[8px] border border-transparent text-[18px] font-medium rounded-[7px] text-[#FFFFF] bg-[#3A86FF]"
          aria-label="Add Goals"
          onClick={() =>
            document
              .getElementById("add-goal-modal")
              ?.classList.remove("hidden")
          }
        >
          <svg
            className="h-4 w-4 mr-1"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 6v6m0 0v6m0-6h6m-6 0H6"
            />
          </svg>
          <div className="flex flex-row gap-[4px] text-[#FFFF]">
        
            <p>Add</p> <p>Goals</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default GoalsList;
