
import React from 'react';
import AccountabilityPartnerCard from './AccountailityPartnerCard';
import { Partner } from '../types';

interface AccountabilityPartnersListProps {
  partners: Partner[];
}

const AccountabilityPartnersList: React.FC<AccountabilityPartnersListProps> = ({ partners }) => {
  // Display a placeholder when no partners are present
  if (partners.length === 0) {
    return (
      <div className="empty-state">
        <p>You have not added any accountability Partner</p>
        <p>Click the "Add Partner" button to connect with someone who can help you stay on track!</p>
      </div>
    );
  }

  return (
    <div className="partners-grid">
      {partners.map(partner => (
        <AccountabilityPartnerCard
          key={partner.id}
          partner={partner}
        />
      ))}
    </div>
  );
};

export default AccountabilityPartnersList;