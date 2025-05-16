import { useState, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import './TrophyRoom.css';
import SimbiLogo from '../Components/assets/Simbii.svg';
import DashboardIcon from '../Components/assets/Component 1.png';
import AskSimbiIcon from '../Components/assets/Simbii.svg';
import QuizIcon from '../Components/assets/Component 2.png';
import SocialIcon from '../Components/assets/Component 3.png';
import TrophyIcon from '../Components/assets/cup.png';
import StudyPlanIcon from '../Components/assets/studyp.png';
import QuizTrophy from '../Components/assets/Frame 1707479062 (1).png';
import StreakTrophy from '../Components/assets/Frame 1707479063 (2).png';
import GroupTrophy from '../Components/assets/Frame 1707479060.png';
import SubjectTrophy from '../Components/assets/Frame 1707479065.png';
import CollaborationTrophy from '../Components/assets/image 130.png';
import FastLearnerTrophy from '../Components/assets/Frame 1707479060 (1).png';
import MetaMaskIcon from '../Components/assets/wc-meta.svg';
import { MetaMaskInpageProvider } from '@metamask/providers';

declare global {
  interface Window {
    ethereum?: MetaMaskInpageProvider;
  }
}

const TrophyRoom = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isMetaMaskInstalled, setIsMetaMaskInstalled] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<string>('');

  useEffect(() => {
    const checkMetaMask = async () => {
      if (window.ethereum && window.ethereum.isMetaMask) {
        setIsMetaMaskInstalled(true);
        try {
          const accounts = (await window.ethereum.request({ method: 'eth_accounts' })) as string[];
          if (accounts.length > 0) {
            setIsConnected(true);
            setConnectionStatus('Connected');
          } else {
            setConnectionStatus('No accounts connected');
          }
        } catch (error) {
          console.error('Error checking MetaMask accounts:', error);
          setConnectionStatus('Error checking connection');
        }
      } else {
        setIsMetaMaskInstalled(false);
        setConnectionStatus('Please install MetaMask');
      }
      setIsModalOpen(true); 
    };
    checkMetaMask();
  }, []);

  const connectMetaMask = async () => {
    if (!isMetaMaskInstalled) {
      setConnectionStatus('Please install MetaMask');
      window.open('https://metamask.io/download/', '_blank');
      return;
    }

    try {
      const accounts = (await window.ethereum!.request({
        method: 'eth_requestAccounts',
      })) as string[];

      if (accounts.length > 0) {
        setIsConnected(true);
        setConnectionStatus('Connected');
        setIsModalOpen(false);
      } else {
        setConnectionStatus('Please sign in to MetaMask');
      }
    } catch (error: any) {
      if (error.code === 4001) {
        setConnectionStatus('Connection rejected. Please sign in.');
      } else {
        setConnectionStatus('Error connecting to MetaMask');
        console.error('MetaMask connection error:', error);
      }
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const skipForNow = () => {
    setIsModalOpen(false);
  };

  // Sidebar navigation items
  // u can add it with actual navigation 
  const navItems = [
    { name: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
    { name: 'Ask Simbi', icon: AskSimbiIcon, path: '/asksimbi' },
    { name: 'Quizzes', icon: QuizIcon, path: '/quizzes' },
    { name: 'Social Acct.', icon: SocialIcon, path: '' },
    { name: 'Trophy Room', icon: TrophyIcon, path: '' },
    { name: 'Study Plans', icon: StudyPlanIcon, path: '' },
  ];

  return (
    <div className="trophy-room-wrapper">
      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal-content">
            <button onClick={closeModal} className="close-button">
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-6 w-6">
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M17.78 6.22a1 1 0 0 1 1.414 1.414L13.414 12l5.78 5.78a1 1 0 0 1-1.414 1.414L12 13.414l-5.78 5.78a1 1 0 0 1-1.414-1.414L10.586 12 4.82 6.22a1 1 0 0 1 1.414-1.414L12 10.586l5.78-5.78z"
                />
              </svg>
            </button>
            <div className="modal-header">
              <div className="trophy-icon">🏆</div>
              <h2>Trophy Room Access</h2>
            </div>
            <div className="modal-body">
              <p className="modal-description">
                {connectionStatus || 'Connect your MetaMask wallet to Simbi Trophy Room and view your achievements.'}
              </p>
              <ul className="wallet-options">
                <li className="wallet-item">
                  <button onClick={connectMetaMask} className="wallet-btn">
                    <img src={MetaMaskIcon} alt="MetaMask" className="wallet-icon" />
                    <span>MetaMask</span>
                    <svg viewBox="0 0 20 20" fill="currentColor" className="arrow-icon">
                      <path
                        fillRule="evenodd"
                        d="M7.293 14.707a1 1 0 0 1 0-1.414L10.586 10 7.293 6.707a1 1 0 0 1 1.414-1.414l4 4a1 1 0 0 1 0 1.414l-4 4a1 1 0 0 1-1.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </button>
                </li>
              </ul>
            </div>
            <div className="modal-footer">
              <button className="skip-btn" onClick={skipForNow}>
                Skip for Now
              </button>
              <button className="connect-btn" onClick={connectMetaMask}>
                {isConnected ? 'Connected' : 'Connect'}
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="dashboard">
        <aside className="sidebar">
          <div className="sidebar-logo">
            <img src={SimbiLogo} alt="Simbi Logo" className="logo-img" />
            Simbi
          </div>
          <ul className="sidebar-nav">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) => (isActive ? 'active' : '')}
                >
                  <img src={item.icon} alt={item.name} className="nav-icon" />
                  {item.name}
                </NavLink>
              </li>
            ))}
          </ul>
          <div className="connect-telegram">
            {/* <button className="telegram-btn">Connect to Telegram</button> */}
          </div>
        </aside>

        <main className="main-content">
          <div className="header">
            <button className="tokens" onClick={openModal}>
              {isConnected ? 'Connected' : 'Connect wallet'}
            </button>
            <div className="user-dropdown">👤 Tifechi</div>
          </div>
          <h1 className="main-title">My Trophy Room</h1>
          <div className="trophy-grid">
            <div className="trophy-card">
              <img src={QuizTrophy} alt="Quiz Conqueror" />
            </div>
            <div className="trophy-card">
              <img src={StreakTrophy} alt="Streak Scholar" />
            </div>
            <div className="trophy-card">
              <img src={GroupTrophy} alt="Study Group Leader" />
            </div>
            <div className="trophy-card">
              <img src={SubjectTrophy} alt="Subject Expert" />
            </div>
            <div className="trophy-card">
              <img src={CollaborationTrophy} alt="Collaboration Champion" />
            </div>
            <div className="trophy-card">
              <img src={FastLearnerTrophy} alt="Fast Learner" />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default TrophyRoom;