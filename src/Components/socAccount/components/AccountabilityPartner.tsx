import React from 'react';
import { Partner } from '../types';


interface AccountabilityPartnerProps {
  partner: Partner;
}

const AccountabilityPartner: React.FC<AccountabilityPartnerProps> = ({ partner }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-[6px] flex flex-col items-center shadow-[0_0_20px_rgba(0,0,0,0.1)] w-[280px] h-[280px]">
      <div className="relative mb-3">
        <img
          src={partner.avatar}
          alt={partner.name}
          className="w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-4 border-white shadow-md"
        />
        <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-green-400 rounded-full border-2 border-white"></div>
      </div>
      
      <h3 className="text-base md:text-lg font-semibold text-gray-800 mb-1 truncate w-full text-center">{partner.name}</h3>
      <p className="text-xs text-gray-500 mb-3 text-center">
        Active since {new Date(partner.activeDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      
      <div className="w-full space-y-2 bg-gray-50 rounded-xl p-3 mb-3">
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-600">Active Goals</span>
          <span className="text-xs font-semibold text-gray-800 bg-blue-100 text-blue-800 px-2 py-0.5 rounded-full">
            {partner.activeGoals}
          </span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-xs font-medium text-gray-600">Shared Goals</span>
          <span className="text-xs font-semibold text-gray-800 bg-purple-100 text-purple-800 px-2 py-0.5 rounded-full">
      
            {partner.sharedGoals} with you
          </span>
        </div>
      </div>
      
      <button className="w-full py-[8px] px-3 mt-[12px] bg-[#3A86FF] text-[#FFFFF] rounded-[7px] text-xs font-medium hover:bg-blue-700 transition-colors duration-200 shadow-sm hover:shadow-md flex items-center justify-center">
        View Profile
      </button>
    </div>
  );
};

export default AccountabilityPartner;