import React, { useState } from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';
import { Goal } from '../types';

const AddGoalModal: React.FC = () => {
  const { addGoal, partners } = useAccountability();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [selectedPartners, setSelectedPartners] = useState<string[]>([]);

  const handleClose = () => {
    document.getElementById('add-goal-modal')?.classList.add('hidden');
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setSelectedPartners([]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newGoal: Omit<Goal, 'id'> = {
      title,
      description,
      deadline: new Date(deadline),
      progress: 0,
      partners: selectedPartners,
      status: 'on track',
      completed: false,
    };
    
    addGoal(newGoal);
    handleClose();
  };

  const togglePartner = (partnerId: string) => {
    setSelectedPartners(prev => 
      prev.includes(partnerId)
        ? prev.filter(id => id !== partnerId)
        : [...prev, partnerId]
    );
  };

  return (
    <div id="add-goal-modal" className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 hidden">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
        <div className="px-6 py-4 border-b">
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-medium">Add New Learning Goal</h3>
            <button onClick={handleClose} className="text-gray-400 hover:text-gray-500">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="px-[6px] py-[4px]">
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-700 mb-1">Goal Title</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Learn React Fundamentals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-[4px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
              <input 
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="e.g., Complete React course"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-[4px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Deadline</label>
              <input 
                type="date"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            
            <div className="mb-[4px]">
              <label className="block text-sm font-medium text-gray-700 mb-1">Accountability Partners</label>
              {partners.length === 0 ? (
                <p className="text-sm text-gray-500">You don't have any accountability partners yet.</p>
              ) : (
                <div className="space-y-2 max-h-32 overflow-y-auto">
                  {partners.map(partner => (
                    <div key={partner.id} className="flex items-center">
                      <input
                        type="checkbox"
                        id={`partner-${partner.id}`}
                        checked={selectedPartners.includes(partner.id)}
                        onChange={() => togglePartner(partner.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                      />
                      <label htmlFor={`partner-${partner.id}`} className="ml-2 text-sm text-gray-700">
                        {partner.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="px-[6px] py-[4px] bg-gray-50 gap-6 text-right rounded-b-lg">
            <button
              type="button"
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 mr-2"
              onClick={handleClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-[#3A86FF] border border-transparent rounded-md shadow-sm hover:bg-blue-700"
            >
              Create Goal
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddGoalModal;