import { useState } from "react";
import Navbar from "../NavBar/NavBar";
import SearchBar from "../Progress/SearchBar"; // Adjust if needed
import Streaks from "../Streaks/Streaks";
import "./Dashboard.css";
import TaskCard from "../TaskCard/TaskCard";
import ProgressOverview from "../Progress/ProgressOverview";

function Dashboard() {
    const storedUser = localStorage.getItem("simbiUser");
    // const storedUserStreak = localStorage.getItem("simbiUserStreak");

    const parsedUser = storedUser ? JSON.parse(storedUser) : null;
    // const parsedUserStreak = storedUserStreak ? JSON.parse(storedUserStreak) : null;

    const userName = parsedUser?.name || parsedUser?.given_name || "User";
    // const userStreak = parsedUserStreak?.streak || 0;

    const [searchValue, setSearchValue] = useState("");

    return (

        <>

            <div className="sidebar">
                <Navbar />       
            </div>

            <div className="dashboard">

                <SearchBar
                value={searchValue}
                onChange={(e) => setSearchValue(e.target.value)} onSearch={function (): void {
                    throw new Error("Function not implemented.");
                } } />

                <div className="welcome">
                    <h1>Hi, {userName}!</h1>
                    <p className="subtitle">
                        Ready to make today count?<br />
                        Let's hit those study goals — one step at a time
                    </p>
                    <img src="/assets/simbi-welcome.svg" className="welcome-logo" alt="Welcome" />
                </div>
                
                <h2>Daily Streak</h2>
                <section className="daily-streak">
                    <Streaks />
                </section>

                <h2>Today's Tasks</h2>
                <section className="tasks">
                    <TaskCard subject={"Biology"} topic={"Reproduction"} time={"12:00pm-2:00pm"} progress={10} />
                    <TaskCard subject={"Chemistry"} topic={"Oxidation & Ionization"} time={"2:00pm-3:00pm"} progress={45} />
                    <TaskCard subject={"Biology"} topic={"Reproduction"} time={"12:00pm-2:00pm"} progress={10} />
                    <TaskCard subject={"Chemistry"} topic={"Oxidation & Ionization"} time={"2:00pm-3:00pm"} progress={45} />
                </section>    

            </div>
            <div className="progress-overview">
            <ProgressOverview />
            </div>
        </>
    );
}

export default Dashboard;
