
import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Updated Telegram redirect function with better error handling
  const redirectToTelegram = () => {
    const botUsername = "SimbiStudyBot"; // No @ symbol
    const miniAppPath = "https://simbi-app.vercel.app/telegram"; // The route where your Mini App lives

    // First try the direct mobile app link
    const mobileLink = `tg://resolve?domain=${botUsername}&startapp=${miniAppPath}`;
    window.location.href = mobileLink;

    // If mobile link fails (or on desktop), fallback to web
    setTimeout(() => {
      const webLink =` https://t.me/${botUsername}/${miniAppPath}`;
      window.open(webLink, "_blank");
    }, 100);
  };

  return (
    <div className="general-navbar">
      <div className="nav-logoo" onClick={toggleSidebar}>
        <img src="/assets/icons/Simbi-logo.svg" className="logo" />
        <img src="/assets/icons/cuida_sidebar.svg" alt="collapse" width="25%" />
      </div>

      <div
        className={`sidebars 
      ${sidebarOpen ? "show" : ""}
        `}
      >
        <ul className="sidebar-ul">
          <li className="sidebar-li">
            <Link className="links" to="/dashboard">
              <img
                src="/assets/dashboard.svg"
                style={{
                  height: "24px",
                  width: "24px",
                  marginBottom: "-0.5rem",
                }}
              />
              &nbsp;&nbsp;&nbsp;Dashboard
            </Link>
          </li>
          <li className="sidebar-li">
            <Link className="links" to="/AskSimbi">
              <img
                src="/assets/tiny-logo-icon.svg"
                style={{
                  height: "24px",
                  width: "24px",
                  marginBottom: "-0.5rem",
                }}
              />
              &nbsp;&nbsp;&nbsp;Ask SIMBI
            </Link>
          </li>
          <li>
            <Link className="links" to="/QuizPage">
              <img
                src="/assets/quizzes.svg"
                style={{
                  height: "24px",
                  width: "24px",
                  marginBottom: "-0.5rem",
                }}
              />
              &nbsp;&nbsp;&nbsp;Quizzes
            </Link>
          </li>
          <li>
            <Link className="links" to="/Accountability">
              <img
                src="/assets/progress.svg"
                style={{
                  height: "24px",
                  width: "24px",
                  marginBottom: "-0.5rem",
                }}
              />
              &nbsp;&nbsp;&nbsp;Accountability
            </Link>
          </li>
          
          <li>
            <Link className="links" to="/studyPage">
              <img
                src="/assets/study-plan.svg"
                style={{
                  height: "24px",
                  width: "24px",
                  marginBottom: "-0.5rem",
                }}
              />
              &nbsp;&nbsp;&nbsp;Study Plan
            </Link>
          </li>
        </ul>
        <div className="sidebar-web3-card">
          <h3 className="sidebar-web3-title">Web3</h3>
          <button className="sidebar-telegram-btn" onClick={redirectToTelegram}>
            Connect to Telegram
          </button>
        </div>
      </div>
    </div>
  );
}

export default NavBar;