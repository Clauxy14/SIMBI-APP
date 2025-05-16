import { useEffect, useState } from 'react';
import TelegramWrapper from '../Components/Telegram/TelegramWrapper';

export default function TelegramPage() {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    if (window.Telegram?.WebApp) {
      window.Telegram.WebApp.expand();
      setIsReady(true);
    }
  }, []);

  if (!isReady) return <div className="loading">Loading...</div>;

  return <TelegramWrapper />;
}