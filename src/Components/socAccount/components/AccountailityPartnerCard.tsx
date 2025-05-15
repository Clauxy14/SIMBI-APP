
import React from 'react';
import { Partner } from '../types';

interface AccountabilityPartnerCardProps {
  partner: Partner;
}

const AccountabilityPartnerCard: React.FC<AccountabilityPartnerCardProps> = ({ partner }) => {
  return (
    <div className="partner-card">
      <div className="partner-avatar">
        <img src={partner.avatar} alt={partner.name} />
      </div>
      <div className="partner-info">
        <h3>{partner.name}</h3>
        <p>Active since {partner.activeDate}</p>
      </div>
      <div className="partner-stats">
        <div className="stat">
          <span className="stat-label">Active Goals:</span>
          <span className="stat-value">{partner.activeGoals}</span>
        </div>
        <div className="stat">
          <span className="stat-label">Shared Goals:</span>
          <span className="stat-value">{partner.sharedGoals} with you</span>
        </div>
      </div>
      <button className="primary-button full-width">View Profile</button>
    </div>
  );
};

export default AccountabilityPartnerCard;