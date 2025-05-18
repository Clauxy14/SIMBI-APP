import React from 'react';
import Dashboard from './components/Dashboard';
import { AccountabilityProvider } from './contexts/AccountabilityContexts';


const SocialAccountability: React.FC = () => {
  return (
   
    <AccountabilityProvider>
   
      <Dashboard />
    </AccountabilityProvider>
  );
};

export default SocialAccountability;