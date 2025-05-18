import { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Loading from "./loading";
import WelcomePage from "./Components/welcome/welcome";

// import AcademicResources from "../src/Components/AcademicSupport";

// Lazy load your pages
const Onboarding = lazy(() => import("./Components/Onboarding/onboarding"));
const Signup = lazy(() => import("./Components/Signup/Signup"));
const Login = lazy(() => import("./Components/Login/Login"));
const ConnectWallet = lazy(() => import("./Components/Wallet/Wallet"));
const Welcome = lazy(() => import("./Components/welcome/welcome"));
// import AcademicResources from "../src/Components/AcademicSupport";
const SocialAccountability = lazy(() => import("./Components/socAccount"));
const AskSimbi = lazy(() => import("./Components/AskSimbi/AskSimbi"));
const QuizPage = lazy(() => import("./Components/Quiz/QuizPage"));
const STUDYPLAAAN = lazy(() => import("./Components/studyplaaan/studyplaaan"));
const StudySession = lazy(() => import("./Components/studysession/studysession"));
const LandingPage = lazy(() => import("./Components/LandingPage/LandingPage"));
const AboutUs = lazy(() => import("./Components/LandingPage/AboutUs"));
const NotFound = lazy(() => import("./not-found"));


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
          <Route path="/welcome" element={<WelcomePage />} />
          /* Adjust the path to your image if needed */
          {/* <Route path="/academic-resources" element={<AcademicResources />} />  */}
          <Route
            path="/SocialAccountability"
            element={<SocialAccountability />}
          />
          <Route path="/askSimbi" element={<AskSimbi />} />
          <Route path="/quizPage" element={<QuizPage />} />
          <Route path="/studyPage" element={<STUDYPLAAAN />} />
          <Route path="/studySession" element={<StudySession />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Suspense>

    </Router>
  );
}

export default App;
