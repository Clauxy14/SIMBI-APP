import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Onboarding from "./Components/Onboarding/onboarding";
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ConnectWallet from "./Components/Wallet/Wallet";
import Welcome from "./Components/welcome/welcome";
import Dashboard from "./Dashboard/Dashboard"; 
import AcademicResources from "../src/Components/AcademicSupport"; 
import AskSimbi from "./Components/AskSimbi/AskSimbi";
import QuizPage from "./Components/Quiz/QuizPage";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/get-started" element={<Landing />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        <Route path="/welcome" element={<Welcome />} />

     
        <Route path="/dashboard" element={<Dashboard welcomeImage="./assets/WELCOME, HAPPY.png" />} /> {/* Adjust the path to your image if needed */}
        <Route path="/academic-resources" element={<AcademicResources />} />

    
        <Route path="/askSimbi" element={<AskSimbi />} />
        <Route path="/quizPage" element={<QuizPage />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;