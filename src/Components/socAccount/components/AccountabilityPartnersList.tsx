import React from "react";
import AccountabilityPartner from "./AccountabilityPartner";
import { useAccountability } from "../contexts/AccountabilityContexts";

const AccountabilityPartnersList: React.FC = () => {
  const { partners } = useAccountability();

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-medium">Your Accountability Network</h2>
      </div>

      {partners.length === 0 ? (
        <div className="text-center py-6 sm:py-8 bg-gray-50 text-base sm:text-[18px]">
          <p className="text-gray-500">
            You haven't added any accountability partners yet.
          </p>
          <p className="text-gray-500 mt-1">
            Add partners to help you stay on track with your goals.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <AccountabilityPartner key={partner.id} partner={partner} />
          ))}
        </div>
      )}

      <div className="flex items-center justify-center mt-4 sm:mt-[16px]">
        <button
          className="flex items-center  px-[70px] py[8px] sm:px-[70px] py-2 sm:py-[8px] border border-transparent text-[18px] sm:text-[18px] font-medium rounded-[7px] text-white bg-[#3A86FF] hover:bg-blue-700"
          aria-label="Add Partner"
          onClick={() =>
            document
              .getElementById("add-partner-modal")
              ?.classList.remove("hidden")
          }
        >
        <div className="flex text-[#FFFFF] gap-[4px]">
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
          Add Partner
        </div>
        </button>
      </div>
    </div>
  );
};

export default AccountabilityPartnersList;
