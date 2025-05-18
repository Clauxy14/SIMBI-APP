import React from 'react';

import NavBar from '../NavBar/NavBar';
import SocialAccountability from './main';

const Accountability: React.FC = () => {
  return (
    <div>
      <div className="sidebar">
        <NavBar/>       
      </div>
      <SocialAccountability />
    </div>
  );
};

export default Accountability;