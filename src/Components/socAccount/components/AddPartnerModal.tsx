import React, { useState } from 'react';
import { Partner } from '../types';

interface AddPartnerModalProps {
  onClose: () => void;
  onAddPartner: (partner: Partner) => void;
}

const AddPartnerModal: React.FC<AddPartnerModalProps> = ({ onClose, onAddPartner }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  // Predefined avatars to choose from
  const avatarOptions = [
    '/avatars/avatar1.png',
    '/avatars/avatar2.png',
    '/avatars/avatar3.png',
    '/avatars/avatar4.png',
  ];
  const [selectedAvatar, setSelectedAvatar] = useState(avatarOptions[0]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!name || !email) {
      alert('Please fill in all required fields');
      return;
    }

    // Create a new partner object
    const newPartner: Partner = {
      id: Date.now().toString(),
      name,
      avatar: selectedAvatar,
      activeGoals: Math.floor(Math.random() * 5) + 3, // Random number between 3-7
      sharedGoals: 2,
      activeDate: `May ${new Date().getFullYear()}`
    };

    onAddPartner(newPartner);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-2">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Add Accountability Partner</h2>
          <button className="text-2xl text-gray-400 hover:text-gray-600" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="name" className="block font-medium mb-1">Partner Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="email" className="block font-medium mb-1">Email Address *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label className="block font-medium mb-1">Choose Avatar</label>
            <div className="flex gap-3 flex-wrap">
              {avatarOptions.map((avatar, index) => (
                <div 
                  key={index} 
                  className={`relative cursor-pointer border-2 rounded-full p-1 transition ${selectedAvatar === avatar ? 'border-indigo-500' : 'border-gray-200'}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <img src={avatar} alt={`Avatar option ${index + 1}`} className="w-12 h-12 rounded-full object-cover" />
                  {selectedAvatar === avatar && <div className="absolute top-0 right-0 bg-indigo-500 text-white text-xs rounded-full px-1">✓</div>}
                </div>
              ))}
            </div>
          </div>

          <div>
            <label className="block font-medium mb-1">Additional Information</label>
            <textarea
              placeholder="Write a short description about how you know this person or why you want them as an accountability partner..."
              rows={3}
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="bg-gray-100 text-gray-700 rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-gray-200" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700">
              Add Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPartnerModal;