import React, { useState } from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';
import { Partner } from '../types';

const AddPartnerModal: React.FC = () => {
  const { addPartner } = useAccountability();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // For simplicity, we'll use a placeholder avatar
  const generateAvatar = (name: string) => {
    const colors = [
      'bg-blue-500', 'bg-green-500', 'bg-yellow-500', 
      'bg-red-500', 'bg-purple-500', 'bg-pink-500'
    ];
    const randomColor = colors[Math.floor(Math.random() * colors.length)];
    return `https://ui-avatars.com/api/?name=${encodeURIComponent(name)}&background=${randomColor.substring(3)}&color=fff`;
  };

  const handleClose = () => {
    document.getElementById('add-partner-modal')?.classList.add('hidden');
    resetForm();
  };

  const resetForm = () => {
    setName('');
    setEmail('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newPartner: Omit<Partner, 'id'> = {
      name,
      avatar: generateAvatar(name),
      activeGoals: Math.floor(Math.random() * 5) + 1, // Random number between 1-5 for demo
      sharedGoals: 2,
      activeDate: new Date()
    };
    
    addPartner(newPartner);
    handleClose();
  };

  return (
    <div id="add-partner-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Add Accountability Partner</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-6 py-4">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Partner Name</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
              <input 
                type="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="email@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            
            <p className="text-sm text-gray-500 italic">
              We'll send them an invitation to join your accountability network.
            </p>
          </div>
          
          <div className="px-6 py-3 bg-gray-50 text-right rounded-b-lg">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Send Invitation
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPartnerModal;