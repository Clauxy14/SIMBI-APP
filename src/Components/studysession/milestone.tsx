// components/milestones.tsx
import React, { useState } from "react";
import "./milestone.css";

interface Milestone {
  id: number;
  title: string;
  completed: boolean;
  createdAt: number;
  completedAt?: number;
}

const Milestones: React.FC = () => {
  const [milestones, setMilestones] = useState<Milestone[]>([]);
  const [newMilestone, setNewMilestone] = useState("");
  const [showInput, setShowInput] = useState(false);

  const handleAddMilestone = () => {
    if (!newMilestone.trim()) return;
    const now = Date.now();
    const newItem: Milestone = {
      id: now,
      title: newMilestone.trim(),
      completed: false,
      createdAt: now,
    };
    setMilestones([...milestones, newItem]);
    setNewMilestone("");
    setShowInput(false);
  };

  const toggleComplete = (id: number) => {
    setMilestones((prev) =>
      prev.map((m) =>
        m.id === id
          ? {
              ...m,
              completed: !m.completed,
              completedAt: !m.completed ? Date.now() : undefined,
            }
          : m
      )
    );
  };

  const timeAgo = (timestamp?: number) => {
    if (!timestamp) return "";
    const minutes = Math.floor((Date.now() - timestamp) / 60000);
    return `Completed ${minutes} minute${minutes !== 1 ? "s" : ""} ago`;
  };

  return (
    <div className="milestones-wrapper">
      {milestones.map((milestone) => (
        <div
          key={milestone.id}
          className={`milestone ${milestone.completed ? "completed" : ""}`}
        >
          <input
            type="checkbox"
            checked={milestone.completed}
            onChange={() => toggleComplete(milestone.id)}
          />
          <div className="milestone-text">
            <strong>{milestone.title}</strong>
            <p>
              {milestone.completed
                ? timeAgo(milestone.completedAt)
                : "Not completed yet"}
            </p>
          </div>
        </div>
      ))}

      {showInput ? (
        <div className="add-milestone-form">
          <input
            type="text"
            placeholder="Enter milestone title..."
            value={newMilestone}
            onChange={(e) => setNewMilestone(e.target.value)}
          />
          <button onClick={handleAddMilestone}>Add</button>
        </div>
      ) : (
        <div className="mileston-contaier">
        <button className="add-btn" onClick={() => setShowInput(true)}>
          + Add Milestone
        </button>
        <button className="track-btn">Track Progress</button>
        </div>
      )}

      
    </div>
  );
};

export default Milestones;
