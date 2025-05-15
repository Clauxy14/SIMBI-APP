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
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg mx-2">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h2 className="text-lg font-semibold">Add New Goal</h2>
          <button className="text-2xl text-gray-400 hover:text-gray-600" onClick={onClose}>×</button>
        </div>
        
        <form onSubmit={handleSubmit} className="p-4 space-y-4">
          <div>
            <label htmlFor="title" className="block font-medium mb-1">Goal Title *</label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Learn React Fundamentals"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="description" className="block font-medium mb-1">Description *</label>
            <input
              type="text"
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Complete React course by June 15th"
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          <div>
            <label htmlFor="dueDate" className="block font-medium mb-1">Due Date *</label>
            <input
              type="date"
              id="dueDate"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
              required
              className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-400"
            />
          </div>

          {partners.length > 0 && (
            <div>
              <label className="block font-medium mb-1">Accountability Partners</label>
              <div className="flex flex-wrap gap-2">
                {partners.map(partner => (
                  <div 
                    key={partner.id} 
                    className={`flex items-center gap-2 border rounded px-2 py-1 cursor-pointer transition ${selectedPartners.includes(partner.id) ? 'border-indigo-500 bg-indigo-50' : 'border-gray-200 bg-white'}`}
                    onClick={() => handlePartnerToggle(partner.id)}
                  >
                    <img 
                      src={partner.avatar} 
                      alt={partner.name} 
                      className="w-8 h-8 rounded-full object-cover" 
                    />
                    <span className="text-sm">{partner.name}</span>
                    {selectedPartners.includes(partner.id) && (
                      <span className="text-indigo-600 font-bold ml-1">✓</span>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2 pt-2">
            <button type="button" className="bg-gray-100 text-gray-700 rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-gray-200" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="bg-indigo-600 text-white rounded-md px-4 py-2 font-semibold text-sm transition hover:bg-indigo-700">
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;