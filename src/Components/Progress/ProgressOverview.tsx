
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from "chart.js";
import "./ProgressOverview.css";
import { useNavigate } from "react-router-dom";

ChartJS.register(ArcElement, Tooltip);

const ProgressOverview = () => {
  const navigate = useNavigate();
  const data = {
    labels: ["Maths", "English", "Chemistry", "Biology"],
    datasets: [
      {
        data: [12.5, 25, 43.41, 12.5],
        backgroundColor: ["#EF4444", "#10B981", "#3B82F6", "#FACC15"],
        borderWidth: 0,
        cutout: "80%",
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: { enabled: false },
      legend: { display: false },
    },
  };

  return (
    <>
    <h1 className="progress-text">Progress Overview</h1>
    <div className="progress-chart-container">
      <p className="chart-title">Completion Rate</p>

      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>

      <div className="chart-legend">
        <div><span className="dot red" style={{backgroundColor: "red"}} /> &nbsp;&nbsp;&nbsp;Maths&nbsp;&nbsp; <span className="percent">12.5%</span></div>
        <div><span className="dot green" style={{backgroundColor: "green"}} /> &nbsp;&nbsp;&nbsp;English&nbsp;&nbsp; <span className="percent">25%</span></div>
        <div><span className="dot blue" style={{backgroundColor: "blue"}} /> &nbsp;&nbsp;&nbsp;Chemistry&nbsp;&nbsp;  <span className="percent">43.41%</span></div>
        <div><span className="dot yellow" style={{backgroundColor: "yellow"}} /> &nbsp;&nbsp;&nbsp; Biology&nbsp;&nbsp;  <span className="percent">12.5%</span></div>
      </div>
    </div>

    <div className="quick-actions">
    <h3>Quick Actions</h3>
    <button 
      className="quick-btn-ask"
      onClick={() => navigate("/askSimbi")}>
      Ask Simbi
    </button>

    <button 
      className="quick-btn-quiz"
      onClick={() => navigate("/QuizPage")}>
      Take Quiz
    </button>
    </div>
    </>
  );
};

export default ProgressOverview;
