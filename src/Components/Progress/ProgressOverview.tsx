
import { Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip
} from "chart.js";
import "./ProgressOverview.css";

ChartJS.register(ArcElement, Tooltip);

const ProgressOverview = () => {
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
    <div className="progress-chart-container">
      <p className="chart-title">Completion Rate</p>

      <div className="chart-wrapper">
        <Doughnut data={data} options={options} />
      </div>

      <div className="chart-legend">
        <div><span className="dot red" style={{color: "red", backgroundColor: "rgba(245, 245, 245, 1);"}}>.</span> Maths <span className="percent">12.5%</span></div>
        <div><span className="dot green" /> English <span className="percent">25%</span></div>
        <div><span className="dot blue" /> Chemistry <span className="percent">43.41%</span></div>
        <div><span className="dot yellow" /> Biology <span className="percent">12.5%</span></div>
      </div>
    </div>
  );
};

export default ProgressOverview;
