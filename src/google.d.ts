// google.d.ts
export {};

declare global {
  interface Window {
    google: typeof google;
  }

  namespace google {
    namespace accounts.id {
      function initialize(options: {
        client_id: string;
        callback: (response: { credential: string }) => void;
        ux_mode?: "popup" | "redirect";
        login_uri?: string;
      }): void;

      function prompt(
        callback?: (notification: PromptMomentNotification) => void
      ): void;

      function renderButton(
        parent: HTMLElement,
        options: {
          theme?: "outline" | "filled_blue" | "filled_black";
          size?: "large" | "medium" | "small";
          text?: "signin_with" | "signup_with" | "continue_with" | "signin";
          shape?: "rectangular" | "pill" | "circle" | "square";
          logo_alignment?: "left" | "center";
          width?: number;
          locale?: string;
        }
      ): void;

      interface PromptMomentNotification {
        isDisplayMoment: () => boolean;
        isNotDisplayed: () => boolean;
        getNotDisplayedReason: () => string;
        isSkippedMoment: () => boolean;
        getSkippedReason: () => string;
        isDismissedMoment: () => boolean;
        getDismissedReason: () => string;
      }
    }
  }
}

// // src/types/google.d.ts
// export {};

// declare global {
//   interface Window {
//     google?: {
//       accounts: {
//         id: {
//           initialize: (config: any) => void;
//           prompt: (callback?: any) => void;
//           renderButton?: (
//             container: HTMLElement,
//             options: { theme: string; size: string; text: string }
//           ) => void;
//         };
//       };
//     };
//   }
// }
