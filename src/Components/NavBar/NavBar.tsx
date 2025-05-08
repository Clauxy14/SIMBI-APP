import { Link } from "react-router-dom";
import { useState } from "react";
import "./NavBar.css";

function NavBar() {

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    

    <div className="navbar">

        <div className="logo" onClick={toggleSidebar}>
          <img src="/assets/small-logo.svg" className="nav-logo" />
        </div>

      <nav className={`sidebar ${sidebarOpen ? 'show' : ''}`}>



        <ul>
        <li><Link className="links" to=""><img src="/assets/dashboard.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Dashboard</Link></li>
        <li><Link className="links" to="/AskSimbi"><img src="/assets/tiny-logo-icon.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Ask SIMBI</Link></li>
        <li><Link className="links" to="/QuizCard"><img src="/assets/quizzes.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Quizzes</Link></li>
        <li><Link className="links" to=""><img src="/assets/progress.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Progress</Link></li>
        <li><Link className="links" to=""><img src="/assets/trophy.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Trophy Room</Link></li>
        <li><Link className="links" to=""><img src="/assets/study-plan.svg" style={{height: "24px", width: "24px", marginBottom: "-0.5rem"}}/>&nbsp;&nbsp;&nbsp;Study Plan</Link></li>
        </ul>
      </nav>

    </div>
  );
}

export default NavBar;