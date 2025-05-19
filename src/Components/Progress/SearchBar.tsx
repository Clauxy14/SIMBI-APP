import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import "./SearchBar.css";
import { useNavigate } from "react-router-dom";

type SearchBarProps = {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => void;
};

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  const navigate = useNavigate();
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );

  useEffect(() => {
    const storedUser = localStorage.getItem("simbiUser");
    const parsedUser = storedUser ? JSON.parse(storedUser) : null;

    if (parsedUser) {
      const name = parsedUser.name || parsedUser.given_name || "User";
      const avatar =
        parsedUser.avatar ||
        `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
          name
        )}`;
      setUser({ name, avatar });
    }
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      onSearch();
    }
  };

  return (
    <div className="top-bar">
      <div className="search-bar-container">
        <input
          type="text"
          placeholder=" Search"
          value={value}
          onChange={onChange}
          onKeyDown={handleKeyDown}
          className="search-bar"
        />
        <FaSearch className="search-icon" onClick={onSearch} role="button" />
      </div>

      <div className="search-bar-line">
        <button className="token-bal-btn" onClick={() => navigate("")}>
          Tokens
        </button>
        <button
          className="connect-wallet-btn"
          onClick={() => navigate("/connect-wallet")}
        >
          Connect Wallet
        </button>
        <span className="bell-icon">
          <img src="/assets/icons/notification-icon.svg" alt="notification" />
        </span>
        <div className="user-details">
          {user && <img src={user.avatar} alt="Avatar" />}
          <span className="username">{user?.name}</span>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
