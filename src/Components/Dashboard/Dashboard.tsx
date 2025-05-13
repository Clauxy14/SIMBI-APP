import { useState } from "react";
import DailyTasks from "../DailyTasks/DailyTasks";
import Navbar from "../NavBar/NavBar";
import PopularSearches from "../PopularSearches/PopularSearches";
import SearchBar from "../PopularSearches/SearchBar"; // Adjust if needed
import Streaks from "../Streaks/Streaks";
import "./Dashboard.css";

function Dashboard() {
    const storedUser = localStorage.getItem("simbiUser");
    const storedUserStreak = localStorage.getItem("simbiUserStreak");

    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    const parsedUserStreak = storedUserStreak ? JSON.parse(storedUserStreak) : null;

    const userName = parsedUser?.name || parsedUser?.given_name || "User";
    const userStreak = parsedUserStreak?.streak || 0;

    const [searchValue, setSearchValue] = useState("");

    return (

        <>
            <SearchBar
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                />
            <div className="sidebar">
                <Navbar />       
            </div>


            <div className="dashboard">

                <div className="welcome">
                    <h1>Welcome, {userName}</h1>
                    <p className="subtitle">
                        Wow, {userStreak}-day streak! Keep this up! Today's<br />
                        quiz is waiting for you... No pressure!
                    </p>
                    <img src="/assets/simbi-welcome.svg" className="welcome-logo" alt="Welcome" />
                </div>

                <div className="dashboard-content">
                <div className="streaks-searches">
                <section className="daily-streak">
                    <Streaks />
                </section>

                <section className="popular-searches">
                    <PopularSearches />
                </section>
                </div>
                <div className="task">
                <section className="daily-tasks">
                    <DailyTasks />
                </section>
                </div>
                </div>

            </div>
        </>
    );
}

export default Dashboard;
