import { useState, useEffect } from 'react';

export default function useTelegramAuth() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [user, setUser] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const authenticate = async () => {
      try {
        if (!window.Telegram?.WebApp.initData) {
          throw new Error('Telegram auth data missing');
        }

        const response = await fetch('/api/telegram/auth', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            initData: window.Telegram.WebApp.initData
          })
        });

        if (!response.ok) throw new Error('Auth failed');
        
        setUser(await response.json());
      } catch (err) {
        setError(err as Error);
      } finally {
        setIsLoading(false);
      }
    };

    authenticate();
  }, []);

  return { user, isLoading, error };
}