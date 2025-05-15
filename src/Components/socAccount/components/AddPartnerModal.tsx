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
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add Accountability Partner</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="name">Partner Name *</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="John Doe"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address *</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="john.doe@example.com"
              required
            />
          </div>

          <div className="form-group">
            <label>Choose Avatar</label>
            <div className="avatar-selection">
              {avatarOptions.map((avatar, index) => (
                <div 
                  key={index} 
                  className={`avatar-option ${selectedAvatar === avatar ? 'selected' : ''}`}
                  onClick={() => setSelectedAvatar(avatar)}
                >
                  <img src={avatar} alt={`Avatar option ${index + 1}`} />
                  {selectedAvatar === avatar && <div className="check-icon">✓</div>}
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label>Additional Information</label>
            <textarea
              placeholder="Write a short description about how you know this person or why you want them as an accountability partner..."
              rows={3}
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Add Partner
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPartnerModal;