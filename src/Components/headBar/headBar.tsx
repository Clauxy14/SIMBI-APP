/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, useEffect } from "react";
import { ethers } from "ethers";
import axios from "axios";
import "./headBar.css";

const HeadBar: React.FC = () => {
  const [user, setUser] = useState<{ name: string; avatar: string } | null>(
    null
  );
  const [balance, setBalance] = useState<string>("0");
  const [isConnected, setIsConnected] = useState<boolean>(false);

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

    const walletConnected = localStorage.getItem("walletConnected");
    if (walletConnected) {
      setIsConnected(true);
      fetchBalance();
    }
  }, []);

  const fetchBalance = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get("/api/user/balance", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBalance(response.data.data.balance);
    } catch (error) {
      console.error("Failed to fetch balance:", error);
    }
  };

  const connectWalletHandler = async () => {
    try {
      if (!window.ethereum) {
        alert("Please install MetaMask!");
        return;
      }

      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();
      const externalWalletAddress = await signer.getAddress();

      const nonceResponse = await axios.get("/auth/nonce", {
        params: { externalWalletAddress },
      });

      const { nonce } = nonceResponse.data.data;
      const message = `Welcome to Simbi AI!\n\nNonce: ${nonce}`;
      const signature = await signer.signMessage(message);

      const authResponse = await axios.post("/auth/wallet", {
        externalWalletAddress,
        signature,
        nonce,
      });

      const { token, user } = authResponse.data.data;
      localStorage.setItem("authToken", token);
      localStorage.setItem("walletConnected", "true");
      setIsConnected(true);

      if (user) {
        setUser((prev) => ({
          ...prev,
          name: user.name || "Wallet User",
          avatar:
            user.avatar ||
            `https://api.dicebear.com/7.x/bottts/svg?seed=${encodeURIComponent(
              user.name || "WalletUser"
            )}`,
        }));
      }

      await fetchBalance();
    } catch (error: any) {
      console.error("Wallet connection failed:", error);
      if (error.response?.data?.error) {
        alert(`Error: ${error.response.data.error}`);
      } else {
        alert("Wallet connection failed. Please try again.");
      }
    }
  };

  return (
    <div className="userinfo">
      {isConnected ? (
        <button className="wallet-btn">{balance} SIMBI</button>
      ) : (
        <button className="wallet-btn" onClick={connectWalletHandler}>
          Connect Wallet
        </button>
      )}

      <span className="bell-icon">
        <img src="/assets/icons/notification-icon.svg" alt="notification" />
      </span>

      <div className="user-avatar">
        <img src={user?.avatar} alt="Avatar" />
        <span className="username">{user?.name}</span>
      </div>
    </div>
  );
};

export default HeadBar;
