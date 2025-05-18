import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Onboarding from "./Components/Onboarding/onboarding";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ConnectWallet from "./Components/Wallet/Wallet";
// import Welcome from "./Components/welcome/welcome";
import AskSimbi from "./Components/AskSimbi/AskSimbi";
import QuizPage from "./Components/Quiz/QuizPage";
import Quiz from "./Components/Quiz/Quiz"; 
import STUDYPLAAAN from "./Components/studyplaaan/studyplaaan";
import StudySession from "./Components/studysession/studysession";
import LandingPage from "./Components/LandingPage/LandingPage";
import AboutUs from "./Components/LandingPage/AboutUs";
import WelcomePage from "./Components/welcome/welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/landingpage" element={<LandingPage />} />
        <Route path="/about" element={<AboutUs />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        {/* <Route path="/welcome" element={<Welcome />} /> */}
        <Route path="/welcome" element={<WelcomePage />} />
        <Route path="/askSimbi" element={<AskSimbi />} />
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/studyPage" element={<STUDYPLAAAN />} />
        <Route path="/studySession" element={<StudySession />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
