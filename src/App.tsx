import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Onboarding from "./Components/Onboarding/onboarding";
import Landing from "./Components/Landing/Landing";
import Signup from "./Components/Signup/Signup";
import Login from "./Components/Login/Login";
import ConnectWallet from "./Components/Wallet/Wallet";
import Welcome from "./Components/Welcome/Welcome";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Onboarding />} />
        <Route path="/get-started" element={<Landing />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/connect-wallet" element={<ConnectWallet />} />
        <Route path="/welcome" element={<Welcome />} />
      </Routes>
    </Router>
  );
}

export default App;
