import React, { useState } from 'react';
import { Goal, Partner } from '../types';

interface AddGoalModalProps {
  onClose: () => void;
  onAddGoal: (goal: Goal) => void;
  partners: Partner[];
}

const AddGoalModal: React.FC<AddGoalModalProps> = ({ onClose, onAddGoal, partners }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [dueDate, setDueDate] = useState('');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form inputs
    if (!title || !description || !dueDate) {
      alert('Please fill in all required fields');
      return;
    }

    // Create a new goal object
    const newGoal: Goal = {
      id: Date.now().toString(),
      title,
      description,
      dueDate,
      progress: 0,
      status: 'on track',
      accountabilityPartners: selectedPartners
    };

    onAddGoal(newGoal);
  };

  const handlePartnerToggle = (partnerId: string) => {
    setSelectedPartners(prevSelected => 
      prevSelected.includes(partnerId)
        ? prevSelected.filter(id => id !== partnerId)
        : [...prevSelected, partnerId]
    );
  };

  return (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <h2>Add New Goal</h2>
          <button className="close-button" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="modal-form">
          <div className="form-group">
            <label htmlFor="title">Goal Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Learn React Fundamentals"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="description">Description *</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Complete React course by June 15th"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="dueDate">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
            />
          </div>

          {partners.length > 0 && (
            <div className="form-group">
              <label>Accountability Partners</label>
              <div className="partners-selection">
                {partners.map(partner => (
                  <div 
                    key={partner.id} 
                    className={`partner-checkbox ${selectedPartners.includes(partner.id) ? 'selected' : ''}`}
                    onClick={() => handlePartnerToggle(partner.id)}
                  >
                    <img 
                      src={partner.avatar} 
                      alt={partner.name} 
                      className="partner-avatar-small" 
                    />
                    <span>{partner.name}</span>
                    {selectedPartners.includes(partner.id) && (
                      <span className="check-icon">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="modal-actions">
            <button type="button" className="secondary-button" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="primary-button">
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;