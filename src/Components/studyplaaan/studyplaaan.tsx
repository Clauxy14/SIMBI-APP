

// import React, { useState, useEffect } from "react";
// import NavBar from "../NavBar/NavBar";
// import { useNavigate } from "react-router-dom";
// import { MdDelete } from "react-icons/md";
// import "./studyplaaan.css";

// interface Session {
//   _id?: string; // Optional during creation
//   subject: string;
//   topic: string;
//   date: string;
//   time: string;
//   duration: number;
// }

// const formatDate = (dateStr: string) => {
//   const date = new Date(dateStr);
//   return date.toLocaleDateString(undefined, {
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });
// };

// const calculateDaysRemaining = (sessionDate: string): number => {
//   const session = new Date(sessionDate);
//   const now = new Date();
//   const diffTime = session.getTime() - now.getTime();
//   return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
// };

// const formatTimeRange = (time: string, duration: number): string => {
//   const [hours, minutes] = time.split(":").map(Number);
//   const start = new Date();
//   start.setHours(hours, minutes, 0, 0);
//   const end = new Date(start.getTime() + duration * 60000);
//   const options: Intl.DateTimeFormatOptions = {
//     hour: "numeric",
//     minute: "2-digit",
//     hour12: true,
//   };
//   return `${start.toLocaleTimeString([], options)} - ${end.toLocaleTimeString([], options)}`;
// };

// const STUDYPLAAAN: React.FC = () => {
//   const [sessions, setSessions] = useState<Session[]>([]);
//   const [showModal, setShowModal] = useState(false);
//   const [formData, setFormData] = useState<Omit<Session, "_id">>({
//     subject: "",
//     topic: "",
//     date: "",
//     time: "",
//     duration: 60,
//   });
//   const [showSuccess, setShowSuccess] = useState(false);
//   const navigate = useNavigate();

//   const getToken = (): string | null =>
//     localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

//   const fetchSessions = async () => {
//     const token = getToken();
//     if (!token) {
//       alert("You're not logged in. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       if (!res.ok) {
//         if (res.status === 401) {
//           alert("Session expired or unauthorized. Please log in again.");
//           localStorage.removeItem("authToken");
//           navigate("/login");
//           return;
//         }
//         const errorText = await res.text();
//         throw new Error(`Error ${res.status}: ${errorText}`);
//       }

//       const data = await res.json();
//       if (Array.isArray(data)) {
//         setSessions(data);
//       } else if (Array.isArray(data.sessions)) {
//         setSessions(data.sessions);
//       } else {
//         console.error("Unexpected response format:", data);
//       }
//     } catch (error) {
//       console.error("Error fetching sessions:", error);
//     }
//   };

//   useEffect(() => {
//     fetchSessions();
//   }, []);

//   const addSession = async () => {
//     const token = getToken();
//     if (!token) {
//       alert("You're not logged in. Please log in again.");
//       navigate("/login");
//       return;
//     }

//     try {
//       const { subject, topic, date, time, duration } = formData;

//       const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ subject, topic, date, time, duration }),
//       });

//       if (res.ok) {
//          const newSession = await res.json();

//       // Save subject, date, and time for this session in localStorage
//       if (newSession._id) {
//        console.log("Saving session to localStorage:", newSession._id);
// localStorage.setItem(`session_${newSession._id}`, JSON.stringify({
//   subject: newSession.subject,
//   date: newSession.date,
//   time: newSession.time,
// }));

//       }
//         setFormData({
//           subject: "",
//           topic: "",
//           date: "",
//           time: "",
//           duration: 60,
//         });
//         setShowModal(false);
//         setShowSuccess(true);
//         fetchSessions();
//         setTimeout(() => setShowSuccess(false), 3000);
//       } else {
//         const errorText = await res.text();
//         console.error("Failed to add session. Response:", errorText);
//       }
//     } catch (error) {
//       console.error("Error posting session:", error);
//     }
//   };

//   const isSameDay = (date1: string, date2: string): boolean => {
//     const d1 = new Date(date1);
//     const d2 = new Date(date2);
//     return (
//       d1.getFullYear() === d2.getFullYear() &&
//       d1.getMonth() === d2.getMonth() &&
//       d1.getDate() === d2.getDate()
//     );
//   };

