import React from "react";
import { useNavigate } from "react-router-dom";
import { MetaMaskInpageProvider } from "@metamask/providers";
import "./Wallet.css";

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const ConnectWallet: React.FC = () => {
  const navigate = useNavigate();

  const handleConnect = async (wallet: string) => {
    try {
      if (wallet === "MetaMask" && window.ethereum) {
        const accounts = (await window.ethereum.request({
          method: "eth_requestAccounts",
        })) as string;
        console.log("Connected wallet:", accounts[0]);
        navigate("/welcome");
      } else {
        alert(`${wallet} connection not implemented yet.`);
      }
    } catch (error) {
      console.error("Wallet connection failed:", error);
      alert("Failed to connect wallet.");
    }
  };

  return (
    <div className="wallet-wrapper">
      <div className="logo">
        <img src="/assets/icons/Simbi-logo.png" alt="Simbi Logo" />
      </div>
      <div className="wallet-page">
        <div className="wallet-container">
          <div className="wallet-panel">
            <h2>Connect a wallet</h2>
            <div className="wallet-list">
              <button onClick={() => handleConnect("MetaMask")}>
                <img src="/assets/profile-image/wc-meta.svg" alt="MetaMask" />
                MetaMask
                <span className="arrow">›</span>
              </button>
              <button onClick={() => handleConnect("CoinBase")}>
                <img src="/assets/profile-image/wc-coin.svg" alt="Coinbase" />
                CoinBase Wallet
                <span className="arrow">›</span>
              </button>
              <button onClick={() => handleConnect("WalletConnect")}>
                <img
                  src="/assets/profile-image/wc-connect.svg"
                  alt="WalletConnect"
                />
                WalletConnect
                <span className="arrow">›</span>
              </button>
              <button onClick={() => handleConnect("Keplr")}>
                <img src="/assets/profile-image/wc-base.svg" alt="Keplr" />
                Keplr
                <span className="arrow">›</span>
              </button>
            </div>
          </div>

          <button className="back-link" onClick={() => navigate(-1)}>
            ‹ Back
          </button>
        </div>

        <div className="wallet-character">
          <img
            src="/assets/character-design.png"
            alt="Simbi Character"
            className="wallet-image"
          />
        </div>
      </div>
    </div>
  );
};

export default ConnectWallet;
