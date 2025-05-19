import { Suspense, lazy } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Loading from "./loading";
import MainLayout from "./Components/Layout/MainLayout";
import Accountability from "./Components/socAccount";
// import TrophyRoom from "./Components/TrophyRoom/TrophyRoom";

// Lazy load your pages
const Onboarding = lazy(() => import("./Components/Onboarding/onboarding"));
const Signup = lazy(() => import("./Components/Signup/Signup"));
const Login = lazy(() => import("./Components/Login/Login"));
const ConnectWallet = lazy(() => import("./Components/Wallet/Wallet"));
const Welcome = lazy(() => import("./Components/welcome/welcome"));
// const SocialAccountability = lazy(() => import("./Components/socAccount/main"));
const AskSimbi = lazy(() => import("./Components/AskSimbi/AskSimbi"));
const QuizPage = lazy(() => import("./Components/Quiz/QuizPage"));
const Quiz = lazy(() => import("./Components/Quiz/Quiz"));
const QuizResult = lazy(() => import("./Components/Quiz/Result"));
const STUDYPLAAAN = lazy(() => import("./Components/studyplaaan/studyplaaan"));
const StudySession = lazy(
  () => import("./Components/studysession/studysession")
);
const LandingPage = lazy(() => import("./Components/LandingPage/LandingPage"));
const AboutUs = lazy(() => import("./Components/LandingPage/AboutUs"));
const NotFound = lazy(() => import("./not-found"));
const Dashboard = lazy(() => import("./Components/Dashboard/Dashboard"));

function App() {
  return (
    <Router>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Onboarding />} />
          <Route path="/landingpage" element={<LandingPage />} />
          <Route path="/about" element={<AboutUs />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/connect-wallet" element={<ConnectWallet />} />
          <Route path="/welcome" element={<Welcome />} />

          {/* Routes with NavBar */}
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/Accountability" element={<Accountability/>} />
            <Route path="/AskSimbi" element={<AskSimbi />} />
            <Route path="/QuizPage" element={<QuizPage />} />
            <Route path="/quiz" element={<Quiz />} />
            <Route path="/result" element={<QuizResult />} />
            <Route path="/studyPage" element={<STUDYPLAAAN />} />
            {/* <Route path="/trophy-room" element={<TrophyRoom />} /> */}
          </Route>
          <Route path="/study-session/:_id" element={<StudySession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