//   const today = new Date();
//   const tomorrow = new Date();
//   tomorrow.setDate(today.getDate() + 1);
//   const formattedToday = today.toLocaleDateString(undefined, {
//     weekday: "long",
//     year: "numeric",
//     month: "long",
//     day: "numeric",
//   });

//   return (
//     <div className="studyplan-container">
//       <div className="studyplan-navbar">
//         <NavBar />
//       </div>
//       <div className="studyplan-content">
//         <header className="studyplan-header">
//           <h1>Your Study Plan</h1>
//           <div className="studyplan-header-button">
//             <button onClick={() => setShowModal(true)} className="studyplan-add-btn">+ Add Session</button>
//             <button onClick={() => navigate("/AskSimbi")} className="studyplan-ask-btn">Ask Simbi</button>
//           </div>
//         </header>

//         {/* Today */}
//         <div className="section">
//           <h2>Today</h2>
//           <p>{formattedToday}</p>
//           {sessions.filter(s => isSameDay(s.date, today.toISOString())).map((s, i) => (
//             <div key={s._id || i} className="session-card-all"
//               onClick={() => navigate(`/study-session/${s._id}`)}>
//               <div>
//                 <strong>{s.subject}</strong>
//                 <p>{s.topic}</p>
//                 <span>{formatDate(s.date)}</span>
//               </div>
//               <div>
//                 <div className="delete-div">
//                   <div>→</div>
//                   <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
//                 </div>
//                 <span>{formatTimeRange(s.time, s.duration)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Tomorrow */}
//         <div className="section">
//           <h2>Tomorrow</h2>
//           {sessions.filter(s => isSameDay(s.date, tomorrow.toISOString())).map((s, i) => (
//             <div key={s._id || i} className="session-card-1"
//               onClick={() => navigate(`/study-session/${s._id}`)}>
//               <div>
//                 <strong>{s.subject}</strong>
//                 <p>{s.topic}</p>
//                 <span style={{ color: "red", fontSize: "14px" }}>
//                   Deadline in {calculateDaysRemaining(s.date)} day{calculateDaysRemaining(s.date) !== 1 ? "s" : ""}
//                 </span>
//                 <p>{formatDate(tomorrow.toISOString())}</p>
//               </div>
//               <div>
//                 <div className="delete-div">
//                   <div>→</div>
//                   <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
//                 </div>
//                 <span>{formatTimeRange(s.time, s.duration)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Missed Sessions */}
//         <div className="section">
//           <h2 style={{ color: "#C2402E" }}>Missed Sessions</h2>
//           {sessions.filter(s => new Date(s.date) < today).map((s, i) => (
//             <div key={s._id || i} className="session-card-missed"
//               onClick={() => navigate(`/study-session/${s._id}`)}>
//               <div>
//                 <strong>{s.subject}</strong>
//                 <p>{s.topic}</p>
//                 <span>{formatDate(s.date)}</span>
//               </div>
//               <div>
//                 <div className="delete-div">
//                   <div>→</div>
//                   <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
//                 </div>
//                 <span>{formatTimeRange(s.time, s.duration)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* All Sessions */}
//         <div className="section">
//           <h2>All Scheduled Sessions</h2>
//           {sessions.map((s, i) => (
//             <div key={s._id || i} className="session-card-all"
//               onClick={() => navigate(`/study-session/${s._id}`)}>
//               <div>
//                 <strong>{s.subject}</strong>
//                 <p>{s.topic}</p>
//                 <span>{formatDate(s.date)}</span>
//               </div>
//               <div>
//                 <div className="delete-div">
//                   <div>→</div>
//                   <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
//                 </div>
//                 <span>{formatTimeRange(s.time, s.duration)}</span>
//               </div>
//             </div>
//           ))}
//         </div>

//         {/* Add Session Modal */}
//         {showModal && (
//           <div className="modal">
//             <div className="modal-content">
//               <h3>Add Study Session</h3>
//               <input placeholder="Subject" value={formData.subject}
//                 onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
//               <input placeholder="Topic" value={formData.topic}
//                 onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
//               <input type="date" value={formData.date}
//                 onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
//               <input type="time" value={formData.time}
//                 onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
//               <select value={formData.duration}
//                 onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}>
//                 <option value={30}>30 minutes</option>
//                 <option value={45}>45 minutes</option>
//                 <option value={60}>1 hour</option>
//                 <option value={120}>2 hours</option>
//                 <option value={180}>3 hours</option>
//               </select>
//               <div className="modal-buttons">
//                 <button onClick={() => setShowModal(false)}>Cancel</button>
//                 <button onClick={addSession}>Add Session</button>
//               </div>
//             </div>
//           </div>
//         )}

