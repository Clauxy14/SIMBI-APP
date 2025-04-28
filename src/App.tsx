import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./Components/onboarding";
import Signup from "./Components/Signup.tsx";
import VerifyCode from "./Components/VerifyCode";
import Login from "./Components/Login";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/verify-code" element={<VerifyCode />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </Router>
  );
}

export default App;
