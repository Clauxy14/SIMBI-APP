import React from "react";
import "./TaskCard.css";

type TaskCardProps = {
  subject: string;
  topic: string;
  time: string;
  progress: number; // value from 0 to 100
};

const TaskCard: React.FC<TaskCardProps> = ({ subject, topic, time, progress }) => {
  return (


    <div className="task-card">
      <h3 className="task-title">{subject}</h3>
      <p className="task-topic">{topic}</p>

      <div className="progress-bar">
        <div className="progress-fill" style={{ width: `${progress}%` }}></div>
      </div>

      <div className="task-time">{time}</div>
    </div>

  );
};

export default TaskCard;