//         {showSuccess && (
//           <div className="success-popup">
//             Your session has been added to your schedule successfully
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default STUDYPLAAAN;




import React, { useState, useEffect } from "react";
import NavBar from "../NavBar/NavBar";
import { useNavigate } from "react-router-dom";
import { MdDelete } from "react-icons/md";
import "./studyplaaan.css";

interface Session {
  _id?: string; // Optional during creation
  subject: string;
  topic: string;
  date: string;
  time: string;
  duration: number;
}

const formatDate = (dateStr: string) => {
  const date = new Date(dateStr);
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
};

const calculateDaysRemaining = (sessionDate: string): number => {
  const session = new Date(sessionDate);
  const now = new Date();
  const diffTime = session.getTime() - now.getTime();
  return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
};

const formatTimeRange = (time: string, duration: number): string => {
  const [hours, minutes] = time.split(":").map(Number);
  const start = new Date();
  start.setHours(hours, minutes, 0, 0);
  const end = new Date(start.getTime() + duration * 60000);
  const options: Intl.DateTimeFormatOptions = {
    hour: "numeric",
    minute: "2-digit",
    hour12: true,
  };
  return` ${start.toLocaleTimeString([], options)} - ${end.toLocaleTimeString([], options)}`;
};

const STUDYPLAAAN: React.FC = () => {
  const [sessions, setSessions] = useState<Session[]>([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState<Omit<Session, "_id">>({
    subject: "",
    topic: "",
    date: "",
    time: "",
    duration: 60,
  });
  const [showSuccess, setShowSuccess] = useState(false);
  const navigate = useNavigate();

  const getToken = (): string | null =>
    localStorage.getItem("authToken") || sessionStorage.getItem("authToken");

  const fetchSessions = async () => {
    const token = getToken();
    if (!token) {
      alert("You're not logged in. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
        headers: {
          "Content-Type": "application/json",
          Authorization:`Bearer ${token}`,
        },
      });

      if (!res.ok) {
        if (res.status === 401) {
          alert("Session expired or unauthorized. Please log in again.");
          localStorage.removeItem("authToken");
          navigate("/login");
          return;
        }
        const errorText = await res.text();
        throw new Error(`Error ${res.status}: ${errorText}`);
      }

      const data = await res.json();
      if (Array.isArray(data)) {
        setSessions(data);
      } else if (Array.isArray(data.sessions)) {
        setSessions(data.sessions);
      } else {
        console.error("Unexpected response format:", data);
      }
    } catch (error) {
      console.error("Error fetching sessions:", error);
    }
  };

  useEffect(() => {
    fetchSessions();
  }, []);

  const addSession = async () => {
    const token = getToken();
    if (!token) {
      alert("You're not logged in. Please log in again.");
      navigate("/login");
      return;
    }

    try {
      const { subject, topic, date, time, duration } = formData;

      const res = await fetch("https://simbi-ai.onrender.com/api/sessions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, topic, date, time, duration }),
      });

      if (res.ok) {
         const newSession = await res.json();

      // Save subject, date, and time for this session in localStorage
      if (newSession._id) {
       console.log("Saving session to localStorage:", newSession._id);



      }
        setFormData({
          subject: "",
          topic: "",
          date: "",
          time: "",
          duration: 60,
        });
        setShowModal(false);
        setShowSuccess(true);
        fetchSessions();
        setTimeout(() => setShowSuccess(false), 3000);
      } else {
        const errorText = await res.text();
        console.error("Failed to add session. Response:", errorText);
      }
    } catch (error) {
      console.error("Error posting session:", error);
    }
  };

  const isSameDay = (date1: string, date2: string): boolean => {
    const d1 = new Date(date1);
    const d2 = new Date(date2);
    return (
      d1.getFullYear() === d2.getFullYear() &&
      d1.getMonth() === d2.getMonth() &&
      d1.getDate() === d2.getDate()
    );
  };

  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  const formattedToday = today.toLocaleDateString(undefined, {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="studyplan-container">
      <div className="studyplan-navbar">
        <NavBar />
      </div>
      <div className="studyplan-content">
        <header className="studyplan-header">
          <h1>Your Study Plan</h1>
          <div className="studyplan-header-button">
            <button onClick={() => setShowModal(true)} className="studyplan-add-btn">+ Add Session</button>
            <button onClick={() => navigate("/AskSimbi")} className="studyplan-ask-btn">Ask Simbi</button>
          </div>
        </header>

        {/* Today */}
        <div className="section">
          <h2>Today</h2>
          <p>{formattedToday}</p>
          {sessions.filter(s => isSameDay(s.date, today.toISOString())).map((s, i) => (
            <div key={s._id || i} className="session-card-all"
              onClick={() => navigate(`/study-session/${s._id}`)}>
              <div>
                <strong>{s.subject}</strong>
                <p>{s.topic}</p>
                <span>{formatDate(s.date)}</span>
              </div>
              <div>
                <div className="delete-div">
                  <div>→</div>
                  <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
                </div>
                <span>{formatTimeRange(s.time, s.duration)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Tomorrow */}
        <div className="section">
          <h2>Tomorrow</h2>
          {sessions.filter(s => isSameDay(s.date, tomorrow.toISOString())).map((s, i) => (
            <div key={s._id || i} className="session-card-1"
              onClick={() => navigate(`/study-session/${s._id}`)}>
              <div>
                <strong>{s.subject}</strong>
                <p>{s.topic}</p>
                <span style={{ color: "red", fontSize: "14px" }}>
                  Deadline in {calculateDaysRemaining(s.date)} day{calculateDaysRemaining(s.date) !== 1 ? "s" : ""}
                </span>
                <p>{formatDate(tomorrow.toISOString())}</p>
              </div>
              <div>
                <div className="delete-div">
                  <div>→</div>
                  <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
                </div>
                <span>{formatTimeRange(s.time, s.duration)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Missed Sessions */}
        <div className="section">
          <h2 style={{ color: "#C2402E" }}>Missed Sessions</h2>
          {sessions.filter(s => new Date(s.date) < today).map((s, i) => (
            <div key={s._id || i} className="session-card-missed"
              onClick={() => navigate(`/study-session/${s._id}`)}>
              <div>
                <strong>{s.subject}</strong>
                <p>{s.topic}</p>
                <span>{formatDate(s.date)}</span>
              </div>
              <div>
                <div className="delete-div">
                  <div>→</div>
                  <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
                </div>
                <span>{formatTimeRange(s.time, s.duration)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* All Sessions */}
        <div className="section">
          <h2>All Scheduled Sessions</h2>
          {sessions.map((s, i) => (
            <div key={s._id || i} className="session-card-all"
              onClick={() => navigate(`/study-session/${s._id}`)}>
              <div>
                <strong>{s.subject}</strong>
                <p>{s.topic}</p>
                <span>{formatDate(s.date)}</span>
              </div>
              <div>
                <div className="delete-div">
                  <div>→</div>
                  <MdDelete style={{ cursor: "pointer", color: "red", fontSize: "1.5rem" }} />
                </div>
                <span>{formatTimeRange(s.time, s.duration)}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Add Session Modal */}
        {showModal && (
          <div className="modal">
            <div className="modal-content">
              <h3>Add Study Session</h3>
              <input placeholder="Subject" value={formData.subject}
                onChange={(e) => setFormData({ ...formData, subject: e.target.value })} />
              <input placeholder="Topic" value={formData.topic}
                onChange={(e) => setFormData({ ...formData, topic: e.target.value })} />
              <input type="date" value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })} />
              <input type="time" value={formData.time}
                onChange={(e) => setFormData({ ...formData, time: e.target.value })} />
              <select value={formData.duration}
                onChange={(e) => setFormData({ ...formData, duration: Number(e.target.value) })}>
                <option value={30}>30 minutes</option>
                <option value={45}>45 minutes</option>
                <option value={60}>1 hour</option>
                <option value={120}>2 hours</option>
                <option value={180}>3 hours</option>
              </select>
              <div className="modal-buttons">
                <button onClick={() => setShowModal(false)}>Cancel</button>
                <button onClick={addSession}>Add Session</button>
              </div>
            </div>
          </div>
        )}

        {showSuccess && (
          <div className="success-popup">
            Your session has been added to your schedule successfully
          </div>
        )}
      </div>
    </div>
  );
};

export default STUDYPLAAAN;