import { createContext, useContext, useEffect, useRef, useState } from "react";

interface NotificationMessageContextType {
  message: string | null;
  setMessage: (msg: string | null) => void;
  clearMessage: () => void;
  dismissedMessages: Set<string>;
}

const NotificationMessageContext = createContext<
  NotificationMessageContextType | undefined
>(undefined);

export const NotificationMessageProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const [message, setMessage] = useState<string | null>(null);
  const dismissedMessages = useRef<Set<string>>(new Set());

  const clearMessage = () => {
    setMessage(null);
  };

  useEffect(() => {
    if (message) {
      const timeout = setTimeout(() => clearMessage(), 3000);
      return () => clearTimeout(timeout);
    }
  }, [message]);

  return (
    <NotificationMessageContext.Provider
      value={{
        message,
        setMessage,
        clearMessage,
        dismissedMessages: dismissedMessages.current,
      }}
    >
      {children}
    </NotificationMessageContext.Provider>
  );
};

export const useNotificationMessage = () => {
  const context = useContext(NotificationMessageContext);
  if (!context) {
    throw new Error(
      "useNotificationMessage는 NotificationMessageProvider에 있어야 합니다."
    );
  }
  return context;
};
