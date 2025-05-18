import React, { useState } from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';
import { Partner } from '../types';
import './AddPartnerModal.css';

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
    <div id="add-partner-modal" className="fixed inset-0 z-50 hidden">
      <div className="w-full  gap-[4px] mx-4 transform modal-content">
        <div className="px-8 py-6  border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Add Accountability Partner</h3>
            <button 
              onClick={handleClose} 
              className="text-gray-400 hover:text-gray-500 transition-colors duration-200"
            >
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="px-8 py-6">
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Partner Name</label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="Full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
              <input 
                type="email"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
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
          
          <div className="mt-[8px] flex justify-end gap-[6px] sticky bottom-0 bg-white pt-4 border-t border-gray-100">
            <button
              type="button"
              className="px-[6px] py-[4px] text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-[7px] shadow-sm hover:bg-gray-50 transition-colors duration-200"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-[6px] py-[4px] text-sm font-medium text-white bg-[#3A86FF] border border-transparent rounded-[7px] shadow-sm hover:bg-blue-700 transition-colors duration-200"
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