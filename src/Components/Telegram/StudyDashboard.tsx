import { useState, useEffect } from 'react';
import GroupCard from './GroupCard';
import CreateGroupForm from './CreateGroupForm';
// Update the path below to the correct relative path if needed
import { StudyGroup } from '../../types/telegram';

export default function StudyDashboard({ user }: { user: any }) {
  const [groups, setGroups] = useState<StudyGroup[]>([]);
  const [showCreateForm, setShowCreateForm] = useState(false);

  // Fetch groups on mount
  useEffect(() => {
    const fetchGroups = async () => {
      const res = await fetch(`/api/groups?userId=${user.id}`);
      setGroups(await res.json());
    };
    fetchGroups();
  }, [user.id]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Study Groups</h1>
      
      <button 
        onClick={() => setShowCreateForm(true)}
        className="bg-tg-button text-tg-button-text py-2 px-4 rounded mb-4"
      >
        Create New Group
      </button>

      {showCreateForm && (
        <CreateGroupForm 
          onClose={() => setShowCreateForm(false)}
          onCreated={(newGroup) => setGroups([...groups, newGroup])}
        />
      )}

      <div className="space-y-3">
        {groups.map(group => (
          <GroupCard key={group.id} group={group} userId={user.id} />
        ))}
      </div>
    </div>
  );
}