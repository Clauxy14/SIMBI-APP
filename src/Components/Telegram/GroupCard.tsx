
import { Link } from "react-router-dom";

import { StudyGroup } from '../../types/telegram';

export default function GroupCard({ 
  group,
  userId 
}: {
  group: StudyGroup;
  userId: number;
}) {
  const isCreator = group.creatorId === userId;
  const completedCount = group.participants.filter(p => p.completed).length;

  return (
    <div className="border border-tg-hint rounded-lg p-4">
      <h3 className="font-bold">{group.topic}</h3>
      <div className="flex justify-between mt-2 text-sm">
        <span>Stake: {group.stakeAmount} SIMBI</span>
        <span>{completedCount}/{group.participants.length} completed</span>
      </div>
      
      <div className="mt-3 flex space-x-2">
        <Link 
          to={`/telegram/session/${group.id}`}
          className="bg-tg-button text-tg-button-text py-1 px-3 rounded text-sm"
        >
          {isCreator ? 'Manage' : 'View'}
        </Link>
      </div>
    </div>
  );
}