import { useEffect, useState } from "react";
import WelcomeMobile from "./welcomeMobil";
import WelcomeDesktop from "./welcomeDesktop";

const WelcomePage = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile ? <WelcomeMobile /> : <WelcomeDesktop />;
};

export default WelcomePage;
