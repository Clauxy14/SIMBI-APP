
import { useState, useEffect } from "react";

import "./headBar.css";

const HeadBar: React.FC = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    const stored = localStorage.getItem("simbiUser");
    if (stored) {
      const parsed = JSON.parse(stored);
      setUser({
        name: parsed.name || parsed.given_name || "User",
        avatar:
          parsed.avatar ||
          `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
            parsed.name || "User"
          )}`,
      });
    }
  }, []);
  return (
    <div className="userinfo">
      <button className="wallet-btn">200 token</button>
      <span className="bell-icon">
        <img src="/assets/icons/notification-icon.svg" alt="notification" />
      </span>
      <div className="user-avatar">
        <img src={user?.avatar} alt="Avatar" />
        <span className="username">{user?.name}</span>
      </div>
      <button className="wallet-btn">Connect Wallet</button>
    </div>
  );
};

export default HeadBar;
