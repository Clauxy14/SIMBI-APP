import React from "react";
import AccountabilityPartner from "./AccountabilityPartner";
import { useAccountability } from "../contexts/AccountabilityContexts";
import { IoAdd } from "react-icons/io5";

const AccountabilityPartnersList: React.FC = () => {
  const { partners } = useAccountability();

  const AddPartnerButton = () => (
    <button
      className="flex items-center justify-center px-[42px] py-[8px] border border-transparent text-[18px] font-medium rounded-[7px] text-[#FFFFF] bg-[#3A86FF]"
      aria-label="Add Partner"
      onClick={() =>
        document
          .getElementById("add-partner-modal")
          ?.classList.remove("hidden")
      }
    >
      <div className="flex items-center justify-center flex-row gap-[4px] text-[#FFFF]">
        <IoAdd className="h-2 w-2 mr-1" />
        <p>Add</p> <p>Partner</p>
      </div>
    </button>
  );

  return (
    <div>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base sm:text-lg font-medium">Your Accountability Network</h2>
        {partners.length > 0 && <AddPartnerButton />}
      </div>

      {partners.length === 0 ? (
        <div className="text-center py-6 sm:py-8 bg-gray-50 text-base sm:text-[18px]">
          <p className="text-gray-500">
            You haven't added any accountability partners yet.
          </p>
          <p className="text-gray-500 mt-1">
            Add partners to help you stay on track with your goals.
          </p>
          <div className="flex justify-center mt-4">
            <AddPartnerButton />
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {partners.map((partner) => (
            <AccountabilityPartner key={partner.id} partner={partner} />
          ))}
        </div>
      )}
    </div>
  );
};

export default AccountabilityPartnersList;
