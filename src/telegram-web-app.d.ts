interface TelegramWebApps {
  WebApp: {
    ready(): void;
    expand(): void;
    close(): void;
    MainButton: {
      text: string;
      color: string;
      textColor: string;
      isVisible: boolean;
      isActive: boolean;
      show(): void;
      hide(): void;
      onClick(callback: () => void): void;
    };
    BackButton: {
      isVisible: boolean;
      show(): void;
      hide(): void;
      onClick(callback: () => void): void;
    };
    platform: string;
    initDataUnsafe: {
      user?: {
        id: number;
        first_name: string;
        last_name?: string;
        username?: string;
        language_code?: string;
      };
    };
  };
}
