import React, { useState } from 'react';
import { useAccountability } from '../contexts/AccountabilityContexts';
import { Goal } from '../types';
import './AddGoalModal.css';

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
    <div id="add-goal-modal" className="fixed inset-0 z-50 hidden p-[8px]">
      <div className="w-full mx-4 transform modal-content">
        <div className="px-8 py-6  border-gray-100 sticky top-0 bg-white rounded-t-2xl">
          <div className="flex justify-between items-center">
            <h3 className="text-2xl font-semibold text-gray-800">Add New Learning Goal</h3>
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
              <label className="block text-sm font-medium text-gray-700 mb-2">Goal Title</label>
              <input 
                type="text"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                placeholder="e.g., Learn React Fundamentals"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Description</label>
              <textarea 
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 min-h-[100px] resize-none"
                placeholder="e.g., Complete React course and build a portfolio project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Deadline</label>
              <input 
                type="date"
                className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                value={deadline}
                onChange={(e) => setDeadline(e.target.value)}
                required
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Accountability Partners</label>
              {partners.length === 0 ? (
                <p className="text-sm text-gray-500 italic">You don't have any accountability partners yet.</p>
              ) : (
                <div className="space-y-3 max-h-40 overflow-y-auto custom-scrollbar">
                  {partners.map(partner => (
                    <div key={partner.id} className="flex items-center p-2 hover:bg-gray-50 rounded-lg transition-colors duration-200">
                      <input
                        type="checkbox"
                        id={`partner-${partner.id}`}
                        checked={selectedPartners.includes(partner.id)}
                        onChange={() => togglePartner(partner.id)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded transition-colors duration-200"
                      />
                      <label htmlFor={`partner-${partner.id}`} className="ml-3 text-sm text-gray-700 cursor-pointer">
                        {partner.name}
                      </label>
                    </div>
                  ))}
                </div>
              )}
            </div>
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
              className="px-[10px] py-[4px] text-sm font-medium text-white bg-[#3A86FF] border border-transparent rounded-[7px] shadow-sm hover:bg-blue-700 transition-colors duration-200"
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