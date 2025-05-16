import { useState, useEffect } from 'react';
import StudyDashboard from './StudyDashboard';
import useTelegramAuth from '../../Hooks/useTelegramAuth';

// Extend the Telegram WebApp type to include colorScheme and theme events
declare global {
  interface TelegramWebApp {
    initData?: string;
    initDataUnsafe?: {
      user?: {
        id: number;
        first_name: string;
        username?: string;
      };
    };
    expand?: () => void;
    sendData?: (data: string) => void;
    colorScheme?: 'light' | 'dark';
    onEvent?: (event: string, callback: () => void) => void;
    offEvent?: (event: string, callback: () => void) => void;
    setBackgroundColor?: (color: string) => void;
  }
  
  interface Window {
    Telegram?: {
      WebApp: {
        initData: string;
        initDataUnsafe: {
          user?: {
            id: number;
            first_name: string;
            username?: string;
          };
        };
        expand: () => void;
        sendData: (data: string) => void;
      };
    };
  }
}

// Import the extended TelegramWebApp type

type TelegramWebApp = {
  initData?: string;
  initDataUnsafe?: {
    user?: {
      id: number;
      first_name: string;
      username?: string;
    };
  };
  expand?: () => void;
  sendData?: (data: string) => void;
  colorScheme?: 'light' | 'dark';
  onEvent?: (event: string, callback: () => void) => void;
  offEvent?: (event: string, callback: () => void) => void;
  setBackgroundColor?: (color: string) => void;
};

export default function TelegramWrapper() {
  const { user, isLoading, error } = useTelegramAuth();
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Telegram theme detection and setup
  useEffect(() => {
    if (window.Telegram?.WebApp) {
      // 1. Expand the app to fullscreen
      window.Telegram.WebApp.expand();

      // 2. Set initial theme
      const initialTheme = (window.Telegram.WebApp as TelegramWebApp).colorScheme;
      setIsDarkMode(initialTheme === 'dark');
      applyTelegramTheme(initialTheme ?? 'light');

      // 3. Listen for theme changes
      (window.Telegram.WebApp as typeof window.Telegram.WebApp & { onEvent?: (event: string, callback: () => void) => void }).onEvent?.('themeChanged', handleThemeChange);

      // 4. Cleanup event listener on unmount
      return () => {
        if (
          window.Telegram &&
          window.Telegram.WebApp &&
          typeof (window.Telegram.WebApp as any).offEvent === 'function'
        ) {
          (window.Telegram.WebApp as any).offEvent('themeChanged', handleThemeChange);
        }
      };
    }
  }, []);

  const handleThemeChange = () => {
    const newTheme = (window.Telegram?.WebApp as TelegramWebApp)?.colorScheme;
    setIsDarkMode(newTheme === 'dark');
    applyTelegramTheme(newTheme ?? 'light');
  };

  const applyTelegramTheme = (theme: string) => {
    // Update body classes
    document.body.classList.toggle('tg-theme-dark', theme === 'dark');
    document.body.classList.add('tg-bg', 'tg-text');

    // Update Telegram's background color
    (window.Telegram?.WebApp as TelegramWebApp)?.setBackgroundColor?.(
      theme === 'dark' ? '#0f0f0f' : '#ffffff'
    );
  };

  if (isLoading) return (
    <div className="flex items-center justify-center h-screen tg-bg tg-text">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-tg-button mx-auto mb-4"></div>
        <p>Authenticating with Telegram...</p>
      </div>
    </div>
  );

  if (error) return (
    <div className="flex items-center justify-center h-screen tg-bg tg-text">
      <div className="text-center p-4 tg-secondary-bg rounded-lg">
        <h2 className="text-xl font-bold mb-2">Error</h2>
        <p className="mb-4">{error.message}</p>
        <button 
          onClick={() => window.location.reload()}
          className="tg-button px-4 py-2 rounded"
        >
          Try Again
        </button>
      </div>
    </div>
  );

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDarkMode ? 'bg-tg-dark-bg' : 'bg-tg-bg'}`}>
      <StudyDashboard user={user} />
    </div>
  );
}