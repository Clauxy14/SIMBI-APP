

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import CurrentSession from "./currentsession";
import SessionStats from "./sessionstats";
import NavBar from "../NavBar/NavBar";
import TabHeader from "./tabHeader";
import HeadBar from "../headBar/headBar";

import "./studysession.css";

const StudySession: React.FC = () => {
  const [progress] = useState(65);
  const navigate = useNavigate();

  // Use _id param instead of id
  const { _id } = useParams<{ _id: string }>();
  console.log(_id)
 
  useEffect(() => {
    if (!_id) {
      console.error("Session _id is undefined");
      // Redirect to error page or study plan page if _id is missing
      navigate("/error");
    }
  }, [_id, navigate]);

  return (
    <div className="studysession-container">
      <div className="studysesion-Navbar">
        <NavBar />
      </div>
      <div className="studysession-content">
        <div>
          <HeadBar />
        </div>
        <div className="studysession-wrapper">
          <div className="studysession-wrapper1">
            <CurrentSession
              minutes={20}
              seconds={45}
              sessionType="Pomodoro"
              progress={progress}
              onReset={() => alert("Reset clicked")}
              onPause={() => alert("Pause clicked")}
              onCancel={() => alert("Cancel clicked")}
            />

            <SessionStats
              timeElapsed="60:00"
              nextBreakInMinutes={20}
              completedSessions={3}
              totalSessions={4}
              onBreakClick={() => alert("Break started!")}
            />
            <div className="simbi-card">
              <div className="simbi-header">
                <h3>SIMBI Assistant</h3>
                <button className="focus-mode-btn">Focus mode</button>
              </div>
              <div className="simbi-body">
                <img
                  src="/assets/icons/Simbii.svg"
                  alt="Simbi Assistant"
                  className="simbi-image"
                />
                <p className="simbi-help-text">Need Help?</p>
                <button
                  className="asksimbi-btn"
                  onClick={() => navigate("/AskSimbi")}
                >
                  Ask SIMBI
                </button>
              </div>
            </div>
          </div>
          <div className="tabwrapper-session">
            <TabHeader />
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudySession;
