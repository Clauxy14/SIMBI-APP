// import React from "react";
// import "./CurrentSession.css";

// interface CurrentSessionProps {
//   minutes: number;
//   seconds: number;
//   sessionType: string;
//   progress: number; // value from 0 to 100
//   onReset: () => void;
//   onPause: () => void;
//   onCancel: () => void;
// }

// const CurrentSession: React.FC<CurrentSessionProps> = ({
//   minutes,
//   seconds,
//   sessionType,
//   progress,
//   onReset,
//   onPause,
//   onCancel,
// }) => {
//   const pad = (num: number) => num.toString().padStart(2, "0");

//   const radius = 70;
//   const stroke = 10;
//   const normalizedRadius = radius - stroke / 2;
//   const circumference = normalizedRadius * 2 * Math.PI;
//   const clampedProgress = Math.max(0, Math.min(progress, 100));
//   const strokeDashoffset =
//     circumference - (clampedProgress / 100) * circumference;

//   return (
//     <div className="current-session-container">
//       <div className="header">
//         <h2>Current Session</h2>
//         <div className="tag">{sessionType}</div>
//       </div>

//       <div className="timer-circle">
//         <svg height={radius * 2} width={radius * 2}>
//           <circle
//             stroke="#ddd"
//             fill="transparent"
//             strokeWidth={stroke}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//           />
//           <circle
//             stroke="#1a3fc8"
//             fill="transparent"
//             strokeWidth={stroke}
//             strokeLinecap="round"
//             strokeDasharray={`${circumference} ${circumference}`} // ✅ Valid in TSX
//             strokeDashoffset={strokeDashoffset}
//             r={normalizedRadius}
//             cx={radius}
//             cy={radius}
//             transform={`rotate(-90 ${radius} ${radius})`}
//           />
//         </svg>
//         <div className="timer-text">
//           <span className="time">
//             {pad(minutes)}:{pad(seconds)}{" "}
//             <span className="mins-label">mins</span>
//           </span>
//           <span className="left-label">left</span>
//         </div>
//       </div>

//       <div className="controls">
//         <button onClick={onReset} title="Reset">
//           &#8635;
//         </button>
//         <button onClick={onPause} title="Pause">
//           &#9208;
//         </button>
//         <button onClick={onCancel} title="Cancel">
//           &#10005;
//         </button>
//       </div>

//       <div className="progress-row">
//         <span>Session progress</span>
//         <span>{clampedProgress}%</span>
//       </div>
//       <div className="progress-bar">
//         <div
//           className="progress-fill"
//           style={{ width: `${clampedProgress}% ` }}
//         />
//       </div>
//     </div>
//   );
// };

// export default CurrentSession;
