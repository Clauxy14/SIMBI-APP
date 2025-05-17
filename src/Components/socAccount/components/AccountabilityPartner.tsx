import React from 'react';
import { Partner } from '../types';

interface AccountabilityPartnerProps {
  partner: Partner;
}

const AccountabilityPartner: React.FC<AccountabilityPartnerProps> = ({ partner }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm p-4 flex flex-col items-center">
      <img
        src={partner.avatar}
        alt={partner.name}
        className="w-16 h-16 rounded-full mb-3"
      />
      <h3 className="font-medium text-gray-900">{partner.name}</h3>
      <p className="text-xs text-gray-500 mb-2">
        Active since {new Date(partner.activeDate).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
      </p>
      
      <div className="w-full mt-2">
        <div className="flex justify-between text-sm mb-1">
          <span>Active Goals:</span>
          <span>{partner.activeGoals}</span>
        </div>
        <div className="flex justify-between text-sm mb-4">
          <span>Shared Goals:</span>
          <span>{partner.sharedGoals} with you</span>
        </div>
      </div>
      
      <button className="w-full py-2 px-4 bg-blue-600 text-white rounded-md text-sm hover:bg-blue-700">
        View Profile
      </button>
    </div>
  );
};

export default AccountabilityPartner;