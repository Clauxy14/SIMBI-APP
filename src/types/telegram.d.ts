declare global {
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

export type StudyGroup = {
  id: string;
  topic: string;
  stakeAmount: number;
  participants: Participant[];
  deadline: Date;
  creatorId: number;
};

export type Participant = {
  userId: number;
  completed: boolean;
  walletAddress: string;
};