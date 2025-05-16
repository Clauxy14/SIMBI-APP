import { useState } from 'react';
// Update the import path below to the correct relative path where StudyGroup is defined.
// For example, if the file is at src/types/telegram.ts, use:
import { StudyGroup } from '../../types/telegram';

export default function CreateGroupForm({
  onClose,
  onCreated
}: {
  onClose: () => void;
  onCreated: (group: StudyGroup) => void;
}) {
  const [topic, setTopic] = useState('');
  const [stake, setStake] = useState(20);
  const [duration, setDuration] = useState(60); // minutes
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch('/api/groups', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topic,
          stakeAmount: stake,
          duration,
        })
      });

      const newGroup = await response.json();
      onCreated(newGroup);
      onClose();
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
      <div className="bg-tg-bg rounded-lg p-6 max-w-md w-full">
        <h2 className="text-lg font-bold mb-4">Create Study Group</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">Topic</label>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              className="w-full p-2 border border-tg-hint rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block mb-2">Stake Amount (SIMBI)</label>
            <input
              type="number"
              min="10"
              value={stake}
              onChange={(e) => setStake(Number(e.target.value))}
              className="w-full p-2 border border-tg-hint rounded"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block mb-2">Duration (minutes)</label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full p-2 border border-tg-hint rounded"
            >
              <option value={30}>30</option>
              <option value={60}>60</option>
              <option value={90}>90</option>
              <option value={120}>120</option>
            </select>
          </div>

          <div className="flex justify-end space-x-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-tg-button-text bg-tg-button-secondary rounded"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-4 py-2 bg-tg-button text-tg-button-text rounded disabled:opacity-50"
            >
              {isSubmitting ? 'Creating...' : 'Create Group'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}